import { Action } from '@ngrx/store';
import { User } from 'main/modules/users/models/user';

export enum ActionTypes {
  LOAD_USERS = '[Users] Load Users',
  LOAD_USERS_FAILED = '[Users] Load Users Failed',
  LOAD_USERS_SUCCESS = '[Users] Load Users Success'
}

export class LoadUsers implements Action {
  readonly type = ActionTypes.LOAD_USERS;
}

export class LoadUsersFailed implements Action {
  readonly type = ActionTypes.LOAD_USERS_FAILED;
}

export class LoadUsersSuccess implements Action {
  readonly type = ActionTypes.LOAD_USERS_SUCCESS;

  constructor(readonly payload: User[]) {}
}

export type Union = LoadUsers | LoadUsersFailed | LoadUsersSuccess;
