import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { ModalCancelarConfirmarComponent } from './components/modal-cancelar-confirmar/modal-cancelar-confirmar.component';
import { NoAutorizadoComponent } from './components/no-autorizado/no-autorizado.component';
import { MapaGeocodingComponent } from './components/mapa-geocoding/mapa-geocoding.component';
import { CardProductoDestacadoComponent } from './components/card-producto-destacado/card-producto-destacado.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FooterComponent,
    BuscadorComponent,
    LoadingSpinnerComponent,
    PaginadorComponent,
    ModalCancelarConfirmarComponent,
    NoAutorizadoComponent,
    MapaGeocodingComponent,
    CardProductoDestacadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    FooterComponent,
    BuscadorComponent,
    LoadingSpinnerComponent,
    PaginadorComponent,
    ModalCancelarConfirmarComponent,
    NoAutorizadoComponent,
    MapaGeocodingComponent,
    CardProductoDestacadoComponent
  ]
})
export class SharedModule { }
