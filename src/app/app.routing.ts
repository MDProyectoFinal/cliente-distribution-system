import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'

// Import User
import { UsuarioEdicionComponent } from "./components/usuario-edicion.component";
import { ListaPedidosComponent } from "./components/lista-pedidos.component";
import { InicioComponent } from "./components/inicio.component";

const appRoutes: Routes = [
    {
        path:'',
        redirectTo: '/inicio', // Luego cambiarlo
        pathMatch: 'full'
    },
    { path: '', component: InicioComponent },
    { path: 'mis-datos', component: UsuarioEdicionComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'pedidos', component: ListaPedidosComponent },
    { path: 'cuenta', component: InicioComponent },
    { path: 'informacion', component: InicioComponent },
    { path: 'enviar-sugerencia', component: InicioComponent },
    { path: 'cerrar-sesion', component: InicioComponent },
    { path: '**', component: UsuarioEdicionComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);