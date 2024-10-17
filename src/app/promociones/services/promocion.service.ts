import { Injectable } from '@angular/core';
import { Promocion } from '../interfaces/promocion';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GLOBAL } from 'src/app/config/global';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {



  private url: string;
  private readonly placeholder : string = "idProducto"

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url + 'productos/'+this.placeholder+'/promociones';
  }


  insertarPromocionProducto(idProducto: string, promocion: Promocion) : Observable<any> {
    const urlConsulta = this.url.replace(this.placeholder, idProducto.toString());
    return this.httpClient.post(urlConsulta, promocion).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  actualizarPromocionProducto(idProducto: string, promocion: Promocion) : Observable<any> {
    const urlConsulta = this.url.replace(this.placeholder, idProducto.toString()) + '/' + promocion._id;



    return this.httpClient.put(urlConsulta, promocion).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  recuperarTodasPorProducto(idProducto: string) : Observable<any> {
    const urlConsulta = this.url.replace(this.placeholder, idProducto.toString());

    return this.httpClient.get(urlConsulta).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }
}
