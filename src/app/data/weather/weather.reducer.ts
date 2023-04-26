import { WeatherForecastResponse } from 'app/models/open-weather';
import { getEntityInitialState, getEntityReducer } from 'app/store/entity.reducer';
import { actions } from './weather.actions';

export const initialState = getEntityInitialState<WeatherForecastResponse>();

export const reducer = getEntityReducer(actions);
