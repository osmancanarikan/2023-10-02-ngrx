import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlinkerDirective } from '@eternal/shared/ui';

@Component({
  selector: 'eternal-holiday-card',
  templateUrl: './holiday-card.component.html',
  styleUrls: ['./holiday-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    BlinkerDirective,
    MatIconModule,
  ],
})
export class HolidayCardComponent {
  @Input() holiday: (Holiday & { isFavourite: boolean }) | undefined;
  @Output() addFavourite = new EventEmitter<number>();
  @Output() removeFavourite = new EventEmitter<number>();
}
