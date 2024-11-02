import { NgModule } from '@angular/core';

import { EditarPedidoComponent } from './components/editar-pedido/editar-pedido.component';
import { ListaPedidosComponent } from './components/lista-pedidos/lista-pedidos.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    EditarPedidoComponent,
    ListaPedidosComponent
  ],
  declarations: [
    EditarPedidoComponent,
    ListaPedidosComponent
  ],
  providers: [],
})
export class PedidosModule { }
