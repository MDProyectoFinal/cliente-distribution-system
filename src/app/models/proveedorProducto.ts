import { Producto } from "../productos/interfaces/producto";
import { IProveedor } from "../proveedores/interfaces/proveedor.interface";

export class ProveedorProducto{
    constructor(
        // public _id: string, Ver si hace falta
        public proveedor_id: IProveedor , // Id del "Usuario"
        public producto_id: Producto, // Id del "Producto"
        public precio_unitario: number,
        public activo: boolean,
        public stock: number,
        public fechaActualizacion: Date
    ){}
}
