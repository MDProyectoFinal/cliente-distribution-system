import { Component, OnInit } from '@angular/core';
import { IProveedor } from '../../interfaces/proveedor.interface';
import { Producto } from 'src/app/productos/interfaces/producto';
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from 'src/app/productos/services/producto.service';
import { Observable } from 'rxjs';
import { Pagina } from 'src/app/shared/interfaces/Pagina';

@Component({
  selector: 'proveedor-generar-pedido-proveedor',
  templateUrl: './generar-pedido-proveedor.component.html',
  styleUrls: ['./generar-pedido-proveedor.component.scss']
})
export class GenerarPedidoProveedorComponent implements OnInit {

  public titulo: string = "Generar Pedido a Proveedor";
  public isLoading: boolean = false;

  public mensajeExito: string | null = null;
  public mensajeError: string | null = null;

  infoPagina: Pagina<Producto>;
  productosFiltrados: Producto[];
  public listaProductos: Producto[] = [];
  public listaProductosSeleccionados: Producto[] = [];

  public listaProveedores: IProveedor[] = [];
  public proveedorSeleccionado: IProveedor | null = null;


  constructor(
    private _proveedorServices: ProveedorService,
    private _productoServices: ProductoService
  ){

  }

  ngOnInit(): void {

    // Obtener los proveedores para el combo
    this.obtenerProveedores().subscribe((data: IProveedor[]) => {
        this.listaProveedores = data;
        console.log({ cantidadProve: this.listaProveedores.length });
    })

    // Obtener los productos para el combo
    // Obtener los productos para el combo
    this.obtenerProductos().subscribe({
      next: (data: Pagina<Producto>) => this.actualizarProductos(data),
      error: (e) => this.mostrarMensajeError()
    });

  }

  agregarProducto(producto: Producto): void {
    this.listaProductosSeleccionados.push( producto );
  }

  eliminarProducto( producto: Producto ): void {
    this.listaProductosSeleccionados = this.listaProductosSeleccionados.filter(
      (prod) => prod._id !== producto._id
    )
  }

  generarReporte(): void {
    if (!this.proveedorSeleccionado || this.listaProductosSeleccionados.length === 0) {
      alert('Por favor seleccione un proveedor y algún producto a pedir');
      return;
    }

    this._proveedorServices.generarReporte( this.proveedorSeleccionado, this.listaProductosSeleccionados );
  }

  obtenerProveedores():Observable<IProveedor[]> {
    return this._proveedorServices.recuperarTodos();
  }

  obtenerProductos(): Observable<Pagina<Producto>> {
    return this._productoServices.recuperarProductos();
  }

  mostrarMensajeError() {
    alert('Ocurrió un error cargando los productos');
  }

  private actualizarProductos(data: Pagina<Producto>) {
    this.infoPagina = data;
    this.listaProductos = data.elementos;
  }

}
