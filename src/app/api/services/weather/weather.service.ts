import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
    GeoCodeResponse,
    ReverseGeoCodeResponse,
    WeatherForecastResponse
} from 'app/models/open-weather';
import { WeatherForecast5DayResponse } from 'app/models/open-weather-forecast';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherApiService {
    private readonly http = inject(HttpClient);

    public getCurrentForecastFor(lat: number, lon: number): Observable<WeatherForecastResponse> {
        return this.http.get<WeatherForecastResponse>(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    lat: lat.toString(),
                    lon: lon.toString(),
                    appid: environment.openWeatherApiKey,
                    units: 'metric'
                }
            }
        );
    }

    public getForecastFor(lat: number, lon: number): Observable<WeatherForecast5DayResponse> {
        return this.http.get<WeatherForecast5DayResponse>(
            `https://api.openweathermap.org/data/2.5/forecast`,
            {
                params: {
                    lat: lat.toString(),
                    lon: lon.toString(),
                    appid: environment.openWeatherApiKey,
                    units: 'metric'
                }
            }
        );
    }

    public geoCode(city: string, country: string): Observable<GeoCodeResponse> {
        return this.http
            .get<GeoCodeResponse[]>(`http://api.openweathermap.org/geo/1.0/direct`, {
                params: {
                    q: `${city},${country}`,
                    appid: environment.openWeatherApiKey,
                    limit: '1'
                }
            })
            .pipe(map((res) => res[0]));
    }

    public reverseGeoCode(lat: number, lon: number): Observable<ReverseGeoCodeResponse> {
        return this.http
            .get<ReverseGeoCodeResponse[]>(`http://api.openweathermap.org/geo/1.0/reverse`, {
                params: {
                    lat: lat.toString(),
                    lon: lon.toString(),
                    appid: environment.openWeatherApiKey
                }
            })
            .pipe(map((res) => res[0]));
    }
}
