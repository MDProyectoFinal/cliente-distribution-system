import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent {

  @Output()
  public onValue = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  emitValue( textoIngresado: string ): void{
    this.onValue.emit( textoIngresado );
  }

}
