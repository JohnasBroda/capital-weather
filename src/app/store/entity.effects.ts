/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { HttpContext } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionGroup } from '@ngrx/store/src/action_group_creator_models';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, concatMap, filter, map } from 'rxjs/operators';
import { BaseApiService } from '~api';
import { isNonNullable } from '~common/helpers/type-guard-helper';
import { EntityStateActions } from '~common/interfaces/entity-state-actions.interface';
import {
  IFilterEntitiesRequestConfig,
  IFilterState,
} from '~common/models/filter-entities-request-config';
import { IFilterEntitiesResponse } from '~common/models/filter-entities-response';

/**
 * Base class for entity effects.
 *
 * Override the api methods to hook into their corresponding effects.
 */
export abstract class EntityEffectsBase<
  TApiEntity,
  TEntity extends IEntity,
  TFilterState extends unknown = IFilterState,
> {
  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.load),
      filter(() => typeof this.loadApiMethod === 'function'),
      concatMap((action) =>
        this.loadApiMethod!.call(this.apiService, {
          body: action.data as IFilterEntitiesRequestConfig<TFilterState>,
        }).pipe(
          map((res) =>
            this.entityActions.loadsuccess({
              data: {
                ...res,
                data:
                  res.data?.map((entity) =>
                    this.transformApiEntityToEntity(entity),
                  ) ?? ([] as TEntity[]),
              },
            }),
          ),
          catchError((error) => of(this.entityActions.loadfailure({ error }))),
        ),
      ),
    ),
  );

  public readonly add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.add),
      filter(() => typeof this.addApiMethod === 'function'),
      concatMap((action) =>
        this.addApiMethod!.call(this.apiService, {
          body: action.data,
        }).pipe(
          map((res) =>
            this.entityActions.addsuccess({
              data: this.transformApiEntityToEntity(res),
            }),
          ),
          catchError((error) => of(this.entityActions.addfailure({ error }))),
        ),
      ),
    ),
  );

  public readonly addMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.addmany),
      filter(() => typeof this.addApiMethod === 'function'),
      concatMap((action) =>
        forkJoin(
          action.data.map((entity) =>
            this.addApiMethod!.call(this.apiService, {
              body: entity,
            }),
          ),
        ).pipe(
          map((responses) =>
            this.entityActions.addmanysuccess({
              data: this.transformApiEntityListToEntityList(responses),
            }),
          ),
          catchError((error) =>
            of(this.entityActions.addmanyfailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.update),
      filter(() => typeof this.updateApiMethod === 'function'),
      concatMap((action) =>
        this.updateApiMethod!.call(this.apiService, {
          id: action.data.id,
          body: action.data,
        }).pipe(
          map((res) =>
            this.entityActions.updatesuccess({
              data: this.transformApiEntityToEntity(res),
            }),
          ),
          catchError((error) =>
            of(this.entityActions.updatefailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly upsert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.upsert),
      filter(() => typeof this.addApiMethod === 'function'),
      concatMap((action) =>
        this.addApiMethod!.call(this.apiService, {
          body: action.data,
        }).pipe(
          map((res) =>
            this.entityActions.upsertsuccess({
              data: this.transformApiEntityToEntity(res),
            }),
          ),
          catchError((error) =>
            of(this.entityActions.upsertfailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly upsertMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.upsertmany),
      filter(() => typeof this.addApiMethod === 'function'),
      concatMap((action) =>
        forkJoin(
          action.data.map((entity) =>
            this.addApiMethod!.call(this.apiService, {
              body: entity,
            }),
          ),
        ).pipe(
          map((responses) =>
            this.entityActions.upsertmanysuccess({
              data: this.transformApiEntityListToEntityList(responses),
            }),
          ),
          catchError((error) =>
            of(this.entityActions.upsertmanyfailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly updateMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.updatemany),
      filter(() => typeof this.updateApiMethod === 'function'),
      concatMap((action) =>
        forkJoin(
          action.data.map((entity) =>
            this.updateApiMethod!.call(this.apiService, {
              id: entity.id,
              body: entity,
            }),
          ),
        ).pipe(
          map((responses) =>
            this.entityActions.updatemanysuccess({
              data: this.transformApiEntityListToEntityList(responses),
            }),
          ),
          catchError((error) =>
            of(this.entityActions.updatemanyfailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.delete),
      filter(() => typeof this.deleteApiMethod === 'function'),
      concatMap((action) =>
        this.deleteApiMethod!.call(this.apiService, {
          id: action.data.id,
        }).pipe(
          map((res) =>
            this.entityActions.deletesuccess({
              data: this.transformApiEntityToEntity(res),
            }),
          ),
          catchError((error) =>
            of(this.entityActions.deletefailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly deleteMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.entityActions.deletemany),
      filter(() => typeof this.deleteApiMethod === 'function'),
      concatMap((action) =>
        forkJoin(
          action.data.map((entity) =>
            this.deleteApiMethod!.call(this.apiService, {
              id: entity.id,
            }),
          ),
        ).pipe(
          map((responses) =>
            this.entityActions.deletemanysuccess({
              data: this.transformApiEntityListToEntityList(responses),
            }),
          ),
          catchError((error) =>
            of(this.entityActions.deletemanyfailure({ error })),
          ),
        ),
      ),
    ),
  );

  public loadApiMethod?: (params: {
    context?: HttpContext;
    body: IFilterEntitiesRequestConfig<TFilterState>;
  }) => Observable<IFilterEntitiesResponse<TApiEntity>>;

  public addApiMethod?: (params: {
    context?: HttpContext;
    body: TEntity;
  }) => Observable<TApiEntity>;

  public updateApiMethod?: (params: {
    id: string;
    context?: HttpContext;
    body: TEntity;
  }) => Observable<TApiEntity>;

  public deleteApiMethod?: (params: {
    id: string;
    context?: HttpContext;
  }) => Observable<TApiEntity>;

  constructor(
    protected readonly actions$: Actions,
    protected readonly entityActions: ActionGroup<
      string,
      EntityStateActions<TEntity>
    >,
    protected readonly apiService: BaseApiService,
  ) {}

  protected transformApiEntityListToEntityList(
    apiEntityList: (TApiEntity | null)[],
  ): TEntity[] {
    return apiEntityList
      .map((data) => this.transformApiEntityToEntity(data))
      .filter(isNonNullable);
  }

  public abstract transformApiEntityToEntity(
    apiEntity?: TApiEntity | null,
  ): TEntity;
}
