import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { ActionCreatorProps } from '@ngrx/store';
import { IFilterEntitiesRequestConfig } from './filter-entities-request-config';
import { IFilterEntitiesResponse } from './filter-entities-response';

export interface EntityStateActions<T extends IEntity> {
    load: ActionCreatorProps<{ data: IFilterEntitiesRequestConfig }>;
    loadSuccess: ActionCreatorProps<{ data: IFilterEntitiesResponse<T> }>;
    loadFailure: ActionCreatorProps<{ error: Error }>;

    add: ActionCreatorProps<{ data: T }>;
    addSuccess: ActionCreatorProps<{ data: T }>;
    addFailure: ActionCreatorProps<{ error: Error }>;

    addMany: ActionCreatorProps<{ data: T[] }>;
    addManySuccess: ActionCreatorProps<{ data: T[] }>;
    addManyFailure: ActionCreatorProps<{ error: Error }>;

    update: ActionCreatorProps<{ data: T }>;
    updateSuccess: ActionCreatorProps<{ data: T }>;
    updateFailure: ActionCreatorProps<{ error: Error }>;

    updateMany: ActionCreatorProps<{ data: T[] }>;
    updateManySuccess: ActionCreatorProps<{ data: T[] }>;
    updateManyFailure: ActionCreatorProps<{ error: Error }>;

    delete: ActionCreatorProps<{ data: T }>;
    deleteSuccess: ActionCreatorProps<{ data: T }>;
    deleteFailure: ActionCreatorProps<{ error: Error }>;

    deleteMany: ActionCreatorProps<{ data: T[] }>;
    deleteManySuccess: ActionCreatorProps<{ data: T[] }>;
    deleteManyFailure: ActionCreatorProps<{ error: Error }>;

    upsert: ActionCreatorProps<{ data: T }>;
    upsertSuccess: ActionCreatorProps<{ data: T }>;
    upsertFailure: ActionCreatorProps<{ error: Error }>;

    upsertMany: ActionCreatorProps<{ data: T[] }>;
    upsertManySuccess: ActionCreatorProps<{ data: T[] }>;
    upsertManyFailure: ActionCreatorProps<{ error: Error }>;

    clear: ActionCreatorProps<void>;

    // The ActionGroup type signature requires the events generic type param to have an index signature
    [key: string]: ActionCreatorProps<unknown>;
}
