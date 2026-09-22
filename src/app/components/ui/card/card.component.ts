import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const cardVariants = cva(
  'block rounded-xl text-card-foreground',
  {
    variants: {
      variant: {
        default: 'border border-border bg-card shadow-sm',
        outline: 'border border-border bg-transparent shadow-none',
        ghost: 'border-none bg-transparent shadow-none',
        interactive: 'border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type CardVariant = NonNullable<VariantProps<typeof cardVariants>['variant']>;

/** <k-card> — Root card container */
@Component({
  selector: 'k-card',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCard {
  readonly variant = input<CardVariant>('default');
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(cardVariants({ variant: this.variant() }), this.class())
  );
}

/** <k-card-header> */
@Component({
  selector: 'k-card-header',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCardHeader {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('flex flex-col space-y-1.5 p-6', this.class())
  );
}

/** <k-card-title> */
@Component({
  selector: 'k-card-title',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCardTitle {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('block font-semibold leading-none tracking-tight text-foreground', this.class())
  );
}

/** <k-card-description> */
@Component({
  selector: 'k-card-description',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCardDescription {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('block text-sm text-muted-foreground', this.class())
  );
}

/** <k-card-content> */
@Component({
  selector: 'k-card-content',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCardContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('block p-6 pt-0', this.class())
  );
}

/** <k-card-footer> */
@Component({
  selector: 'k-card-footer',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCardFooter {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('flex items-center p-6 pt-0', this.class())
  );
}
