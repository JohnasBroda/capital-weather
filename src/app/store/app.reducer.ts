import { ActionReducer, ActionReducerMap, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { GeoCodeResponse, WeatherForecastResponse } from 'app/models/open-weather';
import { reducer as locationReducer } from '../data/location/location.reducer';
import { reducer as weatherReducer } from '../data/weather/weather.reducer';
import { IAppEntityState } from './entity.state';

export interface AppState {
    weather: IAppEntityState<WeatherForecastResponse>;
    location: IAppEntityState<GeoCodeResponse>;
}

export const reducers: ActionReducerMap<AppState> = {
    location: locationReducer,
    weather: weatherReducer
};

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const storageValue = sessionStorage.getItem('state');
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    sessionStorage.removeItem('state');
                }
            }
        }
        const nextState = reducer(state, action);

        try {
            sessionStorage.setItem('state', JSON.stringify(nextState));
        } catch (error) {
            console.log(error);
        }

        return nextState;
    };
};

export const APP_META_REDUCERS: MetaReducer<AppState>[] = [hydrationMetaReducer];
