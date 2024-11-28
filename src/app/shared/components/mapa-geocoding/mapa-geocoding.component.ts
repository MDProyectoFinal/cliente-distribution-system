import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'mapa-geocoding',
  templateUrl: './mapa-geocoding.component.html',
  styleUrls: ['./mapa-geocoding.component.scss']
})
export class MapaGeocodingComponent implements OnInit{
  latitud: number;
  longitud: number;
  direccion: string;
  mapa: any;
  marcador: any;

  ngOnInit(): void {
    this.mapa = L.map('mapa').setView([-32.95, -60.65], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      subdomains: ['a', 'b', 'c']
    }).addTo(this.mapa);

    this.marcador = L.marker([-32.95, -60.65],{draggable : true}).addTo(this.mapa);
    this.marcador.on('dragend', () => {
      const posicion = this.marcador.getLatLng();
      this.latitud = posicion.lat;
      this.longitud = posicion.lng;
      this.obtenerDireccion(posicion.lat, posicion.lng);
    });

    this.obtenerDireccion(this.marcador.getLatLng().lat, this.marcador.getLatLng().lng)
  }

  obtenerDireccion(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.direccion = data.display_name;
      })
      .catch(error => console.error(error));
  }


}


// import { Component, ElementRef, ViewChild } from '@angular/core';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-mapa',
//   template: `
//     <!-- ... -->
//     <div class="col-lg-6" style="margin: 15px" >
//       <!-- ... -->
//       <form [formGroup]="myForm" *ngIf="personaEdicion" (ngSubmit)="onSubmit()" class="col-md-7">
//         <!-- ... -->
//         <div>
//           <label>Dirección:</label>
//           <input type="text" name="direccion" formControlName="direccion" class="form-control" required>
//           <span *ngIf="isValidField('direccion')"
//               class="form-text text-danger">
//               {{ getFieldError('direccion') }}
//           </span>
//         </div>
//         <!-- ... -->
//       </form>
//     </div>
//     <div id="mapa" style="width: 800px; height: 600px;"></div>
//   `
// })
// export class MapaComponent {
//   // ...
//   @ViewChild('myForm') myForm: any;
//   // ...

//   ngOnInit(): void {
//     // ...
//     this.marcador.on('dragend', () => {
//       const posicion = this.marcador.getLatLng();
//       this.latitud = posicion.lat;
//       this.longitud = posicion.lng;
//       this.obtenerDireccion(posicion.lat, posicion.lng);
//     });
//   }

//   obtenerDireccion(lat: number, lng: number) {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         this.direccion = data.display_name;
//         this.myForm.get('direccion').setValue(this.direccion);
//       })
//       .catch(error => console.error(error));
//   }
// }
