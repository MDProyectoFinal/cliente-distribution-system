import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoguearUsuarioComponent } from './components/loguear-usuario/loguear-usuario.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { InformacionModule } from "../informacion/informacion.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ListarUsuariosComponent,
    LoguearUsuarioComponent,
    RegistroUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InformacionModule,
    SharedModule
  ],
  exports: [
    ListarUsuariosComponent,
    RegistroUsuarioComponent,
    LoguearUsuarioComponent,
    EditarUsuarioComponent
  ],
})

export class UsuariosModule {}
