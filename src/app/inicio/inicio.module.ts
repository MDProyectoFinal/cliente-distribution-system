
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import { SliderOfertasComponent } from './components/slider-ofertas/slider-ofertas.component';
import { SliderDestacadasComponent } from './components/slider-destacadas/slider-destacadas.component'
import { SliderExclusivosComponent } from './components/slider-exclusivos/slider-exclusivos.component'
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [BrowserModule, SharedModule],
  exports: [
    PaginaInicioComponent,
    SliderOfertasComponent,
    SliderDestacadasComponent,
    SliderExclusivosComponent
  ],
  declarations: [
    PaginaInicioComponent,
    SliderOfertasComponent,
    SliderDestacadasComponent,
    SliderExclusivosComponent,
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class InicioModule { }
