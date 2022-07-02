import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  user$ = this.userService.getLoadedUser$();

  constructor(private userService: SecurityService) {}

  signOut() {
    this.userService.signOut();
  }
}
