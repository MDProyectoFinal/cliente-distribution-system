import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { CarritoPedidoService } from './../../../productos/services/carrito-pedido.service';
import { identity, Subscription } from 'rxjs';
import { AuthenticationService } from '../../../usuarios/services/authentication.service';
import { Component } from '@angular/core';
import { faBars, faBell, faCartShopping, faGear } from '@fortawesome/free-solid-svg-icons';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Roles } from 'src/app/usuarios/interfaces/roles-enum';

@Component({
  selector: 'nav-principal',
  templateUrl: './principal-nav.component.html',
  styleUrls: ['./principal-nav.component.scss'],
})
export class PrincipalNavComponent {
  login: boolean = false;
  jwtHelper = new JwtHelperService();
  public decodedToken: any;
  public imagen: string = '';
  public nombreUsuario: string = '';
  cantidadCarritoSub: Subscription;
  cantidadEnCarrito: number;


  public roles: String[] = Object.values( Roles );

  constructor(private router: Router, public authService: AuthenticationService, private carritoService: CarritoPedidoService){

    this.login = this.authService.estaAutenticado()

    var token = localStorage.getItem('token') as string;
    this.decodedToken = this.jwtHelper.decodeToken(token);

    this.imagen = this.cargarImagenUsuario();
    this.nombreUsuario = this.authService.usuarioActual?.nombre_usuario ?? this.authService.decodedToken.nombre_usuario;

    this.cantidadCarritoSub = carritoService.cantidadEnCarrito$.subscribe((cantidad) => {
      this.cantidadEnCarrito = cantidad;
    });

    this.cargarCantidadEnCarrito();
  }

  public cargarImagenUsuario(): string{
    let imagen = '';
    imagen = this.authService.usuarioActual?.imagen ?? this.authService.decodedToken.imagen;

    // Si no encontramos una imagen del usuario cargada en BD, forzamos una imagen por defecto, amigable.
    if(imagen === '' || imagen === 'null' || imagen === null){
      imagen = 'https://res.cloudinary.com/frlv73/image/upload/v1737894126/pznyvwuw1cpwcwls5j5z.jpg';
    }

    return imagen;
  }

  private cargarCantidadEnCarrito() {
    let cantidadLocal = localStorage.getItem('cantidad_carrito');
    let cantidad = cantidadLocal ? parseInt(cantidadLocal) : 0;
    this.carritoService.setCantidadEnCarrito(cantidad);
  }


  public verCarrito(){
    this.router.navigateByUrl('/carrito')

  }


  public cerrarSesion(): void {
    this.authService.cerrarSesion();
  }

  ngOnDestroy(): void {
    this.cantidadCarritoSub.unsubscribe();
  }

  menuHamburguesaIcon = faBars;
  cartIcon = faCartShopping;
  bellIcon = faBell;
  gearIcon = faGear;
}
