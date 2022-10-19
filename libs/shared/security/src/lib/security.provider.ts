import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { SecurityEffects } from './security.effects';
import { securityFeature } from './securityState';

export const securityProvider = [
  provideState(securityFeature),
  provideEffects([SecurityEffects]),
];
