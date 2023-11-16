import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Modifica al mismo tiempo en la vista y el modelo.
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UsuarioEdicionComponent } from './components/usuario-edicion.component';
import { ListaPedidosComponent } from './components/lista-pedidos.component';

import { RespuestaUsuarioPersona } from './interfaz/respuestaUsuarioPersona';
import { InicioComponent } from './components/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioEdicionComponent, // Con esto tengo acceso a este componente desde cualquier otro componente
    ListaPedidosComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    routing,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
