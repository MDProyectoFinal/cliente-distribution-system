import { Producto } from "src/app/productos/interfaces/producto";
import { IProveedor } from "./proveedor.interface";

export class IGenerarReporte{
  proveedor: IProveedor;
  productos: Producto[];
}
