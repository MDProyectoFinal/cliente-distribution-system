export class Producto{
    constructor(
        public _id: string,
        public descripcion: string,
        public imagen: string,
        public precio_unitario: number,
        public stock: number,
        public categoria: string,
    ){}
} 