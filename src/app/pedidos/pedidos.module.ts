import { NgModule } from '@angular/core';

import { EditarPedidoComponent } from './components/editar-pedido/editar-pedido.component';
import { ListaPedidosComponent } from './components/lista-pedidos/lista-pedidos.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
