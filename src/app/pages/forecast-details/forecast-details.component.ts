import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ForecastChartCardComponent } from 'app/components/forecast-chart-card/forecast-chart-card.component';
import { ForecastDataCardComponent } from 'app/components/forecast-data-card/forecast-data-card.component';
import { WeatherForecastResponse } from 'app/models/open-weather';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { selectWeatherWithLocationDataByCity } from '../../data/weather/weather.selectors';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ForecastDataCardComponent,
        ForecastChartCardComponent,
        RouterModule,
        MatIconModule,
        TranslateModule
    ],
    templateUrl: './forecast-details.component.html',
    styleUrls: ['./forecast-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastDetailsComponent {
    private readonly route = inject(ActivatedRoute);

    private readonly store = inject(Store);

    public weather$!: Observable<WeatherForecastResponse | undefined>;

    public ngOnInit(): void {
        this.weather$ = this.route.queryParams.pipe(
            map(({ country, city }) => ({ country, city })),
            switchMap(({ city }) => this.store.select(selectWeatherWithLocationDataByCity(city))),
            tap(console.log)
        );
    }
}
