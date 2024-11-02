import { Injectable } from "@angular/core";
import { IPedidoBusqueda } from "../interfaces/pedido-busqueda.interface";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "src/app/config/global";
import { IPedido } from "../interfaces/pedido.interface";




// Decorador
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  public url: string;

  constructor( private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  /// Obtiene TODOS los pedidos sin filtro alguno
  obtenerTodosPedidos(): Observable<IPedido[]>{

    return this._http.get<{ pedidos: IPedido[] }>(this.url + 'pedidos')
    .pipe(
      map((response: any) => {

        if( response.length == 0 ) return { mensaje:'No hay pedidos que mostrar'};

        console.log( response.pedidos );
        return response;
      })
    );
  }

  cambiarEstadoPedidoPorIdPedido ( idPedido: string | undefined, estadoNuevo: string | undefined ): Observable<string | null>{

    // Como usamos Js en el servidor tambien, definimos asi el Content-Type
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    const body = { estadoNuevo }; // Formato JSON

    return this._http.put(this.url + 'pedidos/cambiarEstadoPedido/' + idPedido, body, { headers: headers })
      .pipe(
        map( (response: any) => {

          if (response.length == 0 ) return { mensaje: 'No se pudo realizar el cambio de estado'};

          console.log( response );
          return response.pedidoActualizado;

        })
      )
  }

  obtenerPedidosPorFiltro( filtro: IPedidoBusqueda ): Observable<IPedido[]>{

    return this._http.post<{ pedidos: IPedido[] }>(this.url + 'pedidos/filtrar', filtro)
    .pipe(
      map((response: any) => {

        if( response.length == 0 ) return { mensaje:'No hay pedidos que mostrar'};

        console.log( response.pedidos );
        return response;
      })
    );
  }

}
