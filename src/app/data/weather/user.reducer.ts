import { createReducer, on } from '@ngrx/store';
import { IUser } from '~models/user/user.interface';
import { AsyncState, LoadingState } from '~store/call-state';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State extends AsyncState {
  user: Partial<IUser> | null;
}

export const initialState: State = {
  callState: LoadingState.INIT,
  user: null,
};

export const reducer = createReducer(
  initialState,

  on(UserActions.setUser, (state, action) => ({
    ...state,
    user: action.data,
  })),
  on(UserActions.clearUser, (state) => ({
    ...state,
    user: null,
  })),
  on(UserActions.updateUser, (state, action) => ({
    ...state,
    user: {
      ...(state.user ?? {}),
      ...action.data,
    } as IUser,
  })),

  on(
    UserActions.loadUser,
    UserActions.updateDefaultProfileData,
    UserActions.updateSubcontractorData,
    UserActions.updateEducationData,
    UserActions.updateExperienceData,
    UserActions.updateLanguageData,
    UserActions.updateSkillData,
    UserActions.submitLeaveRequest,
    UserActions.submitProfilePicture,
    (state) => ({
      ...state,
      callState: LoadingState.LOADING,
    }),
  ),
  on(
    UserActions.loadUserFailure,
    UserActions.updateDefaultProfileDataFailure,
    UserActions.updateSubcontractorDataFailure,
    UserActions.updateEducationDataFailure,
    UserActions.updateExperienceDataFailure,
    UserActions.updateLanguageDataFailure,
    UserActions.updateSkillDataFailure,
    UserActions.submitLeaveRequestFailure,
    UserActions.submitProfilePictureFailure,
    (state, action) => ({
      ...state,
      callState: { errorMsg: action.error.message },
    }),
  ),

  on(UserActions.submitLeaveRequestSuccess, (state) => ({
    ...state,
    callState: LoadingState.LOADED,
  })),

  on(
    UserActions.updateDefaultProfileDataSuccess,
    UserActions.loadUserSuccess,
    (state, action) => ({
      ...state,
      callState: LoadingState.LOADED,
      user: {
        ...(state.user ?? {}),
        ...(action.data?.user ?? {}),
      },
    }),
  ),

  on(UserActions.updateSubcontractorDataSuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADED,
    user: {
      ...(state.user ?? {}),
      subcontractor: {
        ...(state.user?.subcontractor ?? {}),
        ...action.data.subcontractor,
      },
    },
  })),

  on(UserActions.updateEducationDataSuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADED,
    user: {
      ...(state.user ?? {}),
      educations: action.data.educations,
    },
  })),

  on(UserActions.updateExperienceDataSuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADED,
    user: {
      ...(state.user ?? {}),
      experiences: action.data.experiences,
    },
  })),

  on(UserActions.updateLanguageDataSuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADED,
    user: {
      ...(state.user ?? {}),
      languages: action.data.languages,
    },
  })),

  on(UserActions.updateSkillDataSuccess, (state, action) => ({
    ...state,
    callState: LoadingState.LOADED,
    user: {
      ...(state.user ?? {}),
      skills: action.data.skills,
    },
  })),
);
