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
  productosFiltrados: Producto[];
  constructor(private service: ProductoService, private router: Router, private carritoService :CarritoPedidoService ) {}

  ngOnInit(): void {
    this.cargarProductos();
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
}
