import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, identity } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { GLOBAL } from './global';
import { Persona } from '../models/persona';
import { HttpHeaders } from '@angular/common/http';
import { UsuarioPersona } from '../models/usuarioPersona';

// Decorador
@Injectable({
  providedIn: 'root',
})
export class PersonaServices {
  public url: string;
  public identity: any;
  public token: any;

  // constructor( private _httpClient: HttpClient ){
  constructor(private _http: HttpClient) {
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
}
