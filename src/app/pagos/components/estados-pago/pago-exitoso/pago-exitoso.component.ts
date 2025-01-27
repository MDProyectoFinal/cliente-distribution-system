import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/pedidos/services/pedido.service';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';

@Component({
  selector: 'pagos-estado-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.scss'],
})
export class PagoExitosoComponent implements AfterContentInit, OnInit {
  constructor(private router: Router, private carritoService: CarritoPedidoService, private pedidoService: PedidoService) {}
  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    let status = params.get('collection_status');
    if (status != 'approved') {
      this.volverInicio();
    }
  }

  ngAfterContentInit(): void {
    if (this.carritoService.getProductos().length >= 1) {
      this.pedidoService.guardarPedido().subscribe({
        next: (data) => {
          this.carritoService.limpiar();
        },

        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  volverInicio() {
    this.router.navigate(['/inicio']);
  }
}
