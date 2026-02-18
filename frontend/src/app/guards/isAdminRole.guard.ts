import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAdmin = authService.hasRoles(["admin"]);
  if(!isAdmin){
    router.navigate(['/dashboard']);//default user route
    return false;
  }
  return true;
};
