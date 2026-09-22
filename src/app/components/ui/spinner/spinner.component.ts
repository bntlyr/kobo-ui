import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const spinnerVariants = cva(
  'animate-spin',
  {
    variants: {
      size: {
        sm:      'h-4 w-4',
        default: 'h-6 w-6',
        lg:      'h-8 w-8',
        xl:      'h-12 w-12',
      },
      color: {
        primary: 'text-primary',
        muted:   'text-muted-foreground',
        white:   'text-white',
      }
    },
    defaultVariants: { size: 'default', color: 'muted' },
  }
);

export type SpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>['size']>;
export type SpinnerColor = NonNullable<VariantProps<typeof spinnerVariants>['color']>;

/**
 * <k-spinner>
 * @example
 * <k-spinner />
 * <k-spinner size="lg" color="primary" />
 */
@Component({
  selector: 'k-spinner',
  template: `
    <span role="status" class="inline-flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        [class]="svgClasses()"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      <span class="sr-only">{{ label() }}</span>
    </span>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSpinner {
  readonly size  = input<SpinnerSize>('default');
  readonly color = input<SpinnerColor>('muted');
  readonly label = input<string>('Loading...');
  readonly class = input<string>('');

  protected readonly svgClasses = computed(() =>
    cn(spinnerVariants({ size: this.size(), color: this.color() }), this.class())
  );
}
