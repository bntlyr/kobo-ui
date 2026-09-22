import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { cn } from '../../../core/utils/cn';

// ---- Tooltip Content Component ----

@Component({
  selector: 'k-tooltip-content',
  template: `
    <div [class]="classes()">{{ text() }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTooltipContent {
  readonly text  = input<string>('');
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(
      'z-50 rounded-md bg-popover border border-border px-3 py-1.5',
      'text-popover-foreground text-xs shadow-md',
      'animate-fade-in',
      this.class()
    )
  );
}

// ---- Tooltip Directive ----

/**
 * [kTooltip]
 *
 * Lightweight tooltip directive using CDK overlay with auto-positioning.
 * 300ms open delay, instant close. Links trigger with role="tooltip".
 *
 * @example
 * <button kTooltip="Delete this item">
 *   <lucide-icon name="trash" />
 * </button>
 */
@Directive({
  selector: '[kTooltip]',
  host: {
    '[attr.aria-describedby]': 'tooltipId',
  },
})
export class KTooltipDirective implements OnDestroy {
  readonly kTooltip      = input<string>('');
  readonly kTooltipDelay = input<number>(300);
  readonly kTooltipSide  = input<'top' | 'bottom' | 'left' | 'right'>('top');
  readonly kTooltipAlign = input<'start' | 'center' | 'end'>('center');

  readonly tooltipId = `k-tooltip-${Math.random().toString(36).slice(2, 8)}`;

  private readonly overlay = inject(Overlay);
  private readonly el      = inject(ElementRef<HTMLElement>);
  private readonly vcr     = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  private componentRef: ReturnType<typeof this._attach> | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('mouseenter')
  @HostListener('focus')
  onShow(): void {
    if (this.showTimer) return;
    this.showTimer = setTimeout(() => {
      this.showTimer = null;
      this._show();
    }, this.kTooltipDelay());
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onHide(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    this._hide();
  }

  private _show(): void {
    if (this.overlayRef?.hasAttached()) return;
    if (!this.kTooltip()) return;

    const side = this.kTooltipSide();
    const align = this.kTooltipAlign();

    const originXMap  = { start: 'start', center: 'center', end: 'end' } as const;
    const overlayXMap = { start: 'start', center: 'center', end: 'end' } as const;

    const positions: ConnectedPosition[] = [
      {
        originX:  side === 'right' ? 'end'    : side === 'left' ? 'start' : originXMap[align],
        originY:  side === 'bottom' ? 'bottom' : side === 'top' ? 'top' : 'center',
        overlayX: side === 'right' ? 'start'  : side === 'left' ? 'end' : overlayXMap[align],
        overlayY: side === 'bottom' ? 'top'    : side === 'top' ? 'bottom' : 'center',
        offsetY:  side === 'bottom' ? 8 : side === 'top' ? -8 : 0,
        offsetX:  side === 'right' ? 8 : side === 'left' ? -8 : 0,
      },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    const portal = new ComponentPortal(KTooltipContent, this.vcr);
    const ref = this.overlayRef.attach(portal);
    ref.setInput('text', this.kTooltip());
  }

  private _hide(): void {
    this.overlayRef?.detach();
  }

  ngOnDestroy(): void {
    if (this.showTimer) clearTimeout(this.showTimer);
    this.overlayRef?.dispose();
  }

  private _attach(portal: ComponentPortal<KTooltipContent>) {
    return this.overlayRef!.attach(portal);
  }
}
