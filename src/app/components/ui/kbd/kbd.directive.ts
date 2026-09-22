import { ChangeDetectionStrategy, Directive, computed, input } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Directive({
  selector: 'kbd[k-kbd]',
  host: {
    '[class]': 'classes()',
  },
})
export class KKbdDirective {
  readonly class = input<string>('');

  protected readonly classes = computed(() => cn(
    'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100',
    this.class()
  ));
}
