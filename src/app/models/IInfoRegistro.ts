
export interface IInfoRegistro{
    nombre :string;
    apellido:string;
    fechaNacimiento:Date;
    direccion: string;
    telefono:string;

    nombreUsuario:string;
    password:string;
    email:string;
    rol:string;

}

export class RegistroUsuario implements IInfoRegistro{
    nombre: string = '';
    apellido: string = '';
    fechaNacimiento: Date = new Date();
    direccion: string = '';
    telefono: string = '';
    nombreUsuario: string = '';
    password: string = '';
    email: string = '';
    rol: string = 'USER';


}
