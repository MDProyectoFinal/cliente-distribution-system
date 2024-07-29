

export interface Usuario {
  _id?: string; // VER SI VA O NO!!!
  persona: string; // Objeto o ID en realidad de "Persona"
  nombre_usuario: string;
  clave: string;
  email: string;
  rol: string;
  imagen: string;
  fecha_registro?: Date;
  fecha_ultimo_inicio_sesion?: Date;
  gethash: boolean;
}
