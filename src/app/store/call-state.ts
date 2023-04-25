/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MemoizedSelector, createSelector } from '@ngrx/store';

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

// Helper function to extract error, if there is one.
export function getError(callState: CallState): string | null {
  if ((callState as ErrorState).errorMsg !== undefined) {
    return (callState as ErrorState).errorMsg;
  }

  return null;
}

export interface AsyncState {
  callState: CallState;
}

export interface CallStateSelectorsMap {
  selectCallState: MemoizedSelector<object, CallState>;
  selectIsLoading: MemoizedSelector<object, boolean>;
  selectIsLoaded: MemoizedSelector<object, boolean>;
  selectLoadingError: MemoizedSelector<object, string | null>;
}

export function getCallStateSelectors<T extends AsyncState>(
  featureSelector: MemoizedSelector<object, T>,
): CallStateSelectorsMap {
  return {
    selectCallState: createSelector(
      featureSelector,
      (state) => state.callState,
    ),
    selectIsLoading: createSelector(
      featureSelector,
      (state) => state.callState === LoadingState.LOADING,
    ),
    selectIsLoaded: createSelector(
      featureSelector,
      (state) => state.callState === LoadingState.LOADED,
    ),
    selectLoadingError: createSelector(featureSelector, (state) =>
      getError(state.callState),
    ),
  };
}

export function getCallStateAdapter<S>() {
  return {
    setError: (state: S, error: Error): S => ({
      ...state,
      callState: { errorMsg: error.message },
    }),
    setLoading: (state: S): S => ({
      ...state,
      callState: LoadingState.LOADING,
    }),
    setLoaded: (state: S): S => ({
      ...state,
      callState: LoadingState.LOADED,
    }),
  };
}
