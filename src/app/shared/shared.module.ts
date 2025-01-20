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

@NgModule({
  declarations: [
    FooterComponent,
    BuscadorComponent,
    LoadingSpinnerComponent,
    PaginadorComponent,
    ModalCancelarConfirmarComponent,
    NoAutorizadoComponent,
    MapaGeocodingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    BuscadorComponent,
    LoadingSpinnerComponent,
    PaginadorComponent,
    ModalCancelarConfirmarComponent,
    NoAutorizadoComponent,
    MapaGeocodingComponent
  ]
})
export class SharedModule { }
