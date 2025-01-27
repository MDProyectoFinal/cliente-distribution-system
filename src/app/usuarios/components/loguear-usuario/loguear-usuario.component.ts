import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Globals } from 'src/app/app.globals';

@Component({
  selector: 'usuarios-loguear-usuario',
  templateUrl: './loguear-usuario.component.html',
  providers: [ Globals ]
})
export class LoguearUsuarioComponent {
  email: string = '';
  clave: string = '';
  formEnviado: boolean = false;
  public titulo: string = 'Identificate';

  mensajeErrorLogin: string|null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private globals: Globals
  ) {}

  logoImage = this.globals.logoImage;
  logoImageAlt = this.globals.logoImageAlt;

  public onSubmit() {
    this.authService.login({ email: this.email, clave: this.clave })
    .subscribe({
      next: (v) => {

        if (this.authService.usuarioActual) console.log("USUARIO LOGUEADO CON EXITO");

      },
      error: (e) => {

        this.mensajeErrorLogin = e.error.message;
        console.log("ERROR AL ACTUALIZAR EL USUARIO");
      },
      complete: () => {
        console.log('Redireccionando');
        setTimeout(() => this.router.navigateByUrl('/'), 2000);
      },
    });

  }
}
