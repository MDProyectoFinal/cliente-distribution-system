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

  constructor(private service: ProductoService, private router: Router, private carritoService: CarritoPedidoService) {}

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
  }

  mostrarMensajeError() {
    alert('Ocurrió un error cargando los productos');
  }

  agregarItemCarrito(producto: Producto) {
    this.carritoService.agregarItem(producto);
  }

  aplicarFiltros(): void {

    this.service.filtrarProductos(this.formFiltros.value.tipoProductoSeleccionado).subscribe({
      next: (data) => {
        this.infoPagina = data;
        this.productosFiltrados = data.elementos
      },

      error: (e) => {},
    });

    // this.productosFiltrados = this.productos.filter(p => {
    //   const coincideTipo = this.formFiltros.value.tipoProductoSeleccionado === '' || p.tipoProducto === this.formFiltros.value.tipoProductoSeleccionado;
    //   const coincidePrecio = this.formFiltros.value.precioMaximoFiltro === 0 || p.precio_unitario <= this.formFiltros.value.precioMaximoFiltro;
    //   return coincideTipo && coincidePrecio;
    // })
  }

  getTextoBoton(producto: Producto): string {
    const cantidad = this.carritoService.getCantidadEnCarrito(producto);
    return cantidad > 0 ? `Agregar al carrito (${cantidad})` : 'Agregar al carrito';
  }
}
