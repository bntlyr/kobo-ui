import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const alertVariants = cva(
  'relative block w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default:     'bg-background text-foreground border-border',
        info:        'border-info/50 text-info bg-info/10 [&>svg]:text-info',
        success:     'border-success/50 text-success bg-success/10 [&>svg]:text-success',
        warning:     'border-warning/50 text-warning bg-warning/10 [&>svg]:text-warning',
        destructive: 'border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

/**
 * <k-alert>
 * @example
 * <k-alert variant="success">
 *   <k-alert-title>Operation complete!</k-alert-title>
 *   <k-alert-description>Your data has been saved.</k-alert-description>
 * </k-alert>
 */
@Component({
  selector: 'k-alert',
  template: `<ng-content />`,
  host: { '[class]': 'classes()', role: 'alert' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlert {
  readonly variant = input<AlertVariant>('default');
  readonly class   = input<string>('');
  protected readonly classes = computed(() =>
    cn(alertVariants({ variant: this.variant() }), this.class())
  );
}

@Component({
  selector: 'k-alert-title',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertTitle {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('mb-1 block font-medium leading-none tracking-tight', this.class()));
}

@Component({
  selector: 'k-alert-description',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertDescription {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('block text-sm [&_p]:leading-relaxed', this.class()));
}
