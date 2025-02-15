import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';
import { Producto } from '../interfaces/producto'
import { Pagina } from 'src/app/shared/interfaces/Pagina';
import { TipoProducto } from 'src/app/models/tipoProducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url + 'productos/';
  }

  recuperarProductos(): Observable<Pagina<Producto>> {
    return this.httpClient
      .get(this.url, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const respuesta: Pagina<Producto> = this.crearPagina(response);
          return respuesta;
        })
      );
  }

  recuperarProductosPorNombre(nombre: string): Observable<Pagina<Producto>> {
    nombre.trim();
    return this.httpClient
      .get(this.url, {
        observe: 'response',
        params: new HttpParams().set('buscar', nombre),
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const respuesta: Pagina<Producto> = this.crearPagina(response);
          return respuesta;
        })
      );
  }

  recuperarProductosEnDireccion(url: string): Observable<Pagina<Producto>> {
    return this.httpClient
      .get(url, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const respuesta: Pagina<Producto> = this.crearPagina(response);
          return respuesta;
        })
      );
  }

  recuperarTiposProductos(): Observable<TipoProducto[]> {
    return this.httpClient.get(GLOBAL.url + 'tiposProductos').pipe(
      map((response: TipoProducto[] | any) => {
        return response;
      })
    );
  }

  recuperarTodos(): Observable<Producto[]> {
    return this.httpClient.get(this.url).pipe(
      map( (response: Producto[] | any) => {
        return response;
      })
    )
  }

  recuperarProducto(idProducto: string): Observable<any> {
    console.log(idProducto);

    return this.httpClient.get(this.url + idProducto).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  insertarProducto(producto: any, imagenSubir: any): Observable<any> {
    const formData = new FormData();
    for (var key in producto) {
      formData.append(key, producto[key]);
    }

    if (imagenSubir) {
      formData.append('image', imagenSubir, imagenSubir.name);
    }
    return this.httpClient.post(this.url, formData).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  editarProducto(idProducto: string, productoForm: any, imagenSubir: any): Observable<any> {
    const formData = new FormData();
    for (var key in productoForm) {
      formData.append(key, productoForm[key]);
    }

    if (imagenSubir) {
      formData.append('image', imagenSubir, imagenSubir.name);
    }

    return this.httpClient.put(this.url + idProducto, formData).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  eliminarProducto(idProducto: string): Observable<any> {
    return this.httpClient.delete(this.url + idProducto).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  private crearPagina(response: HttpResponse<any>): Pagina<Producto> {
    const infoPaginacion = JSON.parse(response.headers.get('X-Paginacion') ?? '');
    const respuesta: Pagina<Producto> = {
      elementos: response.body,
      totalElementos: infoPaginacion.total,
      totalPaginas: infoPaginacion.totalPaginas,
      paginaActual: infoPaginacion.paginaActual,
      tamañoPagina: infoPaginacion.tamañoPagina,
      linkAnterior: infoPaginacion.linkAnterior,
      linkSiguiente: infoPaginacion.linkSiguiente,
    };
    return respuesta;
  }
}
