import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'eternal-activate',
  templateUrl: './activate.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormlyModule, MatButtonModule, NgIf],
})
export class ActivateComponent {
  #route = inject(ActivatedRoute);
  #httpClient = inject(HttpClient);
  formGroup = new UntypedFormGroup({});
  model = { terms: false, gdpr: false };
  fields: FormlyFieldConfig[] = [
    formly.requiredNumber('activationCode', 'Activation Code'),
  ];
  message = '';

  handleSubmit() {
    if (this.formGroup.valid) {
      this.#httpClient
        .post(
          `/security/activate-user-by-code/${this.#route.snapshot.paramMap.get(
            'id'
          )}/${this.formGroup.value.activationCode}`,
          {}
        )
        .subscribe(() => {
          this.message = 'Activation successful. Please sign-in!';
        });
    }
  }
}
