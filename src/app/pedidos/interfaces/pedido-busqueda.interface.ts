
export interface IPedidoBusqueda {
  idPedido?: string; // Id personalizado del pedido, par auna busqueda mas amigable
  cliente?: string; // Es el ObjectId del usuario (cliente)
  estado?: string;
  fechaDesde?: Date;
  fechaHasta?: Date;
}
