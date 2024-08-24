import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { InformacionRoutingModule } from './informacion-routing.module';
import { SobreNosotrosExtraComponent } from './components/sobre-nosotros-extra/sobre-nosotros-extra.component';
import { InformacionGeneralComponent } from './pages/informacion-general/informacion-general.component';
import { SobreNosotrosEncabezadoComponent } from './components/sobre-nosotros-encabezado/sobre-nosotros-encabezado.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SobreNosotrosComponent,
    SobreNosotrosExtraComponent,
    InformacionGeneralComponent,
    SobreNosotrosEncabezadoComponent
  ],
  imports: [
    CommonModule,
    InformacionRoutingModule,
    SharedModule
  ],
  exports: [
    SobreNosotrosExtraComponent
  ]
})
export class InformacionModule { }
