import { Producto } from './../interfaces/producto';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LineaProducto } from '../interfaces/lineaProducto';

@Injectable({
  providedIn: 'root',
})
export class CarritoPedidoService {
  private cantidadEnCarrito = new ReplaySubject<number>(0);
  private productos = new Set<LineaProducto>();
  cantidadEnCarrito$ = this.cantidadEnCarrito.asObservable();

  constructor() {
    let prods = JSON.parse(localStorage.getItem('carrito') || '{}');
    let lineaProds = [];

    for (let index = 0; index < prods.length; index++) {
      const element = prods[index];
      lineaProds.push(LineaProducto.fromJson(element));
    }

    this.productos = Object.keys(prods).length === 0 ? new Set<LineaProducto>() : new Set<LineaProducto>(lineaProds);
  }

  setCantidadEnCarrito(cantidad: number) {
    localStorage.setItem('cantidad_carrito', JSON.stringify(cantidad));
    this.cantidadEnCarrito.next(cantidad);
  }

  getCantidadEnCarrito(producto: Producto): number {
    const lineaProducto = Array.from(this.productos).find((lp) => lp.producto._id === producto._id);
    return lineaProducto ? lineaProducto.cantidad : 0;
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
    }

    this.calcularSetearCantidad();

    this.guardarEnStorage();
  }



  quitarItem(producto: Producto) {
    const lineaProductoExistente = Array.from(this.productos).find((lp) => lp.producto._id === producto._id);

    if (lineaProductoExistente) {
      lineaProductoExistente.cantidad--;
      if (lineaProductoExistente.cantidad >= 1) {
        this.productos.delete(lineaProductoExistente);
        this.productos.add(lineaProductoExistente);
      }
    }

    this.calcularSetearCantidad();

    this.guardarEnStorage();
  }

  private guardarEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.getProductos()));
  }

  private calcularSetearCantidad() {
    let cant = 0;

    Array.from(this.productos)
      .map((p) => p.cantidad)
      .forEach((c: number) => (cant += c));


    this.setCantidadEnCarrito(cant);
  }

  getProductos(): LineaProducto[] {
    return [...this.productos];
  }

  limpiar() {
    this.productos.clear();
    localStorage.removeItem('cantidad_carrito');
    localStorage.removeItem('carrito');
    this.calcularSetearCantidad();
  }
}
