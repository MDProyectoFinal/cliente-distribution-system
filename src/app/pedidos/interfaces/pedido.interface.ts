import { IPedidoItem } from "./item-pedido.interface";

export interface IPedido {
  _id?: string; // Es el ObjectId del pedido (mongoDB)
  idPedido?: string; // Es un Id personalizado para hacer mas amigable la busqueda de pedidos
  fecha_alta_pedido: Date;
  estado: string;
  cliente: string; // Es el ObjectId del usuario (cliente)
  items: IPedidoItem[]; // VER ESTO! Es un conjunto de ItemPedido. Falta declarar esto
  subtotal: number;
}
