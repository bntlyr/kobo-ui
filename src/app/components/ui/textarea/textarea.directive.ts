import { Directive, computed, input, booleanAttribute } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const textareaVariants = cva(
  [
    'flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2',
    'text-sm shadow-sm transition-colors resize-y',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
  ],
  {
    variants: {
      size: {
        sm:      'px-2.5 py-1.5 text-xs',
        default: 'px-3 py-2 text-sm',
        lg:      'px-4 py-3 text-base',
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

export type TextareaSize = NonNullable<VariantProps<typeof textareaVariants>['size']>;

/**
 * KTextareaDirective
 *
 * Selector: textarea[k-textarea]
 *
 * An attribute directive that styles native <textarea> elements.
 * Compatible with Angular Reactive Forms because it does not wrap the element.
 *
 * @example
 * <textarea k-textarea placeholder="Type your message here."></textarea>
 * <textarea k-textarea formControlName="message" [error]="true"></textarea>
 */
@Directive({
  selector: 'textarea[k-textarea]',
  host: {
    '[class]': 'classes()',
    '[attr.disabled]': 'disabled() ? true : null',
  },
})
export class KTextareaDirective {
  readonly size     = input<TextareaSize>('default');
  readonly error    = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class    = input<string>('');

  protected readonly classes = computed(() =>
    cn(textareaVariants({ size: this.size(), error: this.error() }), this.class())
  );
}
