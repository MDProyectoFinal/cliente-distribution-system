import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RealizarPagoComponent } from './components/realizar-pago/realizar-pago.component';
import { PagoExitosoComponent } from './components/estados-pago/pago-exitoso/pago-exitoso.component';
import { PagoFallidoComponent } from './components/estados-pago/pago-fallido/pago-fallido.component';
import { PagoPendienteComponent } from './components/estados-pago/pago-pendiente/pago-pendiente.component';

@NgModule({
  declarations: [
    RealizarPagoComponent,
    PagoExitosoComponent,
    PagoFallidoComponent,
    PagoPendienteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    RealizarPagoComponent,
    PagoExitosoComponent,
    PagoFallidoComponent,
    PagoPendienteComponent,
  ]
})
export class PagosModule { }
