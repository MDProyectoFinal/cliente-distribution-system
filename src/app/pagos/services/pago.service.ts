import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/config/global';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  public url: string;

  constructor( private _http: HttpClient ){
    this.url = GLOBAL.url;
  }

  createPreference(data: any) {
    debugger;
    return this._http.post(`${this.url}/create_preference`, data);
  }

}
