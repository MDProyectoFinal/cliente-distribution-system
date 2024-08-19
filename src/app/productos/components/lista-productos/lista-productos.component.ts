import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit{
  productos: any;

  constructor(private service : ProductoService, private router: Router){}

  ngOnInit(): void {

    this.service.recuperarProductos().subscribe({
      next: (data) =>{

        this.productos = data
        console.log(this.productos);



      },

      error: (e) => {}
    })

  }

}
