import { Directive, computed, input, booleanAttribute, inject } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';
import { K_FORM_FIELD } from '../form-field/form-field.component';

const inputVariants = cva(
  [
    'w-full rounded-md border bg-transparent px-3 py-1',
    'text-sm shadow-sm transition-colors',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
  ],
  {
    variants: {
      size: {
        sm:      'h-8 px-2.5 text-xs',
        default: 'h-10 px-3 py-2 text-sm',
        lg:      'h-12 px-4 py-3 text-base',
      },
      error: {
        true:  'border-destructive text-destructive focus-visible:ring-destructive',
        false: 'border-input focus-visible:ring-ring',
      },
    },
    defaultVariants: {
      size: 'default',
      error: false,
    },
  }
);

export type InputSize = NonNullable<VariantProps<typeof inputVariants>['size']>;

/**
 * KInputDirective
 *
 * Selector: input[k-input]
 *
 * An attribute directive that styles native <input> elements.
 * Fully compatible with Angular Reactive Forms (formControlName, ngModel)
 * because it stays as an attribute on the native element — no CVA wrapper needed.
 *
 * @example
 * <input k-input type="text" placeholder="Search..." />
 * <input k-input type="email" formControlName="email" [error]="true" />
 */
@Directive({
  selector: 'input[k-input]',
  host: {
    '[class]': 'classes()',
    '[attr.disabled]': 'disabled() ? true : null',
  },
})
export class KInputDirective {
  readonly size     = input<InputSize>('default');
  readonly error    = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class    = input<string>('');

  private readonly formField = inject(K_FORM_FIELD, { optional: true });

  protected readonly isError = computed(() => this.error() || (this.formField?.hasError() ?? false));

  protected readonly classes = computed(() =>
    cn(inputVariants({ size: this.size(), error: this.isError() }), this.class())
  );
}
