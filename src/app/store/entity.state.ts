import { EntityState } from '@ngrx/entity';
import { AsyncState } from './call-state';
import { IEntityListState } from './entity-list-state';

export type IAppEntityState<T> = EntityState<T> & AsyncState & IEntityListState;
