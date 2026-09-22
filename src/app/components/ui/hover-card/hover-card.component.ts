import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  Injector,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-hover-card-content',
  template: `
    <div [class]="classes()" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KHoverCardContent {
  readonly class = input<string>('');
  
  protected readonly classes = computed(() => cn(
    'z-50 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none',
    'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    this.class()
  ));

  readonly overlayRef = inject(OverlayRef, { optional: true });
  readonly trigger = inject(KHoverCardTrigger, { optional: true });

  onMouseEnter(): void {
    this.trigger?.cancelHide();
  }

  onMouseLeave(): void {
    this.trigger?.scheduleHide();
  }
}

@Directive({
  selector: '[kHoverCardTrigger]',
})
export class KHoverCardTrigger implements OnDestroy {
  readonly kHoverCardTrigger = input.required<TemplateRef<void>>();
  readonly openDelay = input<number>(700);
  readonly closeDelay = input<number>(300);

  private readonly overlay = inject(Overlay);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly vcr = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('mouseenter')
  @HostListener('focus')
  onShow(): void {
    this.cancelHide();
    if (this.showTimer) return;
    this.showTimer = setTimeout(() => {
      this.showTimer = null;
      this.open();
    }, this.openDelay());
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onHide(): void {
    this.cancelShow();
    this.scheduleHide();
  }

  cancelShow(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }

  cancelHide(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  scheduleHide(): void {
    if (this.hideTimer) return;
    this.hideTimer = setTimeout(() => {
      this.hideTimer = null;
      this.close();
    }, this.closeDelay());
  }

  open(): void {
    if (this.overlayRef?.hasAttached()) return;

    const positions: ConnectedPosition[] = [
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const injector = Injector.create({
      parent: this.vcr.injector,
      providers: [{ provide: KHoverCardTrigger, useValue: this }],
    });

    const portal = new TemplatePortal(this.kHoverCardTrigger(), this.vcr, null, injector);
    this.overlayRef.attach(portal);
  }

  close(): void {
    this.overlayRef?.detach();
  }

  ngOnDestroy(): void {
    this.cancelShow();
    this.cancelHide();
    this.overlayRef?.dispose();
  }
}
