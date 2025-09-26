import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  // let user: any;
  // try {
  //   user = storedUser ? JSON.parse(storedUser) : null;
  // } catch (error) {
  //   user = null;
  // }
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
