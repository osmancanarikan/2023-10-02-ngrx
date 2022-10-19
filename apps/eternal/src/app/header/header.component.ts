import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SecurityService } from '@eternal/shared/security';

@Component({
  selector: 'eternal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
})
export class HeaderComponent {
  #userService = inject(SecurityService);
  user$ = this.#userService.getLoadedUser$();

  signOut() {
    this.#userService.signOut();
  }
}
