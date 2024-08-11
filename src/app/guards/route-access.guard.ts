import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const routeAccessGuard: CanActivateFn =
 (route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | boolean => {

  const categoryService = inject(CategoryService);
  const router = inject(Router);

  return categoryService.selectedCategory$.pipe(
    map(selectedCategory => {
      if (selectedCategory) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
