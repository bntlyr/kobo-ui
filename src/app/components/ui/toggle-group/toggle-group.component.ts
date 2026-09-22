import { ChangeDetectionStrategy, Component, computed, Directive, HostListener, inject, InjectionToken, input, model, ViewEncapsulation } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';
import { ToggleSize, ToggleVariant } from '../toggle/toggle.directive';

export const K_TOGGLE_GROUP = new InjectionToken<KToggleGroup>('K_TOGGLE_GROUP');

@Component({
  selector: 'k-toggle-group',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'role': 'group',
    '[attr.dir]': '"ltr"',
  },
  providers: [{ provide: K_TOGGLE_GROUP, useExisting: KToggleGroup }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KToggleGroup {
  readonly class = input<string>('');
  readonly type = input<'single' | 'multiple'>('single');
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('default');
  readonly disabled = input<boolean>(false);

  readonly value = model<string | string[]>('');

  protected readonly classes = computed(() => cn('flex items-center justify-center gap-1', this.class()));

  onItemClick(itemValue: string): void {
    if (this.disabled()) return;
    
    if (this.type() === 'single') {
      this.value.set(this.value() === itemValue ? '' : itemValue);
    } else {
      const current = Array.isArray(this.value()) ? [...this.value() as string[]] : [];
      const index = current.indexOf(itemValue);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(itemValue);
      }
      this.value.set(current);
    }
  }

  isPressed(itemValue: string): boolean {
    if (this.type() === 'single') {
      return this.value() === itemValue;
    }
    return Array.isArray(this.value()) && (this.value() as string[]).includes(itemValue);
  }
}

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

@Directive({
  selector: 'button[k-toggle-group-item]',
  host: {
    '[class]': 'classes()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[attr.aria-pressed]': 'pressed()',
    '[disabled]': 'isDisabled()',
    '(click)': 'onClick()',
  },
})
export class KToggleGroupItem {
  readonly value = input.required<string>();
  readonly class = input<string>('');
  readonly disabled = input<boolean>(false);
  
  private readonly group = inject(K_TOGGLE_GROUP);

  protected readonly pressed = computed(() => this.group.isPressed(this.value()));
  protected readonly isDisabled = computed(() => this.disabled() || this.group.disabled());

  protected readonly classes = computed(() => cn(
    toggleVariants({ variant: this.group.variant(), size: this.group.size() }),
    this.class()
  ));

  onClick(): void {
    if (this.isDisabled()) return;
    this.group.onItemClick(this.value());
  }
}
