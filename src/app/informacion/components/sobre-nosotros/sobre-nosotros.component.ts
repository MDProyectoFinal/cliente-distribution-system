import { Component } from '@angular/core';

@Component({
  selector: 'informacion-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.scss']
})
export class SobreNosotrosComponent {

  public mision: string = 'Comercializar y distribuir productos de copetín multimarca.';
  public vision: string = 'Lograr que Rosario Snack provea un posicionamiento estratégico entre las primeras distribuidoras multimarca a nivel regional.';

}
