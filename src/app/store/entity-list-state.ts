import { SortDirection } from '@angular/material/sort';
import { MemoizedSelector, createSelector } from '@ngrx/store';
import { IFilterState, ISortState } from '../models/filter-entities-request-config';

export interface IEntityListState {
    pageIndex?: number;
    pageSize?: number;
    total?: number;
    filter?: IFilterState;
    sort?: ISortState;
}

export interface IEntityListStateSelectorsMap {
    selectPageIndex: MemoizedSelector<object, number | undefined>;
    selectPageSize: MemoizedSelector<object, number | undefined>;
    selectFilter: MemoizedSelector<object, IFilterState | undefined>;
    selectSort: MemoizedSelector<object, ISortState | undefined>;
    selectSortDir: MemoizedSelector<object, SortDirection | undefined>;
    selectSortField: MemoizedSelector<object, string | undefined>;
}

export function getEntityListStateSelectors<T extends IEntityListState>(
    featureSelector: MemoizedSelector<object, T>
): IEntityListStateSelectorsMap {
    return {
        selectPageIndex: createSelector(featureSelector, (state) => state.pageIndex),
        selectPageSize: createSelector(featureSelector, (state) => state.pageSize),
        selectFilter: createSelector(featureSelector, (state) => state.filter),
        selectSort: createSelector(featureSelector, (state) => state.sort),
        selectSortDir: createSelector(featureSelector, (state) => state.sort?.dir),
        selectSortField: createSelector(featureSelector, (state) => state.sort?.field)
    };
}
