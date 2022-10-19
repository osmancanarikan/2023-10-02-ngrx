import { Observable } from 'rxjs';
import { Booking, bookingsFeature } from './bookings.reducer';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingsActions } from './bookings.actions';

@Injectable({ providedIn: 'root' })
export class BookingsRepository {
  #store = inject(Store);

  readonly bookings$: Observable<Booking[]> = this.#store.select(
    bookingsFeature.selectBookings
  );
  readonly loaded$: Observable<boolean> = this.#store.select(
    bookingsFeature.selectLoaded
  );

  load(): void {
    this.#store.dispatch(bookingsActions.load());
  }
}
