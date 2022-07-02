import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { holidaysFeature } from './holidays.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HolidaysEffects } from './holidays.effects';

export const holidaysDataProvider = importProvidersFrom(
  StoreModule.forFeature(holidaysFeature),
  EffectsModule.forFeature([HolidaysEffects])
);
