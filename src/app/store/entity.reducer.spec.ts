import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { ActionReducer, createFeatureSelector } from '@ngrx/store';
import { IFilterEntitiesRequestConfig } from '~common/models/filter-entities-request-config';
import { IFilterEntitiesResponse } from '~common/models/filter-entities-response';
import { LoadingState } from '~store/call-state';
import { getEntityActions } from '~store/entity.actions';
import { getEntityInitialState, getEntityReducer } from '~store/entity.reducer';
import { IAppEntityState } from '~store/entity.state';

const mockStateKey = 'test';
const mockFeatureSelector =
  createFeatureSelector<IAppEntityState<IEntity>>(mockStateKey);
const mockActions = getEntityActions(mockStateKey);
const mockInitialState = getEntityInitialState();

describe('EntityReducer', () => {
  let reducer: ActionReducer<IAppEntityState<IEntity>, any>;

  beforeEach(() => {
    reducer = getEntityReducer(mockActions);
  });

  it('should return the entity reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(mockInitialState);
  });

  it('should set the state on load action', () => {
    const mockLoadActionData = {
      filter: { search: 'test' },
      page: 0,
      perPage: 10,
      sort: {
        dir: 'asc',
        field: 'name',
      },
    } as IFilterEntitiesRequestConfig;

    const action = mockActions.load({
      data: mockLoadActionData,
    });

    const result = reducer(mockInitialState, action);

    expect(result.callState).toEqual(LoadingState.LOADING);
    // expect(result).toEqual(mockLoadActionData.filter.search);
    // expect(result.pageIndex).toEqual(mockLoadActionData.page);
    // expect(result.pageSize).toEqual(mockLoadActionData.perPage);
    // expect(result.sort).toEqual(mockLoadActionData.sort);
  });

  it('should set the call state to loaded', () => {
    const action = mockActions.loadsuccess({
      data: {
        data: [] as IEntity[],
        page: 0,
        perPage: 10,
        total: 0,
      } as IFilterEntitiesResponse<IEntity>,
    });
    const result = reducer(mockInitialState, action);

    expect(result.callState).toEqual(LoadingState.LOADED);
  });

  it('should set the call state to error', () => {
    const action = mockActions.loadfailure({ error: new Error('error') });
    const result = reducer(mockInitialState, action);

    expect(result.callState).toEqual({ errorMsg: 'error' });
  });
});
