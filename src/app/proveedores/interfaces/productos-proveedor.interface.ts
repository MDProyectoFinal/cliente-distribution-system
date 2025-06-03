import { Producto } from "src/app/productos/interfaces/producto";
import { IProveedor } from "./proveedor.interface";

export class IProductosProveedor{
  proveedor_id: IProveedor;
  producto_id: Producto;
  precio_unitario: number;
  activo: boolean;
  stock: number;
  fechaActualizacion: Date;
}
