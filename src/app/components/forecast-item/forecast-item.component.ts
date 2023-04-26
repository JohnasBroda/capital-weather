import { AdroitNgUtilsModule } from '@adroit-group/ng-utils';
import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GeoCodeResponse, WeatherForecastResponse } from 'app/models/open-weather';
import { DegreePipe } from 'app/pipes/degree.pipe';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

@Component({
    selector: 'app-forecast-item',
    standalone: true,
    imports: [CommonModule, MatIconModule, WeatherIconComponent, AdroitNgUtilsModule, DegreePipe],
    templateUrl: './forecast-item.component.html',
    styleUrls: ['./forecast-item.component.scss']
})
export class ForecastItemComponent {
    @Input() public forecast!: Partial<WeatherForecastResponse & GeoCodeResponse> & IEntity;
}
