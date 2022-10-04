import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GetTokenInterceptor implements HttpInterceptor {

  

  constructor( private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    if(token){
      request = request.clone({ setHeaders : { Authorization: token}})
    }
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status === 403){
          this.router.navigate(['/login'])
          return throwError(() => new Error("Acceso no autorizado"))
        }
        return throwError(() => new Error("Algo ha salido mal."))
      })
    );
  }
}
