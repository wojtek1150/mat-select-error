import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CanActivate } from '@angular/router';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppState, authorized } from 'main/core/store/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) { }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(authorized),
      filter(authenticated => authenticated),
      take(1)
    );
  }
}
