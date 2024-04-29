import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"

import { GLOBAL } from "../services/global";
import { UsuarioServices } from "../services/usuario.service";

@Component({
    selector: 'inicio',
    templateUrl: '../views/inicio.html',
    providers: [UsuarioServices]
})

export class InicioComponent implements OnInit{
    public titulo: string;

    public identity: any;
    public token: any;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioServicio: UsuarioServices
    ){
        this.titulo = 'Bienvenido';

        // LocalStorage
        this.identity = this._usuarioServicio.getIdentity(); // ""
        this.token = this._usuarioServicio.getToken(); // ""
        this.url = GLOBAL.url;
    }

    ngOnInit(): void {
        console.log('inicio.component.ts cargado');

        // Conseguir el listado de pedidos


    }
}