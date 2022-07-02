import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from './loading.service';

@Component({
  selector: 'eternal-loader',
  template: `<mat-progress-bar
    [ngStyle]="{
      visibility: (loadingService.loading$ | async) ? 'visible' : 'hidden'
    }"
    mode="indeterminate"
  ></mat-progress-bar>`,
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
})
export class LoaderComponent {
  constructor(public loadingService: LoadingService) {}
}
