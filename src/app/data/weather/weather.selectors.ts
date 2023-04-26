/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherForecastResponse } from 'app/models/open-weather';
import { getEntitySelectors } from 'app/store/entity.selectors';
import { IAppEntityState } from 'app/store/entity.state';
import { weatherFeatureKey } from './weather.state';
import { selectors as locationSelectors } from '../location/location.selectors';

export const selectFeatureState =
    createFeatureSelector<IAppEntityState<WeatherForecastResponse>>(weatherFeatureKey);

export const selectors = getEntitySelectors<
    WeatherForecastResponse,
    IAppEntityState<WeatherForecastResponse>
>(selectFeatureState);

export const selectWeatherForecastByCity = (city: string) =>
    createSelector(selectors.selectAllEntitiesList, (weatherList) =>
        weatherList.find((weather) => weather.name === city)
    );

export const selectWeatherListWithLocationData = createSelector(
    selectors.selectAllEntitiesList,
    locationSelectors.selectFeature,
    (weatherList, locationState) =>
        weatherList.map((weather) => ({
            ...weather,
            ...(Object.values(locationState.entities).find(
                (location) => location?.name === weather?.name
            ) ?? {})
        }))
);

export const selectWeatherWithLocationDataByCity = (city: string) =>
    createSelector(selectWeatherListWithLocationData, (weatherList) =>
        weatherList.find((weather) => weather?.name === city)
    );
