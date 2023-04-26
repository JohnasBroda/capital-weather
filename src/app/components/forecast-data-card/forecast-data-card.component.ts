import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GeoCodeResponse, WeatherForecastResponse } from 'app/models/open-weather';
import { DegreePipe } from 'app/pipes/degree.pipe';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

@Component({
    selector: 'app-forecast-data-card',
    standalone: true,
    imports: [CommonModule, MatIconModule, DegreePipe, WeatherIconComponent],
    templateUrl: './forecast-data-card.component.html',
    styleUrls: ['./forecast-data-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastDataCardComponent {
    @Input() public weather!: Partial<WeatherForecastResponse & GeoCodeResponse> & IEntity;
}
