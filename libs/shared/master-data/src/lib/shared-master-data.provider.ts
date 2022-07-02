import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { masterFeature } from './+state/master.reducer';

export const sharedMasterDataProvider = importProvidersFrom(
  StoreModule.forFeature(masterFeature)
);
