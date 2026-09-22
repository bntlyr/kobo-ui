import { ChangeDetectionStrategy, Component, computed, input, model, ViewEncapsulation } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>['variant']>;
export type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>['size']>;

@Component({
  selector: 'button[k-toggle]',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[attr.aria-pressed]': 'pressed()',
    '[disabled]': 'disabled()',
    '(click)': 'toggle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KToggleDirective {
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('default');
  readonly class = input<string>('');
  readonly disabled = input<boolean>(false);
  
  readonly pressed = model<boolean>(false);

  protected readonly classes = computed(() => cn(toggleVariants({ variant: this.variant(), size: this.size() }), this.class()));

  toggle(): void {
    if (this.disabled()) return;
    this.pressed.update(v => !v);
  }
}
