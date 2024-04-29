import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { PersonaServices } from 'src/app/services/persona.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent{
  public alertaRegistro = '';
  public usuario_persona_registro: UsuarioPersona;
  public usuario_persona_guardada: any;

  constructor(private _personaServices: PersonaServices, private router : Router) {
    this.usuario_persona_registro = <any>new UsuarioPersona('', new Persona('', '', '', '', '', ''), '', '', '', 'USER', '');
  }

  public async onSubmitRegistro(): Promise<void> {
    console.log(this.usuario_persona_registro);

    try {
      const response = await this._personaServices.guardarPersona(this.usuario_persona_registro);

      // response.persona._id
      if (!response.persona._id) {
        this.alertaRegistro = 'Error al guardar la persona/usuario.';
        return;
      }

      let usuarioGuar = response.usuario;
      let personaGuar = response.persona;

      // Seteamos la carga completa de la persona en la variable correspondiente
      this.usuario_persona_guardada = <any>new UsuarioPersona(usuarioGuar._id, new Persona(personaGuar._id, personaGuar.nombre, personaGuar.apellido, personaGuar.fecha_nacimiento, personaGuar.direccion, personaGuar.telefono), usuarioGuar.nombre_usuario, usuarioGuar.clave, usuarioGuar.email, usuarioGuar.rol, usuarioGuar.imagen);

      this.alertaRegistro = 'El registro se ha realizado correctamente. Por favor ' + this.usuario_persona_guardada.persona.nombre + ', identifícate en la pantalla de logueo con tu email: ' + this.usuario_persona_guardada.correo_electronico + '.';

      setTimeout(() => this.router.navigateByUrl('/login') , 2000)

    } catch (error) {
      this.alertaRegistro = <any>error;
    }
  }
}
