import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
  signal,
  effect,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

export type TabsVariant = 'pills' | 'line' | 'outline';
export type TabsSize = 'sm' | 'default' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

// ---- DI Context ----

export interface TabsContext {
  value: ReturnType<typeof model<string>>;
  variant: ReturnType<typeof signal<TabsVariant>>;
  size: ReturnType<typeof signal<TabsSize>>;
  orientation: ReturnType<typeof signal<TabsOrientation>>;
}

export const K_TABS = new InjectionToken<TabsContext>('K_TABS');

// ---- k-tabs Root ----

@Component({
  selector: 'k-tabs',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  providers: [
    {
      provide: K_TABS,
      useFactory: () => {
        const t = inject(KTabs, { self: true });
        return {
          value: t.value,
          variant: t._variant,
          size: t._size,
          orientation: t._orientation,
        };
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTabs {
  readonly value       = model<string>('');
  readonly variant     = input<TabsVariant>('pills');
  readonly size        = input<TabsSize>('default');
  readonly orientation = input<TabsOrientation>('horizontal');
  readonly class       = input<string>('');

  readonly _variant     = signal<TabsVariant>('pills');
  readonly _size        = signal<TabsSize>('default');
  readonly _orientation = signal<TabsOrientation>('horizontal');

  constructor() {
    effect(() => {
      this._variant.set(this.variant());
      this._size.set(this.size());
      this._orientation.set(this.orientation());
    });
  }

  protected readonly classes = computed(() => cn(
    'flex gap-2',
    this.orientation() === 'vertical' ? 'flex-row' : 'flex-col',
    this.class()
  ));
}

// ---- k-tab-list ----

const tabListVariants = cva(
  'inline-flex items-center justify-center text-muted-foreground',
  {
    variants: {
      variant: {
        pills:   'bg-muted rounded-lg p-1',
        line:    'bg-transparent border-b border-border rounded-none p-0',
        outline: 'bg-transparent border border-border rounded-lg p-1',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical:   'flex-col h-auto items-stretch',
      },
      size: {
        sm:      'h-8',
        default: 'h-10',
        lg:      'h-12',
      }
    },
    compoundVariants: [
      { variant: 'line', class: 'h-auto' }
    ],
    defaultVariants: {
      variant: 'pills',
      orientation: 'horizontal',
      size: 'default',
    }
  }
);

@Component({
  selector: 'k-tab-list',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    role: 'tablist',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTabList {
  readonly class = input<string>('');
  private readonly ctx = inject(K_TABS, { optional: true });

  protected readonly classes = computed(() =>
    cn(
      tabListVariants({
        variant: this.ctx?.variant() ?? 'pills',
        orientation: this.ctx?.orientation() ?? 'horizontal',
        size: this.ctx?.size() ?? 'default',
      }),
      this.class()
    )
  );
}

// ---- k-tab-trigger ----

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        pills:   'rounded-md px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow hover:bg-background/50 hover:text-foreground',
        line:    'rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:text-foreground hover:text-foreground',
        outline: 'rounded-md px-3 py-1.5 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hover:bg-accent/50',
      },
      size: {
        sm:      'text-xs',
        default: 'text-sm',
        lg:      'text-base',
      },
      orientation: {
        horizontal: '',
        vertical: 'justify-start w-full',
      }
    },
    compoundVariants: [
      { variant: 'line', orientation: 'vertical', class: 'border-b-0 border-l-2 data-[state=active]:border-l-primary' }
    ],
    defaultVariants: {
      variant: 'pills',
      size: 'default',
      orientation: 'horizontal',
    }
  }
);

@Component({
  selector: 'k-tab-trigger',
  template: `
    <button
      type="button"
      role="tab"
      [id]="'tab-' + value()"
      [attr.aria-selected]="isActive()"
      [attr.aria-controls]="'panel-' + value()"
      [attr.data-state]="isActive() ? 'active' : 'inactive'"
      [tabindex]="isActive() ? 0 : -1"
      (click)="activate()"
      [class]="btnClasses()"
    >
      <ng-content />
    </button>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTabTrigger {
  readonly value    = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly class    = input<string>('');

  private readonly ctx = inject(K_TABS, { optional: true });

  protected readonly isActive = computed(() => this.ctx?.value() === this.value());

  protected readonly btnClasses = computed(() =>
    cn(
      tabTriggerVariants({
        variant: this.ctx?.variant() ?? 'pills',
        size: this.ctx?.size() ?? 'default',
        orientation: this.ctx?.orientation() ?? 'horizontal',
      }),
      this.class()
    )
  );

  activate(): void {
    if (this.disabled() || !this.ctx) return;
    this.ctx.value.set(this.value());
  }
}

// ---- k-tab-content ----

@Component({
  selector: 'k-tab-content',
  template: `
    @if (isActive()) {
      <div
        role="tabpanel"
        [id]="'panel-' + value()"
        [attr.aria-labelledby]="'tab-' + value()"
        class="animate-fade-in"
        [class]="panelClass()"
      >
        <ng-content />
      </div>
    }
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTabContent {
  readonly value = input.required<string>();
  readonly class = input<string>('');

  private readonly ctx = inject(K_TABS, { optional: true });

  protected readonly isActive   = computed(() => this.ctx?.value() === this.value());
  protected readonly panelClass = computed(() =>
    cn('mt-2 ring-offset-background focus-visible:outline-none flex-1', this.class())
  );
}
