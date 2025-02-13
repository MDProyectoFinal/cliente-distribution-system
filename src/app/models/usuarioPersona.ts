import { Persona } from "./persona";

export class UsuarioPersona{
    constructor(
       public _id: string,
       public persona: Persona,
       public nombre_usuario: string,
       public password: string,
       public correo_electronico: string,
       public rol: string,
       public imagen: string
    ){}

    public UsuarioPersona(){
        this._id = '',
        this.persona = new Persona('','','','','','',0,0),
        this.nombre_usuario = '',
        this.password = '',
        this.correo_electronico = '',
        this.rol = ''
    }

}