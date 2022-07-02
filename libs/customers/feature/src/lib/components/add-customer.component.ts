import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Customer } from '@eternal/customers/model';
import { Options } from '@eternal/shared/form';
import { selectCountries } from '@eternal/shared/master-data';
import { Observable } from 'rxjs';
import { CustomerComponent } from '@eternal/customers/ui';
import { CustomersRepository } from '@eternal/customers/data';
import { Store } from '@ngrx/store';

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

  constructor(
    private customersRepository: CustomersRepository,
    private store: Store
  ) {
    this.countries$ = this.store.select(selectCountries);
  }

  submit(customer: Customer) {
    this.customersRepository.add({ ...customer, id: 0 });
  }
}
