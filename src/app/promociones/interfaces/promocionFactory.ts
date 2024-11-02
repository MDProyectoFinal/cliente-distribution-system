import { Injectable } from "@angular/core";
import { ITipoPromocion, PromocionPorPorcentaje, PromocionPorValor } from "./tipo-promocion";

@Injectable({
    providedIn: 'root',
  })
export class TipoPromocionFactory{


    public recuperarTipoPromocionPorNombre(nombre : string): ITipoPromocion{

        if(nombre ===  'Valor'){
            return new PromocionPorValor()
        }

        return new PromocionPorPorcentaje()
    }
}