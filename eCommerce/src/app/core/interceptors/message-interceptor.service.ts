import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/Operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageInterceptorService implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap((success: HttpEvent<any>) => {
          if (success instanceof HttpResponse) {
            if (success.body.message) {
              this.toastr.success(success.body.message);
            }
          }
        }), catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['/user/login']);
          }
          this.toastr.error(err.error.message);
          if (err.error.errors) {
            const errors = (err.error.errors).reduce((obj, key) => {
              // tslint:disable-next-line: no-string-literal
              obj[key['param']] = key['msg'];
              return obj;
            }, {});
            Object.keys(errors).forEach((e) => this.toastr.error(errors[e]));
          }
          return throwError(err);
        })
      );
  }
}
