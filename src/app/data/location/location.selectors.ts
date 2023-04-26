import { createFeatureSelector } from '@ngrx/store';
import { GeoCodeResponse } from 'app/models/open-weather';
import { getEntitySelectors } from 'app/store/entity.selectors';
import { IAppEntityState } from 'app/store/entity.state';
import { locationFeatureKey } from './location.state';

export const selectFeatureState =
    createFeatureSelector<IAppEntityState<GeoCodeResponse>>(locationFeatureKey);

export const selectors = getEntitySelectors<GeoCodeResponse, IAppEntityState<GeoCodeResponse>>(
    selectFeatureState
);

