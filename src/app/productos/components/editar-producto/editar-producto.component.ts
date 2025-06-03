import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditarPromocionComponent } from 'src/app/promociones/components/editar-promocion/editar-promocion.component';
import { ModalCancelarConfirmarComponent } from 'src/app/shared/components/modal-cancelar-confirmar/modal-cancelar-confirmar.component';
import { PromocionService } from 'src/app/promociones/services/promocion.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
})
export class EditarProductoComponent implements OnInit {
  @ViewChild('modal') modal: ModalCancelarConfirmarComponent;
  @ViewChild('editarPromocion') editarPromocion: EditarPromocionComponent;

  id: string;
  isAgregar: boolean;
  private nombreHeaderAlert :string = "Error"

  @Input()
  producto: any = {};
  tiposProductos: any;
  urlImagen: string | ArrayBuffer | null;
  imagenSubir: any;
  productoForm!: FormGroup;

  constructor(private route: ActivatedRoute, private servicioProducto: ProductoService, private servicioPromocion: PromocionService, private location: Location, private alertifyService:AlertifyService) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAgregar = !this.id;

    this.productoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      imagen: new FormControl(''),
      destacado: new FormControl(false),
      precio_unitario: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')]),
      stock: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      tipoProducto: new FormControl('', [Validators.required]),
    });

    this.servicioProducto.recuperarTiposProductos().subscribe({
      next: (data) => {
        this.tiposProductos = data;
      },

      error: (e) => {},
    });

    if (this.id) {
      this.servicioProducto.recuperarProducto(this.id).subscribe({
        next: (data) => {
          this.producto = data;
          this.urlImagen = data.imagen;
          this.productoForm.patchValue(data);
        },

        error: (e) => {console.log("ERR RECUPERAR");
        },
      });
    }
  }

  onImageChanged(eventoCambio: any) {
    const archivos = eventoCambio.target.files;
    if (archivos.length === 0) {
      return;
    }

    const tipoImagen = archivos[0].type;
    if (tipoImagen.match(/image\/*/) == null) {
       this.alertifyService.alert(this.nombreHeaderAlert, 'Solamente se aceptan imágenes');
    }

    this.imagenSubir = archivos[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onload = (_event) => {
      this.urlImagen = reader.result;
    };
  }

  enviar() {
    if (this.isAgregar) {
      this.servicioProducto.insertarProducto(this.productoForm.value, this.imagenSubir).subscribe({
        complete: () => {
           this.alertifyService.alert(this.nombreHeaderAlert, 'Producto agregado exitosamente.');
          this.location.back();
        },
        error: (e) => {
          if (e.status == 400) {
             this.alertifyService.alert(this.nombreHeaderAlert, e.error);
          }
        },
      });
    } else {
      console.log(this.productoForm.value);

      this.servicioProducto.editarProducto(this.id, this.productoForm.value, this.imagenSubir).subscribe({
        complete: () =>  this.alertifyService.success('Producto modificado exitosamente.'),
        error: (e) => {
          if (e.status == 400) {
             this.alertifyService.alert(this.nombreHeaderAlert, e.error);
          }
        },
      });
    }
  }

  back() {
    this.location.back();
  }

  confirmarInactivar() {
    console.log('Inactivar');
  }

  abrirModal() {
    this.modal.isOpen = true;
  }

  onModalClose() {
    this.modal.isOpen = false;
  }

  onModalConfirm() {
    this.servicioPromocion.actualizarPromocionProducto(this.producto._id, this.producto.promocionActiva).subscribe({
      complete: () => (this.modal.isOpen = false),
      error: (e) => {
        if (e.status == 400) {
           this.alertifyService.alert(this.nombreHeaderAlert, e.error);
        }
      },
    });
  }
}
