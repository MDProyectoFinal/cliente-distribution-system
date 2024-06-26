import { identity } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  login : boolean = false;
  constructor(private auhtService:AuthService){
    this.login = this.auhtService.estaAutenticado()
    console.log(this.login)
  }

}
