import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GLOBAL } from 'src/app/config/global';
import { Pedido } from 'src/app/models/pedido';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { PedidoService } from '../../../services/pedido.service';
import { IPedidoBusqueda } from '../../../interfaces/pedido-busqueda.interface';
import { Producto } from 'src/app/models/producto';

import { ModalCancelarConfirmarComponent } from 'src/app/shared/components/modal-cancelar-confirmar/modal-cancelar-confirmar.component';
import { EstadosPedidos } from 'src/app/models/estadosPedidosEnum';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';
import { PagoService } from 'src/app/pagos/services/pago.service';

const formVacio = {
  idPedido: '',
  cliente: '',
  fechaDesde: null,
  fechaHasta: null,
  estado: ''
  // montoPedido: '',
  // tipoCliente: ''
}

@Component({
  selector: 'pedidos-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.scss']
})
export class ListarPedidosComponent implements OnInit {

  // WAP
  numero: string = '5493401414991'; // Reemplaza con el número al que quieras enviar el mensaje
  mensaje: string = '';

  public titulo: string;

  public pedidos: Pedido[] | null;
  public pedidoDetalle: Pedido | null | undefined;
  public productos: Producto[];
  //public estados = ['Pendiente', 'En Despacho', 'En Distribucion']; //TODO: obtenerlo de la BD en el ngOnInit

  @ViewChild('modal') modal: ModalCancelarConfirmarComponent;
  @ViewChild('modal2') modal2: ModalCancelarConfirmarComponent;

  public estados: string[] = Object.values( EstadosPedidos );

  public busquedaPedidoFiltro: IPedidoBusqueda = {};

  public identity: any;
  public token: any;
  public url: string;

  public isLoading: boolean = false;

  public contadores: { [key: string]: number } = {
    [EstadosPedidos.PENDIENTE]: 0,
    [EstadosPedidos.EN_AUTORIZACION]: 0,
    [EstadosPedidos.EN_PREPARACION]: 0,
    [EstadosPedidos.EN_EMPAQUETADO]: 0,
    [EstadosPedidos.EN_DESPACHO]: 0,
    [EstadosPedidos.EN_DISTRIBUCION]: 0,
    [EstadosPedidos.EN_FACTURACION]: 0,
    [EstadosPedidos.COMPLETADO]: 0,
    [EstadosPedidos.CANCELADO]: 0,
  }

  // mensajeExito: string | null = null;
  mensajeError: string | null = null;

  public myForm: FormGroup = this._fb.group({
    idPedido: ['', [Validators.required]],  // El campo "id" es obligatorio
    cliente: ['', [Validators.required ] ],
    fechaDesde: [null, [Validators.required ]],
    fechaHasta: [null, [Validators.required ]],
    estado: ['', [Validators.required ]]
    // montoPedido: ['', [Validators.required ]],
    // tipoCliente: ['', [Validators.required ]],
  })

  constructor(
    private _usuarioServicio: UsuarioService,
    private _pedidoServicio: PedidoService,
    private _fb: FormBuilder,
    public _authServices: AuthenticationService,
    private pagoSerivce : PagoService
  ){

    this.titulo = 'Listado de Pedidos';

    debugger;

    // LocalStorage
    this.identity = this._usuarioServicio.getIdentity(); // ""
    this.token = this._usuarioServicio.getToken(); // ""
    this.url = GLOBAL.url;

    this.pedidos = [];
    this.productos = [];
  }

  ngOnInit(): void {
    console.log('lista-pedidos.component.ts cargado');

    // reseteamos el formulario ni bien entramos en la pantalla
    this.myForm.reset(formVacio);

    // reseteamos el formulario ni bien entramos en la pantalla
    this.myForm.reset(formVacio);

    // Llenamos mensaje personalizado para supuesto pedido de cancelación de pedidos
    this.configurarMensajeWapCancelacion();

    // Llenamos la grilla con todos los pedidos existentes en la BD
    //this.buscar();
    this.aplicarFiltroBusqueda();
  }

