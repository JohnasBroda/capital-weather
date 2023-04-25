/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ActionGroup } from '@ngrx/store/src/action_group_creator_models';
import { EntityStateActions } from '~common/interfaces/entity-state-actions.interface';
import { IFilterEntitiesRequestConfig } from '~common/models/filter-entities-request-config';
import { IFilterEntitiesResponse } from '~common/models/filter-entities-response';

/**
 * Creates all the necessary actions for the entity state.
 */
export function getEntityActions<E extends IEntity>(
  entityStateKey: string,
): ActionGroup<string, EntityStateActions<E>> {
  const source = `[${entityStateKey}]`;

  const config = {
    source,
    events: {
      load: props<{ data: IFilterEntitiesRequestConfig }>(),
      loadsuccess: props<{ data: IFilterEntitiesResponse<E> }>(),
      loadfailure: props<{ error: Error }>(),

      add: props<{ data: E }>(),
      addsuccess: props<{ data: E }>(),
      addfailure: props<{ error: Error }>(),

      addMany: props<{ data: E[] }>(),
      addManysuccess: props<{ data: E[] }>(),
      addManyfailure: props<{ error: Error }>(),

      update: props<{ data: E }>(),
      updatesuccess: props<{ data: E }>(),
      updatefailure: props<{ error: Error }>(),

      updateMany: props<{ data: E[] }>(),
      updateManysuccess: props<{ data: E[] }>(),
      updateManyfailure: props<{ error: Error }>(),

      delete: props<{ data: E }>(),
      deletesuccess: props<{ data: E }>(),
      deletefailure: props<{ error: Error }>(),

      deleteMany: props<{ data: E[] }>(),
      deleteManysuccess: props<{ data: E[] }>(),
      deleteManyfailure: props<{ error: Error }>(),

      upsert: props<{ data: E }>(),
      upsertsuccess: props<{ data: E }>(),
      upsertfailure: props<{ error: Error }>(),

      upsertMany: props<{ data: E[] }>(),
      upsertManysuccess: props<{ data: E[] }>(),
      upsertManyfailure: props<{ error: Error }>(),

      clear: emptyProps(),
    },
  };

  // createActionGroup doesn't like dynamic strings, we have to force type cast here
  return createActionGroup(config as any);
}
