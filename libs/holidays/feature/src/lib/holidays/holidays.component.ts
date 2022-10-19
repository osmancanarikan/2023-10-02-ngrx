import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday } from '@eternal/holidays/model';
import { fromHolidays, holidaysActions } from '@eternal/holidays/data';
import { HolidayCardComponent } from '@eternal/holidays/ui';
import { AsyncPipe, NgForOf } from '@angular/common';

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
  imports: [AsyncPipe, HolidayCardComponent, NgForOf],
})
export class HolidaysComponent implements OnInit {
  #store = inject(Store);
  holidays$ = this.#store.select(fromHolidays.selectHolidaysWithFavourite);

  ngOnInit(): void {
    this.#store.dispatch(holidaysActions.load());
  }

  addFavourite(id: number) {
    this.#store.dispatch(holidaysActions.addFavourite({ id }));
  }

  removeFavourite(id: number) {
    this.#store.dispatch(holidaysActions.removeFavourite({ id }));
  }

  byId(index: number, holiday: Holiday) {
    return holiday.id;
  }
}
