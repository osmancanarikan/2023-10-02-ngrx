import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  LoaderComponent,
  MessageComponent,
} from '@eternal/shared/ui-messaging';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'eternal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    LoaderComponent,
    RouterModule,
    MessageComponent,
    SidemenuComponent,
    HeaderComponent,
  ],
})
export class AppComponent {}
