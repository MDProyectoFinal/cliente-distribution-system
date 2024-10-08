import { Injectable } from '@angular/core';
import { Promocion } from '../interfaces/promocion';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GLOBAL } from 'src/app/config/global';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  url: string;
  readonly placeholder : string = "idProducto"

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url + 'productos/'+this.placeholder+'/promociones';
  }


  actualizarPromocionProducto(idProducto: string, promocion: Promocion) : Observable<any> {
    const urlConsulta = this.url.replace(this.placeholder, idProducto.toString()) + '/' + promocion._id;

    return this.httpClient.put(urlConsulta, promocion).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }
}
