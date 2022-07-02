import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

type UserType = 'customer' | 'agent';

export interface BasicData {
  userType: UserType;
}

@Component({
  selector: 'eternal-sign-up-basic',
  templateUrl: './basic.component.html',
  standalone: true,
  imports: [MatRippleModule, CommonModule, MatIconModule],
})
export class BasicComponent {
  @Output() next = new EventEmitter<BasicData>();
  formGroup = new UntypedFormGroup({});

  handleUserType(userType: UserType) {
    this.next.emit({ userType });
  }
}
