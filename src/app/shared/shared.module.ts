import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginadorComponent } from './components/paginador/paginador.component';

@NgModule({
  declarations: [
    FooterComponent,
    BuscadorComponent,
    LoadingSpinnerComponent,
    PaginadorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    BuscadorComponent,
    LoadingSpinnerComponent,
    PaginadorComponent
  ]
})
export class SharedModule { }
