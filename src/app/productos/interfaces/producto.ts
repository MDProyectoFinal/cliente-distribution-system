import { Promocion } from "src/app/promociones/interfaces/promocion";

export class Producto{
    constructor(
        public _id: string,
        public nombre: string,
        public descripcion: string,
        public imagen: string,
        public precio_unitario: number,
        public stock: number,
        public tipoProducto: string,
        public promocionActiva : Promocion
    ){}
}
