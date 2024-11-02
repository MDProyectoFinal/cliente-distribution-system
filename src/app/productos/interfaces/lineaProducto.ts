import { Producto } from "./producto";

export class LineaProducto{
    producto: Producto
    cantidad: number = 0
    constructor(producto: Producto){
        this.producto = producto
        this.cantidad = 1;
    }


    getSubtotal() : number{

        if(this.producto.promocionActiva){
            return this.cantidad * this.producto.promocionActiva.precio
        }

        return this.cantidad * this.producto.precio_unitario

    }
}