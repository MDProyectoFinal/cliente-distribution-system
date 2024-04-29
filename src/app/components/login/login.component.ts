import { Component } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioPersona } from 'src/app/models/usuarioPersona';
import { PersonaServices } from 'src/app/services/persona.service';
import { UsuarioServices } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public usuario: Usuario;
  public identity = <any>null; // Datos del usuario identificado ahi dentro. Guardado en localStorage
  public token = <any>null;
  public errorMensaje = "";

  constructor(private _usuarioServices: UsuarioServices,private _personaServices: PersonaServices){
    this.usuario = new Usuario('','','','','','ROLE_USER','', new Date, new Date, false);
  }

  public async onSubmit(): Promise<void>{
    //console.log(this.usuario);
    console.log({usuario: this.usuario, message: "Usuario en AppComponent.componente:"});

    try {

      // Conseguimos los datos del USUARIO IDENTIFICADO
      const response = await this._usuarioServices.signUp(this.usuario)
        .then(usuarioEncontrado => {

          console.log(usuarioEncontrado); // Imprimir el objeto de usuario en la consola

          // Realizar otras operaciones con el objeto de usuario aquí
          this.errorMensaje = "";

          let identity = usuarioEncontrado;
          this.identity = identity;

          if(!this.identity._id){
            alert("El usuario no está correctamente logueado");
          }else{

            // Crear elemento en el localstorage para tener al usuario sesión
            localStorage.setItem('identity', JSON.stringify(this.identity) )

            // FORMA 1!!!!!!!
            this._usuarioServices.signUp(this.usuario, true).then(async (data: any) => {

              this.token = data.token.toString();

              if(this.token.length <= 0){
                alert('El token no fue generado correctamente');
              }else{

                // Buscamos la persona asociada al usuario logueado
                const response2 = await this._personaServices.obtenerPersona(this.identity.persona, this.token)

                var personaEncontrada: Persona = response2.user[0];

                // Actualizamos el "identity" con los datos tambien de la persona. Quedando UsuarioPersona.
                let usuarioPersona = <any>new UsuarioPersona('', new Persona('','','','','',''),'','','','USER','');
                usuarioPersona.persona = <Persona>personaEncontrada;
                usuarioPersona._id = this.identity._id;
                usuarioPersona.correo_electronico = this.identity.email;
                usuarioPersona.nombre_usuario = this.identity.nombre_usuario;
                usuarioPersona.password = this.identity.clave;
                usuarioPersona.rol = this.identity.rol;
                usuarioPersona.imagen = this.identity.imagen;

                this.identity = usuarioPersona;

                // ACTUALIZAMOS elemento en el localstorage para tener al usuario sesión
                localStorage.setItem('identity', JSON.stringify(this.identity) )

                // Crear elemento en el localstorage para tener el token del usuario logueado
                localStorage.setItem('token', this.token )
                this.usuario = new Usuario('','','','','','USER','', new Date, new Date, false);

                // Conseguir el TOKEN para enviarselo a cada petición HTTP


              }

              // Realiza otras operaciones con el objeto de usuario aquí
            }).catch((error) => {
              console.error('Error al obtener el usuario:', error);
            });
          }

        })

        .catch(error => {
          this.errorMensaje = <any>error;
          console.error('Error al obtener el usuario:', error);
        });

    } catch (error) {
      this.errorMensaje = <any>error;
      console.error('Ocurrió un error el OnSubmit:', error);
    }

  }
}
