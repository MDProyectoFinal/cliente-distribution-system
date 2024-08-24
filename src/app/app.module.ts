import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Modifica al mismo tiempo en la vista y el modelo.
import { HttpClientModule } from '@angular/common/http';
import { InformacionModule } from './informacion/informacion.module';
import { InicioModule } from './inicio/inicio.module';
import { MaquetadoModule } from './maquetado/maquetado.module';
import { NavModule } from './nav/nav.module';
import { NgModule } from '@angular/core';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { PersonaModule } from './personas/persona.module';
import { SharedModule } from './shared/shared.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InformacionModule,
    InicioModule,
    MaquetadoModule,
    NavModule,
    PedidosModule,
    PersonaModule,
    ProductosModule
    routing,
    SharedModule,
    UsuariosModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
