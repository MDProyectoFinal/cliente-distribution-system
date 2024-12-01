import { PreferencesPagoItem } from "./preferences-pago-items.interface";

export interface IPreferencesPago {
  payer_email: string,
  items: PreferencesPagoItem[]
}
