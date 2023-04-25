/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createFeatureSelector } from '@ngrx/store';
import { getEntitySelectors } from 'app/store/entity.selectors';
import { IAppEntityState } from 'app/store/entity.state';
import { IWeather } from './weather.model';
import { weatherFeatureKey } from './weather.reducer';

export const selectFeatureState =
    createFeatureSelector<IAppEntityState<IWeather>>(weatherFeatureKey);

export const selectors = getEntitySelectors(selectFeatureState);
