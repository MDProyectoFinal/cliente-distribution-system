import { Component, OnInit } from '@angular/core';
import { UsuarioServices } from './services/usuario.service';
import { Usuario } from './models/usuario';
import { Persona } from './models/persona';
import { UsuarioPersona } from './models/usuarioPersona';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaServices } from './services/persona.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UsuarioServices, PersonaServices]
})

export class AppComponent implements OnInit {
  public title = 'DistributionSystem';
  public usuario: Usuario;
  public usuario_persona_registro: UsuarioPersona;
  public usuario_persona_guardada: any;

  public url: string;

  // public persona: Persona;
  public identity = <any>null; // Datos del usuario identificado ahi dentro. Guardado en localStorage
  public token = <any>null;
  public errorMensaje = "";
  public alertaRegistro = "";

  constructor(
    private _usuarioServices: UsuarioServices,
    private _personaServices: PersonaServices
  ){
    this.usuario = new Usuario('','','','','','ROLE_USER','', new Date, new Date, false);
    // this.persona = new Persona('','','','','','','');

    this.url = GLOBAL.url;

    // Opcion 1
    this.usuario_persona_registro = <any>new UsuarioPersona('', new Persona('','','','','',''),'','','','ROLE_USER','');
    // Opcion 2
    //this.usuario_persona_registro2 = ['','','','','','','','','','',''] // Datos de usuario y persona mezclados
    this.usuario_persona_guardada = <any>null;
  }

  // Ni bien carga el componente
  ngOnInit(){
    //this.identity = this._usuarioServices.getIdentity(); // ""
    this.identity = JSON.parse(<any>this._usuarioServices.getIdentity());  // Convertir la cadena JSON en un objeto JavaScript
    this.token = this._usuarioServices.getToken();
  }

  public async onSubmitRegistro(): Promise<void>{
    console.log(this.usuario_persona_registro);

    try{

      const response = await this._personaServices.guardarPersona(this.usuario_persona_registro)

      // response.persona._id
      if(response.persona._id){

        let usuarioGuar = response.usuario;
        let personaGuar = response.persona;

        // Seteamos la carga completa de la persona en la variable correspondiente
        this.usuario_persona_guardada = <any>new UsuarioPersona(
          usuarioGuar._id,
          new Persona(
            personaGuar._id,
            personaGuar.nombre,
            personaGuar.apellido,
            personaGuar.fecha_nacimiento,
            personaGuar.direccion,
            personaGuar.telefono),
          usuarioGuar.nombre_usuario,
          usuarioGuar.clave,
          usuarioGuar.email,
          usuarioGuar.rol,
          usuarioGuar.imagen
        );

        this.alertaRegistro = 'El registro se ha realizado correctamente. Por favor ' + this.usuario_persona_guardada.persona.nombre + ', identifícate en la pantalla de logueo con tu email: ' + this.usuario_persona_guardada.correo_electronico + '.';

        // Vaciamos las variables de registro
        this.usuario_persona_registro = <any>new UsuarioPersona('', new Persona('','','','','',''),'','','','ROLE_USER','');
        this.usuario_persona_guardada = <any>null;

      }else{
        this.alertaRegistro = 'Error al guardar la persona/usuario.';
      }

    }
    catch (error) {
      this.alertaRegistro = <any>error;
    }
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
                let usuarioPersona = <any>new UsuarioPersona('', new Persona('','','','','',''),'','','','ROLE_USER','');
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
                this.usuario = new Usuario('','','','','','ROLE_USER','', new Date, new Date, false);

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

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();

    this.identity = null;
    this.token = null;

    this.errorMensaje = "";
    this.alertaRegistro = "";
  }

}
