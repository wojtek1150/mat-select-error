import { ActionReducerMap } from '@ngrx/store';
import { AppState } from 'main/core/store/reducers';
import { userReducer, UserState } from './user.reducer';


export interface State {
  user: UserState;
}

export interface ProjectState extends AppState {
  home: State;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer
};

