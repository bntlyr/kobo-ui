import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-empty-icon',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KEmptyIcon {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted', this.class()));
}

@Component({
  selector: 'k-empty-title',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KEmptyTitle {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('text-xl font-semibold', this.class()));
}

@Component({
  selector: 'k-empty-description',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KEmptyDescription {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('mb-4 mt-2 text-sm text-muted-foreground', this.class()));
}

@Component({
  selector: 'k-empty',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KEmpty {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50', this.class()));
}
