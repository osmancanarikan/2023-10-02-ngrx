import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './securityState';

export const securityActions = createActionGroup({
  source: 'Security',
  events: {
    'Load User': emptyProps(),
    'Load User Success': props<{ user: User }>(),
    'Sign In User': props<{ email: string; password: string }>(),
    'Sign In User Success': props<{ user: User }>(),
    'Sign Out User': emptyProps(),
    'Sign Out User Success': props<{ user: User }>(),
  },
});
