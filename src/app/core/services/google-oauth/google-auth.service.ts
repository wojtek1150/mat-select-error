import { Injectable } from '@angular/core';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { interval, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthUser } from 'main/core/models/auth';
import auth = gapi.auth2;

@Injectable()
export class GoogleOauthService {
  private _authState: ReplaySubject<AuthUser> = new ReplaySubject(1);
  private googleUser: auth.GoogleUser;
  private auth: auth.GoogleAuth;

  get authState(): Observable<AuthUser> {
    return this._authState.asObservable();
  }

  constructor(private googleAuthService: GoogleAuthService, private googleApiService: GoogleApiService) {
    this.googleApiService.onLoad().subscribe(() => {
      this.googleAuthService.getAuth().subscribe(auth => {
        this.auth = auth;
        if (this.auth.currentUser.get().isSignedIn()) {
          this.refreshToken();
        } else {
          this._authState.next(null);
        }
      });
      interval(20 * 60000).pipe(  // run every 20min
        tap(() => this.refreshToken())
      ).subscribe();
    });
  }

  public signIn(): void {
    this.auth.signIn({
      prompt: 'select_account',
      ux_mode: 'redirect',
      redirect_uri: window.location.origin
    });
  }

  public signOut(): void {
    this.auth.signOut();
    this._authState.next(null);
  }

  public refreshToken(): Promise<void> {
    return this.auth.currentUser.get().reloadAuthResponse().then(r => {
      this._authState.next(this.getProfile(r.id_token));
    });
  }

  private getProfile(token): AuthUser {
    const p = this.auth.currentUser.get().getBasicProfile();
    return p ? {
      id: p.getId(),
      displayName: p.getName(),
      email: p.getEmail(),
      firstName: p.getGivenName(),
      lastName: p.getFamilyName(),
      avatar: p.getImageUrl(),
      idToken: token
    } : null;
  }
}
