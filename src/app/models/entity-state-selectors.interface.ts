import { Dictionary } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';
import { CallStateSelectorsMap } from 'app/store/call-state';
import { IEntityListStateSelectorsMap } from 'app/store/entity-list-state';
import { IAppEntityState } from 'app/store/entity.state';

export interface EntityStateSelectors<TEntity>
    extends IEntityListStateSelectorsMap,
        CallStateSelectorsMap {
    selectFeature: MemoizedSelector<object, IAppEntityState<TEntity>>;
    selectAllEntitiesList: MemoizedSelector<object, TEntity[]>;
    selectAllEntitiesMap: MemoizedSelector<object, Dictionary<TEntity>>;
    selectAllEntitiesIds: MemoizedSelector<object, string[]>;
    selectTotalEntities: MemoizedSelector<object, number>;
    selectEntityById: (id: string) => MemoizedSelector<object, TEntity | undefined>;
}
