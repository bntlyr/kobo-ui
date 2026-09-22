import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-aspect-ratio',
  template: `
    <div class="relative h-full w-full">
      <ng-content />
    </div>
  `,
  host: {
    '[class]': 'classes()',
    '[style.aspect-ratio]': 'ratio()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAspectRatio {
  readonly ratio = input<number>(1);
  readonly class = input<string>('');

  protected readonly classes = computed(() => cn('block w-full', this.class()));
}
