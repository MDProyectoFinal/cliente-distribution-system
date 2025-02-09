import { IProveedor } from "./proveedor.interface";
import { IProductoReporte } from "./producto-reporte.interface";

export class IGenerarReporte{
  proveedor: IProveedor;
  productos: IProductoReporte[];
}
