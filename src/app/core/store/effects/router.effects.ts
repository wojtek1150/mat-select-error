import { Injectable, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { ActionTypes } from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private _ngZone: NgZone,
    private actions$: Actions,
    private location: Location,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(ActionTypes.Navigate),
    tap((action: { type: string, payload: any[] }) => this._ngZone.run(() => this.router.navigate(action.payload)))
  );

  @Effect({ dispatch: false })
  navigateHome$ = this.actions$.pipe(
    ofType(ActionTypes.NavigateToHome),
    tap(() => this._ngZone.run(() => this.router.navigate(['/home'])))
  );

  @Effect({ dispatch: false })
  navigate404$ = this.actions$.pipe(
    ofType(ActionTypes.NavigateTo404),
    tap(() => this._ngZone.run(() => this.router.navigate(['/404']))),
  );

  @Effect({ dispatch: false })
  navigate403$ = this.actions$.pipe(
    ofType(ActionTypes.NavigateTo403),
    tap(() => this._ngZone.run(() => this.router.navigate(['/403']))),
  );

}
