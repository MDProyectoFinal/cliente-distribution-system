import { AnonimoMaquetadoComponent } from './maquetado/components/anonimo-maquetado/anonimo-maquetado.component';
import { EditarUsuarioComponent } from './usuarios/components/editar-usuario/editar-usuario.component';
import { ListaPedidosComponent } from './pedidos/components/lista-pedidos/lista-pedidos.component';
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

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LogueadoMaquetadoComponent,
    children: [
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'mis-datos', component: EditarUsuarioComponent },
      { path: 'inicio', component: PaginaInicioComponent },
      { path: 'pedidos', component: ListaPedidosComponent },
      { path: 'cuenta', component: PaginaInicioComponent },
      { path: 'listar-usuarios', component: ListarUsuariosComponent },
      {
        path: 'informacion',
        loadChildren: () => import('./informacion/informacion.module').then((m) => m.InformacionModule),
      },

      {
        path: 'admin',
        children: [
          { path: 'productos', component: ListaProductosComponent },
          { path: 'productos/detalle/:id', component: EditarProductoComponent },
          { path: 'productos/:id/promociones', component: PromocionesProductoComponent },
          { path: 'productos/:id/promociones/nueva', component: NuevaPromocionProductoComponent },
          { path: 'promociones/:id', component: EditarPromocionComponent },
          { path: 'productos/nuevo', component: EditarProductoComponent },
        ],
      },

      { path: 'productos/listado', component: ListadoComponent },
      { path: 'carrito', component: CarritoPedidoComponent },

      { path: 'enviar-sugerencia', component: PaginaInicioComponent },
      { path: 'cerrar-sesion', component: PaginaInicioComponent },
    ],
  },
  {
    path: '',
    component: AnonimoMaquetadoComponent,
    children: [
      { path: 'login', component: LoguearUsuarioComponent },
      { path: 'registro', component: RegistroUsuarioComponent },
    ],
  },
  { path: '**', redirectTo: '/inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
