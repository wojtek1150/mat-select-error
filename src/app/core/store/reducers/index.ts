import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from 'environments/environment';

import { authenticationReducer, AuthenticationState } from './authentication.reducer';
import { RouterStateUrl } from './router.reducer';

export interface AppState {
  auth: AuthenticationState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authenticationReducer,
  router: routerReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

// SELECTORS
export const selectAuth = (state: AppState) => state.auth;
export const selectRouter = (state: AppState) => state.router;
export const authState = createSelector(selectAuth, (state) => state.profile);
export const authorized = createSelector(selectAuth, (state) => state.authorized);
export const currentUser = createSelector(selectAuth, (state) => state.user);
export const isLoggedOut = createSelector(selectAuth, (state) => state.loggedOut);
export const routerState = createSelector(selectRouter, (state) => state.state);
