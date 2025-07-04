import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario as UsuarioInterface } from 'src/app/usuarios/interfaces/usuario.interface';

@Component({
  selector: 'personas-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {

  public titulo: string = 'Listado de usuarios';
  public isLoading: boolean = false;

  @Input()
  public listaUsuarios: UsuarioInterface[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios()
      .subscribe((data: UsuarioInterface[]) => {
        this.listaUsuarios = data;
      })
  }

  buscarPorNombreUsuario( nombreUsuarioIngresado: string ): void {

    this.isLoading = true;

    if (nombreUsuarioIngresado?.trim()) {
      this.usuarioService.obtenerUsuariosPorNombreUsuario( nombreUsuarioIngresado )
        .subscribe( (usuarios: UsuarioInterface[]) => {
          this.listaUsuarios = usuarios;
          this.isLoading = false;
      })
    }else{
       this.usuarioService.obtenerUsuarios()
        .subscribe( (usuarios: UsuarioInterface[]) => {
          this.listaUsuarios = usuarios;
          this.isLoading = false;
      })
    }


  }

}
