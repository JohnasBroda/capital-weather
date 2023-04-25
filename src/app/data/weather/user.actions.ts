import { createAction, props } from '@ngrx/store';
import { IAddEducationDto } from 'app/api/models/add-education-dto';
import { IExperience } from '~common/interfaces/experience-form.interface';
import { IUserLanguage } from '~common/interfaces/language-form.interface';
import { ILeaveRequestForm } from '~common/interfaces/leave-request-form.interface';
import { IUserSkill } from '~common/interfaces/user-skill.interface';
import { IUserEducation } from '~models/user/user-education.interface';
import { IUserSubcontractor } from '~models/user/user-subcontractor.interface';
import { IUser } from '~models/user/user.interface';

export const setUser = createAction(
  '[User] Set User',
  props<{ data: IUser }>(),
);

export const clearUser = createAction('[User] Clear User');

export const updateUser = createAction(
  '[User] Update User',
  props<{ data: Partial<IUser> }>(),
);

/**
 * Load user
 */
export const loadUser = createAction(
  '[User] Load User',
  props<{ data: { navigateTo: string[] | undefined } }>(),
);
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ data: { user: IUser; navigateTo: string[] | undefined } }>(),
);
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: Error }>(),
);
/**
 * Default profile data
 */
export const updateDefaultProfileData = createAction(
  '[User] Update Default Profile Data',
  props<{
    data: {
      user: Partial<IUser>;
      isIntro: boolean;
    };
  }>(),
);
export const updateDefaultProfileDataSuccess = createAction(
  '[User] Update Default Profile Data Success',
  props<{
    data: {
      user: Partial<IUser>;
      navigate: boolean;
    };
  }>(),
);
export const updateDefaultProfileDataFailure = createAction(
  '[User] Update Default Profile Data Failure',
  props<{ error: Error }>(),
);
/**
 * Education data
 */
export const updateEducationData = createAction(
  '[User] Update Education Data',
  props<{
    data: {
      educations: IAddEducationDto[];
      isIntro: boolean;
    };
  }>(),
);
export const updateEducationDataSuccess = createAction(
  '[User] Update Education Data Success',
  props<{
    data: {
      educations: IUserEducation[];
      navigate: boolean;
    };
  }>(),
);
export const updateEducationDataFailure = createAction(
  '[User] Update Education Data Failure',
  props<{ error: Error }>(),
);
/**
 * Experience data
 */
export const updateExperienceData = createAction(
  '[User] Update Experience Data',
  props<{
    data: {
      experiences: IExperience[];
      isIntro: boolean;
    };
  }>(),
);
export const updateExperienceDataSuccess = createAction(
  '[User] Update Experience Data Success',
  props<{
    data: {
      experiences: IExperience[];
      navigate: boolean;
    };
  }>(),
);
export const updateExperienceDataFailure = createAction(
  '[User] Update Experience Data Failure',
  props<{ error: Error }>(),
);
/**
 * Language data
 */
export const updateLanguageData = createAction(
  '[User] Update Language Data',
  props<{
    data: {
      languages: IUserLanguage[];
      isIntro: boolean;
    };
  }>(),
);
export const updateLanguageDataSuccess = createAction(
  '[User] Update Language Data Success',
  props<{
    data: {
      languages: IUserLanguage[];
      navigate: boolean;
    };
  }>(),
);
export const updateLanguageDataFailure = createAction(
  '[User] Update Language Data Failure',
  props<{ error: Error }>(),
);
/**
 * Skill data
 */
export const updateSkillData = createAction(
  '[User] Update Skill Data',
  props<{
    data: {
      skills: IUserSkill[];
      isIntro: boolean;
    };
  }>(),
);
export const updateSkillDataSuccess = createAction(
  '[User] Update Skill Data Success',
  props<{
    data: {
      skills: IUserSkill[];
      navigate: boolean;
    };
  }>(),
);
export const updateSkillDataFailure = createAction(
  '[User] Update Skill Data Failure',
  props<{ error: Error }>(),
);
/**
 * Subcontractor data
 */
export const updateSubcontractorData = createAction(
  '[User] Update Subcontractor Data',
  props<{
    data: {
      subcontractor: IUserSubcontractor;
      isIntro: boolean;
    };
  }>(),
);

export const updateSubcontractorDataSuccess = createAction(
  '[User] Update Subcontractor Data Success',
  props<{
    data: {
      subcontractor: IUserSubcontractor;
      navigate: boolean;
    };
  }>(),
);

export const updateSubcontractorDataFailure = createAction(
  '[User] Update Subcontractor Data Failure',
  props<{ error: Error }>(),
);

/**
 * Load user educations
 */
export const loadUserEducations = createAction('[User] Load User Educations');
export const loadUserEducationsSuccess = createAction(
  '[User] Load User Educations Success',
  props<{ data: IUserEducation[] }>(),
);
export const loadUserEducationsFailure = createAction(
  '[User] Load User Educations Failure',
  props<{ error: Error }>(),
);
/**
 * Load user experiences
 */
export const loadUserExperiences = createAction('[User] Load User Experiences');
export const loadUserExperiencesSuccess = createAction(
  '[User] Load User Experiences Success',
  props<{ data: IExperience[] }>(),
);
export const loadUserExperiencesFailure = createAction(
  '[User] Load User Experiences Failure',
  props<{ error: Error }>(),
);
/**
 * Load user languages
 */
export const loadUserLanguages = createAction('[User] Load User Languages');
export const loadUserLanguagesSuccess = createAction(
  '[User] Load User Languages Success',
  props<{ data: IUserLanguage[] }>(),
);
export const loadUserLanguagesFailure = createAction(
  '[User] Load User Languages Failure',
  props<{ error: Error }>(),
);
/**
 * Load user skills
 */
export const loadUserSkills = createAction('[User] Load User Skills');
export const loadUserSkillsSuccess = createAction(
  '[User] Load User Skills Success',
  props<{ data: IUserSkill[] }>(),
);
export const loadUserSkillsFailure = createAction(
  '[User] Load User Skills Failure',
  props<{ error: Error }>(),
);
/**
 * Load user subcontractor
 */
export const loadUserSubcontractor = createAction(
  '[User] Load User Subcontractor',
);
export const loadUserSubcontractorSuccess = createAction(
  '[User] Load User Subcontractor Success',
  props<{ data: IUserSubcontractor }>(),
);
export const loadUserSubcontractorFailure = createAction(
  '[User] Load User Subcontractor Failure',
  props<{ error: Error }>(),
);
/**
 * Leave request
 */
export const submitLeaveRequest = createAction(
  '[User] Submit Leave Request',
  props<{
    data: ILeaveRequestForm;
  }>(),
);

export const submitLeaveRequestSuccess = createAction(
  '[User] Submit Leave Request Success',
);

export const submitLeaveRequestFailure = createAction(
  '[User] Submit Leave Request Failure',
  props<{ error: Error }>(),
);

/**
 * Upload profile picture
 */
export const submitProfilePicture = createAction(
  '[User] Submit Profile Picture',
  props<{
    data: Blob;
  }>(),
);

export const submitProfilePictureSuccess = createAction(
  '[User] Submit Profile Picture Success',
);

export const submitProfilePictureFailure = createAction(
  '[User] Submit Profile Picture Failure',
  props<{ error: Error }>(),
);
