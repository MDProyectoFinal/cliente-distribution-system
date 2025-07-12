import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { PedidoService } from 'src/app/pedidos/services/pedido.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { Usuario } from 'src/app/usuarios/interfaces/usuario.interface';
import { LineaProducto } from 'src/app/productos/interfaces/lineaProducto';
import { Router } from '@angular/router';
import { catchError, Observer, of, switchMap, throwError } from 'rxjs';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-admin-pago',
  templateUrl: './admin-pago.component.html',
  styleUrl: './admin-pago.component.scss',
})
export class AdminPagoComponent implements OnInit {
  public isLoading: boolean = false;
  public procesandoPago: boolean = false;
  usuarios: Usuario[];
  usuarioSeleccionado: Usuario | null = null;
  productos: LineaProducto[];
  total: number;

  constructor(private carritoService: CarritoPedidoService, private alertifyService: AlertifyService, private pagoService: PagoService, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data: Usuario[]) => (this.usuarios = data),
      error: (err) => this.alertifyService.error('Error recuperando los usuarios'),
    });

    this.productos = this.carritoService.getProductos();
    this.total = this.productos.reduce((sumaParcial, producto) => sumaParcial + producto.getSubtotal(), 0);
  }

  private observadorGuardadoPedido(mensajeExito: string, prefijoError: string): Observer<any> {
    return {
      next: (res: any) => {
        this.alertifyService.success(mensajeExito);
        this.carritoService.limpiar();
         this.isLoading = false;
        this.volverInicio();
      },
      error: (err) => {
         this.isLoading = false;
        this.alertifyService.alert('Pagos', `${prefijoError}: ${err.error}`, this.alertifyService.CLASE_ALERT);
      },
      complete: () => {
      }
    };
  }

  guardarPedido(pagado: boolean) {
    this.isLoading = true;

    this.pagoService
      .guardarPedidoParaUsuario(this.usuarioSeleccionado?._id!)
      .pipe(
        switchMap((pedidoGuardadoResponse: any) => {
          console.log(pedidoGuardadoResponse);

          let pedidoId = pedidoGuardadoResponse?._id;

          if (!pedidoId) {
            return throwError(() => new Error('No se pudo obtener el ID del pedido para el pago.'));
          }

          if (pagado) {
            return this.pagoService.registrarPago(pedidoId);
          } else {
            return of(pedidoGuardadoResponse);
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe(this.observadorGuardadoPedido(pagado ? 'Pedido finalizado y pago exitoso.' : 'Pedido pendiente de pago guardado con éxito.', pagado ? 'Error al guardad el pedido con pago' : 'Error al guardar pedido sin pago'));
  }

  volverInicio() {
    this.router.navigate(['/inicio']);
  }
}
