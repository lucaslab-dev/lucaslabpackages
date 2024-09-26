import { Validators } from '@angular/forms';

/**
 * Represents the configuration for a form field.
 */
export interface FormConfiguration {
  /**
   * The label for the form field.
   */
  label: string;

  /**
   * The type of the form field. It can be one of the following:
   * - 'text'
   * - 'email'
   * - 'number'
   * - 'select'
   * - 'radio'
   * - 'checkbox'
   * - 'textarea'
   * - 'date'
   */
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'textarea'
    | 'date';

  /**
   * The property name associated with the form field.
   */
  property: string;

  /**   * The placeholder text for the form field. This is optional.   */
  placeholder?: string;

  /**
   * The options for the form field, applicable if the field type is 'select', 'radio', or 'checkbox'.
   * Each option is represented by an object with a `key` and `value`.
   */
  options?: { key: string; value: string }[];

  /**
   * The validators to be applied to the form field. This is optional.
   */
  validators?: Validators[];
}

/**
 * Interface representing the styles for various components of a form.
 */
export interface FormComponentStyles {
  /**
   * CSS class for the container element of the form.
   */
  container?: string;

  /**
   * CSS class for the label elements within the form.
   */
  label?: string;

  /**
   * CSS class for the input elements within the form.
   */
  input?: string;

  /**
   * CSS class for the error messages within the form.
   */
  error?: string;

  /**
   * CSS class for the submit button of the form.
   */
  submit?: string;

  /**
   * CSS class for the cancel button of the form.
   */
  cancel?: string;
}

/**
 * Represents a map of error messages where each key corresponds to a specific error type.
 * This interface is optional and can be used to provide custom translations for each kind of error message.
 * If not provided, default error messages will be used based on the context of its usage.
 *
 * Example:
 * {
 *   required: 'is required',
 *   minlength: 'must be longer',
 *   maxlength: 'must be shorter',
 *   email: 'must be a valid email',
 *   pattern: 'is not valid',
 * }
 */
export interface ErrorMapMessages {
  [key: string]: string;
}
