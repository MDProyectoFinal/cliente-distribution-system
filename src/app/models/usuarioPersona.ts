import { Persona } from "./persona";

export class UsuarioPersona{
    constructor(
       public _id: string, 
       public persona: Persona, // Objeto o ID en realidad de "Persona"
       public nombre_usuario: string,
       public password: string,
       public correo_electronico: string,
       public rol: string,
       public imagen: string    // agregué nuevo, ver que no rompa 
    ){}

    public UsuarioPersona(){
        this._id = '',
        this.persona = new Persona('','','','','',''),
        this.nombre_usuario = '',
        this.password = '',
        this.correo_electronico = '',
        this.rol = ''
    }

    // public UsuarioPersona(id:string, persona: Persona, nombre_usuario: string, password: string, correo_electronico: string, rol:string){
    //     this._id = id,
    //     this.persona = persona,
    //     this.nombre_usuario = nombre_usuario,
    //     this.password = password,
    //     this.correo_electronico = correo_electronico,
    //     this.rol = rol
    // }
}