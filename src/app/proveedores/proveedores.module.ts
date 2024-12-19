import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrarProveedorComponent } from './components/registrar-proveedor/registrar-proveedor.component';
import { ListarProveedoresComponent } from './components/listar-proveedores/listar-proveedores.component';
import { SharedModule } from '../shared/shared.module';
import { ActivoPipe } from '../pipes/activo.pipe';
import { PaginaPrincipalProveedoresComponent } from './pages/pagina-principal-proveedores/pagina-principal-proveedores.component';


@NgModule({
  declarations: [
    RegistrarProveedorComponent,
    ListarProveedoresComponent,
    ActivoPipe,
    PaginaPrincipalProveedoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    RegistrarProveedorComponent,
    ListarProveedoresComponent,
    PaginaPrincipalProveedoresComponent
  ]
})
export class ProveedoresModule { }
