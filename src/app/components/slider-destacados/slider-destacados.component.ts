import { Component, OnDestroy, OnInit, signal, Input} from '@angular/core';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();

@Component({
  selector: 'app-slider-destacados',
  templateUrl: './slider-destacados.component.html',
  styleUrls: ['./slider-destacados.component.scss'],
})

export class SliderDestacadosComponent implements OnInit {

  @Input() sliderClass: any;

  swiperElement = signal<SwiperContainer | null>(null);

  sliderImages = [
    '../../assets/img/imagen1.jpg',
    '../../assets/img/imagen2.jpg',
    '../../assets/img/imagen3.jpg',
    '../../assets/img/imagen4.jpg',
  ];

  ngOnInit(): void {
  
    // console.log(this.sliderClass);
    
    const swiperElementConstructor1 = document.querySelector('.' + this.sliderClass);

    const swiperOptions: SwiperOptions = {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
    };

    Object.assign(swiperElementConstructor1!, swiperOptions);
  
    this.swiperElement.set(swiperElementConstructor1 as SwiperContainer);
    this.swiperElement()?.initialize();
  };

}
