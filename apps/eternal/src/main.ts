import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Configuration } from '@eternal/shared/config';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseUrlInterceptor } from '@eternal/shared/http';
import {
  LoadingInterceptor,
  sharedUiMessagingProvider,
} from '@eternal/shared/ui-messaging';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { securityProvider } from '@eternal/shared/security';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { sharedMasterDataProvider } from '@eternal/shared/master-data';
import { appRoutes } from './app/app.routes';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';

import localeDeAt from '@angular/common/locales/de-AT';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeDeAt, 'de-AT');

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument(),
      FormlyModule.forRoot({
        extras: { lazyRender: true },
        validationMessages: [
          {
            name: 'required',
            message: 'This field is mandatory',
          },
        ],
      }),
      FormlyMaterialModule
    ),
    securityProvider,
    sharedMasterDataProvider,
    sharedUiMessagingProvider,
    {
      provide: Configuration,
      useFactory: () => new Configuration(environment.baseUrl),
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT',
    },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: BaseUrlInterceptor },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: LoadingInterceptor },
    { provide: LOCALE_ID, useValue: 'de-AT' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
});
