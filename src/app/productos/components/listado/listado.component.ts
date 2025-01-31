import { CarritoPedidoService } from './../../services/carrito-pedido.service';
import { Component } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Pagina } from 'src/app/shared/interfaces/Pagina';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  infoPagina: Pagina<Producto>;
  productos: Producto[];
  productosFiltrados: Producto[];
  tipoProductoFiltro: string;
  precioMaximoFiltro: number;
  tiposDeProductos: string[] = [];

  constructor(private service: ProductoService, private router: Router, private carritoService :CarritoPedidoService ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.tiposDeProductos = [...new Set(this.productos.map(p => p.tipoProducto))];

  }

  private cargarProductos() {
    this.service.recuperarProductos().subscribe({
      next: (data: Pagina<Producto>) => this.actualizarProductos(data),
      error: (e) => this.mostrarMensajeError(),
    });
  }

  private actualizarProductos(data: Pagina<Producto>) {
    this.infoPagina = data;
    this.productosFiltrados = data.elementos;
  }

  mostrarMensajeError() {
    alert('Ocurrió un error cargando los productos');
  }

  agregarItemCarrito(producto : Producto){

    this.carritoService.agregarItem(producto);

  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideTipo = this.tipoProductoFiltro === '' || p.tipoProducto === this.tipoProductoFiltro;
      const coincidePrecio = this.precioMaximoFiltro === 0 || p.precio_unitario <= this.precioMaximoFiltro;
      return coincideTipo && coincidePrecio;
    })
  };

  getTextoBoton(producto: Producto): string {
    const cantidad = this.carritoService.getCantidadEnCarrito(producto);
    return cantidad > 0 ? `Agregar al carrito (${cantidad})` : 'Agregar al carrito';
  }
}
