import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  titulo :string = "Rosario Snack"

  ngOnInit(): void {
    console.log('inicio.component.ts cargado');

    // Conseguir el listado de pedidos
  }
}
