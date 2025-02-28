import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from 'src/app/pagos/services/pago.service';
import { PedidoService } from 'src/app/pedidos/services/pedido.service';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';

@Component({
  selector: 'pagos-estado-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.scss'],
})
export class PagoExitosoComponent implements AfterContentInit, OnInit {
  params :URLSearchParams
  constructor(private router: Router, private carritoService: CarritoPedidoService, private pagoService: PagoService) {}
  ngOnInit(): void {
    this.params = new URLSearchParams(window.location.search);


    let status = this.params.get('collection_status');
    if (status != 'approved') {
      this.volverInicio();
    }
  }

  ngAfterContentInit(): void {

    const pid = this.params.get('pid');
    console.log(pid);

    if(pid){

      this.pagoService.registrarPago(pid).subscribe({
        error: (e) => {
          console.log(e);
        },
      });

    }

    else if (this.carritoService.getProductos().length >= 1) {
      this.pagoService.guardarPedido().subscribe({
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
