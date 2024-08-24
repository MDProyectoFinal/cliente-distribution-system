import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GLOBAL } from 'src/app/config/global';

import { IPersonaEdicion } from '../interfaces/persona-edicion.interface';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {

  public url: string;
  public identity: any;
  public token: any;

  constructor( private _http: HttpClient) {
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


  actualizarDatosPersonalesUsuario(personaEdicion: IPersonaEdicion) {
    const opciones = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token') as string,
      }),
    };

      return this._http.patch(this.url + 'personas/' + personaEdicion.id, personaEdicion, opciones).pipe(
        (map((response : any) =>{
            return response
        })));
  }

}
