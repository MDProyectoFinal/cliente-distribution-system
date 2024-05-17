import { authGuard } from './guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import User
import { UsuarioEdicionComponent } from './components/usuario-edicion.component';
import { ListaPedidosComponent } from './components/lista-pedidos.component';
import { InicioComponent } from './components/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: InicioComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mis-datos', component: UsuarioEdicionComponent, canActivate: [authGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: 'pedidos', component: ListaPedidosComponent, canActivate: [authGuard] },
  { path: 'cuenta', component: InicioComponent, canActivate: [authGuard] },
  { path: 'informacion', component: InicioComponent, canActivate: [authGuard] },
  { path: 'enviar-sugerencia', component: InicioComponent, canActivate: [authGuard] },
  { path: 'cerrar-sesion', component: InicioComponent, canActivate: [authGuard] },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
