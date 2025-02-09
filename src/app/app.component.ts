import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuarios/services/usuario.service';

// import { PersonaServices } from './services/persona.service';
import { PersonaService } from './personas/services/persona.service';

import { JwtHelperService } from '@auth0/angular-jwt';
// import { AuthService } from './services/auth.service';
import { AuthenticationService } from './usuarios/services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UsuarioService, PersonaService],
})

export class AppComponent implements OnInit{
  jwtHelper: JwtHelperService = new JwtHelperService();
  title: string = '';

  constructor(private authenticationService: AuthenticationService ){}

  logoPath: string = "./assets/img/logo-rosario-snack.png";

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.authenticationService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

}
