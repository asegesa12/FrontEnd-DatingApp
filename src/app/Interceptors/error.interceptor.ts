import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

 const toastr = inject(ToastrService)
 const router = inject(Router)

  return next(req).pipe(
    catchError(error => {
      if(error) {
        switch (error.status) {
          case 400:
            if(error.error.errors){
              const modalStateErrors = [];
              for(const key in error.error.errors){
                modalStateErrors.push(error.error.errors[key])
              }
              throw modalStateErrors.flat();
            } else {
              toastr.error(error.error, error.status);
            }

            break;

            case 401:
              toastr.error('You dont have credentials', error.status);
              break;
            case 404:
              router.navigateByUrl('/not-found');
            break;
            case 500:
              const navigationExtras: NavigationExtras = { state: {error: error.error}};
              router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('something unexpected went wrong');
            break;
        }
      }

      throw error;

    })
  )
};
