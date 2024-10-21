import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GLOBAL } from 'src/app/config/global';
import { Pedido } from 'src/app/models/pedido';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { PedidoService } from '../../services/pedido.service';
import { IPedidoBusqueda } from '../../interfaces/pedido-busqueda.interface';
import { Producto } from 'src/app/models/producto';

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
  public productos: Producto[];
  public estados = ['Pendiente', 'En Despacho', 'En Distribucion']; //TODO: obtenerlo de la BD en el ngOnInit

  public busquedaPedidoFiltro: IPedidoBusqueda = {};

  public identity: any;
  public token: any;
  public url: string;

  public isLoading: boolean = false;

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
    private _fb: FormBuilder
  ){

    this.titulo = 'Listado de Pedidos';

    // LocalStorage
    this.identity = this._usuarioServicio.getIdentity(); // ""
    this.token = this._usuarioServicio.getToken(); // ""
    this.url = GLOBAL.url;

    this.pedidos = [];
    this.productos = [];
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
      default:
        claseEstado = '';
        break;
    }

    return claseEstado;

  }

  verDetallePedido(idPedido:string): Pedido|undefined {

    debugger;
    // TO DO: debemos mostrar en un MODAL toda la información del pedido
    const pedido = this.pedidos?.find(pedido => pedido.idPedido == idPedido );
    console.log( { pedidoEncontrado: pedido } );

    return pedido;
  }

  cambiarEstado( idPedido:string ): void {
    //TODO: desarrollador funcionalidad para cambiar el estado del pedido

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

    //TODO: Conseguir el listado de pedidos

    this._pedidoServicio.obtenerTodosPedidos()
      .subscribe({
        next: (data: any) => {

          this.pedidos = data;
          console.log({ infoPedidos: data, pedidos: this.pedidos });

        },
        error: (e) => {
          alert('No se puedieron recuperar los pedidos.');
        },
    });

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
