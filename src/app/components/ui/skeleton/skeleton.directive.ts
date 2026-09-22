import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const skeletonVariants = cva(
  'rounded-md',
  {
    variants: {
      animation: {
        pulse: 'animate-pulse bg-muted',
        shimmer: 'bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] bg-[length:200%_100%] animate-shimmer bg-muted',
        none: 'bg-muted',
      },
    },
    defaultVariants: {
      animation: 'pulse',
    },
  }
);

export type SkeletonAnimation = NonNullable<VariantProps<typeof skeletonVariants>['animation']>;

/**
 * KSkeletonDirective
 *
 * Selector: div[k-skeleton], span[k-skeleton]
 * A loading placeholder with animation variants.
 *
 * @example
 * <div k-skeleton class="h-4 w-32" />
 * <div k-skeleton animation="shimmer" class="h-10 w-full rounded-full" />
 */
@Directive({
  selector: 'div[k-skeleton], span[k-skeleton]',
  host: {
    '[class]': 'classes()',
    'aria-hidden': 'true',
  },
})
export class KSkeletonDirective {
  readonly animation = input<SkeletonAnimation>('pulse');
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(skeletonVariants({ animation: this.animation() }), this.class())
  );
}
