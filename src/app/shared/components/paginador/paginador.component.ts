import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss'],
})
export class PaginadorComponent implements OnInit {
  private _totalPaginas: number = 1;

  @Input()
  paginaActual: number = 1;
  @Input()
  totalElementos: number = 0;
  @Input()
  tamañoPagina: number = 20;

  @Input()
  set totalPaginas(valor: number) {
    if (valor > 0) {
      this._totalPaginas = valor;
      this.paginas = this.range(1, this._totalPaginas);
    }
  }

  get totalPaginas(): number {
    return this._totalPaginas;
  }

  @Input()
  linkAnterior: string = '';

  @Input()
  linkSiguiente: string = '';

  @Output()
  navegarSiguiente = new EventEmitter();
  @Output()
  navegarAnterior = new EventEmitter();

  @Output()
  navegar = new EventEmitter<number>();

  paginas: number[] = [];

  ngOnInit(): void {
    // this.paginas = this.range(1, this._totalPaginas);
  }

  range(inicio: number, fin: number) {
    return [...Array(fin).keys()].map((el) => el + inicio);
  }
}
