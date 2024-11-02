import { identity } from 'rxjs';
import { AuthenticationService } from '../../../usuarios/services/authentication.service';
import { Component } from '@angular/core';
import { faBars, faBell, faCartShopping, faGear } from '@fortawesome/free-solid-svg-icons'
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'nav-principal',
  templateUrl: './principal-nav.component.html',
  styleUrls: ['./principal-nav.component.scss']
})
export class PrincipalNavComponent {
  login : boolean = false;
  jwtHelper = new JwtHelperService();
  public decodedToken: any;
  public imagen: string = '';
  public nombreUsuario: string = '';

  constructor(private authService: AuthenticationService){

    this.login = this.authService.estaAutenticado()

    var token = localStorage.getItem('token') as string;
    this.decodedToken = this.jwtHelper.decodeToken(token);

    this.imagen = this.authService.usuarioActual?.imagen ?? this.authService.decodedToken.imagen;
    this.nombreUsuario = this.authService.usuarioActual?.nombre_usuario ?? this.authService.decodedToken.nombre_usuario;

    var identity = localStorage.getItem('identity');

    console.log(this.login)
  }

  public cerrarSesion(): void {
    this.authService.cerrarSesion();
  }

  menuHamburguesaIcon = faBars;
  cartIcon = faCartShopping;
  bellIcon = faBell;
  gearIcon = faGear;
}
