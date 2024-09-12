import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inicio-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})
export class PaginaInicioComponent implements OnInit {

  ptitulo :string = "Rosario Snack"

  ngOnInit(): void {
    console.log('inicio.component.ts cargado');

    // Conseguir el listado de pedidos
  }

}
