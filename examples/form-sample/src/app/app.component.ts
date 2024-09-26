import { Component } from '@angular/core';

import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { FormComponent, FormConfiguration } from '@lucaslab/form';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validPhoneNumber = /^\d{10}$/; // Example: 10-digit phone number
    const isValid = validPhoneNumber.test(control.value);
    return isValid ? null : { invalidPhoneNumber: { value: control.value } };
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <lucaslab-form
      [configurations]="configurationForm"
      (submittedData)="onSubmit($event)"
      (cancelEvent)="cancel()"
    ></lucaslab-form>
  `,
  styles: [
    `
      :host {
      }
    `,
  ],
  imports: [FormComponent],
})
export class AppComponent {
  title = 'form-sample-app';
  configurationForm: FormConfiguration[] = [
    {
      label: 'Name',
      property: 'name',
      placeholder: 'name',
      type: 'text',
    },
    {
      label: 'Email',
      property: 'email',
      placeholder: 'email@domain.com',
      type: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      label: 'Phone',
      property: 'phone',
      placeholder: '000000000',
      type: 'number',
      validators: [Validators.required, phoneValidator()],
    },
  ];

  onSubmit(data: any) {
    alert(JSON.stringify(data, null, 2));
  }

  cancel() {
    console.log('canceled');
  }
}
