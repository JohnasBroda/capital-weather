import { GeoCodeResponse } from 'app/models/open-weather';
import { getEntityInitialState, getEntityReducer } from 'app/store/entity.reducer';
import { actions } from './location.actions';

export const initialState = getEntityInitialState<GeoCodeResponse>();

// We don't care about the location ids, it's for the ngrx type compatibility
const LOCATIONS_DATA = {
    '1': { id: '1', country: 'Germany', name: 'Berlin' },
    '2': { id: '2', country: 'Germany', name: 'Hamburg' },
    '3': { id: '3', country: 'Germany', name: 'Munich' },
    '4': { id: '4', country: 'Germany', name: 'Cologne' },
    '5': { id: '5', country: 'Germany', name: 'Frankfurt' },
    '6': { id: '6', country: 'Germany', name: 'Stuttgart' }
} as Record<string, Partial<GeoCodeResponse>>;

export const reducer = getEntityReducer(actions, {
    entities: LOCATIONS_DATA as Record<string, GeoCodeResponse>
});
