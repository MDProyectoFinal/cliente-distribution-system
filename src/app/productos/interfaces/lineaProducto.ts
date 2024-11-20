import { Producto } from "./producto";

export class LineaProducto{
    producto: Producto
    cantidad: number = 0
    constructor(producto?: Producto, cantidad?: number){
        if(producto){
            this.producto = producto
            this.cantidad = 1;
        }

        if(cantidad){
            this.cantidad = cantidad
        }



    }

    public static fromJson(json: any){
        return new LineaProducto(json.producto, json.cantidad)
    }



    getSubtotal() : number{

        if(this.producto.promocionActiva){
            return this.cantidad * this.producto.promocionActiva.precio
        }

        return this.cantidad * this.producto.precio_unitario

    }
}