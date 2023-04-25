import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { createFeatureSelector } from '@ngrx/store';
import { IAppEntityState } from '~store/entity.state';
import { getEntityListStateSelectors } from './entity-list-state';

describe('EntityListState', () => {
  it('should return the entity list state selectors', () => {
    const featureSelector =
      createFeatureSelector<IAppEntityState<IEntity>>('test');
    const selectors = getEntityListStateSelectors(featureSelector);
    expect(selectors.selectPageIndex({ test: { pageIndex: 1 } })).toBe(1);
    expect(selectors.selectPageSize({ test: { pageSize: 10 } })).toBe(10);
    expect(selectors.selectFilter({ test: { filter: 'test' } })).toBe('test');
    expect(
      selectors.selectSort({ test: { sort: { dir: 'asc', field: 'test' } } }),
    ).toEqual({
      dir: 'asc',
      field: 'test',
    });
    expect(
      selectors.selectSortDir({
        test: { sort: { dir: 'asc', field: 'test' } },
      }),
    ).toBe('asc');
    expect(
      selectors.selectSortField({
        test: { sort: { dir: 'asc', field: 'test' } },
      }),
    ).toBe('test');
  });
});
