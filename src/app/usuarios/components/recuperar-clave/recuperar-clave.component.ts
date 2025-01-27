import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'usuarios-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.scss']
})
export class RecuperarClaveComponent implements OnInit {

  recuperarClaveForm!: FormGroup;
  token: string = '';

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router){
  }

  ngOnInit(): void {

    debugger;

    // Obtenemos el token del parámetro de la URL. Ya que está en el link del correo enviado
    this.token = this._route.snapshot.queryParamMap.get('token') || '';

    // Inicializamos el formulario
    this.recuperarClaveForm = this._fb.group(
      {
        nuevaClave: ['', [Validators.required, Validators.minLength(6)]],
        confirmarClave: ['', [Validators.required]],
      },
      { validators: this.validarCoincidencia }
    );
  }

  // Getter para los controles del formulario
  get formControls() {
    return this.recuperarClaveForm.controls;
  }

   // Validación personalizada: verifica si las contraseñas coinciden
   validarCoincidencia(group: FormGroup) {
    const nuevaClave = group.get('nuevaClave')?.value;
    const confirmarClave = group.get('confirmarClave')?.value;
    return nuevaClave === confirmarClave ? null : { noCoincide: true };
  }

   // Método para actualizar la contraseña
   actualizarClave(): void {
    if (this.recuperarClaveForm.valid) {
      const nuevaClave = this.recuperarClaveForm.get('nuevaClave')?.value;

      // Llamamos al servicio de autenticación para actualizar la clave
      this._authService.actualizarClave(this.token, nuevaClave).subscribe({
        next: () => {
          alert('Contraseña actualizada con éxito.');
          this._router.navigate(['/login']); // Redirige al login
        },
        error: (err: any) => {
          console.error('Error al actualizar la contraseña:', err);
          alert('Ocurrió un error. Inténtalo nuevamente.');
        },
      });
    }
  }

}
