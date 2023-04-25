import { getEntityInitialState, getEntityReducer } from 'app/store/entity.reducer';
import * as UserActions from './weather.actions';
import { IWeather } from './weather.model';

export const weatherFeatureKey = 'weather';

export const initialState = getEntityInitialState<IWeather>();

export const reducer = getEntityReducer(UserActions.actions);
