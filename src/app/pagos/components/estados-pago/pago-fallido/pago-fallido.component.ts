import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-fallido',
  templateUrl: './pago-fallido.component.html',
  styleUrls: ['./pago-fallido.component.scss']
})
export class PagoFallidoComponent {

  constructor(private router: Router){ }

  reintentarPago() {

    // TODO: ver que hacer con esto
    this.router.navigate(['/admin/pago']);
  }

}