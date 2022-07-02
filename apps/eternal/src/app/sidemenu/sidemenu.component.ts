import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SecurityService } from '@eternal/shared/security';

@Component({
  selector: 'eternal-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
})
export class SidemenuComponent {
  loaded$ = this.securityService.getLoaded$();
  signedIn$ = this.securityService.getSignedIn$();

  constructor(private securityService: SecurityService) {}
}
