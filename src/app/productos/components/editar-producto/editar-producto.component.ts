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


  constructor(private route: ActivatedRoute, private servicio: ProductoService) {}
  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']
    this.isAgregar = !this.id
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
        },

        error: (e) => {},
      });

    }
  }
}
