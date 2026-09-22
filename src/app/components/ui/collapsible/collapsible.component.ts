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
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { cn } from '../../../core/utils/cn';

export const K_COLLAPSIBLE = new InjectionToken<KCollapsible>('K_COLLAPSIBLE');

/**
 * <k-collapsible>
 * Interactive animated show/hide primitive.
 *
 * @example
 * <k-collapsible [(open)]="expanded">
 *   <k-collapsible-trigger>Toggle</k-collapsible-trigger>
 *   <k-collapsible-content>Content...</k-collapsible-content>
 * </k-collapsible>
 */
@Component({
  selector: 'k-collapsible',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  providers: [{ provide: K_COLLAPSIBLE, useExisting: KCollapsible }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCollapsible {
  readonly open  = model<boolean>(false);
  readonly class = input<string>('');

  protected readonly classes = computed(() => cn('w-full', this.class()));

  toggle(): void { this.open.update(v => !v); }
}

// ---- Trigger ----

@Component({
  selector: 'k-collapsible-trigger',
  template: `
    <button
      type="button"
      [attr.aria-expanded]="ctx.open()"
      (click)="ctx.toggle()"
      class="flex w-full items-center justify-between text-sm font-medium transition-all
             hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
             focus-visible:ring-offset-2"
    >
      <ng-content />
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round" class="shrink-0 transition-transform duration-200"
           [class.rotate-180]="ctx.open()">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCollapsibleTrigger {
  protected readonly ctx = inject(K_COLLAPSIBLE);
}

// ---- Content ----

@Component({
  selector: 'k-collapsible-content',
  template: `
    <div [@collapse]="ctx.open() ? 'open' : 'closed'" class="overflow-hidden text-sm">
      <ng-content />
    </div>
  `,
  animations: [
    trigger('collapse', [
      state('closed', style({ height: '0', opacity: '0' })),
      state('open',   style({ height: '*', opacity: '1' })),
      transition('closed <=> open', animate('200ms ease-in-out')),
    ]),
  ],
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCollapsibleContent {
  protected readonly ctx = inject(K_COLLAPSIBLE);
}
