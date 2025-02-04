import { AppComponent } from './app.component';
import localeEsAR from '@angular/common/locales/es-AR';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Modifica al mismo tiempo en la vista y el modelo.
import { HttpClientModule } from '@angular/common/http';
import { InformacionModule } from './informacion/informacion.module';
import { InicioModule } from './inicio/inicio.module';
import { MaquetadoModule } from './maquetado/maquetado.module';
import { NavModule } from './nav/nav.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosModule } from './productos/productos.module';
import { PersonaModule } from './personas/persona.module';
import { SharedModule } from './shared/shared.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PromocionesModule } from './promociones/promociones.module';
import { registerLocaleData } from '@angular/common';
import { PagosModule } from './pagos/pagos.module';
import { ProveedoresModule } from './proveedores/proveedores.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeEsAR, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
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
    ProductosModule,
    SharedModule,
    UsuariosModule,
    PromocionesModule,
    FontAwesomeModule,
    PagosModule,
    ProveedoresModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
