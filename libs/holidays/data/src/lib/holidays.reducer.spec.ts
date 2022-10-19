import { createHolidays } from '@eternal/holidays/model';
import { holidaysFeature } from './holidays.reducer';
import { holidaysActions } from './holidays.actions';

it('should add the holidays on loaded', () => {
  const holidays = createHolidays(
    { title: 'Pyramids' },
    { title: 'Tower Bridge' }
  );

  const state = holidaysFeature.reducer(
    { holidays: [], favouriteIds: [], loadStatus: 'not loaded', histories: {} },
    holidaysActions.loaded({ holidays })
  );

  expect(state).toEqual({ holidays, favouriteIds: [], loadStatus: 'loaded' });
});
