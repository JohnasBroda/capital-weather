import { ActionReducerMap } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface
export interface AppState {
    weather: fromWeather.WeatherState;
    country: fromCountry.CountryState;
}

export const reducers: ActionReducerMap<AppState> = {};
