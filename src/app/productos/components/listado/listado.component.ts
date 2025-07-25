import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { CarritoPedidoService } from './../../services/carrito-pedido.service';
import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Pagina } from 'src/app/shared/interfaces/Pagina';
import { Producto } from '../../interfaces/producto';
import { TipoProducto } from 'src/app/models/tipoProducto';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent {

  infoPagina: Pagina<Producto>;
  productos: Producto[];
  productosFiltrados: Producto[];
  tiposDeProductos: Array<TipoProducto> = [];
  formFiltros: FormGroup;

  private readonly nombreHeaderAlert= 'Productos';

  constructor(private service: ProductoService, private router: Router, private carritoService: CarritoPedidoService, private alertifyService:AlertifyService) {}

  ngOnInit(): void {
    this.cargarTiposProductos();
    this.cargarProductos();
    this.formFiltros = new FormGroup({
      tipoProductoSeleccionado: new FormControl(''),
      precioMaximoFiltro: new FormControl(''),
      precioMinimoFiltro: new FormControl(''),
    });
  }

  private cargarProductos() {
    this.service.recuperarProductos().subscribe({
      next: (data: Pagina<Producto>) => this.actualizarProductos(data),
      error: (e) => this.mostrarMensajeError(),
    });
  }

  private cargarTiposProductos() {
    this.service.recuperarTiposProductos().subscribe({
      next: (data) => {
        this.tiposDeProductos = data;
      },

      error: (e) => {},
    });
  }

  private actualizarProductos(data: Pagina<Producto>) {
    this.infoPagina = data;
    this.productosFiltrados = this.productos = data.elementos;
    this.infoPagina = data
  }

  mostrarMensajeError() {
    this.alertifyService.alert(this.nombreHeaderAlert, 'Ocurrió un error cargando los productos');
  }

  agregarItemCarrito(producto: Producto) {
    this.carritoService.agregarItem(producto);
  }

  aplicarFiltros(): void {
    const min= this.formFiltros.value.precioMinimoFiltro
    const max =this.formFiltros.value.precioMaximoFiltro
    const tipo = this.formFiltros.value.tipoProductoSeleccionado
    this.service.filtrarProductos(tipo, min, max).subscribe({
      next: (data) => {
        this.infoPagina = data;
        this.productosFiltrados = data.elementos
      },

      error: (e) => {},
    });
  }

  getTextoBoton(producto: Producto): string {
    const cantidad = this.carritoService.getCantidadEnCarrito(producto);
    return cantidad > 0 ? `Agregar al carrito (${cantidad})` : 'Agregar al carrito';
  }

    irPagina(numeroPagina: number) {
    const link = [this.infoPagina.linkSiguiente, this.infoPagina.linkAnterior].find((link) => link != null);

    if (link) {
      const paginaNavegar = link.replace(/(numeroPagina=)[^\&]+/, '$1' + numeroPagina);
      this.cargarProductosEnDireccion(paginaNavegar);
    }
  }

  navegarSiguiente() {
    this.cargarProductosEnDireccion(this.infoPagina.linkSiguiente);
  }

  navegarAnterior() {
    this.cargarProductosEnDireccion(this.infoPagina.linkAnterior);
  }

  private cargarProductosEnDireccion(direccion: string) {
    this.service.recuperarProductosEnDireccion(direccion).subscribe({
      next: (data: Pagina<Producto>) => this.actualizarProductos(data),
      error: (e) => this.mostrarMensajeError(),
    });
  }
}
