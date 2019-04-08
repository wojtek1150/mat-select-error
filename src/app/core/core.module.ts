import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
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
export class CoreModule {
  socialLinks = ['customLink', 'facebook', 'github', 'googlePlus', 'linkedin', 'medium', 'stackoverflow', 'twitter', 'website'];

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
    // Register social icons on module start
    this.socialLinks.forEach(medium => {
      this.matIconRegistry.addSvgIcon(medium, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/social/${medium}.svg`));
    });
  }
}
