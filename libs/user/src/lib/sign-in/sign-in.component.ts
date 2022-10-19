import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { SecurityService } from '@eternal/shared/security';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'eternal-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatButtonModule,
    AsyncPipe,
    NgIf,
  ],
})
export class SignInComponent {
  formGroup = new UntypedFormGroup({});
  fields: FormlyFieldConfig[] = [
    formly.requiredText('email', 'EMail'),
    formly.requiredText('password', 'Password', { type: 'password' }),
  ];
  #securityService = inject(SecurityService);
  signedIn$ = this.#securityService.getSignedIn$();

  handleSubmit() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.#securityService.signIn(email, password);
    }
  }
}
