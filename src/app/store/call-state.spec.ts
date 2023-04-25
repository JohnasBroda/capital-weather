import { IEntity } from '@adroit-group/ng-utils/lib/interfaces';
import { createFeatureSelector } from '@ngrx/store';
import { IAppEntityState } from '~store/entity.state';
import { LoadingState, getCallStateSelectors, getError } from './call-state';

describe('CallState', () => {
  it('should return error message from an error state object', () => {
    expect(getError({ errorMsg: 'test' })).toBe('test');
  });

  it('should return null from an invalid error state object', () => {
    expect(getError(LoadingState.LOADING)).toBeFalsy();
  });

  it('should return the call state selectors', () => {
    const featureSelector =
      createFeatureSelector<IAppEntityState<IEntity>>('test');
    const selectors = getCallStateSelectors(featureSelector);
    expect(
      selectors.selectCallState({ test: { callState: LoadingState.LOADING } }),
    ).toBe(LoadingState.LOADING);
    expect(
      selectors.selectIsLoading({ test: { callState: LoadingState.LOADING } }),
    ).toBe(true);
    expect(
      selectors.selectIsLoaded({ test: { callState: LoadingState.LOADED } }),
    ).toBe(true);
    expect(
      selectors.selectLoadingError({
        test: { callState: LoadingState.LOADED },
      }),
    ).toBe(null);
  });
});
