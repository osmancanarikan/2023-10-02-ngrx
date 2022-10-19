import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BookingsEffects } from './+state/bookings-effects.service';
import { bookingsFeature } from './+state/bookings.reducer';
import { OverviewComponent } from './overview/overview.component';

export const bookingsRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(bookingsFeature),
      provideEffects([BookingsEffects]),
    ],
    component: OverviewComponent,
  },
];
