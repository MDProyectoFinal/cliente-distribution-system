import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pagos-pago-pendiente',
  templateUrl: './pago-pendiente.component.html',
  styleUrls: ['./pago-pendiente.component.scss']
})
export class PagoPendienteComponent {

  constructor(private _router: Router ){ }

  volverInicio() {
    this._router.navigate(['/inicio']);
  }


}
