import { AlertifyService } from './../../../shared/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { LineaProducto } from 'src/app/productos/interfaces/lineaProducto';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-pedido',
  templateUrl: './carrito-pedido.component.html',
  styleUrls: ['./carrito-pedido.component.scss'],
})
export class CarritoPedidoComponent implements OnInit {
  productos: LineaProducto[];

  constructor(private router : Router, private carritoService: CarritoPedidoService, private alertifyService: AlertifyService) {}
  ngOnInit(): void {
    this.getProductosEnCarrito();
    this.carritoService.cantidadEnCarrito$.subscribe((cantidad =>{
      this.getProductosEnCarrito();
    }))
  }

  private getProductosEnCarrito() {
    this.productos = this.carritoService.getProductos();
  }

  calcularTotal(): number {

    if (this.productos.length < 1) {
      return 0;
    }
    const sum = this.productos
      .map((lp) =>{
        return lp.getSubtotal()} )
      .reduce((acc, curr) => (acc += curr));

    return sum;
  }

  checkout(){

    this.router.navigateByUrl('/client/pago')

  }

  limpiarCarrito(){

    this.alertifyService.confirm('Carrito', '¿Quitar todos los productos del carrito?', ()=> {
      this.carritoService.limpiar();
      this.productos = []
    })

  }
}
