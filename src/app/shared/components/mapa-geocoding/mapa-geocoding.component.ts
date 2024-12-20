import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'mapa-geocoding',
  templateUrl: './mapa-geocoding.component.html',
  styleUrls: ['./mapa-geocoding.component.scss'],
})
export class MapaGeocodingComponent implements OnInit {
  @Input() latitudInicial: number;
  @Input() longitudInicial: number;
  @Input() direccionInicial: string = '';
  @Output() latitudChange = new EventEmitter<number>();
  @Output() longitudChange = new EventEmitter<number>();
  @Output() direccionChange = new EventEmitter<string>();
  latitud: number;
  longitud: number;
  direccion: string;
  mapa: any;
  marcador: any;

  ngOnInit(): void {

    this.latitud = this.latitudInicial !== undefined ? this.latitudInicial : -32.95;
    this.longitud = this.longitudInicial !== undefined ? this.longitudInicial : -60.65;

    this.direccion = this.direccionInicial;

    this.mapa = L.map('mapa').setView([this.latitud, this.longitud], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      subdomains: ['a', 'b', 'c'],
    }).addTo(this.mapa);

    this.marcador = L.marker([this.latitud, this.longitud], { draggable: true }).addTo(this.mapa);
    this.marcador.on('dragend', () => {
      const posicion = this.marcador.getLatLng();
      this.latitud = posicion.lat;
      this.longitud = posicion.lng;
      this.latitudChange.emit(this.latitud);
      this.longitudChange.emit(this.longitud);
      this.obtenerDireccion(posicion.lat, posicion.lng);
    });

    this.obtenerDireccion(this.marcador.getLatLng().lat, this.marcador.getLatLng().lng);
  }

  obtenerDireccion(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const direccionConvertida = `${data.address.road} ${data.address.house_number ?? ''}, ${data.address.city}`;
        this.direccion = direccionConvertida;
        this.direccionChange.emit(this.direccion);
        this.marcador.bindTooltip(direccionConvertida, { permanent: true, direction: 'top', offset: [-15, -20] });
      })
      .catch((error) => console.error(error));
  }
}
