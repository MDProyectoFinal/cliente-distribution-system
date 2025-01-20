import { Component, OnInit, signal, Input, Directive } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { Producto } from '../../../productos/interfaces/producto';
import { ProductoService } from 'src/app/productos/services/producto.service';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();

@Component({
  selector: 'slider-destacadas',
  templateUrl: './slider-destacadas.component.html',
  styleUrls: ['./slider-destacadas.component.scss']
})

export class SliderDestacadasComponent implements OnInit {

  @Input() sliderClass: any;

  listaProductos: Producto[];

  swiperElement = signal<SwiperContainer | null>(null);
  public sliderImages: String[] = [];

  // sliderImages = [
  //   '../../assets/img/imagen1.jpg',
  //   '../../assets/img/imagen2.jpg',
  //   '../../assets/img/imagen3.jpg',
  //   '../../assets/img/imagen4.jpg',
  // ];

  constructor( private _productosServices: ProductoService ){

  }

  ngOnInit(): void {

    console.log('.' + this.sliderClass);

    const swiperElementConstructor1 = document.querySelector('.' + this.sliderClass);

    const swiperOptions: SwiperOptions = {
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      loop: true,
    };

    Object.assign(swiperElementConstructor1!, swiperOptions);

    this.swiperElement.set(swiperElementConstructor1 as SwiperContainer);
    this.swiperElement()?.initialize();

    this.obtenerImagenesProductosDestacados();
  };

  obtenerImagenesProductosDestacados(){
    this.cargarProductos();
    this.cargarImagenesProductos();
  }

  async cargarImagenesProductos(){
    debugger;
    if( this.listaProductos != null && this.listaProductos.length > 0 ){
      debugger;
      this.listaProductos.forEach(producto => {
        debugger;
        this.sliderImages.push( producto.imagen );
      });
    }
  }

  async cargarProductos(){
    debugger;
    this._productosServices.recuperarTodos().pipe(
        tap((productos: Producto[]) => {
          this.listaProductos = productos; // Asignar productos cargados
        }),
        switchMap(() => {
          // Llama al siguiente método una vez que cargarProductos ha terminado
          return this.cargarImagenesProductos();
        })
      ).subscribe({
        // next: (imagenes) => {
        //   console.log('Imágenes cargadas:', imagenes);
        //   // Procesar imágenes aquí
        // },
        error: (error) => {
          console.error('Error al cargar productos o imágenes:', error);
        },
      });
  }

  mostrarMensajeError() {
    alert('Ocurrió un error cargando los productos');
  }

}
