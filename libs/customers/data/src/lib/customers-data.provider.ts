import { importProvidersFrom } from '@angular/core';
import { CustomersEffects } from './customers.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { customersFeature } from './customers.reducer';

export const customersDataProvider = importProvidersFrom(
  StoreModule.forFeature(customersFeature),
  EffectsModule.forFeature([CustomersEffects])
);
