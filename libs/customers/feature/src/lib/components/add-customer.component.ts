import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Customer } from '@eternal/customers/model';
import { Options } from '@eternal/shared/form';
import { fromMaster } from '@eternal/shared/master-data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add } from '../+state/customers.actions';
import { CustomerComponent } from '@eternal/customers/ui';

@Component({
  selector: 'eternal-add-customer',
  template: ` <eternal-customer
    [customer]="customer"
    *ngIf="countries$ | async as countries"
    [countries]="countries"
    (save)="submit($event)"
    [showDeleteButton]="false"
  ></eternal-customer>`,
  standalone: true,
  imports: [CustomerComponent, CommonModule],
})
export class AddCustomerComponent {
  customer: Customer = {
    id: 0,
    firstname: '',
    name: '',
    country: '',
    birthdate: '',
  };
  countries$: Observable<Options>;

  constructor(private store: Store) {
    this.countries$ = this.store.select(fromMaster.selectCountries);
  }

  submit(customer: Customer) {
    this.store.dispatch(add({ customer: { ...customer, id: 0 } }));
  }
}
