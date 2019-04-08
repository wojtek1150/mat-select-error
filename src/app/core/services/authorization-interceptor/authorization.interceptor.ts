import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import { AppState, authState } from 'main/core/store/reducers';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  private static readonly maxAllowedRetries = 1;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.tryAuthenticate(req, next, 0);
  }

  private tryAuthenticate(req: HttpRequest<any>, next: HttpHandler, numberOfTries: number): Observable<HttpEvent<any>> {
    if (numberOfTries > AuthorizationInterceptor.maxAllowedRetries) {
      this.router.navigate(['/']);
      return EMPTY;
    }

    return this.store
      .pipe(
        select(authState),
        concatMap(user => {
          const copiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${user.idToken}`)
          });
          return next.handle(copiedReq).pipe(
            catchError((response: HttpErrorResponse) => {
              if (response.status === 401) {
                this.tryAuthenticate(req, next, numberOfTries + 1);
              }
              return throwError(response);
            })
          );
        })
      );
  }
}
