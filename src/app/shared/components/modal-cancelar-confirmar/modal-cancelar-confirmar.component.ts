import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-cancelar-confirmar',
  templateUrl: './modal-cancelar-confirmar.component.html',
  styleUrls: ['./modal-cancelar-confirmar.component.scss']
})
export class ModalCancelarConfirmarComponent {
  @Input() title: string;
  @Input() isOpen: boolean = false;
  @Input() displayButtons:boolean = true;
  @Output() closeModalEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';

  closeModal() {
    this.closeModalEvent.emit();
  }

  onConfirm() {
    this.confirmEvent.emit();
  }
}
