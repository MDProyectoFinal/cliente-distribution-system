import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"

import { GLOBAL } from "../services/global";
import { UsuarioServices } from "../services/usuario.service";
import { Pedido } from "../models/pedido";
import { Producto } from "../models/producto";

@Component({
    selector: 'lista-pedidos',
    templateUrl: '../views/lista-pedidos.html',
    providers: [UsuarioServices]
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
        private _usuarioServicio: UsuarioServices
    ){
        this.titulo = 'Listado de Pedidos';

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

