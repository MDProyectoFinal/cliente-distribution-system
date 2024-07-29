import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inicio-pagina-inicio',
  templateUrl: './pagina-inicio.component.html'
})
export class PaginaInicioComponent implements OnInit {

  public titulo :string = "Rosario Snack";

  ngOnInit(): void {
    console.log('inicio.component.ts cargado');
    // Conseguir el listado de pedidos
  }

}
