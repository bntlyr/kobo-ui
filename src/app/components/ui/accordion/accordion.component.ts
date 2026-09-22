import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  effect,
} from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export type AccordionVariant = 'default' | 'outline' | 'separated';

export interface AccordionContext {
  variant: ReturnType<typeof signal<AccordionVariant>>;
}

export const K_ACCORDION = new InjectionToken<AccordionContext>('K_ACCORDION');

const accordionVariants = cva('', {
  variants: {
    variant: {
      default:   'divide-y divide-border',
      outline:   'divide-y divide-border rounded-lg border border-border',
      separated: 'space-y-4',
    }
  },
  defaultVariants: {
    variant: 'default',
  }
});

/**
 * <k-accordion>
 * Container for accordion panels.
 *
 * @example
 * <k-accordion variant="outline">
 *   <k-accordion-panel title="Is it accessible?">Yes it is.</k-accordion-panel>
 * </k-accordion>
 */
@Component({
  selector: 'k-accordion',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  providers: [
    {
      provide: K_ACCORDION,
      useFactory: () => {
        const a = inject(KAccordion, { self: true });
        return { variant: a._variant };
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAccordion {
  readonly variant = input<AccordionVariant>('default');
  readonly class   = input<string>('');

  readonly _variant = signal<AccordionVariant>('default');

  constructor() {
    effect(() => {
      this._variant.set(this.variant());
    });
  }

  protected readonly classes = computed(() => cn(accordionVariants({ variant: this.variant() }), this.class()));
}

const panelVariants = cva(
  'overflow-hidden',
  {
    variants: {
      variant: {
        default:   'border-b border-border last:border-0',
        outline:   '',
        separated: 'rounded-lg border border-border bg-card px-4',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
);

@Component({
  selector: 'k-accordion-panel',
  template: `
    <div [class]="containerClasses()">
      <!-- Trigger -->
      <button
        type="button"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="panelId"
        (click)="toggle()"
        [class]="triggerClasses()"
      >
        <span>{{ title() }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          class="shrink-0 transition-transform duration-200"
          [class.rotate-180]="open()"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <!-- Content -->
      <div
        [id]="panelId"
        [@accordionContent]="open() ? 'open' : 'closed'"
        class="overflow-hidden text-sm"
      >
        <div class="pb-4 pt-0 text-muted-foreground">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('accordionContent', [
      state('closed', style({ height: '0', opacity: '0' })),
      state('open',   style({ height: '*', opacity: '1' })),
      transition('closed <=> open', animate('200ms ease-in-out')),
    ]),
  ],
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAccordionPanel {
  readonly title        = input.required<string>();
  readonly defaultOpen  = input<boolean>(false);
  readonly class        = input<string>('');
  
  readonly open         = signal(false);
  readonly panelId      = `accordion-panel-${Math.random().toString(36).slice(2, 8)}`;

  private readonly ctx = inject(K_ACCORDION, { optional: true });

  constructor() {
    if (this.defaultOpen()) this.open.set(true);
  }

  protected readonly containerClasses = computed(() =>
    cn(
      panelVariants({ variant: this.ctx?.variant() ?? 'default' }),
      this.class()
    )
  );

  protected readonly triggerClasses = computed(() => {
    const variant = this.ctx?.variant() ?? 'default';
    return cn(
      'flex w-full items-center justify-between py-4 text-sm font-medium text-left transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      variant === 'outline' ? 'px-4' : ''
    );
  });

  toggle(): void { this.open.update(v => !v); }
}
