import { SortDirection } from '@angular/material/sort';

export interface IFilterState {
  search?: string;
}

export interface ISortState {
  dir: SortDirection;
  field: string;
}

export interface IFilterEntitiesRequestConfig<TFilterState = IFilterState> {
  filter?: TFilterState;
  page?: number;
  perPage?: number;
  sort?: ISortState;
  [key: string]: any;
}
