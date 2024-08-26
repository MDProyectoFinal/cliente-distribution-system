import { authGuard } from './guards/auth.guard';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Modifica al mismo tiempo en la vista y el modelo.
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';

import { ListaPedidosComponent } from './components/lista-pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { UsuarioEdicionComponent } from './components/usuario/usuario-edicion/usuario-edicion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { AnonimoLayoutComponent } from './components/anonimo-layout/anonimo-layout.component';
import { LogueadoLayoutComponent } from './components/logueado-layout/logueado-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderOfertasComponent } from './components/slider-ofertas/slider-ofertas.component';
import { SliderDestacadosComponent } from './components/slider-destacados/slider-destacados.component';
import { SliderExclusivosComponent } from './components/slider-exclusivos/slider-exclusivos.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioEdicionComponent, // Con esto tengo acceso a este componente desde cualquier otro componente
    ListaPedidosComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    PedidosComponent,
    NavComponent,
    AnonimoLayoutComponent,
    LogueadoLayoutComponent,
    SliderOfertasComponent,
    SliderDestacadosComponent,
    SliderExclusivosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    routing,
    FontAwesomeModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
