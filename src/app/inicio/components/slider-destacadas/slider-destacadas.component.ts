import { Component, OnInit, signal, Input, Directive } from '@angular/core';
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

  swiperElement = signal<SwiperContainer | null>(null);

  sliderImages = [
    '../../assets/img/imagen1.jpg',
    '../../assets/img/imagen2.jpg',
    '../../assets/img/imagen3.jpg',
    '../../assets/img/imagen4.jpg',
  ];

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
  };

}