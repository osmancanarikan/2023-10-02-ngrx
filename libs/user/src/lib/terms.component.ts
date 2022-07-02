import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';

@Component({
  selector: 'eternal-sign-up-terms',
  template: `
    <form (ngSubmit)="handleSubmit()" [formGroup]="formGroup">
      <formly-form
        [fields]="fields"
        [form]="formGroup"
        [model]="model"
      ></formly-form>
      <ng-content></ng-content>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FormlyModule],
})
export class TermsComponent {
  @Output() next = new EventEmitter();
  formGroup = new UntypedFormGroup({});
  model = { terms: false, gdpr: false };
  fields: FormlyFieldConfig[] = [
    formly.requiredCheckbox(
      'terms',
      'I hereby accept the terms and conditions of Eternal'
    ),
    formly.requiredCheckbox(
      'gdpr',
      'I hereby accept that all my data is stored'
    ),
  ];

  handleSubmit() {
    if (this.formGroup.valid) {
      this.next.emit();
    }
  }
}
