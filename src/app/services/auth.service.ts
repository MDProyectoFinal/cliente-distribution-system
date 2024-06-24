import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  public decodedToken: any;
  private autenticado = false;
  private tokenKey = 'Bearer Token';

  constructor(private http: HttpClient) {
    this.autenticado = !!localStorage.getItem("token");
  }

  login(model: any) {
    model.gethash = true;
    return this.http.post(GLOBAL.url + 'usuarios/loguear-usuario', model).pipe(
      map((response: any) => {
        const user = response;
        localStorage.setItem('token', user.token);
        this.autenticado = true
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);
      })
    );
  }

  registrarUsuario(usuario: UsuarioPersona) {
    return this.http.post(GLOBAL.url + 'personas/guardar-persona', usuario).pipe(
      map((response: any) => {
        const user = response;
        console.log(response)
      })
    );
  }

  estaAutenticado(): boolean {
    return this.autenticado;
  }
}
