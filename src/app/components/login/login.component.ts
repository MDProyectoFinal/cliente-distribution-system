import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ Globals ],
})

export class LoginComponent {
  email: string = '';
  clave: string = '';
  formEnviado: boolean = false;

  constructor(private authService: AuthService, private router: Router, private globals: Globals) {}

  logoImage = this.globals.logoImage;
  logoImageAlt = this.globals.logoImageAlt;

  public onSubmit() {
    this.authService.login({ email: this.email, clave: this.clave }).subscribe({
      next: (v) => {
        console.log('Acá va alerta');
      },
      error: (e) => {
        alert('Error de identificación');
      },
      complete: () => {
        console.log('Redireccionando');
        setTimeout(() => this.router.navigateByUrl('/'), 2000);
      },
    });
  }
}
