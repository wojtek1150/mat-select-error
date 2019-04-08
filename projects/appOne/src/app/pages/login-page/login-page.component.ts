import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, currentUser } from 'main/core/store/reducers';
import { User } from 'main/core/models/user';
import { Navigate } from 'main/core/store/actions/router.actions';
import { GoogleOauthService } from 'main/core/services/google-oauth/google-auth.service';

@Component({
  selector: 'login-page',
  template: `
    <h2>Welcome to the APp</h2>
    <button (click)="login()" mat-raised-button color="primary">
      Login with Google Api
    </button>
  `
})
export class LoginPageComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  currentUser: User;

  constructor(private store: Store<AppState>, private googleAuth: GoogleOauthService) { }

  ngOnInit(): void {
    this.subscription.add(this.store.pipe(select(currentUser)).subscribe(user => this.currentUser = user));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    if (this.currentUser) {
      this.store.dispatch(new Navigate(['/home']));

    } else {
      this.googleAuth.signIn();
    }
  }
}
