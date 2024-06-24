import { Component, OnInit } from '@angular/core';
import { UsuarioServices } from './services/usuario.service';
import { Usuario } from './models/usuario';
import { Persona } from './models/persona';
import { UsuarioPersona } from './models/usuarioPersona';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaServices } from './services/persona.service';
import { GLOBAL } from './services/global';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UsuarioServices, PersonaServices]
})

export class AppComponent implements OnInit{
  jwtHelper: JwtHelperService = new JwtHelperService();


  constructor(private authService: AuthService ){}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

}
