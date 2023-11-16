export class Compra{
    constructor(
        public _id: string,
        public id_usuario: string, // Id del "Usuario"
        public id_producto: string, // Id del "Producto"
        public precio_total: number,
        public fecha_hora_compra: Date,
        public id_medio_pago: string // Id del "mediosDePago"
    ){}
} 
