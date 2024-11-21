import { Component, OnInit } from '@angular/core';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { LineaProducto } from 'src/app/productos/interfaces/lineaProducto';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-carrito-pedido',
  templateUrl: './carrito-pedido.component.html',
  styleUrls: ['./carrito-pedido.component.scss'],
})
export class CarritoPedidoComponent implements OnInit {
  productos: LineaProducto[];

  constructor(private carritoService: CarritoPedidoService, private pedidoService : PedidoService) {}
  ngOnInit(): void {
    this.productos = this.carritoService.getProductos();
  }

  restarCantidad(lineaProducto: LineaProducto) {
    if (lineaProducto.cantidad > 1) {
      this.carritoService.quitarItem(lineaProducto.producto)
    }
  }

  sumarCantidad(lineaProducto: LineaProducto) {
    this.carritoService.agregarItem(lineaProducto.producto)
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
    this.pedidoService.guardarPedido().subscribe({
      next: (data) => {
        this.carritoService.limpiar()

      },

      error: (e) => {console.log(e);
      },
    });

  }
}
