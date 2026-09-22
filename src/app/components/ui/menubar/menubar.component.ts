import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-menubar',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'role': 'menubar',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KMenubar {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex h-10 items-center space-x-1 rounded-md border bg-background p-1', this.class()));
}
