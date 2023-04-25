/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { createEntityAdapter } from '@ngrx/entity';
import { MemoizedSelector, createSelector } from '@ngrx/store';
import { EntityStateSelectors } from '~common/interfaces/entity-state-selectors.interface';
import { getCallStateSelectors } from './call-state';
import { getEntityListStateSelectors } from './entity-list-state';
import { IAppEntityState } from './entity.state';

/**
 * Creates all the necessary selectors for the entity state.
 */
export function getEntitySelectors<
  TEntity extends IEntity,
  TState extends IAppEntityState<TEntity>,
>(
  selectFeature: MemoizedSelector<object, TState>,
): EntityStateSelectors<TEntity> {
  const adapter = createEntityAdapter<TEntity>();

  const { selectIds, selectEntities, selectAll, selectTotal } =
    adapter.getSelectors();

  const selectAllEntitiesList = createSelector(selectFeature, selectAll);
  const selectAllEntitiesMap = createSelector(selectFeature, selectEntities);
  const selectAllEntitiesIds = createSelector(selectFeature, (state) =>
    selectIds(state).map((id) => id.toString()),
  );
  const selectTotalEntities = createSelector(selectFeature, selectTotal);
  const selectEntityById = (
    id: string,
  ): MemoizedSelector<object, TEntity | undefined> =>
    createSelector(selectAllEntitiesMap, (entitiesDict) => entitiesDict[id]);

  return {
    ...getEntityListStateSelectors(selectFeature),
    ...getCallStateSelectors(selectFeature),
    selectFeature: selectFeature as any,
    selectAllEntitiesList,
    selectAllEntitiesMap,
    selectAllEntitiesIds,
    selectTotalEntities,
    selectEntityById,
  };
}
