import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '@eternal/customers/model';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomerPipe } from '../customer.pipe';

export interface CustomerWithSelected extends Customer {
  selected: boolean;
}
export interface CustomersViewModel {
  customers: CustomerWithSelected[];
  pageIndex: number;
  length: number;
}

@Component({
  selector: 'eternal-customers',
  templateUrl: './customers.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    CustomerPipe,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
})
export class CustomersComponent implements OnChanges {
  @Input() viewModel: CustomersViewModel | undefined;
  @Output() setSelected = new EventEmitter<number>();
  @Output() setUnselected = new EventEmitter<number>();
  @Output() switchPage = new EventEmitter<number>();

  displayedColumns = ['name', 'country', 'birthdate', 'action'];
  dataSource = new MatTableDataSource<CustomerWithSelected>([]);

  ngOnChanges(): void {
    if (this.viewModel) {
      this.dataSource.data = this.viewModel.customers;
    }
  }

  toggleSelection(toggleChange: MatSlideToggleChange, id: number) {
    if (toggleChange.checked) {
      this.setSelected.emit(id);
    } else {
      this.setUnselected.emit(id);
    }
  }
}
