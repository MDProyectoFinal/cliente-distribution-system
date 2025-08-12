import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'informacion-informacion-general',
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.scss'],
})
export class InformacionGeneralComponent {
  public titulo: string = 'Sobre Nosotros - Nombre de la Empresa';

  constructor(private httpClient: HttpClient) {}

  descargarManual() {

    const opciones = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token') as string,
      }),
      responseType: 'blob' as 'json',
    };

    const url = environment.apiURL + 'soporte';

    this.httpClient.get<Blob>(url, opciones).subscribe({
      next: (response: Blob) => {
        const filename = 'manual.pdf';
        const blobUrl = window.URL.createObjectURL(response);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        a.remove();
      },
      error: (err) => {
        console.error('Error al descargar el archivo', err);
      },
    });
  }
}
