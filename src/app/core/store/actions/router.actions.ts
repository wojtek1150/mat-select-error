import { Action } from '@ngrx/store';

export enum ActionTypes {
  Navigate = '[Router] Navigate',
  NavigateToHome = '[Router] Navigate to Home',
  NavigateTo404 = '[Router] Navigate to 404',
  NavigateTo403 = '[Router] Navigate to 403',
  NavigateBack = '[Router] Navigate back',
}

export class Navigate implements Action {
  readonly type = ActionTypes.Navigate;

  constructor(readonly payload: any[]) {}
}

export class NavigateToHome implements Action {
  readonly type = ActionTypes.NavigateToHome;
}

export class NavigateTo404 implements Action {
  readonly type = ActionTypes.NavigateTo404;
}

export class NavigateTo403 implements Action {
  readonly type = ActionTypes.NavigateTo403;
}

export class NavigateBack implements Action {
  readonly type = ActionTypes.NavigateBack;
}

