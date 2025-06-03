import { Component, OnInit } from '@angular/core';
import { IProveedor } from '../../interfaces/proveedor.interface';
import { Producto } from 'src/app/productos/interfaces/producto';
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from 'src/app/productos/services/producto.service';
import { Observable } from 'rxjs';
import { Pagina } from 'src/app/shared/interfaces/Pagina';
import { IGenerarReporte } from '../../interfaces/generar-reporte.interface';
import { IProductoReporte } from '../../interfaces/producto-reporte.interface';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { IProductosProveedor } from '../../interfaces/productos-proveedor.interface';
import { IProductosSeleccionadosProveedor } from 'src/app/productos/interfaces/productosProveedor';


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

  // infoPagina: Pagina<Producto>;
  // productosFiltrados: Producto[];
  public listaProductos: Producto[] = [];
  public listaProductosSeleccionados: Producto[] = [];
  public listaProductosSeleccionadorProveedor: IProductosSeleccionadosProveedor[] = [];

  public listaProdcutosSeleccionadosReporte: IProductoReporte[] = [];

  public datosGeneracionReporte: IGenerarReporte | null = null;

  public listaProveedores: IProveedor[] = [];
  public proveedorSeleccionado: IProveedor | null = null;
  public listaProductosPorProveedor: IProductosProveedor[] = [];
  public mensajeSinProductos: string = '';
  public precioTotalUnitarioSeleccionado: number = 0;

  private readonly nombreHeaderAlert= 'Error';

  constructor(
    private _proveedorServices: ProveedorService,
    private _productoServices: ProductoService,
    private alertifyService:AlertifyService
  ){

  }

  ngOnInit(): void {

    // Obtener los proveedores para el combo
    this.obtenerProveedores().subscribe((data: IProveedor[]) => {
        this.listaProveedores = data;
    })

  }

  obtenerProductosPorIdProveedor(idProveedor: string): Observable<IProductosProveedor[]> {
    return this._proveedorServices.obtenerProductosPorProveedor(idProveedor);
  }

  sumarPrecio(valor: number): void {
    this.precioTotalUnitarioSeleccionado += valor;
  }

  onProveedorSeleccionado(): void {

    // Limpiamos TODO al cambiar de proveedor.
    this.mensajeSinProductos = '';
    this.listaProductosSeleccionadorProveedor = [];
    this.listaProdcutosSeleccionadosReporte = [];
    this.precioTotalUnitarioSeleccionado = 0;

    if (!this.proveedorSeleccionado) {
      this.listaProductos = [];
      return;
    }

    const idProveedor = this.proveedorSeleccionado._id; // O el campo correcto de tu modelo

    this.obtenerProductosPorIdProveedor(<any>idProveedor)
      .subscribe({
        next: (productos: IProductosProveedor[]) => {
          if( productos.length === 0) { this.mensajeSinProductos = 'No hay productos cargados para este proveedor.'}
          this.listaProductosPorProveedor = productos;
        },
        error: (err) => {
          console.error('Error al obtener productos del provedor:', err);
        }
      });

  }

  agregarProducto(producto: IProductosProveedor): void {

    // Crear instancia del objeto que querés guardar en la lista
    const productoSeleccionado: IProductosSeleccionadosProveedor = {
      _id: producto.producto_id._id,
      producto: producto.producto_id,            // O el objeto directamente si ya viene populado
      precio_unitario_proveedor: producto.precio_unitario, // o producto.precio_unitario_proveedor
      cantidad: 1                                // opcional, si manejás cantidad
    };

    this.listaProductosSeleccionadorProveedor.push( productoSeleccionado );
    this.precioTotalUnitarioSeleccionado += productoSeleccionado.precio_unitario_proveedor;
  }

  eliminarProducto( producto: IProductosSeleccionadosProveedor ): void {
    this.listaProductosSeleccionadorProveedor = this.listaProductosSeleccionadorProveedor.filter(
      (prod) => prod._id !== producto.producto._id
    )
    this.precioTotalUnitarioSeleccionado -= producto.precio_unitario_proveedor;
  }

  generarReporte(): void {
    if (!this.proveedorSeleccionado || this.listaProductosSeleccionados.length === 0) {
       this.alertifyService.alert(this.nombreHeaderAlert, 'Por favor seleccione un proveedor y algún producto a pedir');
      return;
    }

    // #INICIO
    // Recorremos y agrupamos si hay 2 productos agregado, para setear la cantidad! Uso de "map"
    const reporteMap = new Map<string, IProductoReporte>();

    this.listaProductosSeleccionadorProveedor.forEach(productoSelecc => {
      if (reporteMap.has(productoSelecc.producto.nombre)) {
        let prod = reporteMap.get(productoSelecc.producto.nombre)!;
        prod.cantidad = (parseInt(prod.cantidad) + 1).toString();
      } else {
        reporteMap.set(productoSelecc.producto.nombre, {
          nombre: productoSelecc.producto.nombre,
          descripcion: productoSelecc.producto.descripcion,
          cantidad: '1'
        });
      }
    });

    this.listaProdcutosSeleccionadosReporte = Array.from(reporteMap.values());
    // #FIN

    this._proveedorServices.generarReporte( this.proveedorSeleccionado, this.listaProdcutosSeleccionadosReporte );
  }

  obtenerProveedores():Observable<IProveedor[]> {
    return this._proveedorServices.recuperarTodos();
  }

  obtenerProductos(): Observable<Pagina<Producto>> {
    return this._productoServices.recuperarProductos();
  }

  mostrarMensajeError() {
     this.alertifyService.alert(this.nombreHeaderAlert, 'Ocurrió un error cargando los productos');
  }
}
