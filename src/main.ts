import { AdroitNgUtilsModule } from '@adroit-group/ng-utils';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { POSITION_OPTIONS } from '@ng-web-apis/geolocation';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_ROUTES } from 'app/app.routes';
import { LocationEffects } from 'app/data/location/location.effects';
import { WeatherEffects } from 'app/data/weather/weather.effects';
import { AppComponent } from './app/app.component';
import { APP_META_REDUCERS, reducers } from './app/store/app.reducer';

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

        provideHttpClient(),
        provideRouter(APP_ROUTES, withEnabledBlockingInitialNavigation()),

        provideStore(reducers, { metaReducers: APP_META_REDUCERS }),
        provideEffects([LocationEffects, WeatherEffects]),
        provideStoreDevtools({
            maxAge: 25
        }),

        {
            provide: POSITION_OPTIONS,
            useValue: { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 }
        }
    ]
}).catch((err) => console.error(err));
