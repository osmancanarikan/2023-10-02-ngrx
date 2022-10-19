import { HttpClient } from '@angular/common/http';
import { HolidaysEffects } from './holidays.effects';
import { Configuration } from '@eternal/shared/config';
import { holidaysActions } from './holidays.actions';
import { Actions } from '@ngrx/effects';
import { firstValueFrom, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { createHolidays } from '@eternal/holidays/model';
import { createMock, Mock } from '@testing-library/angular/jest-utils';
import { marbles } from 'rxjs-marbles/jest';
import { RestoreFunction, safeMockInject } from '@eternal/shared/testing';

describe('Holidays Effects', () => {
  let httpClient: Mock<HttpClient>;
  const config = new Configuration('https://www.host.com/');
  let store: Mock<Store>;
  let restoreMock: RestoreFunction;

  beforeEach(() => {
    httpClient = createMock(HttpClient);
    store = createMock(Store);
  });

  afterEach(() => restoreMock());

  const createEffect = (actions$: Actions) => {
    restoreMock = safeMockInject
      .with(Actions, actions$)
      .with(HttpClient, httpClient)
      .with(Configuration, config)
      .with(Store, store)
      .getRestoreFn();
    return new HolidaysEffects();
  };

  it('should load holidays', async () => {
    const holidays = createHolidays(
      { imageUrl: 'pyramids.jpg' },
      { imageUrl: 'tower-bridge.jpg' }
    );
    httpClient.get.mockReturnValue(of(holidays));
    const effects = createEffect(of(holidaysActions.load));

    expect(await firstValueFrom(effects.load$)).toEqual(
      holidaysActions.loaded({
        holidays: holidays.map((holiday) => ({
          ...holiday,
          imageUrl: `https://www.host.com/${holiday.imageUrl}`,
        })),
      })
    );
  });

  it(
    'should load holidays with rxjs-marbles',
    marbles((m) => {
      const holidays = createHolidays(
        { imageUrl: 'pyramids.jpg' },
        { imageUrl: 'tower-bridge.jpg' }
      );
      httpClient.get.mockReturnValue(m.cold('250ms h', { h: holidays }));

      const effects = createEffect(
        m.cold('500ms l', { l: holidaysActions.load() })
      );

      m.expect(effects.load$).toBeObservable('750ms r', {
        r: holidaysActions.loaded({
          holidays: holidays.map((holiday) => ({
            ...holiday,
            imageUrl: `https://www.host.com/${holiday.imageUrl}`,
          })),
        }),
      });
    })
  );
});
