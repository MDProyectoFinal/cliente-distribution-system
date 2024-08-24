import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';


@Component({
  selector: 'nav-principal',
  templateUrl: './principal-nav.component.html'
})
export class PrincipalNavComponent {
  login : boolean = false;
  constructor(private authService: AuthenticationService){

    this.login = this.authService.estaAutenticado()
    console.log(this.login)
  }

  public cerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}
