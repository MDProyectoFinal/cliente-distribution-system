import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditarPromocionComponent } from 'src/app/promociones/components/editar-promocion/editar-promocion.component';
import { Promocion } from 'src/app/promociones/interfaces/promocion';
import { PromocionService } from 'src/app/promociones/services/promocion.service';
import { ModalCancelarConfirmarComponent } from 'src/app/shared/components/modal-cancelar-confirmar/modal-cancelar-confirmar.component';
import { AlertifyService } from 'src/app/shared/services/alertify.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
})
export class PromocionesProductoComponent implements OnInit {
  @ViewChild('modal') modal: ModalCancelarConfirmarComponent;
  @ViewChild('editarPromocion') editarPromocion: EditarPromocionComponent;

  id: string;
  producto: any;
  tituloModal: string = 'Nueva promoción';
  promocion: Promocion;
  private readonly nombreHeaderAlert= 'Error';

  constructor(private route: ActivatedRoute, private servicioPromocion: PromocionService, private alertifyService:AlertifyService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.servicioPromocion.recuperarTodasPorProducto(this.id).subscribe({
      next: (data) => {
        this.producto = data;
      },

      error: (e) => {},
    });
  }

  abrirModal(promocion: Promocion | null) {
    this.tituloModal = promocion ? 'EDITAR' : 'NUEVA PROMOCIÓN';
    this.promocion = promocion ? promocion : this.crearPromocion();

    this.modal.isOpen = true;
  }

  onModalClose() {
    this.modal.isOpen = false;
  }

  onModalConfirm() {

    if(this.promocion._id){

      this.servicioPromocion.actualizarPromocionProducto(this.producto._id, this.promocion).subscribe({
        complete: () => (this.modal.isOpen = false),
        error: (e) => {
          if (e.status == 400) {
             this.alertifyService.alert(this.nombreHeaderAlert, e.error);
          }
        },
      });
    } else{

      this.servicioPromocion.insertarPromocionProducto(this.producto._id, this.promocion).subscribe({
        complete: () => (this.modal.isOpen = false),
        next : (data) => {
          this.producto.promociones.push(data)
        },
        error: (e) => {
          if (e.status == 400) {
            console.log(JSON.stringify(e.error));

             this.alertifyService.alert(this.nombreHeaderAlert, e.error.message);
          }
        },
      });

    }
  }

  crearPromocion(): Promocion {
    let fecha = new Date();
    let fechaFin = new Date(fecha);
    fechaFin.setDate(fecha.getDate() + 1);

    return { fecha_inicio: fecha, fecha_fin: fechaFin, activa: true } as Promocion;
  }
}
