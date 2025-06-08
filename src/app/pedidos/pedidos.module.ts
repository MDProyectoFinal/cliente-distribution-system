import { NgModule } from '@angular/core';

import { EditarPedidoComponent } from './components/admin/editar-pedido/editar-pedido.component';
import { ListaPedidosComponent } from './components/admin/lista-pedidos/lista-pedidos.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarritoPedidoComponent } from './components/carrito-pedido/carrito-pedido.component';
import { ListarPedidosComponent } from './components/client/listar-pedidos/listar-pedidos.component';
import { CardProductoCarritoComponent } from './components/card-producto-carrito/card-producto-carrito.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TablaPedidosComponent } from './components/tabla-pedidos/tabla-pedidos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    EditarPedidoComponent,
    ListaPedidosComponent
  ],
  declarations: [
    EditarPedidoComponent,
    ListaPedidosComponent,
    CarritoPedidoComponent,
    ListarPedidosComponent,
    CardProductoCarritoComponent,
    TablaPedidosComponent
  ],
  providers: [],
})
export class PedidosModule { }
