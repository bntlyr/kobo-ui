import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../core/utils/cn';

/**
 * KSeparatorDirective
 *
 * Selector: hr[k-separator], [k-separator]
 * A visual divider. Use on <hr> for horizontal, or any block element
 * for vertical separation.
 *
 * @example
 * <hr k-separator />
 * <div k-separator orientation="vertical" class="h-8" />
 */
@Directive({
  selector: 'hr[k-separator], [k-separator]',
  host: {
    '[class]': 'classes()',
    '[attr.role]': 'decorative() ? "none" : "separator"',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class KSeparatorDirective {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly decorative  = input<boolean>(false);
  readonly class       = input<string>('');

  protected readonly classes = computed(() =>
    cn(
      'shrink-0 bg-border',
      this.orientation() === 'horizontal' ? 'h-[1px] w-full my-0' : 'w-[1px] h-full',
      this.class()
    )
  );
}
