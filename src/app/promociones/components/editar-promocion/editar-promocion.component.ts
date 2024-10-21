import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Promocion } from '../../interfaces/promocion';
import { ITipoPromocion, PromocionPorPorcentaje, PromocionPorValor } from '../../interfaces/tipo-promocion';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { TipoPromocionFactory } from '../../interfaces/promocionFactory';

@Component({
  selector: 'app-editar-promocion',
  templateUrl: './editar-promocion.component.html',
  styleUrls: ['./editar-promocion.component.scss'],
})
export class EditarPromocionComponent implements OnInit, OnChanges {
  @Input()
  promocion: Promocion;
  @Input()
  precioProducto: number;

  tiposPromociones: ITipoPromocion[];
  promocionForm!: FormGroup;
  tipoPromocionSeleccionado: ITipoPromocion;

  constructor(private factory: TipoPromocionFactory) {}

  ngOnInit(): void {
    this.tiposPromociones = [];
    this.tiposPromociones.push(new PromocionPorPorcentaje());
    this.tiposPromociones.push(new PromocionPorValor());
    this.promocionForm = new FormGroup({ tipoPromocion: new FormControl('', [Validators.required]), valorPromocion: new FormControl('', [Validators.required]), fechaInicio: new FormControl('', [Validators.required]), fechaFin: new FormControl(''), activa: new FormControl(false) });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let promo = changes['promocion'].currentValue as Promocion;
    if (promo) {

      this.promocionForm = new FormGroup({
        tipoPromocion: new FormControl('', [Validators.required]),
        valorPromocion: new FormControl('', [Validators.required]),
        fechaInicio: new FormControl(new Date(this.promocion.fecha_inicio).toISOString().slice(0, 10), [Validators.required]),
        fechaFin: new FormControl(new Date(this.promocion.fecha_fin).toISOString().slice(0, 10)),
        activa: new FormControl(this.promocion.activa),
      });

      this.promocionForm.get('tipoPromocion')?.valueChanges.subscribe((value: any) => {
        this.tipoPromocionSeleccionado = this.factory.recuperarTipoPromocionPorNombre(value);
        if (this.tipoPromocionSeleccionado.descuento > 0) {
          this.promocion.precio = this.tipoPromocionSeleccionado.aplicar(this.precioProducto);
        }
      });

      this.promocionForm.get('valorPromocion')?.valueChanges.subscribe((value: number) => {
        this.tipoPromocionSeleccionado.descuento = value;
        this.promocion.precio = this.tipoPromocionSeleccionado.aplicar(this.precioProducto);
      });

      this.promocionForm.get('fechaInicio')?.valueChanges.subscribe((value: Date) => {
        this.promocion.fecha_inicio = value;
      });

      this.promocionForm.get('fechaFin')?.valueChanges.subscribe((value: Date) => {
        this.promocion.fecha_fin = value;
      });

      this.promocionForm.get('activa')?.valueChanges.subscribe((value: boolean) => {
        this.promocion.activa = value;
      });
    }
  }
}
