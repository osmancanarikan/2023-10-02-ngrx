import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AddressLookuper } from '../address-lookuper.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { assertDefined } from '@eternal/shared/util';

@Component({
  selector: 'eternal-request-info',
  templateUrl: './request-info.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RequestInfoComponent implements OnInit {
  formGroup = this.formBuilder.nonNullable.group({
    address: [''],
  });
  title = 'Request More Information';
  @Input() address = '';
  submitter$ = new Subject<void>();
  lookupResult$: Observable<string> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private lookuper: AddressLookuper
  ) {}

  ngOnInit(): void {
    if (this.address) {
      this.formGroup.setValue({ address: this.address });
    }

    this.lookupResult$ = this.submitter$.pipe(
      switchMap(() => {
        assertDefined(this.formGroup.value.address);
        return this.lookuper.lookup(this.formGroup.value.address);
      }),
      map((found) => (found ? 'Brochure sent' : 'Address not found'))
    );
  }

  search(): void {
    this.submitter$.next();
  }
}
