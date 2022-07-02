import { Observable } from 'rxjs';
import { Booking, bookingsFeature } from './bookings.reducer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookingsActions } from './bookings.actions';

interface BookingData {
  bookings: Booking[];
  customerName: string;
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class BookingsRepository {
  readonly bookings$: Observable<Booking[]> = this.store.select(
    bookingsFeature.selectBookings
  );
  readonly loaded$: Observable<boolean> = this.store.select(
    bookingsFeature.selectLoaded
  );
  constructor(private store: Store) {}

  load(): void {
    this.store.dispatch(bookingsActions.load());
  }
}
