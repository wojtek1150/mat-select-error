import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'environments/environment';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { ActionTypes, AuthorizeFailed, AuthorizeSuccess, LoginFailed, LoginSuccess } from '../actions/authentication.actions';
import { Navigate } from '../actions/router.actions';

import { AppState, isLoggedOut } from 'main/core/store/reducers';
import { GoogleOauthService } from 'main/core/services/google-oauth/google-auth.service';
import { User } from 'main/core/models/user';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authService: GoogleOauthService,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {}

  @Effect()
  authorize$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.Authorize),
    switchMap(() => this.authService.authState.pipe(
      map(user => {
        return user
          ? new AuthorizeSuccess(user)
          : new AuthorizeFailed();
      }),
      catchError(() => of(new AuthorizeFailed()))
    ))
  );

  @Effect()
  authorizeSuccess$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.AuthorizeSuccess),
    switchMap((action: { type: string; payload: any }) => this.httpClient.get(`${environment.apiServerUrl}/employee/1`)
      .pipe(take(1), map(response => {
        const user = new User(response ? { ...action.payload, ...response } : action.payload);
        return new LoginSuccess(user);
      }))
    ),
    catchError(() => of(new LoginFailed()))
  );

  @Effect()
  authorizeFailed$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.AuthorizeFailed),
    withLatestFrom(this.store.pipe(select(isLoggedOut))),
    switchMap((s) => {
      if (window.location.pathname !== '/' && !s[1]) { localStorage.setItem('ref', window.location.pathname); }
      return of(new Navigate(['./']));
    }),
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.Logout),
    tap(() => this.authService.signOut()),
    switchMap(() => of(new Navigate(['./'])))
  );
}
