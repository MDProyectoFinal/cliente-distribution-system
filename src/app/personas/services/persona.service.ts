import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, Observable } from 'rxjs';

import { GLOBAL } from 'src/app/config/global';

import { IPersonaEdicion } from '../interfaces/persona-edicion.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {

  public url: string;
  public identity: any;
  public token: any;

  // Para luego decodificar el token y obtener datos claves
  jwtHelper = new JwtHelperService();
  public decodedToken: any;

  constructor( private _http: HttpClient, private _authenticationService: AuthenticationService) {
    this.url = GLOBAL.url;
  }

  obtenerPersona(idPersona: string){
    const opciones = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token') as string,
      }),
    };

    return this._http.get(this.url + 'personas/obtener-persona/' + idPersona, opciones).pipe(
      (map((response : any) =>{
          return response
      })));

  }


  actualizarDatosPersonalesUsuario(personaEdicion: any, imagenSubir:any): Observable<any> {

    let headers = new HttpHeaders({
      //'Content-Type':'application/json',
      //'autorizacion': this.getToken(),
      'authorization': localStorage.getItem('token') as string, //this.getToken(), //this.token,
      // 'Authorization': 'Bearer clave_secreta_trabajo_final'
    });

    var idUsuario = this._authenticationService.usuarioActual?._id ?? this.jwtHelper.decodeToken(localStorage.getItem('token') as string)?.sub;

    // Crear un objeto FormData para enviar tanto la imagen como los datos
    const formData = new FormData();
    if(imagenSubir != undefined ){
      formData.append('image', imagenSubir, imagenSubir.name); // Añadir la imagen al FormData
    }
    formData.append('idUsuario', idUsuario);
    formData.append('id', personaEdicion.id);
    formData.append('nombre', personaEdicion.nombre);
    formData.append('apellido', personaEdicion.apellido);
    formData.append('direccion', personaEdicion.direccion);
    formData.append('telefono', personaEdicion.telefono);

    // OPCION 2 - VER!
    // for (var key in personaEdicion) {
    //   formData.append(key, personaEdicion[key]);
    // }

    return this._http.post<any>(this.url + 'personas/actualizar-persona/' + personaEdicion.id, formData, { headers: headers })
    .pipe(
      (
        map( (response : any) =>{
          return response;
        }),
        catchError( (error: any ) => {
          // Mostrar el error en formato JSON en la consola
          console.log(JSON.stringify({ ErrorCapturado: error }, null, 2));

          // Opcional: Puedes retornar un observable vacío o con un valor por defecto
          return of(null); // o puedes retornar 'of({})' o algún valor por defecto

        })
    ));
  }

}
