import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday } from '@eternal/holidays/model';
import { fromHolidays, holidaysActions } from '@eternal/holidays/data';
import { CommonModule } from '@angular/common';
import { HolidayCardComponent } from '@eternal/holidays/ui';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    LetModule,
    HolidayCardComponent,
  ],
})
export class HolidaysComponent {
  holidays$ = this.store.select(fromHolidays.selectHolidaysWithFavourite);
  canUndo$ = this.store.select(fromHolidays.selectCanUndo());
  canRedo$ = this.store.select(fromHolidays.selectCanRedo());

  constructor(private store: Store) {}

  addFavourite(id: number) {
    this.store.dispatch(holidaysActions.addFavourite({ id }));
  }

  removeFavourite(id: number) {
    this.store.dispatch(holidaysActions.removeFavourite({ id }));
  }

  byId(index: number, holiday: Holiday) {
    return holiday.id;
  }

  handleUndo() {
    this.store.dispatch(holidaysActions.undo());
  }

  handleRedo() {
    this.store.dispatch(holidaysActions.redo());
  }
}
