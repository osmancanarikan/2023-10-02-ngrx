import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday } from '@eternal/holidays/model';
import { fromHolidays, holidaysActions } from '@eternal/holidays/data';
import { HolidayCardComponent } from '@eternal/holidays/ui';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LetModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    HolidayCardComponent,
    NgForOf,
    MatIconModule,
    LetModule,
    MatButtonModule,
  ],
})
export class HolidaysComponent {
  #store = inject(Store);

  holidays$ = this.#store.select(fromHolidays.selectHolidaysWithFavourite);
  canUndo$ = this.#store.select(fromHolidays.selectCanUndo());
  canRedo$ = this.#store.select(fromHolidays.selectCanRedo());

  addFavourite(id: number) {
    this.#store.dispatch(holidaysActions.addFavourite({ id }));
  }

  removeFavourite(id: number) {
    this.#store.dispatch(holidaysActions.removeFavourite({ id }));
  }

  byId(index: number, holiday: Holiday) {
    return holiday.id;
  }

  handleUndo() {
    this.#store.dispatch(holidaysActions.undo());
  }

  handleRedo() {
    this.#store.dispatch(holidaysActions.redo());
  }
}
