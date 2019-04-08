import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActionTypes, LoadUsersFailed, LoadUsersSuccess, } from '../actions/user.actions';

import { UsersService } from '../../modules/users/services/users.service';
import { User } from 'main/modules/users/models/user';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(ActionTypes.LOAD_USERS),
    switchMap(() => {
      return this.usersService.getAllUsers().pipe(
        map((users: User[]) => new LoadUsersSuccess(users)),
        catchError(() => of(new LoadUsersFailed()))
      );
    })
  );
}
