import { Component, Input, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CarritoPedidoService } from 'src/app/productos/services/carrito-pedido.service';
import { AlertifyService } from '../../services/alertify.service';
import { Producto } from 'src/app/productos/interfaces/producto';

@Component({
  selector: 'app-card-producto-destacado',
  templateUrl: './card-producto-destacado.component.html',
  styleUrls: ['./card-producto-destacado.component.scss'],
})
export class CardProductoDestacadoComponent implements OnInit{
  @Input() item: Producto;
  plusIcon = faPlusCircle;
  constructor(private alertifyService: AlertifyService, private carritoPedidoService: CarritoPedidoService) {


  }
  ngOnInit(): void {
    console.log("We here");
  }

  agregarCarrito() {
    this.carritoPedidoService.agregarItem(this.item);
    this.alertifyService.success('Producto agregado');
  }
}


