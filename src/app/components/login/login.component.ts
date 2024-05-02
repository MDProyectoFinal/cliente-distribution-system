import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  clave: string = '';
  formEnviado: boolean = false;

  constructor(private authService: AuthService) {
  }

  public onSubmit() {

    this.authService.login({ email: this.email, clave: this.clave }).subscribe({
      next: (v) => {
        console.log('Acá va alerta');
      },
      error: (e) => {
        alert('Error de identificación');
      },
      complete: () => {
        console.log('Acá debe redireccionar a home');
      },
    });
  }
}
