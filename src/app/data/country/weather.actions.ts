import { getEntityActions } from 'app/store/entity.actions';
import { weatherFeatureKey } from './weather.reducer';
import { IWeather } from './weather.model';

export const actions = getEntityActions<IWeather>(weatherFeatureKey);
