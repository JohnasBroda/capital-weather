/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { createEntityAdapter } from '@ngrx/entity';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { ActionGroup } from '@ngrx/store/src/action_group_creator_models';

import { EntityStateActions } from '../models/entity-state-actions.interface';
import { LoadingState, getCallStateAdapter } from './call-state';
import { IAppEntityState } from './entity.state';

export function getEntityInitialState<Entity extends IEntity>(): IAppEntityState<Entity> {
    const adapter = createEntityAdapter<Entity>();

    return adapter.getInitialState({
        callState: LoadingState.INIT,
        filter: {},
        pageIndex: 0,
        pageSize: 10,
        total: 0,
        sort: {
            field: '',
            dir: 'asc'
        }
    });
}

/**
 * Utility function to create an entity reducer.
 *
 * The created reducer contains actions for all common CRUD operations as well as their xMAny pairs.
 */
export function getEntityReducer<TEntity extends IEntity, TState extends IAppEntityState<TEntity>>(
    actions: ActionGroup<string, EntityStateActions<TEntity>>,
    customInitialState?: Partial<TState>
): ActionReducer<TState, any> {
    const adapter = createEntityAdapter<TEntity>();
    const callStateAdapter = getCallStateAdapter<TState>();

    const initialState = getEntityInitialState<TEntity>();
    const mergedInitialState = {
        ...initialState,
        ...(customInitialState ?? {})
    } as TState;

    return createReducer(
        mergedInitialState,

        on(actions.add, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.addsuccess, (state, action) => ({
            ...adapter.addOne(action.data, state),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.addfailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.addmany, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.addmanysuccess, (state, action) => ({
            ...adapter.addMany(action.data, state),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.addmanyfailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.clear, (state) => adapter.removeAll(state)),

        on(actions.delete, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.deletesuccess, (state, action) => ({
            ...adapter.removeOne(action.data.id, state),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.deletefailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.deletemany, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.deletemanysuccess, (state, action) => ({
            ...adapter.removeMany(
                action.data.map((e) => e.id),
                state
            ),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.deletemanyfailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.load, (state, { data: { filter, page, perPage, sort } }) => ({
            ...state,
            ...(callStateAdapter.setLoading(state as any) as any),
            filter,
            pageIndex: page,
            pageSize: perPage,
            sort
        })),
        on(actions.loadsuccess, (state, action) => ({
            ...state,
            ...callStateAdapter.setLoaded(adapter.upsertMany(action.data.data!, state) as TState),
            total: action.data.total
        })),
        on(
            actions.loadfailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.upsert, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.upsertsuccess, (state, action) => ({
            ...adapter.upsertOne(action.data, state),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.upsertfailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.upsertmany, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.upsertmanysuccess, (state, action) => ({
            ...adapter.upsertMany(action.data, state),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.upsertmanyfailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.update, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.updatesuccess, (state, action) => ({
            ...adapter.updateOne({ id: action.data.id, changes: action.data }, state),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.updatefailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        ),

        on(actions.updatemany, (state) => callStateAdapter.setLoading(state as any) as any),
        on(actions.updatemanysuccess, (state, action) => ({
            ...adapter.updateMany(
                action.data.map((e) => ({ id: e.id, changes: e })),
                state
            ),
            ...(callStateAdapter.setLoaded(state as any) as any)
        })),
        on(
            actions.updatemanyfailure,
            (state, action) => callStateAdapter.setError(state as any, action.error) as any
        )
    );
}
