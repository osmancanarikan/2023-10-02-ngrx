import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { bookingsActions } from '../+state/bookings.actions';
import { Booking } from '../+state/bookings.reducer';
import { CommonModule } from '@angular/common';
import { BookingsRepository } from '../+state/bookings-repository.service';

@Component({
  selector: 'eternal-overview',
  templateUrl: './overview.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class OverviewComponent implements OnInit {
  userName = '';
  displayedColumns = ['holidayId', 'date', 'status', 'comment'];
  dataSource = new MatTableDataSource<Booking>([]);

  constructor(
    private store: Store,
    private bookingsRepository: BookingsRepository
  ) {}

  ngOnInit(): void {
    this.bookingsRepository.bookingsData$.subscribe((bookingData) => {
      if (bookingData?.loaded === false) {
        this.store.dispatch(bookingsActions.load());
      } else {
        this.userName = bookingData.customerName;
        this.dataSource.data = bookingData.bookings;
      }
    });
  }
}
