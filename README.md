# @lucaslab Packages

**@lucaslab** is an Angular library designed to dynamically generate forms based on configurable options. It supports validation, custom validators, and allows easy handling of form submissions and cancellations, making form generation flexible and fast.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Configuration Options](#configuration-options)
  - [Custom Validators](#custom-validators)
- [Events](#events)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the **@lucaslab/form** package in your Angular project, run the following command:

```bash
npm install @lucaslab/form
```

## Usage

### Step 1: Import the FormComponent

In your Angular application, import `FormComponent` from `@lucaslab/form`. This component will render the form based on the configuration you provide.

```typescript
import { FormComponent, FormConfiguration } from "@lucaslab/form";
```

### Step 2: Define Your Form Configuration

You need to provide an array of form configuration objects that define each field in the form. Each configuration object includes properties like `label`, `property`, `type`, and optional validators.

```typescript
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
```

### Configuration Options

The **FormConfiguration** interface defines how each form field is rendered and validated. Below are the available configuration options:

| Property       | Type            | Description                                                      |
| -------------- | --------------- | ---------------------------------------------------------------- |
| `label`        | `string`        | The label displayed above the form field.                        |
| `property`     | `string`        | The form control name (used for binding the value).              |
| `placeholder`  | `string`        | Placeholder text for the form field.                             |
| `type`         | `string`        | The type of input (`text`, `email`, `number`, `password`, etc.). |
| `validators`   | `ValidatorFn[]` | Optional array of validators (Angular built-in or custom).       |
| `options`      | `any[]`         | (Optional) Used for select dropdowns or radio buttons.           |
| `initialValue` | `any`           | (Optional) Initial value of the form field.                      |

### Step 3: Add the FormComponent to Your Template

In your component template, use the `<lucaslab-form>` component to generate the form dynamically. Pass the `configurationForm` to the `[configurations]` input and listen for form submission and cancellation events.

```html
<lucaslab-form [configurations]="configurationForm" (submittedData)="onSubmit($event)" (cancelEvent)="cancel()"></lucaslab-form>
```

### Custom Validators

You can define custom validators like the `phoneValidator()` function below, which ensures that the phone number is valid.

```typescript
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validPhoneNumber = /^\d{10}$/; // Example: 10-digit phone number
    const isValid = validPhoneNumber.test(control.value);
    return isValid ? null : { invalidPhoneNumber: { value: control.value } };
  };
}
```

Add this custom validator to the form configuration:

```typescript
{
  label: 'Phone',
  property: 'phone',
  placeholder: '000000000',
  type: 'number',
  validators: [Validators.required, phoneValidator()],
}
```

### Step 4: Handle Events

The **`FormComponent`** emits two main events:

1. **`(submittedData)`**: Triggered when the form is submitted. The data object containing the form values will be passed as the event payload.
2. **`(cancelEvent)`**: Triggered when the cancel button is pressed.

### Example

Here’s a complete example of how to use the **`@lucaslab/form`** library in an Angular application:

```typescript
import { Component } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FormComponent, FormConfiguration } from "@lucaslab/form";

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validPhoneNumber = /^\d{10}$/; // Example: 10-digit phone number
    const isValid = validPhoneNumber.test(control.value);
    return isValid ? null : { invalidPhoneNumber: { value: control.value } };
  };
}

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <lucaslab-form [configurations]="configurationForm" (submittedData)="onSubmit($event)" (cancelEvent)="cancel()"></lucaslab-form>
  `,
  styles: [``],
  imports: [FormComponent],
})
export class AppComponent {
  title = "form-sample-app";

  configurationForm: FormConfiguration[] = [
    {
      label: "Name",
      property: "name",
      placeholder: "name",
      type: "text",
    },
    {
      label: "Email",
      property: "email",
      placeholder: "email@domain.com",
      type: "email",
      validators: [Validators.required, Validators.email],
    },
    {
      label: "Phone",
      property: "phone",
      placeholder: "000000000",
      type: "number",
      validators: [Validators.required, phoneValidator()],
    },
  ];

  onSubmit(data: any) {
    alert(JSON.stringify(data, null, 2));
  }

  cancel() {
    console.log("canceled");
  }
}
```

### Contributing

We welcome contributions to the **@lucaslab/form** library. If you have ideas for new features, improvements, or bug fixes, feel free to submit a pull request or open an issue.

### License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

By following this guide, you can now generate dynamic forms, define custom validation logic, and easily manage form submissions with **@lucaslab/form**.
