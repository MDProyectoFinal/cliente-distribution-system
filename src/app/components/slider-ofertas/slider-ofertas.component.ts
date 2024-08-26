import { Component, OnInit, signal, Input, Directive } from '@angular/core';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();

@Component({
  selector: 'app-slider-ofertas',
  templateUrl: './slider-ofertas.component.html',
  styleUrls: ['./slider-ofertas.component.scss'],
})

export class SliderOfertasComponent implements OnInit {

  @Input() sliderClass: any;

  swiperElement = signal<SwiperContainer | null>(null);

  sliderImages = [
   '../../assets/img/imagen1.jpg',
    '../../assets/img/imagen2.jpg',
    '../../assets/img/imagen3.jpg',
    '../../assets/img/imagen4.jpg',
  ];

  ngOnInit(): void {

    console.log('.' + this.sliderClass);

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
  };

}
