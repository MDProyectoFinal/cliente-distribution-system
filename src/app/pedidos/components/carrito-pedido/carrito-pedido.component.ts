import { Component, OnInit } from '@angular/core';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { LineaProducto } from "src/app/productos/interfaces/lineaProducto";

@Component({
  selector: 'app-carrito-pedido',
  templateUrl: './carrito-pedido.component.html',
  styleUrls: ['./carrito-pedido.component.scss']
})
export class CarritoPedidoComponent implements OnInit{
  productos: LineaProducto[];

  constructor(private carritoService: CarritoPedidoService){}
  ngOnInit(): void {
    this.productos = this.carritoService.getProductos()
  }

  restarCantidad(lineaProducto : LineaProducto){
    if(lineaProducto.cantidad > 1){
      lineaProducto.cantidad--
    }

  }

  sumarCantidad(lineaProducto : LineaProducto){
    lineaProducto.cantidad++
  }

}
