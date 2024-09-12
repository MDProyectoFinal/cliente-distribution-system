import { identity } from 'rxjs';
import { AuthenticationService } from '../../../usuarios/services/authentication.service';
import { Component } from '@angular/core';
import { faBars, faBell, faCartShopping } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'nav-principal',
  templateUrl: './principal-nav.component.html',
  styleUrls: ['./principal-nav.component.scss']
})
export class PrincipalNavComponent {
  login : boolean = false;
  constructor(private AuthenticationService: AuthenticationService){

    this.login = this.AuthenticationService.estaAutenticado()
    console.log(this.login)
  }

  public cerrarSesion(): void {
    this.AuthenticationService.cerrarSesion();
  }

  menuHamburguesaIcon = faBars;

  cartIcon = faCartShopping;

  bellIcon = faBell;
}
