import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.scss']
})
export class TablaPedidosComponent {
// Recibe la lista de pedidos como input
  @Input() pedidos: Pedido[] = []; // O PedidoCliente[], dependiendo del caso

    @Input() mostrarColumnaCliente: boolean = true; // Por defecto true para Admin
  @Input() mostrarBotonCambiarEstado: boolean = true; // Por defecto true para Admin
  @Input() mostrarBotonMarcarPagado: boolean = true; // Por defecto true para Admin
  @Input() mostrarBotonCancelar: boolean = true; // Por defecto true para Admin

  // Outputs para cada acción de botón
  @Output() verDetalles = new EventEmitter<string>(); // Emite el ID del pedido
  @Output() cambiarEstado = new EventEmitter<{ idPedido: string; estadoActual: string }>(); // Emite ID y estado
  @Output() marcarPagado = new EventEmitter<string>(); // Emite el ID del pedido
  @Output() cancelarPedido = new EventEmitter<string>(); // Emite el ID del pedido

  // Método para obtener la clase CSS según el estado (lo moveremos aquí)
  getEstadoClase(estado: string): string {
    if (!estado) {
      return '';
    }
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'pendiente';
      case 'en autorizacion':
        return 'autorizacion';
      case 'en preparacion':
        return 'preparacion';
      case 'en empaquetado':
        return 'empaquetado';
      case 'en despacho':
        return 'despacho';
      case 'en distribucion':
        return 'distribucion';
      case 'facturacion':
        return 'en facturacion';
      case 'cancelado':
        return 'cancelado';
      case 'completado':
        return 'completado';
      default:
        return '';
    }
  }

  // Métodos que emiten los eventos cuando se hace click en los botones
  onVerDetalles(idPedido: string) {
    this.verDetalles.emit(idPedido);
  }

  onCambiarEstado(idPedido: string, estadoActual: string) {
    this.cambiarEstado.emit({ idPedido, estadoActual });
  }

  onMarcarPagado(idPedido: string) {
    this.marcarPagado.emit(idPedido);
  }

  onCancelarPedido(idPedido: string) {
    this.cancelarPedido.emit(idPedido);
  }


}
