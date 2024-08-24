import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/ng';



@NgModule({
  declarations: [
    ListaProductosComponent,
    EditarProductoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CloudinaryModule
  ]
})
export class ProductosModule { }
