import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { RegistroUsuario } from 'src/app/models/IInfoRegistro';
import { Persona } from 'src/app/models/persona';
import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { Globals } from 'src/app/app.globals';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
  providers: [Globals],
})
export class RegistroUsuarioComponent {
  public titulo: string = 'Registrate';
  public registro: RegistroUsuario;

  constructor(private authService: AuthenticationService, private router: Router, private globals: Globals, private alertifyService: AlertifyService, private recaptchaV3Service: ReCaptchaV3Service) {
    this.registro = new RegistroUsuario();
  }

  logoImage = this.globals.logoImage;
  logoImageAlt = this.globals.logoImageAlt;

  mapaNoValido: boolean = false;

  mostrarMapa: boolean = false;
  mapIcon = faMap;

  public async onSubmitRegistro() {
    let persona = new Persona('', this.registro.nombre, this.registro.apellido, this.registro.fechaNacimiento.toString(), this.registro.direccion, this.registro.telefono, this.registro.latitud, this.registro.longitud);
    let usuario = new UsuarioPersona('', persona, this.registro.nombreUsuario, this.registro.password, this.registro.email, this.registro.rol, '');

     this.recaptchaV3Service.execute('registro').subscribe(
      (token: string) => {
    this.authService.registrarUsuario(usuario, token).subscribe({
      next: (v) => {
        this.alertifyService.alert("Registro", 'Usuario creado con éxito. Será redireccionado al login.', this.alertifyService.CLASE_SUCCESS, () => setTimeout(() => this.router.navigateByUrl('/login'), 2000));
        console.log(v);
      },
      error: (e) => {
        this.alertifyService.alert("Error", e.error?.mensaje);
      },
    });
    },
      (error) => {
        this.alertifyService.alert("Error", 'No se pudo verificar reCAPTCHA. Inténtelo de nuevo.');
      }
    );
  }

  volverInicio() {
    this.router.navigate(['/inicio']);
  }

  toggleMapa() {
    this.mostrarMapa = !this.mostrarMapa;
  }

  onLongitudChange(longitud: number) {
    this.registro.longitud = longitud;
  }
  onLatitudChange(latitud: number) {
    this.registro.latitud = latitud;
  }
}
