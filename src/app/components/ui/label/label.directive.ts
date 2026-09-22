import { Directive, computed, input, inject } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { K_FORM_FIELD } from '../form-field/form-field.component';

/**
 * KLabelDirective
 *
 * Selector: label[k-label]
 * Accessible form label.
 *
 * @example
 * <label k-label for="email">Email address</label>
 */
@Directive({
  selector: 'label[k-label]',
  host: {
    '[class]': 'classes()',
  },
})
export class KLabelDirective {
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly error    = input<boolean>(false);
  readonly class    = input<string>('');

  private readonly formField = inject(K_FORM_FIELD, { optional: true });

  protected readonly isError = computed(() => this.error() || (this.formField?.hasError() ?? false));
  protected readonly isRequired = computed(() => this.required() || (this.formField?.isRequired() ?? false));

  protected readonly classes = computed(() =>
    cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      this.isError() ? 'text-destructive' : '',
      this.isRequired() ? "after:content-['*'] after:ml-0.5 after:text-destructive" : '',
      this.disabled() ? 'cursor-not-allowed opacity-70' : '',
      this.class()
    )
  );
}
