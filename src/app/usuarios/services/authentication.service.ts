import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  jwtHelper = new JwtHelperService();
  public decodedToken: any;
  private autenticado = false;
  private tokenKey = 'Bearer Token';

  private usuario?: Usuario;

  constructor(private http: HttpClient) {
    this.autenticado = !!localStorage.getItem("token");
  }

  get usuarioActual(): Usuario|undefined {

    if ( !this.usuario ) return undefined;
    return structuredClone( this.usuario );

  }

  login(model: any) {
    model.gethash = true;
    return this.http.post(GLOBAL.url + 'usuarios/loguear-usuario', model)
      .pipe(
        map((response: any) => {

          // Guardamos el usuario actual
          const user = response;
          this.usuario = user.usuarioEncontrado;

          // Guardamos el token
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

  cerrarSesion(): void {
    debugger;

    // Eliminar los ítems del localStorage
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    // limpiamos la variable que determina la sesion
    this.autenticado = false;

    // Limpiamos el usuario logueado/actual
    this.usuario = undefined;
  }

  estaAutenticado(): boolean {
    return this.autenticado;
  }
}
