import { Action } from '@ngrx/store';
import { AuthUser } from 'main/core/models/auth';
import { User } from 'main/core/models/user';

export enum ActionTypes {
  Authorize = '[Authentication] Authorize User',
  AuthorizeSuccess = '[Authentication] Authorized Successfully',
  Logout = '[Authentication] Logout User',
  LoginSuccess = '[Authentication] User Logged In',
  AuthorizeFailed = '[Authentication] Authorization Failed',
  LoginFailed = '[Authentication] Login User Failed'
}

export class Authorize implements Action {
  readonly type = ActionTypes.Authorize;
}

export class AuthorizeSuccess implements Action {
  readonly type = ActionTypes.AuthorizeSuccess;

  constructor(readonly payload: AuthUser) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess;

  constructor(readonly payload: User) {}
}

export class AuthorizeFailed implements Action {
  readonly type = ActionTypes.AuthorizeFailed;
}

export class LoginFailed implements Action {
  readonly type = ActionTypes.LoginFailed;
}

export type Union = Authorize | AuthorizeSuccess | Logout | LoginSuccess | AuthorizeFailed | LoginFailed;
