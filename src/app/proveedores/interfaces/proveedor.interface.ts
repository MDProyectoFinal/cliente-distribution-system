
export class IProveedor{
  _id?: string; // Este campo es opcional
  razon_social: string;
  cuit: string;
  direccion: string;
  telefono: string;
  activo: boolean;
  nota_adicional?: string; // También podría ser opcional si no siempre se llena
  email: string;
}
