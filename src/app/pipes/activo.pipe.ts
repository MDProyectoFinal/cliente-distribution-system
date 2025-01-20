import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? "Activo" : "Inactivo";
  }

}
