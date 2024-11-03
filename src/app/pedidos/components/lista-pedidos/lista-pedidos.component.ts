import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GLOBAL } from 'src/app/config/global';
import { Pedido } from 'src/app/models/pedido';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { PedidoService } from '../../services/pedido.service';
import { IPedidoBusqueda } from '../../interfaces/pedido-busqueda.interface';
import { Producto } from 'src/app/models/producto';

import { ModalCancelarConfirmarComponent } from 'src/app/shared/components/modal-cancelar-confirmar/modal-cancelar-confirmar.component';
import { EstadosPedidos } from 'src/app/models/estadosPedidosEnum';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';

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
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  public titulo: string;

  public pedidos: Pedido[] | null;
  public pedidoDetalle: Pedido | null | undefined;
  public productos: Producto[];
  //public estados = ['Pendiente', 'En Despacho', 'En Distribucion']; //TODO: obtenerlo de la BD en el ngOnInit

  @ViewChild('modal') modal: ModalCancelarConfirmarComponent;
  @ViewChild('modal2') modal2: ModalCancelarConfirmarComponent;

  public estados: string[] = Object.values( EstadosPedidos );
  public proximoEstado: string | undefined  = '';

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
    // private _route: ActivatedRoute,
    // private _router: Router,
    private _usuarioServicio: UsuarioService,
    private _pedidoServicio: PedidoService,
    private _fb: FormBuilder,
    public _authServices: AuthenticationService
  ){

    this.titulo = 'Listado de Pedidos';

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

    // INSERTAR PEDIDO FORZADO
    // this.pedidos = [{
    //   _id: '1',
    //   cliente: '', // Es el ObjectId del usuario (cliente)
    //   fechaAlta: new Date(),
    //   items: [{
    //     idProducto: '', // Es el ObjectId del producto
    //     cantidad: 10,
    //     precio: 10,
    //     // total y totalCalc son lo mismo, solo q uno es seteado y el otro calculado
    //     total: 100,
    //     totalCalc: 100
    //   }], // Array de items
    //   estado: 'Pendiente',
    //   subtotal: 0,
    //   totalPedido: 100
    // }]

    // reseteamos el formulario ni bien entramos en la pantalla
    this.myForm.reset(formVacio);

    // Llenamos la grilla con todos los pedidos existentes en la BD
    this.buscar();
  }

  buscar() {
    this._pedidoServicio.obtenerTodosPedidos()
    .subscribe({
      next: (data: any) => {

        this.pedidos = data;
        this.contadorPedidos();

      },
      error: (e) => {
        alert('No se puedieron recuperar los pedidos.');
      },
    });
  }

  getEstadoClase( estado:string ):string {
    var claseEstado: string = '';
    switch( estado ){
      case 'Pendiente':
        claseEstado = 'estado-pendiente';
        break;
      case 'En Autorizacion':
        claseEstado ='estado-autorizacion';
        break;
      case 'En Preparacion':
        claseEstado ='estado-preparacion';
        break;
      case 'En Empaquetado':
        claseEstado ='estado-empaquetado';
        break;
      case 'En Despacho':
        claseEstado ='estado-despacho';
        break;
      case 'En Distribucion':
        claseEstado ='estado-distribucion';
        break;
      case 'En Facturacion':
        claseEstado ='estado-facturacion';
        break;
      case 'Completado':
          claseEstado ='estado-completado';
          break;
      case 'Cancelado':
        claseEstado ='estado-cancelado';
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

  // Modal de productos del pedido
  onModalClose(){
    this.modal.isOpen = false
  }

  // Modal para cambiar el estado del pedido
  onModalClose2(){
    this.modal2.isOpen = false
  }

  onModalConfirm(){
    // TODO: ver si implementamos lógica. Aunque parece que no. Algo en el back o lo que sea.
    // No ha lógica, no se necesita!
  }

  onModalConfirm2( idPedido: string | undefined ){

    this._pedidoServicio.cambiarEstadoPedidoPorIdPedido( idPedido, this.proximoEstado )
      .subscribe({
        next: (data: any) => {

          // Cerramos el modal
          this.modal2.isOpen = false;

          // Actualizamos la grilla
          this.buscar();

        },
        error: (e) => {
          alert('Error al cambiar el estado del pedido. Error: ' + e);
        },
    });

  }

  cancelarPedido( idPedido:string ): void {

    // Obtengo el pedido a cancelar
    this.pedidoDetalle = this.pedidos?.find(pedido => pedido.idPedido == idPedido );

    // Seteo el estado "Cancelado" que se envíará la API para cambiar el estado.
    const estadoCancelado = this.estados.find(estado => estado === 'Cancelado');
    this.proximoEstado = estadoCancelado;

    this.modal2.isOpen = true;

  }

  verDetallePedido(idPedido:string): Pedido|undefined {

    // TO DO: debemos mostrar en un MODAL toda la información del pedido
    this.pedidoDetalle = this.pedidos?.find(pedido => pedido.idPedido == idPedido );
    console.log( { pedidoEncontrado: this.pedidoDetalle } );

    return this.pedidoDetalle;
  }

  cambiarEstado( idPedido:string, estadoActual:string ): void {

    // Obtenemos el índica del estado actual en el array de estados
    const indiceEstadoActual = this.estados.indexOf(estadoActual);

    // Verifica si el índice está dentro del rango y devuelve el siguiente estado
    if (indiceEstadoActual !== -1 &&
        indiceEstadoActual < this.estados.length - 1 &&
        this.estados[indiceEstadoActual + 1] != EstadosPedidos.CANCELADO &&
        this.estados[indiceEstadoActual] != EstadosPedidos.CANCELADO &&
        this.estados[indiceEstadoActual] != EstadosPedidos.COMPLETADO
      ) {

      this.proximoEstado = this.estados[indiceEstadoActual + 1] as EstadosPedidos;
      this.pedidoDetalle = this.pedidos?.find(pedido => pedido.idPedido == idPedido );

      this.modal2.isOpen = true;

    }else
    {
      alert('No puede realizar esta acción para este pedido.');
    }

  }


  resetContadores():void {
     // Reinicia todos los contadores a 0
     Object.keys(this.contadores).forEach(estado => {
      this.contadores[estado] = 0; // Asigna 0 a cada contador
    });
  }

  contadorPedidos(): void{

    this.resetContadores();

    // Comparamos el "estado" de cada pedido con el valor del objeto de Estados. Dicho valor fue llenado con el valor del ENUM (ej. 'Pendiente")
    this.pedidos?.forEach(pedido => {
      if (Object.values(EstadosPedidos).includes(pedido.estado as EstadosPedidos)) {
        this.contadores[pedido.estado] += 1; // Incrementa el contador correspondiente
    }
    })

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
