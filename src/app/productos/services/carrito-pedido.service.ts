import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoPedidoService {

  private cantidadEnCarrito = new ReplaySubject<number>(0)
  cantidadEnCarrito$ = this.cantidadEnCarrito.asObservable();

  constructor() { }


  setCantidadEnCarrito(cantidad: number){
    localStorage.setItem("cantidad_carrito", JSON.stringify(cantidad))
    this.cantidadEnCarrito.next(cantidad);
  }

  agregarItem(){
    let n = parseInt(localStorage.getItem("cantidad_carrito")!) +1
    this.setCantidadEnCarrito(n)
  }
}
