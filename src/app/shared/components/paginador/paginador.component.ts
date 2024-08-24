import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss'],
})
export class PaginadorComponent implements OnInit {
  @Input()
  paginaActual: number = 1;
  @Input()
  totalElementos: number = 0;
  @Input()
  tamañoPagina: number = 20;
  @Input()
  totalPaginas: number = 1;

  @Input()
  linkAnterior: string = ''

  @Input()
  linkSiguiente: string = ''

  @Output()
  navegarSiguiente = new EventEmitter();
  @Output()
  navegarAnterior = new EventEmitter();

  @Output()
  navegar = new EventEmitter<number>();

  paginas: number[] = [];

  ngOnInit(): void {
    this.paginas = this.range(1, this.totalPaginas);
  }

  range(inicio: number, fin: number) {
    return [...Array(fin).keys()].map((el) => el + inicio);
  }
}
