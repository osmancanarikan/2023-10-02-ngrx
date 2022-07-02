import { holidaysActions as allHolidaysActions } from './lib/holidays.actions';

export { holidaysDataProvider } from './lib/holidays-data.provider';
const { load, addFavourite, removeFavourite } = allHolidaysActions;
export const holidaysActions = { load, addFavourite, removeFavourite };
export { fromHolidays } from './lib/holidays.selectors';
