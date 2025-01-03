import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { PageProductoComponent } from './components/page-producto/page-producto.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PromocionesProductoComponent } from './components/promociones/promociones.component';
import { NuevaPromocionProductoComponent } from './components/promociones/nueva-promocion-producto/nueva-promocion-producto.component';
import { PromocionesModule } from '../promociones/promociones.module';
import { EditarPromocionComponent } from '../promociones/components/editar-promocion/editar-promocion.component';
import { ListadoComponent } from './components/listado/listado.component';





@NgModule({
  declarations: [
    ListaProductosComponent,
    EditarProductoComponent,
    PageProductoComponent,
    PromocionesProductoComponent,
    NuevaPromocionProductoComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PromocionesModule
  ]
})
export class ProductosModule { }
