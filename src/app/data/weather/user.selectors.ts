/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUser } from '~models/user/user.interface';
import { getCallStateSelectors } from '~store/call-state';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey,
);

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user as IUser,
);

export const selectUserRole = createSelector(selectUser, (user) => user?.role);

export const selectUserAvatar = createSelector(
  selectUser,
  (user) => user?.avatar,
);

export const {
  selectCallState,
  selectIsLoaded,
  selectIsLoading,
  selectLoadingError,
} = getCallStateSelectors(selectUserState);
