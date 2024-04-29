import { authGuard } from './guards/auth.guard';
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'

// Import User
import { UsuarioEdicionComponent } from "./components/usuario-edicion.component";
import { ListaPedidosComponent } from "./components/lista-pedidos.component";
import { InicioComponent } from "./components/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";

const appRoutes: Routes = [
    {
        path:'',
        canActivate: [authGuard],
        component: InicioComponent,
        pathMatch: 'full'
    },
    { path: '', component: InicioComponent },
    { path: 'mis-datos', component: UsuarioEdicionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'pedidos', component: ListaPedidosComponent },
    { path: 'cuenta', component: InicioComponent },
    { path: 'informacion', component: InicioComponent },
    { path: 'enviar-sugerencia', component: InicioComponent },
    { path: 'cerrar-sesion', component: InicioComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);