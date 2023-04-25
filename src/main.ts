import { AdroitNgUtilsModule } from '@adroit-group/ng-utils';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_ROUTES } from 'app/app.routes';
import { AppComponent } from './app/app.component';
import { reducers } from './app/store/app.reducer';
import { environment } from './environments/environment';

function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AdroitNgUtilsModule.forRoot()),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient]
                },
                useDefaultLang: true,
                defaultLanguage: 'en'
            })
        ),
        importProvidersFrom(BrowserModule),
        importProvidersFrom(
            ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: true,
                // Register the ServiceWorker as soon as the application is stable
                registrationStrategy: 'registerWhenStable:3000'
            })
        ),

        provideHttpClient(),
        provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation()),

        provideStore(reducers),
        provideEffects([]),

        ...(environment.production
            ? [
                  provideStoreDevtools({
                      maxAge: 25
                  })
              ]
            : [])
    ]
}).catch((err) => console.error(err));