  configurarMensajeWapCancelacion() {
    var nombreUsuario: string = this._authServices.decodedToken?.nombre_usuario;
    this.mensaje = encodeURIComponent(`Hola, soy ${nombreUsuario}, estoy interesado en cancelar uno de mis pedidos. Quedo al aguardo. Muchas gracias.`); // Mensaje predeterminado
  }

  buscar() {

    // TODO: Debemos mandar siempre el id del cliente logueado actual
    this._pedidoServicio.obtenerTodosPedidos()
    .subscribe({
      next: (data: any) => {

        this.pedidos = data;

      },
      error: (e) => {
        alert('No se puedieron recuperar los pedidos.');
      },
    });
  }

  getEstadoClase( estado:string ):string {
    var claseEstado: string = 'estado ';

    switch (estado.toUpperCase()) {
      case 'PENDIENTE':
        claseEstado += 'pendiente';
        break;
      case 'EN AUTORIZACION':
        claseEstado += 'autorizacion';
        break;
      case 'EN PREPARACION':
        claseEstado += 'preparacion';
        break;
      case 'EN EMPAQUETADO':
        claseEstado += 'empaquetado';
        break;
      case 'EN DESPACHO':
        claseEstado += 'despacho';
        break;
      case 'EN DISTRIBUCION':
        claseEstado += 'distribucion';
        break;
      case 'EN FACTURACION':
        claseEstado += 'facturacion';
        break;
      case 'COMPLETADO':
        claseEstado += 'completado';
        break;
      case 'CANCELADO':
        claseEstado += 'cancelado';
        break;
      default:
        claseEstado = '';
        break;
    }

    return claseEstado;

  }

  abrirModal( idPedido:string ): void {

    this.modal.isOpen = true;
    this.verDetallePedido( idPedido );
  }

  pagarPedido(idPedido:string){

    this.pagoSerivce.pagarPedido(idPedido).subscribe({
      next: (res: any) => {
       console.log(res);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al crear la conectarse con Mercado Pago:', err);
        this.isLoading = false;
      },
    });

  }

  // Modal de productos del pedido
  onModalClose(){
    this.modal.isOpen = false
  }

  onModalConfirm(){
    // No ha lógica, no se necesita!
  }

  verDetallePedido(idPedido:string): Pedido|undefined {

    // TO DO: debemos mostrar en un MODAL toda la información del pedido
    this.pedidoDetalle = this.pedidos?.find(pedido => pedido.idPedido == idPedido );
    console.log( { pedidoEncontrado: this.pedidoDetalle } );

    return this.pedidoDetalle;
  }


  /// Aplica todos los filtros de la pantalla búsqueda de pedidos
  aplicarFiltroBusqueda(): void {

    // Hace la busqueda de pedidos según los filtros aplicados
    this.busquedaPedidoFiltro = {
      idPedido: this.myForm.value.idPedido || '', // Si existe, usa el valor del form, si no, vacío
      estado: this.myForm.value.estado || '',
      fechaDesde: this.myForm.value.fechaDesde || null,
      fechaHasta: this.myForm.value.fechaHasta || null,
      cliente: this.myForm.value.cliente || ''
    };

    this.busquedaPedidoFiltro.cliente = this._authServices.decodedToken?.sub;

    console.log('Filtros aplicados:', this.busquedaPedidoFiltro);
    this.obtenerPedidosPorFiltro( this.busquedaPedidoFiltro );
  }

  /// Se comunica con el servicio para obtener los pedidos según los filtros aplicados
  obtenerPedidosPorFiltro( filtros: IPedidoBusqueda ){

    // Seteamos variables de inicio
    this.isLoading = true;
    this.mensajeError = null;

    this._pedidoServicio.obtenerPedidosPorFiltro( filtros )
      .subscribe({
        next: (data: any) => {

          if( data.mensaje != null ){
            this.mensajeError = data.mensaje;
            this.pedidos = null;
          }else{
            this.pedidos = data;
            console.log({ infoPedidos: data, pedidos: this.pedidos });
          }

          this.isLoading = false;

        },
        error: (e) =>{
          console.log(e);
          this.mensajeError = 'Error al obtener los pedidos';
          setTimeout(() => this.mensajeError = null, 4000); // Desaparece después de 3 segundos

          alert('Error al obtener los pedidos');
        },
    });
  }

}

