import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full border font-semibold',
    'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline:
          'text-foreground border-border',
        success:
          'border-transparent bg-success text-success-foreground hover:bg-success/80',
        warning:
          'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
        info:
          'border-transparent bg-info text-info-foreground hover:bg-info/80',
      },
      size: {
        sm:      'px-2 py-0.5 text-[10px] font-medium',
        default: 'px-2.5 py-0.5 text-xs font-semibold',
        lg:      'px-3 py-1 text-sm font-semibold',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
export type BadgeSize    = NonNullable<VariantProps<typeof badgeVariants>['size']>;

/**
 * KBadgeDirective
 *
 * Selector: span[k-badge], [k-badge]
 *
 * @example
 * <span k-badge>New</span>
 * <span k-badge variant="destructive" size="sm">Error</span>
 */
@Directive({
  selector: 'span[k-badge], [k-badge]',
  host: {
    '[class]': 'classes()',
  },
})
export class KBadgeDirective {
  readonly variant = input<BadgeVariant>('default');
  readonly size    = input<BadgeSize>('default');
  readonly class   = input<string>('');

  protected readonly classes = computed(() =>
    cn(badgeVariants({ variant: this.variant(), size: this.size() }), this.class())
  );
}
