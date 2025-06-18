import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Globals } from 'src/app/app.globals';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'usuarios-loguear-usuario',
  templateUrl: './loguear-usuario.component.html',
  styleUrls: ['./loguear-usuario.component.scss'],
  providers: [Globals],
})
export class LoguearUsuarioComponent {
  email: string = '';
  clave: string = '';
  formEnviado: boolean = false;
  public titulo: string = 'Identificate';

  mensajeErrorLogin: string | null = null;

  constructor(private authService: AuthenticationService, private router: Router, private globals: Globals, private recaptchaV3Service: ReCaptchaV3Service) {}

  logoImage = this.globals.logoImage;
  logoImageAlt = this.globals.logoImageAlt;

  public onSubmit() {
    this.recaptchaV3Service.execute('login').subscribe(
      (token: string) => {

        this.authService.login({ email: this.email, clave: this.clave, captchaToken: token }).subscribe({
          next: (v) => {
            if (this.authService.usuarioActual) console.log('USUARIO LOGUEADO CON EXITO');
          },
          error: (e) => {
            this.mensajeErrorLogin = e.error.message;
          },
          complete: () => {
            this.mensajeErrorLogin = '';
            console.log('Redireccionando');
            setTimeout(() => this.router.navigateByUrl('/'), 2000);
          },
        });
      },
      (error) => {
        this.mensajeErrorLogin = 'No se pudo verificar reCAPTCHA. Inténtelo de nuevo.';
      }
    );
  }
}
