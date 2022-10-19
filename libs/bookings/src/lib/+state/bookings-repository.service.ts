import { combineLatest, filter, map, Observable } from 'rxjs';
import { Booking, bookingsFeature } from './bookings.reducer';
import { isDefined } from '@eternal/shared/util';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomersApi } from '@eternal/customers/api';

interface BookingData {
  bookings: Booking[];
  customerName: string;
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class BookingsRepository {
  #store = inject(Store);
  #customersApi = inject(CustomersApi);

  readonly bookingsData$: Observable<BookingData> = combineLatest({
    customer: this.#customersApi.selectedCustomer$,
    bookings: this.#store.select(bookingsFeature.selectBookings),
    loaded: this.#store.select(bookingsFeature.selectLoaded),
  }).pipe(
    filter(({ customer }) => isDefined(customer)),
    map(({ customer, bookings, loaded }) => {
      return {
        customerName: customer.name + ', ' + customer.firstname,
        bookings,
        loaded,
      };
    })
  );
}
