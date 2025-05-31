import { Producto } from "./producto";

export class IProductosSeleccionadosProveedor{
    constructor(
        public _id: string,
        public producto: Producto,            // Datos generales
        public precio_unitario_proveedor: number,         // El precio específico del proveedor
        public cantidad?: number         // Si vas a manejar cantidades
    ){}
}
