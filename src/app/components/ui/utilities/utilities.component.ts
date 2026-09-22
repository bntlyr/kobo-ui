import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-scroll-fade',
  template: `
    <div [class]="classes()">
      <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-background to-transparent"></div>
      <ng-content />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KScrollFade {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative w-full overflow-hidden', this.class()));
}

@Component({
  selector: 'k-shimmer',
  template: `
    <div [class]="classes()">
      <ng-content />
      <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KShimmer {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative overflow-hidden', this.class()));
}
