import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RespuestaUsuarioPersona } from 'src/app/interfaz/respuestaUsuarioPersona';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { GLOBAL } from 'src/app/services/global';
import { PersonaServices } from 'src/app/services/persona.service';
import { UsuarioServices } from 'src/app/services/usuario.service';
import { IPersonaEdicion } from 'src/app/models/IPersonaEdicion';

@Component({
  selector: 'app-usuario-edicion',
  templateUrl: './usuario-edicion.component.html',
  styleUrls: ['./usuario-edicion.component.scss'],
})
export class UsuarioEdicionComponent implements OnInit {
  nombre: string = 'asd';
  apellido: string = '';
  direccion: string = '';
  email: string = '';
  telefono: string = '';
  urlImagen: string = '';

  public titulo: string | undefined;
  public personaEdicion: IPersonaEdicion;

  public filesToUpload: Array<File> = [];

  constructor(private _personaServices: PersonaServices, private authService: AuthService) {
    this.titulo = 'Actualizar mis datos';
  }

  ngOnInit(): void {
    this._personaServices.obtenerPersona(this.authService.decodedToken.persona).subscribe({
      next: (data) => {
        this.personaEdicion = {
          id: data.user[0]._id,
          apellido: data.user[0].apellido,
          direccion: data.user[0].direccion,
          nombre: data.user[0].nombre,
          telefono: data.user[0].telefono,
        };

        console.log(this.personaEdicion);
      },
      error: (e) => {
        alert('Error de identificación');
      },
    });
  }

  async onSubmit() {
    //   console.log(this.usuario_persona_actualizacion);
    //   try {
    //       // A la respuesta la declaramos del tipo interfaz para poder trabajar con el user y persona dentro
    //       var response: RespuestaUsuarioPersona = <any>await this._usuarioServicio.actualizarUsuario(this.usuario_persona_actualizacion);
    //       console.log({ resp: response, message: "Respuesta del metodo actualizarUsuario desde onSubmit"});
    //       if( response != null ){
    //           // Hacer el mapeo del "usuario" (response.user) y la "persona" (response.persona)
    //           const { user, persona } = response;
    //           this.usuario_persona_actualizacion = <any>new UsuarioPersona('', new Persona('','','','','',''),'','','','ROLE_USER', '');
    //           this.usuario_persona_actualizacion.persona = persona;
    //           this.usuario_persona_actualizacion._id = user._id;
    //           this.usuario_persona_actualizacion.correo_electronico = user.correo_electronico;
    //           this.usuario_persona_actualizacion.nombre_usuario = user.nombre_usuario;
    //           this.usuario_persona_actualizacion.password = user.password;
    //           this.usuario_persona_actualizacion.rol = user.rol;
    //           this.usuario_persona_actualizacion.imagen = user.imagen;
    //           // Actualizamos el "identity" del "LocalStorage"
    //           localStorage.setItem('identity', JSON.stringify(this.usuario_persona_actualizacion));
    //           // ***** Actualizamos mediante DOM, la variable del nombre de usuario y la imagen. *****
    //           // Ya que el "nombre_usuario" mostrado por pantalla no se actualiza sino al guardar. Muestra el viejo sino.
    //           const element = document.getElementById("identity_nombre_usuario");
    //           if (element !== null) {
    //               // Si el elemento existe, asignar el valor a innerHTML
    //               element.innerHTML = this.usuario_persona_actualizacion.nombre_usuario;
    //           }
    //           // Subida de arhivos de imagen (si es que existen)
    //           if(!this.filesToUpload){
    //               // Redireccion
    //           }else{
    //               try {
    //                   var respuesta = this.makeFileRequest(this.url + 'actualizar-imagen-usuario/' + this.usuario_persona_actualizacion._id, [], this.filesToUpload)
    //                       .then(
    //                           ( result: any ) => {
    //                               this.usuario_persona_actualizacion.imagen = result.imagen
    //                               // Actualizar imagen de usuario en app, porque no reflejaba al actualizar sino.
    //                               let imagen_path = this.url + 'obtener-archivo-imagen/' + this.usuario_persona_actualizacion.imagen;
    //                               document.getElementById("imagen-logueado")?.setAttribute('src', imagen_path);
    //                           }
    //                       )
    //                       .catch(
    //                           ( result: any ) => {
    //                               console.log("error capturado: " + result);
    //                           }
    //                       );
    //               } catch (error) {
    //                   console.log("Falla al intentar actualizar la imagen:" + error);
    //               }
    //           }
    //           // Actualizamos la variable que llena el modelo en html, para reflejar los cambios
    //           this.identity = JSON.parse(<any>this._usuarioServicio.getIdentity());// Convertir la cadena JSON en un objeto JavaScript
    //           //this.identity = this._usuarioServicio.getIdentity();
    //           // Actualizamos la variable que usamos para el html de actualizacion (asi refleja en los input)
    //           this.usuario_persona_actualizacion = this.identity; // JSON.parse(this.identity);
    //           // Actualizamos el "identity" del "LocalStorage"
    //           localStorage.setItem('identity', JSON.stringify(this.usuario_persona_actualizacion));
    //           // Mostramos msj de éxito en la actualización
    //           this.alertaActualizacion = 'Usuario actualizado correctamente!!';
    //       } else{
    //           this.alertaActualizacion = 'Ocurrió un error en la respuesta al actualizar el usuario';
    //       }
    //   } catch (error) {
    //       this.alertaActualizacion = <any>error;
    //       console.error('Ocurrió un error el OnSubmit:', error);
    //   }
  }

  async fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files; // Recoger archivos seleccionados en el input
  }

  //   // Peticion AJAX para ficheros convencionales. (LLEVARLO A UN SERVICIO). -> Sube el fichero con esto!
  //   async makeFileRequest(url: string, params: Array<string>, files: Array<File>){

  //       try {
  //           // VEEEER porque no funciona subido en render y versel!!
  //           var token = this.token;

  //           return new Promise(function( resolve, reject ){
  //               var formData: any = new FormData(); // Simular comportamiento de un Form convencional
  //               var xhr = new XMLHttpRequest();

  //               // Recorremos los ficheros
  //               for(var i = 0; i < files.length; i++){
  //                   formData.append('imagen', files[i], files[i].name)
  //               }

  //               // Vemos si está lista la petición para realizarse
  //               xhr.onreadystatechange = function(){
  //                   if(xhr.readyState == 4){
  //                       if( xhr.status == 200 ){
  //                           resolve(JSON.parse(xhr.response));
  //                       }else{
  //                           reject(xhr.response);
  //                       }
  //                   }
  //               }

  //               xhr.open('POST', url, true);
  //               xhr.setRequestHeader('Authorization', token); // VER ESE NOMBRE DE "AUTHORIZATION". Creo q es "authorization"
  //               xhr.send(formData);
  //           });
  //       } catch (error) {
  //           console.log("Error en el makeFileRequest" + error);
  //           return "Error";
  //       }
  //   }
}
