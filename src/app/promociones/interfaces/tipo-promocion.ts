export interface ITipoPromocion {
  nombre: string;
  descuento: number;

  aplicar(precio: number): number;
}

export class PromocionPorPorcentaje implements ITipoPromocion {
  nombre: string = 'Porcentaje';
  descuento: number;
  constructor() {}
  aplicar(precio: number): number {
    return precio - (this.descuento / 100 * precio);
  }
}


export class PromocionPorValor implements ITipoPromocion {
    nombre: string = 'Valor';
    descuento: number;
    constructor() {}
    aplicar(precio: number): number {
      return Math.max(0, precio - this.descuento)
    }
  }