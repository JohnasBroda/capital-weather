import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { WeatherApiService } from 'app/api/services/weather/weather.service';
import { GeoCodeResponse } from 'app/models/open-weather';
import { AppState } from 'app/store/app.reducer';
import { forkJoin, of } from 'rxjs';
import { catchError, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { actions } from './location.actions';
import { selectors } from './location.selectors';

@Injectable()
export class LocationEffects {
    initLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            withLatestFrom(this.store.select(selectors.selectFeature)),
            first(),
            map(([_, locationFeature]) =>
                Object.values(locationFeature.entities).filter(
                    (location) => !location?.lat && !location?.lon
                )
            ),
            map((initLocations) => actions.load({ data: { locations: initLocations } }))
        )
    );

    loadLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.load),
            switchMap(({ data: { locations } }) =>
                forkJoin(
                    (locations as GeoCodeResponse[]).map(({ name, country, id }) =>
                        this.weatherApiService.geoCode(name, country).pipe(
                            map((loadedLocation) => ({
                                ...loadedLocation,
                                id
                            }))
                        )
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
