import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { GLOBAL } from 'src/app/config/global';

// import { Usuario } from '../models/usuario';
import { Usuario as UsuarioInterface } from '../interfaces/usuario.interface';

import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { Observable } from 'rxjs';

// Decorador
@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    public url: string;
    public identity:any;
    public token:any;

    public usuarios: UsuarioInterface[] = [];

    // constructor( private _httpClient: HttpClient ){
    constructor( private _http: HttpClient ){
        this.url = GLOBAL.url;
    }

    async actualizarUsuario( usuario_a_actualizar:any ){

      let jsonUser = JSON.stringify(usuario_a_actualizar);

      // Como usamos Js en el servidor tambien, definimos asi el Content-Type
      let headers = new HttpHeaders({
          'Content-Type':'application/json',
          //'autorizacion': this.getToken(),
          'authorization': this.token,
          // 'Authorization': 'Bearer clave_secreta_trabajo_final'
      });

      try {
          // Devolvemos la petición AJAX
          var resp = await firstValueFrom(this._http.put( this.url + 'actualizar-usuario/' + usuario_a_actualizar._id, jsonUser, { headers: headers }));

          if(resp){
                console.log(resp);

              // Deberiamos formar un objeto con el UsuarioPersona para luego cambiar la variable
              return resp;

          }else{
              console.log('Ocurrio un error al actualizar el usuario');
              return null;
          }

      } catch (error: any) {
          throw error.error.message;
      }


    }

    obtenerAvatarUsuario( idUsuario: string): Observable<string | null>{
      return this._http.get<{ imagen: string }>(this.url + 'usuarios/obtener-avatar-usuario/' + idUsuario).pipe(
        map(response => response.imagen)
      );
    }

    obtenerUsuarios(): Observable<UsuarioInterface[]>{

      debugger;
      //return this._http.get<UsuarioInterface[]>(this.url + 'usuarios/obtener-usuarios');

      return this._http.get<{ users: UsuarioInterface[] }>(this.url + 'usuarios/obtener-usuarios').pipe(
        map(response => response.users)
      );

      // return this._http.get(this.url + 'personas/obtener-usuarios').pipe(
      //   (map((response: Usuario) =>{
      //     debugger;
      //     this.usuarios = response;
      //     // return response
      //   })));

    }

    obtenerUsuariosPorNombreUsuario( nombre_usuario: string ): Observable<UsuarioInterface[]>{

      debugger;
      // Como usamos Js en el servidor tambien, definimos asi el Content-Type
      let headers = new HttpHeaders({
        'Content-Type':'application/json',
        //'autorizacion': this.getToken(),
        'authorization': this.getToken(), //this.token,
        // 'Authorization': 'Bearer clave_secreta_trabajo_final'
      });

      debugger;
      return this._http.get<{ users: UsuarioInterface[] }>(this.url + 'usuarios/obtener-usuarios/nombre/' + nombre_usuario, { headers: headers })
      .pipe(
        map(response => response.users),
        catchError( () => of([]))
      );
    }

    getIdentity(){
        let identity = localStorage.getItem('identity');
        // const identityString = identity ? JSON.stringify(identity) : '';

        // if(identityString != 'undefined' && identityString != ''){
        //     this.identity = identityString;
        // }else{
        //     this.identity = null;
        // }

        return localStorage.getItem('identity');
        //return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        const tokenString = token ? JSON.stringify(token) : '';

        if(tokenString != 'undefined' && tokenString != ''){
            this.token = tokenString;
        }else{
            this.token = null;
        }

        return this.token;
    }

}
