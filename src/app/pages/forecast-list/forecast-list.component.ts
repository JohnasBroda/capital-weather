import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherApiService } from 'app/api/services/weather/weather.service';
import { ForecastItemComponent } from 'app/components/forecast-item/forecast-item.component';
import { selectWeatherListWithLocationData } from 'app/data/weather/weather.selectors';
import { ILocation } from 'app/models/location';
import { first, forkJoin, map, switchMap } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule, ForecastItemComponent, TranslateModule],
    templateUrl: './forecast-list.component.html',
    styleUrls: ['./forecast-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastListComponent {
    private readonly router = inject(Router);

    private readonly geolocation$ = inject(GeolocationService);

    private readonly weatherApiService = inject(WeatherApiService);

    private readonly store = inject(Store);

    public readonly locations$ = this.store.select(selectWeatherListWithLocationData);

    public readonly userLocation$ = this.geolocation$.pipe(
        first(),
        map(({ coords: { latitude, longitude } }) => ({ latitude, longitude })),
        switchMap(({ latitude, longitude }) =>
            forkJoin([
                this.weatherApiService.reverseGeoCode(latitude, longitude),
                this.weatherApiService.getCurrentForecastFor(latitude, longitude)
            ]).pipe(
                map(([forecast, geoLocation]) => ({
                    ...forecast,
                    ...geoLocation
                }))
            )
        )
    );

    // locations: ILocation[] = [
    //     { country: 'Germany', city: 'Berlin' },
    //     { country: 'Germany', city: 'Hamburg' },
    //     { country: 'Germany', city: 'Munich' },
    //     { country: 'Germany', city: 'Cologne' },
    //     { country: 'Germany', city: 'Frankfurt' },
    //     { country: 'Germany', city: 'Stuttgart' },
    //     { country: 'Hungary', city: 'Budapest' }
    // ];

    // locations$ = forkJoin(
    //     this.locations.map(({ city, country }) =>
    //         this.weatherApiService.geoCode(city, country).pipe(
    //             switchMap((geoLocation) =>
    //                 this.weatherApiService
    //                     .getCurrentForecastFor(geoLocation.lat, geoLocation.lon)
    //                     .pipe(
    //                         map((forecast) => ({
    //                             ...forecast,
    //                             ...geoLocation
    //                         }))
    //                     )
    //             )
    //         )
    //     )
    // );

    public onSelect(location: ILocation): void {
        this.router.navigate(['/forecast-details'], { queryParams: location });
    }
}
