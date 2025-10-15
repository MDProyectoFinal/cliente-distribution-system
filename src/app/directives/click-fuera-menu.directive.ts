import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickFueraMenu]'
})
export class ClickFueraMenuDirective {
  @Output() clickAfuera = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement){
    const clickDentro = this.elementRef.nativeElement.contains(targetElement);
    if(!clickDentro){
      this.clickAfuera.emit();
    }
  }

}
