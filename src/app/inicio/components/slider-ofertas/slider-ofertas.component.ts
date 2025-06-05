import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { Component, OnInit, signal, Input, Directive } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { Producto } from '../../../productos/interfaces/producto';
import { ProductoService } from 'src/app/productos/services/producto.service';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

register();

@Component({
  selector: 'slider-ofertas',
  templateUrl: './slider-ofertas.component.html',
  styleUrls: ['./slider-ofertas.component.scss'],
})
export class SliderOfertasComponent implements OnInit {
  listaProductos: Producto[] = [];

  @Input() sliderClass: any;

  swiperElement = signal<SwiperContainer | null>(null);
  public sliderImages: String[] = [];
  plusIcon = faPlusCircle;

  constructor(private _productosServices: ProductoService, private alertifyService: AlertifyService, private carritoPedidoService: CarritoPedidoService) {}

  ngOnInit(): void {
    const swiperElementConstructor0 = document.querySelector('.' + this.sliderClass);

    const swiperOptions: SwiperOptions = {
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      loop: true,
    };

    Object.assign(swiperElementConstructor0!, swiperOptions);

    this.swiperElement.set(swiperElementConstructor0 as SwiperContainer);
    this.swiperElement()?.initialize();

    this.obtenerImagenesProductosDestacados();
  }

  obtenerImagenesProductosDestacados() {
    this.cargarProductos();
    this.cargarImagenesProductos();
  }

  async cargarProductos() {
    this._productosServices
      .recuperarTodos()
      .pipe(
        tap((productos: Producto[]) => {
          // Vemos si encontramos alguna promocion "vigente" por fechas y "activa"
          this.listaProductos = productos.filter((producto) => producto.promocionActiva != null || producto.promocionActiva != undefined);
        }),
        switchMap(() => {
          // Llama al siguiente método una vez que cargarProductos ha terminado
          return this.cargarImagenesProductos();
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error al cargar productos o imágenes:', error);
        },
      });
  }

  agregarCarrito(producto: Producto) {
    this.carritoPedidoService.agregarItem(producto);
    this.alertifyService.success('Producto agregado');
  }

  async cargarImagenesProductos() {
    if (this.listaProductos != null && this.listaProductos.length > 0) {
      this.listaProductos
        .filter((producto) => producto.destacado === true)
        .forEach((producto) => {
          this.sliderImages.push(producto.imagen);
        });
    }
  }
}
