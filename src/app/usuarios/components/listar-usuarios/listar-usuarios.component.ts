import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario as UsuarioInterface } from 'src/app/usuarios/interfaces/usuario.interface';

@Component({
  selector: 'personas-listar-usuarios',
  templateUrl: './listar-usuarios.component.html'
})
export class ListarUsuariosComponent implements OnInit {

  public titulo: string = 'Listado de usuarios'

  @Input()
  public listaUsuarios: UsuarioInterface[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    debugger;
    this.usuarioService.obtenerUsuarios().subscribe((data: UsuarioInterface[]) => {
      debugger;
      this.listaUsuarios = data;
    });
  }

}
