import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { LineaProducto } from '../interfaces/lineaProducto';

@Injectable({
  providedIn: 'root',
})
export class CarritoPedidoService {

  private cantidadEnCarrito = new ReplaySubject<number>(0);
  private productos = new Set<LineaProducto>();
  cantidadEnCarrito$ = this.cantidadEnCarrito.asObservable();

  constructor() {
    let prod = JSON.parse(localStorage.getItem("carrito")|| '{}')
    this.productos =  Object.keys(prod).length === 0 ? new Set<LineaProducto>() : new Set<LineaProducto>(prod)
  }

  setCantidadEnCarrito(cantidad: number) {
    localStorage.setItem('cantidad_carrito', JSON.stringify(cantidad));
    this.cantidadEnCarrito.next(cantidad);
  }

  agregarItem(producto: Producto) {
    const lineaProductoExistente = Array.from(this.productos).find((lp) => lp.producto._id === producto._id);

    if (lineaProductoExistente) {
      lineaProductoExistente.cantidad++;
      this.productos.delete(lineaProductoExistente);
      this.productos.add(lineaProductoExistente);
    } else {
      const nuevaLineaProducto = new LineaProducto(producto);
      this.productos.add(nuevaLineaProducto);
      this.setCantidadEnCarrito(this.productos.size);
    }

    console.log(JSON.stringify(this.productos.entries()));

    localStorage.setItem('carrito', JSON.stringify(this.getProductos()))
  }

  getProductos(): LineaProducto[] {
    return [...this.productos]
  }
}
