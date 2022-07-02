import { Routes } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const userRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'activate/:id', component: ActivateComponent },
    ],
  },
];
