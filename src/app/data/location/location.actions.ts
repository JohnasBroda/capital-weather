import { GeoCodeResponse } from 'app/models/open-weather';
import { getEntityActions } from '../../store/entity.actions';
import { locationFeatureKey } from './location.state';

export const actions = getEntityActions<GeoCodeResponse>(locationFeatureKey);
