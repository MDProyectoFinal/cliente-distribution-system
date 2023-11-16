export class Facturacion{
    constructor(
        public id_compra: string, // Id del "Compra"
        public fecha_hora_factura: Date,
        public nombre_comprador: string, 
        public telefono_comprador: number,
        public direccion_comprador: Date,
        public total_a_pagar: number 
    ){}
} 
