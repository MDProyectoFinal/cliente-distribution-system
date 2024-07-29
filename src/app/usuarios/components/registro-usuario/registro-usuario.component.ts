import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

// Modelos
import { RegistroUsuario } from 'src/app/models/IInfoRegistro';
import { Persona } from 'src/app/models/persona';
import { UsuarioPersona } from 'src/app/models/usuarioPersona';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html'
})
export class RegistroUsuarioComponent {

  public titulo: string = 'Registrate';
  public registro: RegistroUsuario;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.registro = new RegistroUsuario();
  }

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
  }
}


