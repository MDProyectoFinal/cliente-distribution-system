import { NgModule } from '@angular/core';
import { RegistrarPersonaComponent } from './components/registrar-persona/registrar-persona.component';
import { ListarPersonasComponent } from './components/listar-personas/listar-personas.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    RegistrarPersonaComponent,
    ListarPersonasComponent
  ],
  declarations: [
    RegistrarPersonaComponent,
    ListarPersonasComponent
  ],
  providers: [],
})
export class PersonaModule { }
