import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalProveedoresComponent } from './pages/pagina-principal-proveedores/pagina-principal-proveedores.component';
import { ListarProveedoresComponent } from './components/listar-proveedores/listar-proveedores.component';
import { RegistrarProveedorComponent } from './components/registrar-proveedor/registrar-proveedor.component';
import { GenerarPedidoProveedorComponent } from './components/generar-pedido-proveedor/generar-pedido-proveedor.component';

const routes: Routes = [
  { path: '', component: PaginaPrincipalProveedoresComponent },  // Ruta principal (proveedores)
  { path: 'obtenerProveedores', component: ListarProveedoresComponent },
  { path: 'registrarProveedores', component: RegistrarProveedorComponent },
  { path: 'generarPedidoProveedor', component: GenerarPedidoProveedorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [RouterModule]
})

export class ProveedoresRoutingModule { }
