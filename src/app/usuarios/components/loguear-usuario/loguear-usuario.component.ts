import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'usuarios-loguear-usuario',
  templateUrl: './loguear-usuario.component.html'
})
export class LoguearUsuarioComponent {
  email: string = '';
  clave: string = '';
  formEnviado: boolean = false;
  public titulo: string = 'Identificate';

  constructor(private authService: AuthenticationService, private router: Router) {}

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
