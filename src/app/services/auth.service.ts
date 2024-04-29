import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autenticado = false;
  private tokenKey = "Bearer Token"


  constructor() {
    this.autenticado = !!localStorage.getItem(this.tokenKey)
  }

  estaAutenticado() : boolean{
    return this.autenticado
  }
}
