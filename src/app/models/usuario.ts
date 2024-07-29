import { Persona } from "./persona";

export class Usuario{
    constructor(
       public _id: string, // VER SI VA O NO!!!
       public persona: string, // Objeto o ID en realidad de "Persona"
       public nombre_usuario: string,
       public clave: string,
       public email: string,
       public rol: string,
       public imagen: string,
       public fecha_registro: Date,
       public fecha_ultimo_inicio_sesion: Date,
       public gethash: boolean

    ){}
}

