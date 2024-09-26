/**
 * @component
 * @name FormComponent
 * @description
 * The `FormComponent` is a standalone Angular component designed to handle dynamic form creation and validation.
 * It uses Angular's reactive forms to manage form state and validation.
 *
 * @selector lucaslab-form
 *
 * @inputs
 * @property {FormComponentStyles} customClasses - Custom CSS classes for styling the form elements.
 * @property {FormConfiguration[]} configurations - Configuration array for form controls.
 * @property {ErrorMapMessages} errorMessages - Custom error messages for form validation.
 *
 * @outputs
 * @property {EventEmitter<any>} submittedData - Emits the form data when the form is submitted.
 * @property {EventEmitter<void>} cancelEvent - Emits an event when the form is canceled.
 *
 * @styles
 * - `.container` - Flex container for form layout.
 * - `.label` - Styles for form labels.
 * - `.input` - Styles for form inputs.
 * - `.error` - Styles for error messages.
 * - `.submit` - Styles for the submit button.
 * - `.cancel` - Styles for the cancel button.
 *
 * @methods
 * @method ngOnInit - Initializes the form group with controls and validators based on the configurations input.
 * @method onSubmit - Handles form submission, emits form data if valid, otherwise marks all controls as touched.
 * @method onCancel - Resets the form and emits the cancel event.
 * @method reset - Resets the form to its initial state.
 * @method getErrorMessage - Retrieves the error message for a specific form control based on validation errors.
 * @method hasOption - Checks if a specific option is selected in a checkbox control.
 * @method updateCheckboxSelection - Updates the selection state of a checkbox control.
 *
 * @throws
 * @throws {Error} If a control is not an array when updating checkbox selection.
 */
import {
  FormGroup,
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';

import {
  ErrorMapMessages,
  FormComponentStyles,
  FormConfiguration,
} from './form.interface';

type FormControl = { [key: string]: any };

@Component({
  selector: 'lucaslab-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
      }

      .label {
        font-weight: bold;
        margin-top: 1rem;
      }

      .input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
      }

      .error {
        color: red;
      }

      .submit {
        background-color: #007bff;
        color: white;
        padding: 0.7rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        margin: 0.7rem 0;
      }

      .cancel {
        background-color: #dc3545;
        color: white;
        padding: 0.7rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
      }
    `,
  ],
})
export class FormComponent {
  customClasses = input<FormComponentStyles>({
    container: 'container',
    label: 'label',
    input: 'input',
    error: 'error',
    submit: 'submit',
    cancel: 'cancel',
  });
  configurations = input.required<FormConfiguration[]>();
  submittedData = output<any>();
  cancelEvent = output<void>();

  form!: FormGroup;
  #fb = inject(FormBuilder);

  errorMessages = input<ErrorMapMessages>({
    required: 'is required',
    minlength: 'must be longer',
    maxlength: 'must be shorter',
    email: 'must be a valid email',
    pattern: 'is not valid',
  });

  ngOnInit(): void {
    this.form = this.#fb.group(
      this.configurations().reduce((acc, control) => {
        const validators = control.validators || [];
        const initialValue = control.type === 'checkbox' ? [] : '';
        acc[control.property] = [initialValue, validators];
        return acc;
      }, {} as FormControl),
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submittedData.emit(this.form.value);
  }

  onCancel() {
    this.form.reset();
    this.cancelEvent.emit();
  }

  reset() {
    this.form.reset();
  }

  getErrorMessage(controlName: string): string {
    const controlErrors = this.form.get(controlName)?.errors;
    if (controlErrors) {
      const firstErrorKey = Object.keys(controlErrors)[0];
      return this.errorMessages()[firstErrorKey] || 'is invalid';
    }
    return '';
  }

  hasOption(control: string, option: string) {
    const value = this.form.get(control)?.value;

    if (value && value instanceof Array) {
      return value.includes(option);
    }

    return false;
  }

  updateCheckboxSelection(
    controlName: string,
    option: { key: string; value: string },
  ) {
    const control = this.form.get(controlName);

    if (control && control.value instanceof Array) {
      const existingValueIndex = control.value.indexOf(option.key);

      if (existingValueIndex !== -1) {
        control.patchValue(
          control.value.filter((_, i) => i !== existingValueIndex),
        );
      } else {
        control.patchValue([...control.value, option.key]);
      }
    } else {
      throw new Error(
        `Control '${controlName}' is not an array in the form group.`,
      );
    }
  }
}
