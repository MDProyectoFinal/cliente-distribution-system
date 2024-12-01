import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GLOBAL } from 'src/app/config/global';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  public url: string;
  private access_token: string = 'APP_USR-3595488656828811-112515-31c2962634f5c18f330f4bb8ead67d88-2116426284' // Del VENDEDOR (TEST)

  constructor( private _http: HttpClient ){
    this.url = GLOBAL.url;
  }

  createPreference(data: any) {
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${ this.access_token }`
    });

    return this._http.post<{}>(this.url + 'pagos/', data, { headers: headers })
    .pipe(
      map((response: any) => {

        if( response.length == 0 ) return { mensaje:'No se pudo realizar el pago'};

        // TODO 1: En esta etapa podemos poner ya el estado del pedido como "pendiente"

        // TODO 2: VER CUAL USAR!! Para mi misma pestaña total vuelve con el back url
        // Redirigir al usuario al checkout de Mercado Pago
        //window.open(response.data.init_point, '_blank'); // PESTAÑA NUEVA
        window.location.href = response.data.init_point; // MISMA PESTAÑA

        return response;
      })
    );
  }

}
