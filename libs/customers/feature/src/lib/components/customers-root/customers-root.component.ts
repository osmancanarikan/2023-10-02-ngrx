import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CustomersRepository } from '@eternal/customers/data';
import { MessageService } from '@eternal/shared/ui-messaging';
import { first } from 'rxjs';
import { LetModule } from '@ngrx/component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  templateUrl: './customers-root.component.html',
  standalone: true,
  imports: [RouterOutlet, LetModule, MatButtonModule, MatIconModule],
})
export class CustomersRootComponent {
  constructor(
    public customersRepository: CustomersRepository,
    router: Router,
    messageService: MessageService
  ) {
    customersRepository.hasError$.pipe(first(Boolean)).subscribe(() => {
      router.navigateByUrl('/');
      messageService.confirm(
        'Sorry, but Customers are not available at the moment.<br>Please try again later.'
      );
    });
  }

  handleUndo() {
    this.customersRepository.undo();
  }

  handleRedo() {
    this.customersRepository.redo();
  }
}
