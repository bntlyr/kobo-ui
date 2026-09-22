import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-input-group-text',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KInputGroupText {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex items-center px-3 text-sm text-muted-foreground bg-muted border border-input', this.class()));
}

@Component({
  selector: 'k-input-group',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KInputGroup {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'flex w-full overflow-hidden rounded-md [&>input]:rounded-none [&>input:first-child]:rounded-l-md [&>input:last-child]:rounded-r-md [&>k-input-group-text:first-child]:rounded-l-md [&>k-input-group-text:first-child]:border-r-0 [&>k-input-group-text:last-child]:rounded-r-md [&>k-input-group-text:last-child]:border-l-0',
    this.class()
  ));
}
