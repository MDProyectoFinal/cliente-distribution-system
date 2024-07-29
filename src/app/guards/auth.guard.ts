import { AuthenticationService } from '../usuarios/services/authentication.service';

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.estaAutenticado()) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
