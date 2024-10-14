import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-cancelar-confirmar',
  templateUrl: './modal-cancelar-confirmar.component.html',
  styleUrls: ['./modal-cancelar-confirmar.component.scss']
})
export class ModalCancelarConfirmarComponent {
  @Input() title: string;
  @Input() isOpen: boolean;
  @Output() closeModalEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  closeModal() {
    this.closeModalEvent.emit();
  }

  onConfirm() {
    this.confirmEvent.emit();
  }
}
