import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Pagina } from 'src/app/shared/interfaces/Pagina';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit{
  infoPagina: Pagina<Producto>;
  productosFiltrados: Producto[];

  constructor(private service : ProductoService, private router: Router){}

  ngOnInit(): void {

    this.service.recuperarProductos().subscribe({
      next: (data : Pagina<Producto>) =>{

        this.infoPagina = data
        this.productosFiltrados = data.elementos;

      },

      error: (e) => {}
    })

  }


  confirmarEliminacion(idProducto:string){
    const producto = this.productosFiltrados.find(p => p._id === idProducto)!!
    if(confirm(`¿Está seguro de que desea eliminar ${producto.nombre}?`)){
      this.service.eliminarProducto(idProducto).subscribe({
        next: () =>{

          this.productosFiltrados.splice(this.productosFiltrados.indexOf(producto),1)
        },

        error: (e) => {}
      })
    }
  }

  buscarProductoPorNombre(nombre : string) : void{
    this.service.recuperarProductosPorNombre(nombre).subscribe({
      next: (data : Pagina<Producto>) =>{

        this.infoPagina = data
        this.productosFiltrados = data.elementos;

      },

      error: (e) => {}
    })

  }


  irPagina(numeroPagina:number){

    const link = [this.infoPagina.linkSiguiente, this.infoPagina.linkAnterior].find(link => link != null)

    if(link){

      const paginaNavegar = link.replace(/(numeroPagina=)[^\&]+/, '$1'+ numeroPagina)

      this.service.recuperarProductosEnDireccion(paginaNavegar).subscribe({
      next: (data : Pagina<Producto>) =>{

        this.infoPagina = data
        this.productosFiltrados = data.elementos;

      },

      error: (e) => {}
    })

    }

  }

  navegarSiguiente(){
    this.service.recuperarProductosEnDireccion(this.infoPagina.linkSiguiente).subscribe({
      next: (data : Pagina<Producto>) =>{

        this.infoPagina = data
        this.productosFiltrados = data.elementos;

      },

      error: (e) => {}
    })
  }

  navegarAnterior(){

    console.log(      this.infoPagina.linkAnterior);
    this.service.recuperarProductosEnDireccion(this.infoPagina.linkAnterior).subscribe({
      next: (data : Pagina<Producto>) =>{

        this.infoPagina = data
        this.productosFiltrados = data.elementos;

      },

      error: (e) => {}
    })
  }
}
