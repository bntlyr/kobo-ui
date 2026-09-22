import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      }
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-500 ease-in-out rounded-full',
  {
    variants: {
      state: {
        normal: 'bg-primary',
        error: 'bg-destructive',
        success: 'bg-success',
      }
    },
    defaultVariants: {
      state: 'normal',
    }
  }
);

export type ProgressSize = NonNullable<VariantProps<typeof progressVariants>['size']>;
export type ProgressState = NonNullable<VariantProps<typeof progressIndicatorVariants>['state']>;

/**
 * <k-progress>
 *
 * @example
 * <k-progress [value]="75" />
 * <k-progress [value]="33" class="w-64" size="sm" state="success" />
 */
@Component({
  selector: 'k-progress',
  template: `
    <div
      role="progressbar"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max()"
      [attr.aria-valuenow]="clampedValue()"
      [class]="trackClasses()"
    >
      <div
        [class]="indicatorClasses()"
        [style.transform]="'translateX(-' + (100 - pct()) + '%)'"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KProgress {
  readonly value = input<number>(0);
  readonly max   = input<number>(100);
  readonly size  = input<ProgressSize>('default');
  readonly state = input<ProgressState>('normal');
  readonly class = input<string>('');

  protected readonly clampedValue = computed(() =>
    Math.min(Math.max(this.value(), 0), this.max())
  );

  protected readonly pct = computed(() =>
    this.max() === 0 ? 0 : (this.clampedValue() / this.max()) * 100
  );

  protected readonly trackClasses = computed(() =>
    cn(progressVariants({ size: this.size() }), this.class())
  );

  protected readonly indicatorClasses = computed(() =>
    progressIndicatorVariants({ state: this.state() })
  );
}
