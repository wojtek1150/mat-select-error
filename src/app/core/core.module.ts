import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig } from 'ng-gapi';
import { environment } from 'environments/environment';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { AuthenticationEffects } from './store/effects/authentication.effects';
import { RouterEffects } from './store/effects/router.effects';
import { CustomSerializer } from './store/reducers/router.reducer';
import { GoogleOauthService } from './services/google-oauth/google-auth.service';
import { metaReducers, reducers } from './store/reducers';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: environment.oauthClient,
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: 'profile email'
};

@NgModule({
  imports: [
    CommonModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: !environment.production, name: 'AppNAme' }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthenticationEffects, RouterEffects])
  ],
  declarations: [],
  exports: [],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: GoogleOauthService, useClass: GoogleOauthService },
  ]
})
export class CoreModule {}
