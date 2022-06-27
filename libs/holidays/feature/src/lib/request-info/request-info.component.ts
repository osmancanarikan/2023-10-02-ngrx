import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AddressLookuper } from '../address-lookuper.service';

@Component({
  selector: 'eternal-request-info',
  templateUrl: './request-info.component.html',
})
export class RequestInfoComponent implements OnInit {
  formGroup: UntypedFormGroup = this.formBuilder.group({
    address: [],
  });
  title = 'Request More Information';
  @Input() address = '';
  submitter$ = new Subject<void>();
  lookupResult$: Observable<string> | undefined;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private lookuper: AddressLookuper
  ) {}

  ngOnInit(): void {
    if (this.address) {
      this.formGroup.setValue({ address: this.address });
    }

    this.lookupResult$ = this.submitter$.pipe(
      switchMap(() => this.lookuper.lookup(this.formGroup.value.address)),
      map((found) => (found ? 'Brochure sent' : 'Address not found'))
    );
  }

  search(): void {
    this.submitter$.next();
  }
}
