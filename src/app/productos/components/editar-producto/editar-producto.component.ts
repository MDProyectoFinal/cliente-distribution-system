import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

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

  constructor(private route: ActivatedRoute, private servicio: ProductoService) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAgregar = !this.id;
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
      this.servicio.insertarProducto(this.producto, this.imagenSubir).subscribe({
        next: (data) => {
          console.log('exito');
        },

        error: (e) => {
          console.log(e);
        },
      });
    } else {
      this.servicio.editarProducto(this.producto, this.imagenSubir).subscribe({
        next: (data) => {
          console.log('exito');
        },

        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
