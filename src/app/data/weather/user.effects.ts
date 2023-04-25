/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/use-injectable-provided-in */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserTransformer } from '~common/transformers/user.transformer';
import * as PermissionActions from '~permissions-store/permission.actions';
import * as UserActions from '~user-store/user.actions';

@Injectable()
export class UserEffects {
  public loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      concatMap((action) =>
        this.userApiService.userMe().pipe(
          map((data) =>
            UserActions.loadUserSuccess({
              data: {
                user: UserTransformer.publicUserEntityToUser(data),
                navigateTo: action.data.navigateTo,
              },
            }),
          ),
          catchError((error) => of(UserActions.loadUserFailure({ error }))),
        ),
      ),
    );
  });

  public loadUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserSuccess),
      tap(
        (action) =>
          action.data.navigateTo &&
          this.router.navigate(action.data.navigateTo),
      ),
      map(() => PermissionActions.loadRoles()),
    ),
  );

  constructor(private readonly actions$: Actions) {}
}
