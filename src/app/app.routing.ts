import { LogueadoLayoutComponent } from './components/logueado-layout/logueado-layout.component';
import { AnonimoLayoutComponent } from './components/anonimo-layout/anonimo-layout.component';
import { authGuard } from './guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import User
import { ListaPedidosComponent } from './components/lista-pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioEdicionComponent } from './components/usuario/usuario-edicion/usuario-edicion.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LogueadoLayoutComponent,
    children: [
      { path: '', redirectTo:'/inicio', pathMatch:'full'},
      { path: 'mis-datos', component: UsuarioEdicionComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'pedidos', component: ListaPedidosComponent },
      { path: 'cuenta', component: InicioComponent },
      { path: 'informacion', component: InicioComponent },
      { path: 'enviar-sugerencia', component: InicioComponent },
      { path: 'cerrar-sesion', component: InicioComponent },
    ],
  },
  {
    path: '',
    component: AnonimoLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
    ],
  },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
