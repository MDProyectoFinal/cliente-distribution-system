import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/usuarios/services/authentication.service';

@Component({
  selector: 'inicio-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})
export class PaginaInicioComponent implements OnInit {

  ptitulo :string = "Rosario Snack"

  // Autenticación
  public decodedToken: any;
  private jwtHelper = new JwtHelperService();
  public nombreUsuario: string = "";

  constructor( private _authServices: AuthenticationService ){

    var token = localStorage.getItem('token') as string;
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.nombreUsuario = this._authServices.usuarioActual?.nombre_usuario ?? this._authServices.decodedToken.nombre_usuario;

  }


  ngOnInit(): void {
    console.log('inicio.component.ts cargado');

    // Conseguir el listado de pedidos
  }

  cargarCarruselOfertas(){

  }

  cargarCarruselProductosDestacados(){

  }

  cargarCarruselProductosExclusivos(){

  }

}
