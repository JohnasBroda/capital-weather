import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HotToastModule } from '@ngneat/hot-toast';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ApiModule, UserProfileApiService } from '~api';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: UserEffects;
  let apiService: UserProfileApiService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ApiModule,
        TranslateModule.forRoot(),
        HotToastModule.forRoot(),
      ],
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
      ],
    });

    apiService = TestBed.inject(UserProfileApiService);
    effects = TestBed.inject(UserEffects);
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
