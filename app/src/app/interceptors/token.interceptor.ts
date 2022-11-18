import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.snackbar.open(
              `${'Token is expired , Login again'}`,
              undefined,
              {
                duration: 4000,
                panelClass: ['red-snackbar'],
              }
            );
            this.router.navigate(['login']);
          }
        }
        return throwError(() => new Error('Some other error occured'));
      })
    );
  }
}
