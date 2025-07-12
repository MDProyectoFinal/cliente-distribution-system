import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PagoService {


  registrarPago(pid: string) : Observable<any> {

    return this._http.post<{}>(this.url + `pagos/pedido/${pid}/pagar`,{}, {
      observe: 'response'
    }).pipe(
      map((response: any) => {
        if (response.length == 0) return { mensaje: 'No se pudo realizar el pago' };
        return response;
      })
    );
  }

  pagarPedido(idPedido: string) {

    const data = {
      payer_email : this.authenticationService.decodedToken.email
    }

    return this._http.post<{}>(this.url + `pagos/pedido/${idPedido}`, data).pipe(
      map((response: any) => {
        if (response.length == 0) return { mensaje: 'No se pudo realizar el pago' };

        // TODO 1: En esta etapa podemos poner ya el estado del pedido como "pendiente"
        // TODO 2: VER CUAL USAR!! Para mi misma pestaña total vuelve con el back url
        // Redirigir al usuario al checkout de Mercado Pago
        //window.open(response.data.init_point, '_blank'); // PESTAÑA NUEVA
        window.location.href = response.data.init_point; // MISMA PESTAÑA

        return response;
      })
    );

  }
  public url: string;
  private access_token: string = 'APP_USR-3595488656828811-112515-31c2962634f5c18f330f4bb8ead67d88-2116426284'; // Del VENDEDOR (TEST)

  constructor(private _http: HttpClient, private carritoService: CarritoPedidoService, private authenticationService: AuthenticationService) {
    this.url = GLOBAL.url;
  }

  createPreference(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.access_token}`,
    });

    return this._http.post<{}>(this.url + 'pagos/', data, { headers: headers }).pipe(
      map((response: any) => {
        if (response.length == 0) return { mensaje: 'No se pudo realizar el pago' };

        // TODO 1: En esta etapa podemos poner ya el estado del pedido como "pendiente"

        // TODO 2: VER CUAL USAR!! Para mi misma pestaña total vuelve con el back url
        // Redirigir al usuario al checkout de Mercado Pago
        //window.open(response.data.init_point, '_blank'); // PESTAÑA NUEVA
        window.location.href = response.data.init_point; // MISMA PESTAÑA

        return response;
      })
    );
  }

  guardarPedido(): Observable<any> {
    const idUsuario = this.authenticationService.decodedToken.sub;
    const productosInsertar = this.carritoService.getProductos().map((p) => {
      return { idProducto: p.producto._id, cantidad: p.cantidad };
    });

    const body = {
      idUsuario: idUsuario,
      productos: productosInsertar,
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._http.post(this.url + 'pagos/pedido', body, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  guardarPedidoParaUsuario(idUsuario : string) : Observable<any> {

    const productosInsertar = this.carritoService.getProductos().map((p) => {
      return { idProducto: p.producto._id, cantidad: p.cantidad };
    });

    const body = {
      idUsuario: idUsuario,
      productos: productosInsertar,
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._http.post(this.url + 'pedidos/', body, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
