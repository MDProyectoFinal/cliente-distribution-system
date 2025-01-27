import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { LoguearUsuarioComponent } from './components/loguear-usuario/loguear-usuario.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { InformacionModule } from "../informacion/informacion.module";
import { SharedModule } from "../shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { OlvideMiPasswordComponent } from './components/olvide-mi-password/olvide-mi-password.component';
import { RecuperarClaveComponent } from './components/recuperar-clave/recuperar-clave.component';

@NgModule({
  declarations: [
    ListarUsuariosComponent,
    LoguearUsuarioComponent,
    RegistroUsuarioComponent,
    EditarUsuarioComponent,
    OlvideMiPasswordComponent,
    RecuperarClaveComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InformacionModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    ListarUsuariosComponent,
    RegistroUsuarioComponent,
    LoguearUsuarioComponent,
    EditarUsuarioComponent
  ],
})

export class UsuariosModule {}
