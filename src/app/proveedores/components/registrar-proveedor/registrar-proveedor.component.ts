import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { IProveedor } from '../../interfaces/proveedor.interface';

const formVacio: IProveedor = {
  razon_social: '',
  cuit: '',
  direccion: '',
  telefono: '',
  email: '',
  nota_adicional: '',
  activo: false
}

@Component({
  selector: 'proveedores-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
  styleUrls: ['./registrar-proveedor.component.scss']
})
export class RegistrarProveedorComponent {

  public isLoading: boolean = false;

  public mensajeExito: string | null = null;
  public mensajeError: string | null = null;

  public myForm: FormGroup = this._fb.group({
    razon_social: ['', [Validators.required, Validators.minLength(3)]],
    cuit: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    nota_adicional: ['', [Validators.required]]
  });

  constructor(private _fb: FormBuilder, private _proveedorServices: ProveedorService ){

  }

  onSubmit(){

    if(this.myForm.invalid){
      // Si el formulario es inválido, marcar todos los campos como tocados
      this.myForm.markAllAsTouched();
      return;  // Evita que se procese el submit si el formulario es inválido
    }

    this.isLoading = true;

    // Lógica del envío del guardado del proveedor
    this._proveedorServices.insertarProveedor(this.myForm.value).subscribe({
      next: (data) => {

        // Ocultamos el loading
        this.isLoading = false;

        if( data != null && data != undefined ){

          this.mensajeExito = 'Proveedor registrado correctamente';
          this.mensajeError = null;
          setTimeout(() => this.mensajeExito = null, 5000); // Desaparece después de 3 segundos

        }else{

          this.mensajeError = 'Error al registrar el proveedor';
          this.mensajeExito = null;
          setTimeout(() => this.mensajeError = null, 3000); // Desaparece después de 3 segundos

        }

        // reseteamos el formulario ni bien entramos en la pantalla
        this.myForm.reset(formVacio);
      },

      error: (e) => {

        this.mensajeError = 'Error al registrar el proveedor';
        this.mensajeExito = null;
        setTimeout(() => this.mensajeError = null, 3000); // Desaparece después de 3 segundos

        console.log("Error al registrar proveedor: "+ e );
      },
    });
  }

}
