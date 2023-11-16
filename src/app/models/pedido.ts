export class Pedido{
    constructor(
        public _id: string,
        public fecha_alta_pedido: Date,
        public estado: string,
        public cliente: string, // Id del "Cliente"
        public producto: string, // Id del "Producto"
    ){}
} 