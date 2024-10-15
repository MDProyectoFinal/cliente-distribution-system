import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromocionService } from 'src/app/promociones/services/promocion.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesProductoComponent implements OnInit{
  id: string;
  producto: any;

  constructor(private route: ActivatedRoute, private servicioPromocion : PromocionService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.servicioPromocion.recuperarTodasPorProducto(this.id).subscribe({
      next: (data) => {
        this.producto = data;
        console.log(data);

      },

      error: (e) => {},
    });
  }

}
