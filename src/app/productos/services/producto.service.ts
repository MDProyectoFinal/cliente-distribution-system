import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: string;

  constructor(private httpClient : HttpClient) {
    this.url = GLOBAL.url + 'productos/'
  }

// Me parece que no es necesario que pida tokens para recuperar productos y tipos productos. Consultar

  recuperarProductos(){


      return this.httpClient.get(this.url).pipe(
        (map((response : any) =>{
            return response
        })));
  }

  recuperarTiposProductos() {
    return this.httpClient.get(GLOBAL.url + 'tiposProductos').pipe(
        (map((response : any) =>{
            return response
        })));
  }


  recuperarProducto(idProducto: string) {


    return this.httpClient.get(this.url + idProducto).pipe(
        (map((response : any) =>{
            return response
        })));
  }
}
