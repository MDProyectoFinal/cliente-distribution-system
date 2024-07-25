import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { RegistroUsuario } from 'src/app/models/IInfoRegistro';
import { AuthService } from 'src/app/services/auth.service';
import { Globals } from 'src/app/app.globals';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [ Globals ],
})
export class RegistroComponent {
  public registro: RegistroUsuario;

  constructor(private authService: AuthService, private router: Router, private globals:Globals) {
    this.registro = new RegistroUsuario();
  }

  logoImage = this.globals.logoImage;
  logoImageAlt = this.globals.logoImageAlt;

  public async onSubmitRegistro() {
    let persona = new Persona('', this.registro.nombre, this.registro.apellido, this.registro.fechaNacimiento.toString(), this.registro.direccion, this.registro.telefono);
    let usuario = new UsuarioPersona('', persona, this.registro.nombreUsuario, this.registro.password, this.registro.email, this.registro.rol, '');

    this.authService.registrarUsuario(usuario).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        alert('Error de identificación');
      },
      complete: () => {
        setTimeout(() => this.router.navigateByUrl('/login'), 2000);
      },
    });

    // try {
    //   const response = await this._personaServices.guardarPersona(this.usuario_persona_registro);

    //   // response.persona._id
    //   if (!response.persona._id) {
    //     this.alertaRegistro = 'Error al guardar la persona/usuario.';
    //     return;
    //   }

    //   let usuarioGuar = response.usuario;
    //   let personaGuar = response.persona;

    //   // Seteamos la carga completa de la persona en la variable correspondiente
    //   this.usuario_persona_guardada = <any>new UsuarioPersona(usuarioGuar._id, new Persona(personaGuar._id, personaGuar.nombre, personaGuar.apellido, personaGuar.fecha_nacimiento, personaGuar.direccion, personaGuar.telefono), usuarioGuar.nombre_usuario, usuarioGuar.clave, usuarioGuar.email, usuarioGuar.rol, usuarioGuar.imagen);

    //   this.alertaRegistro = 'El registro se ha realizado correctamente. Por favor ' + this.usuario_persona_guardada.persona.nombre + ', identifícate en la pantalla de logueo con tu email: ' + this.usuario_persona_guardada.correo_electronico + '.';

    //   setTimeout(() => this.router.navigateByUrl('/login') , 2000)

    // } catch (error) {
    //   this.alertaRegistro = <any>error;
    // }
  }
}
