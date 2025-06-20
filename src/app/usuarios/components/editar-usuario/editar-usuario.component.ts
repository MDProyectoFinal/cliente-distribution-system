import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPersonaEdicion } from 'src/app/models/IPersonaEdicion';
import { PersonaService } from 'src/app/personas/services/persona.service';
import { UsuarioService } from '../../services/usuario.service';
import { faMap } from '@fortawesome/free-solid-svg-icons';

import { ChangeDetectorRef } from '@angular/core';

const formVacio = {
  id: '',
  nombre: '',
  apellido: '',
  direccion: '',
  telefono: '',
  urlImagen: '',
};

@Component({
  selector: 'usuarios-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent {
  nombre: string = 'asd';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';

  mapaNoValido: boolean = false;

  mostrarMapa: boolean = false;
  mapIcon = faMap;
  public isLoading: boolean = false;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  urlImagen: string | ArrayBuffer | null;
  imagenSubir: any;

  public titulo: string | undefined;
  public personaEdicion: IPersonaEdicion;

  public filesToUpload: Array<File> = [];
  private nombreHeaderAlert : string = "Error"

  public myForm: FormGroup = this._fb.group({
    id: ['', [Validators.required]], // El campo "id" es obligatorio
    nombre: ['', [Validators.required, Validators.minLength(3)]], // El campo "nombre" es obligatorio
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    telefono: ['', [Validators.required, Validators.minLength(8)]],
    urlImagen: [''],
    latitud: ['', [Validators.required]],
    longitud: ['', [Validators.required]],
  });

  constructor(private _personaService: PersonaService, private authenticationService: AuthenticationService, private _usuarioService: UsuarioService,
     private _fb: FormBuilder, private cdRef: ChangeDetectorRef, private alertifyService:AlertifyService) {
    this.titulo = 'Actualizar mis datos';
  }

  // Para evitar duplicar este código en el html
  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  // Función que devuelve el error específico dado. Genérico para todos los campo.
  getFieldError(field: string): string | null {
    // Vemos si tiene el campo
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    // recorre y obtiene todas las llaves de los errores
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }

    return null;
  }

  ngOnInit(): void {
    // reseteamos el formulario ni bien entramos en la pantalla
    this.myForm.reset(formVacio);

    this._personaService.obtenerPersona(this.authenticationService.decodedToken.persona).subscribe({
      next: (data) => {
        // Obtenemos la Persona
        this.personaEdicion = {
          id: data.user[0]._id,
          apellido: data.user[0].apellido,
          direccion: data.user[0].direccion,
          nombre: data.user[0].nombre,
          telefono: data.user[0].telefono,
          latitud: data.user[0].latitud,
          longitud: data.user[0].longitud,
        };

        var idUsuario = this.authenticationService.usuarioActual?._id ?? this.authenticationService.decodedToken.sub;

        // Obtenemos la imagen del usuario
        this._usuarioService.obtenerAvatarUsuario(idUsuario).subscribe({
          next: (imagen: any) => {
            this.urlImagen = imagen;

            // NUEVO LLENADO DE VARIABLES - Actualiza el formulario con los valores iniciales
            this.myForm.patchValue({
              id: this.personaEdicion.id, // Ver si es necesario
              nombre: this.personaEdicion.nombre,
              apellido: this.personaEdicion.apellido,
              direccion: this.personaEdicion.direccion,
              telefono: this.personaEdicion.telefono,
              //urlImagen: this.urlImagen, //data.user[0].urlImagen,
              latitud: this.personaEdicion.latitud,
              longitud: this.personaEdicion.longitud
            });

          },
        });
      },
      error: (e) => {
         this.alertifyService.alert(this.nombreHeaderAlert, 'No pudieron recuperarse datos personales');
      },
    });
  }


  toggleMapa(){
    this.mostrarMapa = !this.mostrarMapa
  }

  async onSubmit() {
    // Validamos el formulario previo a la actualización y para poder actualizar.
    if (this.myForm.invalid) {
      // Si el formulario es inválido, marcar todos los campos como tocados
      this.myForm.markAllAsTouched();

      // Parque por problema con mapa
      const controlMapa = this.myForm.get('latitud');
      if( !!controlMapa && controlMapa.touched && controlMapa.invalid){
         this.alertifyService.alert(this.nombreHeaderAlert, 'Debe ingresar su dirección en el mapa por favor.');
      }

      return; // Evita que se procese el submit si el formulario es inválido
    }

    this.isLoading = true;

    // Al ser formulario reactivo, debemos enviar el myForm. Ya no tenemos el two-way data binding de formularios por template
    this._personaService.actualizarDatosPersonalesUsuario(this.myForm.value, this.imagenSubir).subscribe({
      next: (data) => {
        this.isLoading = false;

        // Actualizamos el token para que se reflejen los datos cambiados el usuario
        const infoActualizacion = data;

        // Guardamos el token
        this.authenticationService.setToken(infoActualizacion.token);

        // Forzar detección de cambios de los datos del usuario actualizado
        this.cdRef.detectChanges();

        // Mostrar mensaje de éxito
        this.mensajeExito = 'Datos actualizados correctamente';
         this.alertifyService.success('Datos actualizados correctamente.');

        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazar arriba con animación

        this.mensajeError = null;
        setTimeout(() => (this.mensajeExito = null), 6000); // Desaparece después de 3 segundos

      },
      error: (e) => {
        console.log(e);
        this.mensajeError = 'Error al actualizar los datos personales';
        this.mensajeExito = null;
        setTimeout(() => (this.mensajeError = null), 5000); // Desaparece después de 3 segundos

         this.alertifyService.alert(this.nombreHeaderAlert, 'Error al actualizar datos');
      },
    });
  }

  onDireccionChange(direccion: string) {
    this.myForm.patchValue({
      direccion: direccion,
    });
  }
  onLongitudChange(longitud: number) {
    this.myForm.patchValue({
      longitud: longitud,
    });
  }
  onLatitudChange(latitud: number) {
    this.myForm.patchValue({
      latitud: latitud,
    });
  }

  async fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files; // Recoger archivos seleccionados en el input
  }

  onImageChanged(eventoCambio: any) {
    const archivos = eventoCambio.target.files;
    if (archivos.length === 0) {
      return;
    }

    const tipoImagen = archivos[0].type;
    if (tipoImagen.match(/image\/*/) == null) {
       this.alertifyService.alert(this.nombreHeaderAlert, 'Solamente se aceptan imágenes');
    }

    this.imagenSubir = archivos[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onload = (_event) => {
      this.urlImagen = reader.result;
    };
  }
}
