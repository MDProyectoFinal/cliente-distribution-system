import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { PedidoService } from 'src/app/pedidos/services/pedido.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario.interface';
import { LineaProducto } from 'src/app/productos/interfaces/lineaProducto';

@Component({
  selector: 'app-admin-pago',
  templateUrl: './admin-pago.component.html',
  styleUrl: './admin-pago.component.scss'
})
export class AdminPagoComponent implements OnInit{

  public isLoading: boolean = false;
  public procesandoPago: boolean = false;
  usuarios : Usuario[]
  usuarioSeleccionado: Usuario | null = null
  productos: LineaProducto[]
  total:number


  constructor(private carritoService : CarritoPedidoService, private alertifyService: AlertifyService, private pedidoService:PedidoService, private usuarioService:UsuarioService){

  }

    ngOnInit(): void {


    this.productos = this.carritoService.getProductos()
    this.total = this.productos.reduce((sumaParcial, producto) => sumaParcial + producto.getSubtotal(), 0)

  }

  guardarPedido(pagado:boolean){

console.log("Guardando ", pagado);


  }

}
