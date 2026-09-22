import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  OnInit,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { cn } from '../../../core/utils/cn';

// ---- DI Token ----

export const K_FORM_FIELD = new InjectionToken<KFormField>('K_FORM_FIELD');

// ---- Form Field Root ----

/**
 * <k-form-field>
 *
 * Provides a context that coordinates label, error, and hint children.
 * Optionally pass [control] to enable automatic error display in <k-form-error>.
 *
 * @example
 * <k-form-field [control]="form.get('email')">
 *   <label k-label for="email">Email</label>
 *   <input k-input id="email" formControlName="email" />
 *   <k-form-error />
 *   <k-form-hint>We'll never share your email.</k-form-hint>
 * </k-form-field>
 */
@Component({
  selector: 'k-form-field',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  providers: [{ provide: K_FORM_FIELD, useExisting: KFormField }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KFormField {
  readonly control = input<AbstractControl | null>(null);
  readonly class   = input<string>('');

  /** Tracks whether the control is in an invalid+touched state */
  readonly hasError = computed(() => {
    const ctrl = this.control();
    return ctrl ? ctrl.invalid && ctrl.touched : false;
  });

  /** First validation error message, if any */
  readonly firstError = computed((): string => {
    const ctrl = this.control();
    if (!ctrl?.errors) return '';
    const key = Object.keys(ctrl.errors)[0];
    const err = ctrl.errors[key];
    if (typeof err === 'string') return err;
    if (err.message) return err.message;
    // Built-in error messages
    switch (key) {
      case 'required':   return 'This field is required.';
      case 'email':      return 'Please enter a valid email address.';
      case 'minlength':  return `Minimum ${err.requiredLength} characters required.`;
      case 'maxlength':  return `Maximum ${err.requiredLength} characters allowed.`;
      case 'min':        return `Minimum value is ${err.min}.`;
      case 'max':        return `Maximum value is ${err.max}.`;
      case 'pattern':    return 'Invalid format.';
      default:           return 'Invalid value.';
    }
  });

  protected readonly classes = computed(() =>
    cn('flex flex-col gap-1.5', this.class())
  );
}

// ---- Form Error ----

/**
 * <k-form-error>
 * Reads the control error from the parent KFormField.
 * Shows nothing if the control is valid or untouched.
 */
@Component({
  selector: 'k-form-error',
  template: `
    @if (formField.hasError()) {
      <span role="alert" [class]="classes()">
        {{ formField.firstError() }}
      </span>
    }
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KFormError {
  readonly class = input<string>('');
  protected readonly formField = inject(K_FORM_FIELD);

  protected readonly classes = computed(() => cn('text-xs text-destructive font-medium', this.class()));
}

// ---- Form Hint ----

/**
 * <k-form-hint>
 * Helper text shown below the input.
 */
@Component({
  selector: 'k-form-hint',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KFormHint {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('text-xs text-muted-foreground', this.class()));
}
