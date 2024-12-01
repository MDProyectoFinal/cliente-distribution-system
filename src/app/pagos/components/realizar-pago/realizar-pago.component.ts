import { Component } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { IPreferencesPago } from '../../interfaces/preferences-pago.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';

declare var MercadoPago: any;

@Component({
  selector: 'pagos-realizar-pago',
  templateUrl: './realizar-pago.component.html',
  styleUrls: ['./realizar-pago.component.scss']
})
export class RealizarPagoComponent {

  public isLoading: boolean = false;
  public procesandoPago: boolean = false; // Sólo para mostrar al apretar "Pagar con MP"

  public titulo:string = 'Realizar Pago'
  public preferenceData: IPreferencesPago;

  public totalPedido: number = 0; // TODO: ES TEST! Debemos borrarlo, ya que lo toma de "subtotal" de "Pedidos"

  // Datos usuario
  jwtHelper = new JwtHelperService();
  public decodedToken: any;
  public nombreUsuario: string = "";
  public email: string = "";

  // TODO: crear archivo "env" o poner en config -> global esa key
  mercadoPago = new MercadoPago('APP_USR-d79f1964-73cf-4b79-b1f7-7a0453139132'); // PUBLICC-KEY - Credencial de produccion de ambiente de prueba - VENDEDOR

  constructor( private _pagoServices: PagoService, private _authService: AuthenticationService) {

    // Inicializo todo el Data que llenaremos y enviaremos para el pago
    this.preferenceData = {
      payer_email: '', // Mail del Comprador
      items: [] // Array de productos
    }

    // Obtengo el usuario logueado
    var token = localStorage.getItem('token') as string;
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.nombreUsuario = this._authService.decodedToken.nombre_usuario;
    this.email = this._authService.decodedToken.email;

    this.llenarPreferencesPago()
    this.totalPedido = this.obtenerImporteTotal() // VER SI ES NECESARIO. YA QUE EL "Pedido", ya tendrá un subtotal

  }

  // TODO: Debemos tener el "Pedido Actual" para llenar los "items" con los "Pedidos"
  llenarPreferencesPago() {

    // TODO: debemos llenarlo con el "PEDIDO" actual que se va a pagar. Recorrer los productos y llenando
    this.preferenceData = {
      payer_email: 'test_user_63594283@testuser.com', // Mail del comprador
      items: [
        {
          title: 'Coca Cola 500ml', // IMPORTANTE
          quantity: 1, // IMPORTANTE: cantidad del producto
          unit_price: 2500, // IMPORTANTE: Precio por unidad
          id: "item-ID-1234",
          currency_id: "ARS", // IMPORTANTE: moneda de pago
          picture_url: "http://res.cloudinary.com/frlv73/image/upload/v1728732951/y0w5nrbetondycne5jvp.jpg",
          description: "Botella de vidrio Coca Cola",
          category_id: "art",
        },
        {
          title: 'Fanta 500ml', // IMPORTANTE
          quantity: 2, // IMPORTANTE: cantidad del producto
          unit_price: 2000, // Precio por unidad
          id: "item-ID-5678",
          currency_id: "ARS", // IMPORTANTE: moneda de pago
          picture_url: "http://res.cloudinary.com/frlv73/image/upload/v1728732951/sample_fanta.jpg",
          description: "Botella de vidrio Fanta",
          category_id: "art",
        },
        {
          title: 'Sprite 500ml', // IMPORTANTE
          quantity: 1, // IMPORTANTE: cantidad del producto
          unit_price: 1500, // Precio por unidad
          id: "item-ID-9101",
          currency_id: "ARS", // IMPORTANTE: moneda de pago
          picture_url: "http://res.cloudinary.com/frlv73/image/upload/v1728732951/sample_sprite.jpg",
          description: "Botella de vidrio Sprite",
          category_id: "art",
        },
      ],
    }
  }

  // VER!! NO HACE FALTA PORQUE EL PEDIDO TIENE UN "subtotal"
  obtenerImporteTotal(): number{
    var subTotalPedido: number = 0;

    this.preferenceData.items.forEach(producto => {
      subTotalPedido += producto.quantity * producto.unit_price
    });

    return subTotalPedido;
  }

  pay() {

    this.isLoading = true;

    this._pagoServices.createPreference(this.preferenceData).subscribe({

      next: (res: any) => {
        // Manejas la respuesta aquí. BORRAR!!
        console.log('Respuesta de la API:', res);

        this.procesandoPago = true; // SOLO si decidimos abrir el proceso de pago en pestaña nuevo. Sino BORRAR
        // TODO: Podemos re-direccioanrlo a la pantalla de pago pendiente, que te pareece??
        // -> http://localhost:4200/admin/pago-pending

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al crear la preferencia de PAGO:', err);
        this.isLoading = false;
      },
    });
  }

}
