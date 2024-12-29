import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';
import { IProveedor } from '../interfaces/proveedor.interface';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Producto } from "src/app/productos/interfaces/producto";
import { IGenerarReporte } from '../interfaces/generar-reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  url: string;
  public token:any;

  constructor(private _httpClient: HttpClient, private _usuarioServices: UsuarioService ) {
    this.url = GLOBAL.url + 'proveedor/';
  }

  recuperarTodos(): Observable<IProveedor[]>{

    return this._httpClient.get<{ proveedores: IProveedor[] }>(this.url).pipe(
      map(response => response.proveedores)
    );

  }

  buscarPorRazonSocialProveedor( razonSocialString: string ): Observable<IProveedor[] | any>{

    // Como usamos Js en el servidor tambien, definimos asi el Content-Type
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      //'autorizacion': this.getToken(),
      'authorization': JSON.parse(this._usuarioServices.getToken()), //this.token,
      // 'Authorization': 'Bearer clave_secreta_trabajo_final'
    });

    return this._httpClient.get<{ providers: IProveedor[] }>(this.url + 'obtenerProveedores/' + razonSocialString, { headers: headers })
    .pipe(
      map(response => response.providers),
      catchError( () => of([]))
    );
  }

  eliminacionLogica( idProveedor: string){

    // Como usamos Js en el servidor tambien, definimos asi el Content-Type
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'authorization': JSON.parse(this._usuarioServices.getToken())
    });

    return this._httpClient.patch(
      `${ this.url }eliminacionLogica/${ idProveedor }`,
      {},
      { headers: headers }
    )
    .pipe(
      map(response => {
         return response;
      }),
      catchError( (error) => {
        console.error('Error en la solicitud:', error); // Registro del error
        return of([])
      })
    );


  }

  insertarProveedor( proveedor: IProveedor | any ): Observable<any> {

    const body: IProveedor = {
      razon_social: proveedor.razon_social,
      cuit: proveedor.cuit,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      activo: proveedor.activo,
      nota_adicional: proveedor.nota_adicional,
      email: proveedor.email
  };

    // Como usamos Js en el servidor tambien, definimos asi el Content-Type
    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'authorization': JSON.parse(this._usuarioServices.getToken())
    });

    return this._httpClient.post(this.url, body, { headers: headers })
    .pipe(
      map(response => {
         return response;
      }),
      catchError( (error) => {
        console.error('Error en la solicitud:', error); // Registro del error
        return of([])
      })
    );
  }

  generarReporte( provedorSelec: IProveedor, listProdSelec: Producto[] ) {

    const body: IGenerarReporte = {
      proveedor: provedorSelec,
      productos: listProdSelec,
    };

    console.log('Proveedor:', body.proveedor);
    console.log('Productos:', body.productos);

    // Como usamos Js en el servidor tambien, definimos asi el Content-Type
    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        'authorization': JSON.parse(this._usuarioServices.getToken())
    });

    this._httpClient.post(this.url + 'generarReporte', body,
      {
        headers: headers,
        responseType: 'blob'
      }
    ).subscribe({
      next: (res) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (error) => {
        console.error('Error al generar el reporte', error); // Manejo de error para el usuario
      }
    });
  }
}
