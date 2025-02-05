import { AnonimoMaquetadoComponent } from './maquetado/components/anonimo-maquetado/anonimo-maquetado.component';
import { EditarUsuarioComponent } from './usuarios/components/editar-usuario/editar-usuario.component';
import { ListaPedidosComponent } from './pedidos/components/admin/lista-pedidos/lista-pedidos.component';
import { ListarUsuariosComponent } from './usuarios/components/listar-usuarios/listar-usuarios.component';
import { LogueadoMaquetadoComponent } from './maquetado/components/logueado-maquetado/logueado-maquetado.component';
import { LoguearUsuarioComponent } from './usuarios/components/loguear-usuario/loguear-usuario.component';
import { PaginaInicioComponent } from './inicio/components/pagina-inicio/pagina-inicio.component';
import { RegistroUsuarioComponent } from './usuarios/components/registro-usuario/registro-usuario.component';
import { ListaProductosComponent } from './productos/components/lista-productos/lista-productos.component';
import { EditarProductoComponent } from './productos/components/editar-producto/editar-producto.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { PromocionesProductoComponent } from './productos/components/promociones/promociones.component';
import { NuevaPromocionProductoComponent } from './productos/components/promociones/nueva-promocion-producto/nueva-promocion-producto.component';
import { EditarPromocionComponent } from './promociones/components/editar-promocion/editar-promocion.component';
import { ListadoComponent } from './productos/components/listado/listado.component';
import { CarritoPedidoComponent } from './pedidos/components/carrito-pedido/carrito-pedido.component';
import { roleGuard } from './guards/role.guard';
import { Roles } from './usuarios/interfaces/roles-enum';
import { NoAutorizadoComponent } from './shared/components/no-autorizado/no-autorizado.component';
import { ListarPedidosComponent } from './pedidos/components/client/listar-pedidos/listar-pedidos.component';
import { RealizarPagoComponent } from './pagos/components/realizar-pago/realizar-pago.component';
import { PagoExitosoComponent } from './pagos/components/estados-pago/pago-exitoso/pago-exitoso.component';
import { PagoFallidoComponent } from './pagos/components/estados-pago/pago-fallido/pago-fallido.component';
import { PagoPendienteComponent } from './pagos/components/estados-pago/pago-pendiente/pago-pendiente.component';
import { RegistrarProveedorComponent } from './proveedores/components/registrar-proveedor/registrar-proveedor.component';
import { ListarProveedoresComponent } from './proveedores/components/listar-proveedores/listar-proveedores.component';
import { PaginaPrincipalProveedoresComponent } from './proveedores/pages/pagina-principal-proveedores/pagina-principal-proveedores.component';
import { GenerarPedidoProveedorComponent } from './proveedores/components/generar-pedido-proveedor/generar-pedido-proveedor.component';
import { OlvideMiPasswordComponent } from './usuarios/components/olvide-mi-password/olvide-mi-password.component';
import { RecuperarClaveComponent } from './usuarios/components/recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LogueadoMaquetadoComponent,
    children: [
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'mis-datos', component: EditarUsuarioComponent },
      { path: 'inicio', component: PaginaInicioComponent },
      { path: 'cuenta', component: PaginaInicioComponent },
      {
        path: 'informacion',
        loadChildren: () => import('./informacion/informacion.module').then((m) => m.InformacionModule),
      },

      // Probando aplicación del roleGuard para varios casos con el prefijo ADMIN
      {
        path: 'admin',
        data: { role: Roles.Admin },
        canActivate: [ roleGuard ],
        children: [
          { path: 'pedidos', component: ListaPedidosComponent },
          { path: 'productos', component: ListaProductosComponent },
          { path: 'productos/detalle/:id', component: EditarProductoComponent },
          { path: 'productos/:id/promociones', component: PromocionesProductoComponent },
          { path: 'productos/:id/promociones/nueva', component: NuevaPromocionProductoComponent },
          { path: 'promociones/:id', component: EditarPromocionComponent },
          { path: 'productos/nuevo', component: EditarProductoComponent },
          {
            path: 'proveedores',
            loadChildren: () => import('./proveedores/proveedores.module').then((m) => m.ProveedoresModule),
          },
          { path: 'listar-usuarios', component: ListarUsuariosComponent },
        ]
      },

      // Probando aplicación del roleGuard para varios casos con el prefijo CLIENTE
      {
        path: 'client',
        data: { role: Roles.Cliente },
        canActivate: [ roleGuard ],
        children: [
          { path: 'pedidos', component: ListarPedidosComponent },
          { path: 'pago', component: RealizarPagoComponent },
          { path: 'pago-success', component: PagoExitosoComponent },
          { path: 'pago-failure', component: PagoFallidoComponent },
          { path: 'pago-pending', component: PagoPendienteComponent },
        ]
      },

      { path: 'productos/listado', component: ListadoComponent },
      { path: 'carrito', component: CarritoPedidoComponent },

      { path: 'enviar-sugerencia', component: PaginaInicioComponent },
      { path: 'cerrar-sesion', component: PaginaInicioComponent },
      { path: 'no-autorizado', component: NoAutorizadoComponent }
    ],
  },
  {
    path: '',
    component: AnonimoMaquetadoComponent,
    children: [
      { path: 'login', component: LoguearUsuarioComponent },
      { path: 'registro', component: RegistroUsuarioComponent },
      { path: 'olvide-mi-password', component: OlvideMiPasswordComponent },
      { path: 'reset-password', component: RecuperarClaveComponent }
    ],
  },
  { path: '**', redirectTo: '/inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
