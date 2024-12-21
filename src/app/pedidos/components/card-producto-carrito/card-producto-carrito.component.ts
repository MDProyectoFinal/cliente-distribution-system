import { Component, Input } from '@angular/core';
import { LineaProducto } from 'src/app/productos/interfaces/lineaProducto';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';

@Component({
  selector: 'app-card-producto-carrito',
  templateUrl: './card-producto-carrito.component.html',
  styleUrls: ['./card-producto-carrito.component.scss'],
})
export class CardProductoCarritoComponent {
  @Input() producto: any;
  @Input() cantidad: number;
  @Input() subtotal: number;

  constructor(private carritoService: CarritoPedidoService) {}

  restarCantidad() {
    if (this.cantidad > 1) {
      this.carritoService.quitarItem(this.producto);

    }
  }

  sumarCantidad() {
    this.carritoService.agregarItem(this.producto);

  }
}
