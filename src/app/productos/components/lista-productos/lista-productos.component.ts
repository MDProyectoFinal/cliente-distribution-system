import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit{
  productos: Producto[];

  constructor(private service : ProductoService, private router: Router){}

  ngOnInit(): void {

    this.service.recuperarProductos().subscribe({
      next: (data : Producto[]) =>{

        this.productos = data
      },

      error: (e) => {}
    })

  }


  confirmarEliminacion(idProducto:string){
    const producto = this.productos.find(p => p._id === idProducto)!!
    if(confirm(`¿Está seguro de que desea eliminar ${producto.nombre}?`)){
      this.service.eliminarProducto(idProducto).subscribe({
        next: () =>{

          this.productos.splice(this.productos.indexOf(producto),1)
        },

        error: (e) => {}
      })
    }
  }

}
