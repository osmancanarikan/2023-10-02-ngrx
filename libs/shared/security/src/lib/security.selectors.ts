import { createSelector } from '@ngrx/store';
import { securityFeature } from './securityState';

const { selectUser, selectLoaded } = securityFeature;

const selectSignedIn = createSelector(
  selectUser,
  selectLoaded,
  (user, loaded) => loaded && !user?.anonymous
);

export const fromSecurity = {
  selectUser,
  selectLoaded,
  selectSignedIn,
};
