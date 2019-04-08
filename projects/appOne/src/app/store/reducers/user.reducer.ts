import { ActionTypes, Union } from '../actions/user.actions';
import { User } from 'main/modules/users/models/user';

interface Entities {
  [id: string]: User;
}

export interface UserState {
  entities: Entities;
  usersLoading: boolean;
  usersLoaded: boolean;
}

export const initialState: UserState = {
  entities: {},
  usersLoading: false,
  usersLoaded: false
};


export function userReducer(
  state = initialState,
  action: Union
): UserState {
  switch (action.type) {

    case ActionTypes.LOAD_USERS:
      return {
        ...state,
        usersLoading: true
      };

    case ActionTypes.LOAD_USERS_SUCCESS:
      const entities = action.payload.reduce((previous: Entities, current) => ({ ...previous, [current.id]: current }), { ...state.entities });
      return {
        ...state,
        usersLoading: false,
        usersLoaded: true,
        entities
      };

    case ActionTypes.LOAD_USERS_FAILED:
      return {
        ...state,
        usersLoading: false,
        usersLoaded: false
      };


    default:
      return state;
  }
}
