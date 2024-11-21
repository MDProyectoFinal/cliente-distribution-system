import { NgModule } from '@angular/core';

import { EditarPedidoComponent } from './components/admin/editar-pedido/editar-pedido.component';
import { ListaPedidosComponent } from './components/admin/lista-pedidos/lista-pedidos.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarritoPedidoComponent } from './components/carrito-pedido/carrito-pedido.component';
import { ListarPedidosComponent } from './components/client/listar-pedidos/listar-pedidos.component';

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
    ListaPedidosComponent,
    CarritoPedidoComponent,
    ListarPedidosComponent
  ],
  providers: [],
})
export class PedidosModule { }
