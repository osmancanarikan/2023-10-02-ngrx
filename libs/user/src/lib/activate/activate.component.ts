import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eternal-activate',
  templateUrl: './activate.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule],
})
export class ActivateComponent {
  formGroup = new UntypedFormGroup({});
  model = { terms: false, gdpr: false };
  fields: FormlyFieldConfig[] = [
    formly.requiredNumber('activationCode', 'Activation Code'),
  ];
  message = '';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  handleSubmit() {
    if (this.formGroup.valid) {
      this.httpClient
        .post(
          `/security/activate-user-by-code/${this.route.snapshot.paramMap.get(
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
