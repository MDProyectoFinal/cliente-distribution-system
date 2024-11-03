import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../usuarios/services/authentication.service';
import { inject } from '@angular/core';
import { Roles } from '../usuarios/interfaces/roles-enum';

export const roleGuard: CanActivateFn = (route, state) => {

  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as Roles; // Obtiene el rol requerido desde la configuración de la ruta
  const userRole = authenticationService.getUserRoleFromToken(); // Obtén el rol actual del usuario

  if (userRole === requiredRole) {
    return true; // Permite el acceso si el rol coincide
  } else {
    router.navigate(['/no-autorizado']); // Redirige a una página de error o inicio si el usuario no tiene permiso
    return false;
  }

};
