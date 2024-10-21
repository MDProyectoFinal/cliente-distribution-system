import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPromocionComponent } from './components/editar-promocion/editar-promocion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoPromocionFactory } from './interfaces/promocionFactory';



@NgModule({
  declarations: [EditarPromocionComponent],
  providers:[TipoPromocionFactory],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EditarPromocionComponent]
})
export class PromocionesModule { }
