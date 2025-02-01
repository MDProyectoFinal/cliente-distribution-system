import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'usuarios-olvide-mi-password',
  templateUrl: './olvide-mi-password.component.html',
  styleUrls: ['./olvide-mi-password.component.scss']
})
export class OlvideMiPasswordComponent {

  olvidePasswordForm: FormGroup;
  public mailEnviado: boolean = false;

  constructor( private fb: FormBuilder, private authService: AuthenticationService, private _router: Router ){
    this.olvidePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit( ){

    this.mailEnviado = false;

    if (this.olvidePasswordForm.valid) {
      this.authService.olvideMiPassword(this.olvidePasswordForm.value.email)
        .subscribe({
          next: () => {
            this.mailEnviado = true;
            alert('Correo enviado con éxito. Revisa tu bandeja.')
          },
          error: (err:any) => console.error('Error al enviar el correo:', err)
        });
    }
  }

  volverInicio() {
    this._router.navigate(['/inicio']);
  }

}
