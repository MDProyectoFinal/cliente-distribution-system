import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss'],
})
export class EditarProductoComponent implements OnInit {
  id: string;
  isAgregar: boolean;

  @Input()
  producto: any = {};
  tiposProductos: any;
  urlImagen: string | ArrayBuffer | null;
  imagenSubir: any;
  productoForm!: FormGroup;

  constructor(private route: ActivatedRoute, private servicio: ProductoService, private location : Location) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAgregar = !this.id;

    this.productoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      imagen: new FormControl(''),
      precio_unitario: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]+)?$'),
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      tipoProducto: new FormControl('', [Validators.required]),
    });


    this.servicio.recuperarTiposProductos().subscribe({
      next: (data) => {
        this.tiposProductos = data;
      },

      error: (e) => {},
    });

    if (this.id) {
      this.servicio.recuperarProducto(this.id).subscribe({
        next: (data) => {
          this.producto = data;
          this.urlImagen = data.imagen;
          this.productoForm.patchValue(data)
        },

        error: (e) => {},
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
      alert('Solamente se aceptan imágenes');
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
      this.servicio.insertarProducto(this.productoForm.value, this.imagenSubir).subscribe({
        complete: () => alert("Producto agregado exitosamente."),
        error: (e) => {

          if(e.status == 400){
            alert(e.error)
          }
        }
      });
    } else {
      this.servicio.editarProducto(this.productoForm.value, this.imagenSubir).subscribe({
        complete: () => alert("Producto modificado exitosamente."),
        error: (e) => {

          if(e.status == 400){
            alert(e.error)
          }
        },
      });
    }
  }

  back(){
    this.location.back();
  }
}
