import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookingsEffects } from './+state/bookings-effects.service';
import { bookingsFeature } from './+state/bookings.reducer';
import { OverviewContainerComponent } from './overview-container/overview-container.component';

export const bookingsRoutes: Routes = [
  {
    path: '',
    component: OverviewContainerComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(bookingsFeature),
        EffectsModule.forFeature([BookingsEffects])
      ),
    ],
  },
];
