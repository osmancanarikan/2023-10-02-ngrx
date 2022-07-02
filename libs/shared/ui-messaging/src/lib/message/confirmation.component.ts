import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmationData {
  message: string;
  deniable: boolean;
}

@Component({
  template: `<h1 mat-dialog-title>Confirm</h1>
    <div mat-dialog-content [innerHTML]="data.message"></div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {}
}
