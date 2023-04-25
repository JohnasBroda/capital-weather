import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Dictionary } from '@ngrx/entity';
import { Action, createFeatureSelector } from '@ngrx/store';
import { hot } from 'jest-marbles';
import { ReplaySubject, of } from 'rxjs';
import { BaseApiService } from '~api';
import { IFilterEntitiesRequestConfig } from '~common/models/filter-entities-request-config';
import { LoadingState } from '~store/call-state';
import { getEntityActions } from '~store/entity.actions';
import { EntityEffectsBase } from '~store/entity.effects';
import { getEntitySelectors } from '~store/entity.selectors';
import { IAppEntityState } from '~store/entity.state';

let actions$ = new ReplaySubject<Action>();
const mockStateKey = 'test';
const mockFeatureSelector =
  createFeatureSelector<IAppEntityState<IEntity>>(mockStateKey);
const mockActions = getEntityActions(mockStateKey);
const mockSelectors = getEntitySelectors(mockFeatureSelector);
const mockInitialState: IAppEntityState<IEntity> = {
  ids: [] as string[],
  entities: {} as Dictionary<IEntity>,
  callState: LoadingState.INIT,
  pageIndex: 1,
  pageSize: 10,
  total: 0,
  filter: { search: '' },
  sort: { dir: 'asc', field: 'name' },
};

@Injectable()
class MockApiService extends BaseApiService {
  public list() {
    return of({ data: [{ id: '1' }], page: 1, perPage: 10, total: 10 });
  }

  public update(data: IEntity) {
    return of({ id: '2' });
  }

  public create() {
    return of({ id: '1' });
  }

  public delete() {
    return of({ id: '1' });
  }
}

@Injectable()
class MockEntityEffects extends EntityEffectsBase<IEntity, IEntity> {
  public override loadApiMethod = this.apiService.list;

  public override addApiMethod = this.apiService.create;

  public override updateApiMethod = this.apiService.update;

  public override deleteApiMethod = this.apiService.delete;

  constructor(protected override readonly apiService: MockApiService) {
    super(actions$, mockActions, apiService);
  }

  public override transformApiEntityToEntity(apiEntity: IEntity): IEntity {
    return apiEntity;
  }
}

describe('EntityEffectsBase', () => {
  let effects: MockEntityEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockEntityEffects, MockApiService],
    });

    effects = TestBed.inject(MockEntityEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should react to load action', () => {
    const mockLoadActionData = {
      filter: { search: 'test' },
      page: 0,
      perPage: 10,
      sort: {
        dir: 'asc',
        field: 'name',
      },
    } as IFilterEntitiesRequestConfig;

    actions$.next(mockActions.load({ data: mockLoadActionData }));

    const expected = hot('a', {
      a: mockActions.loadsuccess({
        data: {
          data: [{ id: '1' }],
          page: 1,
          perPage: 10,
          total: 10,
        },
      }),
    });

    expect(effects.load$).toBeObservable(expected);
  });
});
