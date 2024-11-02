import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Pedido {
  constructor(
    public _id: string, // Es el ObjectId de MongoDB
    public idPedido: string, // Id personalizado para que sea un identificador amigable
    public fechaAlta: Date,
    public estado: string,
    public cliente: Usuario, // ID del cliente
    public items: ItemPedido[], // Lista de items
    public subtotal: number // CALCULO: this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
  ) {}

  // SI NO QUEREMOS TENER LA PROPIEDAD "subtotal" ->
  // Para calcular el subtotal si no quieres guardarlo explícitamente
  // get totalPedido(): number {
  //   return this.items.reduce((sum, item) => sum + (item.cantidad * item.precio), 0); // total = item.cantidad * item.precio
  // }

}

export class ItemPedido {
  constructor(
    public idProducto: Producto, // ID del producto (ObjectId de MongoDB)
    public cantidad: number,
    public precio: number,
    public total?: number
  ) {}

  // Reemplazaría la propiedad "total" -> Método para calcular el total por CADA ITEM
  // get totalCalc(): number {
  //   return this.cantidad * this.precio;
  // }



}
