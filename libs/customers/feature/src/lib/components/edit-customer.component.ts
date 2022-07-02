import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '@eternal/customers/model';
import { CustomerComponent } from '@eternal/customers/ui';
import { Options } from '@eternal/shared/form';
import { selectCountries } from '@eternal/shared/master-data';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomersRepository } from '@eternal/customers/data';

@Component({
  selector: 'eternal-edit-customer',
  template: ` <eternal-customer
    *ngIf="data$ | async as data"
    [customer]="data.customer"
    [countries]="data.countries"
    (save)="this.submit($event)"
    (remove)="this.remove($event)"
  ></eternal-customer>`,
  standalone: true,
  imports: [CommonModule, CustomerComponent],
})
export class EditCustomerComponent {
  data$: Observable<{ customer: Customer; countries: Options }>;
  customerId = 0;

  constructor(
    private customersRepository: CustomersRepository,
    private store: Store,
    private route: ActivatedRoute
  ) {
    const countries$: Observable<Options> = this.store.select(selectCountries);
    const customer$ = this.customersRepository.findById(
      Number(this.route.snapshot.paramMap.get('id') || '')
    );

    this.data$ = combineLatest({
      countries: countries$,
      customer: customer$,
    }).pipe(map(({ countries, customer }) => ({ countries, customer })));
  }

  submit(customer: Customer) {
    this.customersRepository.update({ ...customer, id: this.customerId });
  }

  remove(customer: Customer) {
    this.customersRepository.remove(customer);
  }
}
