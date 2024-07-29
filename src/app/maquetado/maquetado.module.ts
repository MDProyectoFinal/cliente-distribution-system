import { AnonimoMaquetadoComponent } from './components/anonimo-maquetado/anonimo-maquetado.component';
import { LogueadoMaquetadoComponent } from './components/logueado-maquetado/logueado-maquetado.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { NavModule } from "../nav/nav.module";


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NavModule
],
  exports: [
    AnonimoMaquetadoComponent,
    LogueadoMaquetadoComponent
  ],
  declarations: [
    AnonimoMaquetadoComponent,
    LogueadoMaquetadoComponent
  ],
  providers: [],
})
export class MaquetadoModule { }
