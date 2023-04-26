import { WeatherForecastResponse } from 'app/models/open-weather';
import { getEntityActions } from 'app/store/entity.actions';
import { weatherFeatureKey } from './weather.state';

export const actions = getEntityActions<WeatherForecastResponse>(weatherFeatureKey);
