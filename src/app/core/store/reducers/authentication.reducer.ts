import { ActionTypes, Union } from '../actions/authentication.actions';
import { AuthUser } from 'main/core/models/auth';
import { User } from 'main/core/models/user';

export interface AuthenticationState {
  authorized: boolean;
  profile: AuthUser;
  user: User;
  loggedOut: boolean;
}

export const initialState: AuthenticationState = {
  authorized: false,
  profile: null,
  user: null,
  loggedOut: false
};

export function authenticationReducer(
  state = initialState,
  action: Union
): AuthenticationState {
  switch (action.type) {

    case ActionTypes.AuthorizeSuccess:
      return {
        ...state,
        profile: action.payload,
        loggedOut: false
      };

    case  ActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload,
        authorized: true,
        loggedOut: false
      };

    case ActionTypes.Logout:
      return {
        ...state,
        user: null,
        profile: null,
        authorized: false,
        loggedOut: true
      };

    case ActionTypes.AuthorizeFailed:
      return {
        ...state,
        user: null,
        profile: null
      };


    default:
      return state;
  }
}
