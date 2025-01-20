import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pagos-estado-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.scss']
})
export class PagoExitosoComponent {

  constructor(private router: Router){

  }

  volverInicio() {
    this.router.navigate(['/inicio']);
  }

}
