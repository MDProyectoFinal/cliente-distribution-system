import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { Pagina } from 'src/app/shared/interfaces/Pagina';
import { faCartShopping, faMagnifyingGlassDollar, faRankingStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
})
export class ListaProductosComponent implements OnInit {
  infoPagina: Pagina<Producto>;
  productosFiltrados: Producto[];
  promoIcon = faMagnifyingGlassDollar;

  constructor(private service: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  confirmarEliminacion(idProducto: string) {
    const producto = this.productosFiltrados.find((p) => p._id === idProducto)!!;
    if (confirm(`¿Está seguro de que desea eliminar ${producto.nombre}?`)) {
      this.service.eliminarProducto(idProducto).subscribe({
        next: () => {
          this.productosFiltrados.splice(this.productosFiltrados.indexOf(producto), 1);
        },

        error: (e) => this.mostrarMensajeError(),
      });
    }
  }

  buscarProductoPorNombre(nombre: string): void {
    this.service.recuperarProductosPorNombre(nombre).subscribe({
      next: (data: Pagina<Producto>) => this.actualizarProductos(data),
      error: (e) => this.mostrarMensajeError(),
    });
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

  private cargarProductos() {
    this.service.recuperarProductos().subscribe({
      next: (data: Pagina<Producto>) => this.actualizarProductos(data),
      error: (e) => this.mostrarMensajeError(),
    });
  }

  private cargarProductosEnDireccion(direccion: string) {
    this.service.recuperarProductosEnDireccion(direccion).subscribe({
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
}
