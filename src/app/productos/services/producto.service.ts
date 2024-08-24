import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';
import { Producto } from 'src/app/models/producto';
import { Pagina } from 'src/app/shared/interfaces/Pagina';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url + 'productos/';
  }

  // Me parece que no es necesario que pida tokens para recuperar productos y tipos productos. Consultar

  recuperarProductos() {
    return this.httpClient
      .get(this.url, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          const respuesta: Pagina<Producto> = this.crearPagina(response);
          console.log(respuesta);

          return respuesta;
        })
      );
  }

  recuperarProductosPorNombre(nombre: string) {
    nombre.trim();

    return this.httpClient
      .get(this.url, {
        observe: 'response',
        params: new HttpParams().set('buscar', nombre),
      })
      .pipe(
        map((response: any) => {
          const respuesta: Pagina<Producto> = this.crearPagina(response);

          return respuesta;
        })
      );
  }

  recuperarProductosEnDireccion(url: string) {
    return this.httpClient
      .get(url, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          const respuesta: Pagina<Producto> = this.crearPagina(response);

          return respuesta;
        })
      );
  }

  recuperarTiposProductos() {
    return this.httpClient.get(GLOBAL.url + 'tiposProductos').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  recuperarProducto(idProducto: string) {
    return this.httpClient.get(this.url + idProducto).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  insertarProducto(producto: any, imagenSubir: any) {
    const formData = new FormData();
    for (var key in producto) {
      formData.append(key, producto[key]);
    }

    if (imagenSubir) {
      formData.append('image', imagenSubir, imagenSubir.name);
    }

    return this.httpClient.post(this.url, formData).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  editarProducto(producto: any, imagenSubir: any) {
    const formData = new FormData();
    for (var key in producto) {
      formData.append(key, producto[key]);
    }

    if (imagenSubir) {
      formData.append('image', imagenSubir, imagenSubir.name);
    }

    return this.httpClient.put(this.url + producto._id, formData).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  eliminarProducto(idProducto: string) {
    return this.httpClient.delete(this.url + idProducto).pipe(
      map((res) => {
        return res;
      })
    );
  }

  private crearPagina(response: any) {
    const infoPaginacion = JSON.parse(response.headers.get('X-Paginacion'));
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
