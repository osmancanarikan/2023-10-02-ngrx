import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BookingsRepository } from '../+state/bookings-repository.service';
import { CustomersApi } from '@eternal/customers/api';
import { OverviewComponent, ViewModel } from '../overview/overview.component';
import { combineLatest, filter, map, Observable } from 'rxjs';

@Component({
  selector: 'eternal-overview-container',
  template: `<eternal-overview
    *ngIf="viewModel$ | async as viewModel"
    [viewModel]="viewModel"
  ></eternal-overview>`,
  standalone: true,
  imports: [MatTableModule, CommonModule, OverviewComponent],
})
export class OverviewContainerComponent {
  // we have here two bugs which we'll eliminate later...
  readonly viewModel$: Observable<ViewModel> = combineLatest({
    bookings: this.bookingsRepository.bookings$,
    loaded: this.bookingsRepository.loaded$,
    customer: this.customersApi.selectedCustomer$,
  }).pipe(
    filter(({ loaded }) => loaded),
    map(({ customer, bookings }) => ({
      customerName: `${customer.name}, ${customer.firstname}`,
      bookings,
    }))
  );

  constructor(
    private bookingsRepository: BookingsRepository,
    private customersApi: CustomersApi
  ) {}
}
