import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { WeatherApiService } from 'app/api/services/weather/weather.service';
import { GeoCodeResponse } from 'app/models/open-weather';
import { AppState } from 'app/store/app.reducer';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { actions as locationActions } from '../location/location.actions';
import { actions } from './weather.actions';
import { selectors } from './weather.selectors';

@Injectable()
export class WeatherEffects {
    initWeathers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(locationActions.loadsuccess),
            withLatestFrom(this.store.select(selectors.selectAllEntitiesList)),
            map(
                ([loadedLocationsData, weatherList]) =>
                    loadedLocationsData?.data?.data?.filter((loadedLocation) =>
                        weatherList.every((weather) => weather.name !== loadedLocation.name)
                    ) ?? []
            ),
            map((locationsWithoutLoadedWeatherData) =>
                actions.load({ data: { locations: locationsWithoutLoadedWeatherData } })
            )
        )
    );

    loadWeathers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.load),
            switchMap(({ data: { locations } }) =>
                forkJoin(
                    (locations as GeoCodeResponse[]).map(({ lat, lon }) =>
                        this.weatherApiService.getCurrentForecastFor(lat, lon)
                    )
                ).pipe(
                    map((locations) => actions.loadsuccess({ data: { data: locations } })),
                    catchError((err) => of(actions.loadfailure({ error: err })))
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly weatherApiService: WeatherApiService
    ) {}
}
