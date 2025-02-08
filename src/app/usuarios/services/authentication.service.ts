import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';
import { Usuario } from '../interfaces/usuario.interface';
import { Roles } from '../interfaces/roles-enum';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  jwtHelper = new JwtHelperService();
  public decodedToken: any;
  private autenticado = false;
  private tokenKey = 'Bearer Token';

  private usuario?: Usuario;
  public userRol: String = 'Invitado';

  constructor(private http: HttpClient, private _usuarioServices: UsuarioService, private _router: Router ) {

    // Implementar lógica para obtener el rol del token
    const token = localStorage.getItem('token') as string;
    this.autenticado = !!token;

    if(token){
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.userRol = this.getUserRoleFromToken();
    }

  }

  // Sirve solo si es cuando el usuario recién se logueo, y no hubo refresh (F5) de la página.
  get usuarioActual(): Usuario|undefined {
    if ( !this.usuario ) return undefined;
    return structuredClone( this.usuario );
  }

  /****  ROLES ****/
  public getUserRoleFromToken(): string {
    return String(this.decodedToken?.rol) || 'Invitado'; // Si no encuentra un rol, ponemos INVITADO, siempre.
  }

  // Si el rol actual del user logueado es "ADMIN"
  isAdmin(): boolean {
    return this.userRol === String(Roles.Admin);
  }

  get isCliente(): boolean {
    return this.userRol === Roles.Cliente;
  }

  get isUsuario(): boolean {
    return this.userRol === Roles.Usuario;
  }

  get isInvitado(): boolean {
    return this.userRol === Roles.Invitado;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.decodedToken = this.decodeToken(token);
  }

  decodeToken(token: string) {
    return token ? this.jwtHelper.decodeToken(token) : null;
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

  olvideMiPassword( email: string ){

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      //'authorization': JSON.parse(this._usuarioServices.getToken())
    });

    const body = { email }; // Asegúrate de que sea un objeto

    return this.http.post(GLOBAL.url + 'usuarios/olvide-mi-password', body, { headers: headers })
    .pipe(
      map((response: any) => {
        const user = response;
        console.log(response)
      })
    );

  }

   // Método para actualizar la contraseña
   actualizarClave(token: string, nuevaClave: string): Observable<any> {

    // Recibimos el token generado por mail para poder cambiar la clave y la nueva clave ingresada

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      //'authorization': JSON.parse(this._usuarioServices.getToken())
    });

    const body = {
      token,
      nuevaClave
    }

    return this.http.post(GLOBAL.url + 'usuarios/reset-password', body, { headers: headers })
    .pipe(
      map((response: any) => {
        console.log(response)
      })
    );
  }

  cerrarSesion(): void {

    // Eliminar los ítems del localStorage
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    // limpiamos la variable que determina la sesion
    this.autenticado = false;

    // Limpiamos el usuario logueado/actual
    this.usuario = undefined;

    // Redirección al login
    this._router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return this.autenticado;
  }
}
