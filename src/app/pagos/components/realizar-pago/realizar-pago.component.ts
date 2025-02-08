import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../services/pago.service';
import { IPreferencesPago } from '../../interfaces/preferences-pago.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';

// declare var MercadoPago: any;

@Component({
  selector: 'pagos-realizar-pago',
  templateUrl: './realizar-pago.component.html',
  styleUrls: ['./realizar-pago.component.scss']
})
export class RealizarPagoComponent implements OnInit{

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
  // mercadoPago = new MercadoPago('APP_USR-d79f1964-73cf-4b79-b1f7-7a0453139132'); // PUBLICC-KEY - Credencial de produccion de ambiente de prueba - VENDEDOR

  constructor( private _pagoServices: PagoService, private _authService: AuthenticationService, private carritoService:CarritoPedidoService) {

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
  }
  ngOnInit(): void {
    this.llenarPreferencesPago()
  }

  // TODO: Debemos tener el "Pedido Actual" para llenar los "items" con los "Pedidos"
  llenarPreferencesPago() {



    // TODO: debemos llenarlo con el "PEDIDO" actual que se va a pagar. Recorrer los productos y llenando
    this.preferenceData = {
      payer_email: this.email, // Mail del comprador
      items:[]
    }


    this.carritoService.getProductos().forEach(element => {
      this.preferenceData.items.push({
        title : element.producto.nombre,
        unit_price:element.producto.precio_unitario,
        currency_id:'ARS',
        picture_url:element.producto.imagen,
        quantity:element.cantidad,
        id:element.producto._id,
        category_id:element.producto.tipoProducto,
        description:element.producto.descripcion
      })
    });
  }

  // VER!! NO HACE FALTA PORQUE EL PEDIDO TIENE UN "subtotal"
  obtenerImporteTotal(): number{
    var subTotalPedido: number = 0;

    this.preferenceData.items.forEach(producto => {
      console.log(producto.quantity);
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
