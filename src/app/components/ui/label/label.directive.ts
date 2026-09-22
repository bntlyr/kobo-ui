import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../core/utils/cn';

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
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      this.required() ? "after:content-['*'] after:ml-0.5 after:text-destructive" : '',
      this.disabled() ? 'cursor-not-allowed opacity-70' : '',
      this.class()
    )
  );
}
