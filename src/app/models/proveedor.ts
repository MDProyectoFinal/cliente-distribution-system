export class Proveedor{
    constructor(
        public _id: string,
        public razon_social: string, // Id del "Usuario"
        public cuit: string, // Id del "Producto"
        public telefono: string,
        public direccion: string,
        public email: string,
        public activo: boolean,
        public nota_adicional: string
    ){}
}
