import { holidaysFeature } from './holidays.reducer';
import { createSelector } from '@ngrx/store';
import { createHistorySelectors } from 'ngrx-wieder';

const selectHolidaysWithFavourite = createSelector(
  holidaysFeature.selectHolidays,
  holidaysFeature.selectFavouriteIds,
  (holidays, favouriteIds) =>
    holidays.map((holiday) => ({
      ...holiday,
      isFavourite: favouriteIds.includes(holiday.id),
    }))
);

const selectIsLoaded = createSelector(
  holidaysFeature.selectLoadStatus,
  (loadStatus) => loadStatus === 'loaded'
);

const selectIdTitles = createSelector(
  holidaysFeature.selectHolidays,
  (holidays) => holidays.map(({ id, title }) => ({ id, title }))
);

const { selectCanUndo, selectCanRedo } = createHistorySelectors(
  holidaysFeature.selectHolidaysState
);

export const fromHolidays = {
  get: holidaysFeature.selectHolidays,
  selectIsLoaded,
  selectIdTitles,
  selectHolidaysWithFavourite,
  selectCanUndo,
  selectCanRedo,
};
