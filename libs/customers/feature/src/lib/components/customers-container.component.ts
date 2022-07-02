import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomersComponent, CustomersViewModel } from '@eternal/customers/ui';
import { createSelector, Store } from '@ngrx/store';
import { customersActions } from '../+state/customers.actions';
import { fromCustomers } from '../+state/customers.selectors';
import { Observable } from 'rxjs';

@Component({
  template: ` <eternal-customers
    *ngIf="viewModel$ | async as viewModel"
    [viewModel]="viewModel"
    (setSelected)="setSelected($event)"
    (setUnselected)="setUnselected()"
    (switchPage)="switchPage($event)"
  ></eternal-customers>`,
  standalone: true,
  imports: [CommonModule, CustomersComponent],
})
export class CustomersContainerComponent {
  viewModel$: Observable<CustomersViewModel> = this.store.select(
    createSelector(fromCustomers.selectPagedCustomers, (pagedCustomers) => ({
      customers: pagedCustomers.customers,
      pageIndex: pagedCustomers.page - 1,
      length: pagedCustomers.total,
    }))
  );

  constructor(private store: Store) {}

  setSelected(id: number) {
    this.store.dispatch(customersActions.select({ id }));
  }

  setUnselected() {
    this.store.dispatch(customersActions.unselect());
  }

  switchPage(page: number) {
    console.log('switch to page ' + page + ' is not implemented');
  }
}
