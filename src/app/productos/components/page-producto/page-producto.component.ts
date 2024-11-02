import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-page-producto',
  templateUrl: './page-producto.component.html',
  styleUrls: ['./page-producto.component.scss']
})
export class PageProductoComponent {

  constructor(private service: ProductoService, private router: Router) {}

  ngOnInit(): void {
    
  }


}
