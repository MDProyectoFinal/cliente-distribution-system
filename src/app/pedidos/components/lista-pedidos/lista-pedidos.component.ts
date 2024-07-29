import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/config/global';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html'
})
export class ListaPedidosComponent implements OnInit{

  public titulo: string;
  public pedido: Pedido[];
  public producto: Producto[];

  public identity: any;
  public token: any;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioServicio: UsuarioService
  ){

    this.titulo = 'Listado de Pedidos';

    debugger;
    // LocalStorage
    this.identity = this._usuarioServicio.getIdentity(); // ""
    this.token = this._usuarioServicio.getToken(); // ""
    this.url = GLOBAL.url;

    this.pedido = [];
    this.producto = [];
  }

  ngOnInit(): void {
    console.log('lista-pedidos.component.ts cargado');

    // Conseguir el listado de pedidos
  }


}
