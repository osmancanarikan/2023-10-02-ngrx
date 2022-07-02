import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomersComponent, CustomersViewModel } from '@eternal/customers/ui';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomersRepository, fromCustomers } from '@eternal/customers/data';

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

  constructor(
    private customersRepository: CustomersRepository,
    private store: Store
  ) {}

  setSelected(id: number) {
    this.customersRepository.select(id);
  }

  setUnselected() {
    this.customersRepository.unselect();
  }

  switchPage(page: number) {
    console.log('switch to page ' + page + ' is not implemented');
  }
}
