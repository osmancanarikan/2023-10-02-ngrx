import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { holidaysActions } from '../+state/holidays.actions';
import { fromHolidays } from '../+state/holidays.selectors';
import { Holiday } from '@eternal/holidays/model';
import { HolidayCardComponent } from '@eternal/holidays/ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eternal-holidays',
  template: `<h2>Choose among our Holidays</h2>
    <div class="flex flex-wrap justify-evenly">
      <eternal-holiday-card
        *ngFor="let holiday of holidays$ | async; trackBy: byId"
        [holiday]="holiday"
        (addFavourite)="addFavourite($event)"
        (removeFavourite)="removeFavourite($event)"
      >
      </eternal-holiday-card>
    </div> `,
  standalone: true,
  imports: [CommonModule, HolidayCardComponent],
})
export class HolidaysComponent implements OnInit {
  holidays$ = this.store.select(fromHolidays.selectHolidaysWithFavourite);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(holidaysActions.load());
  }

  addFavourite(id: number) {
    this.store.dispatch(holidaysActions.addFavourite({ id }));
  }

  removeFavourite(id: number) {
    this.store.dispatch(holidaysActions.removeFavourite({ id }));
  }

  byId(index: number, holiday: Holiday) {
    return holiday.id;
  }
}
