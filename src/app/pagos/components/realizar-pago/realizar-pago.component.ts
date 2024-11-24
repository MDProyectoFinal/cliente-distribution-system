import { Component } from '@angular/core';
import { PagoService } from '../../services/pago.service';

declare var MercadoPago: any;

@Component({
  selector: 'pagos-realizar-pago',
  templateUrl: './realizar-pago.component.html',
  styleUrls: ['./realizar-pago.component.scss']
})
export class RealizarPagoComponent {

  // TODO: crear archivo "env" o poner en config -> global esa key
  private mercadoPago = new MercadoPago('TU_PUBLIC_KEY_SANDBOX'); // Credencial de prueba

  constructor( private _pagoServices: PagoService) {

  }

  pay() {
    const preferenceData = {
      title: 'Producto de ejemplo',
      quantity: 1,
      price: 100.0,
    };

    this._pagoServices.createPreference(preferenceData).subscribe((res: any) => {
      this.mercadoPago.checkout({
        preference: {
          id: res.id,
        },
        autoOpen: true, // Abre automáticamente el flujo de pago
      });
    });
  }

}
