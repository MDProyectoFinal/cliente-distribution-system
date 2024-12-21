import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { IProveedor } from '../../interfaces/proveedor.interface';
import { ModalCancelarConfirmarComponent } from 'src/app/shared/components/modal-cancelar-confirmar/modal-cancelar-confirmar.component';

@Component({
  selector: 'proveedores-listar-proveedores',
  templateUrl: './listar-proveedores.component.html',
  styleUrls: ['./listar-proveedores.component.scss']
})
export class ListarProveedoresComponent implements OnInit{

  public titulo: string = 'Listado de proveedores';
  public isLoading: boolean = false;

  public proveedorDetalle: IProveedor | null | undefined;
  @ViewChild('modal') modal: ModalCancelarConfirmarComponent;

  @Input()
  public listaProveedores: IProveedor[] = [];

  constructor(private _proveedorServices: ProveedorService ){

  }

  ngOnInit(): void {
    this.recuperarTodos();
  }

  // Modal de "Baja Proveedor"
  abrirModal( idProveedor: string ): void {
    this.modal.isOpen = true;
    this.cargarDatosProvSeleccionado(idProveedor);
  }

  cargarDatosProvSeleccionado( idProveedor:string ): IProveedor|undefined {
    // TO DO: debemos mostrar en un MODAL toda la información del pedido
    this.proveedorDetalle = this.listaProveedores?.find(proveedor => proveedor._id == idProveedor );
    return this.proveedorDetalle;
  }

  // Modal de "Baja Proveedor"
  onModalClose(){
    this.modal.isOpen = false
  }

  onModalConfirm( idProveedor: string  ){
    this.darBajaProveedor( idProveedor );
  }

  darBajaProveedor ( idProveedor: string ): void {
    this._proveedorServices.eliminacionLogica( idProveedor )
      .subscribe((data: any) => {

        if( data.error == null ){
          console.log( data.provActualizado );
          console.log( "Proveedor dado de baja" );

          // Cerramos el modal
          this.onModalClose();
          // Volvemos a llenar la grilla
          this.recuperarTodos();

        }else{
          alert(data.error);
          this.onModalClose();
        }
      })
  }

  recuperarTodos (): void {
    this._proveedorServices.recuperarTodos()
      .subscribe((data: IProveedor[]) => {
        this.listaProveedores = data;
        console.log({ cantidadProve: this.listaProveedores.length });
      })
  }

  buscarPorRazonSocialProveedor( razonSocialProveedorIngresada: string ): void {

    this.isLoading = true;

    if( razonSocialProveedorIngresada == "" ){
      this.recuperarTodos();
      this.isLoading = false;
    }else{
      this._proveedorServices.buscarPorRazonSocialProveedor( razonSocialProveedorIngresada )
      .subscribe( (proveedores: IProveedor[]) => {
        this.listaProveedores = proveedores;
        this.isLoading = false;
      })
    }
  }
}
