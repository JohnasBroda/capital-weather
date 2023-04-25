import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IWeather } from 'app/data/country/weather.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private readonly http = inject(HttpClient);

    public getWeatherData(): Observable<IWeather[]> {
      return this.http.get<IWeather[]>();
    }
}
