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
  signal,
} from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../../../core/utils/cn';

// ---- Popover Content ----

@Component({
  selector: 'k-popover-content',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KPopoverContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'z-50 rounded-md border border-border bg-popover p-4 text-popover-foreground',
      'shadow-md outline-none w-72 animate-slide-in-up',
      this.class()
    )
  );
}

// ---- Popover Trigger ----

@Directive({ selector: '[kPopoverTrigger]' })
export class KPopoverTrigger implements OnDestroy {
  readonly kPopoverTrigger = input.required<TemplateRef<unknown>>();
  readonly popoverAlign    = input<'start' | 'end' | 'center'>('center');
  readonly popoverSide     = input<'top' | 'bottom' | 'left' | 'right'>('bottom');

  private readonly overlay  = inject(Overlay);
  private readonly el       = inject(ElementRef<HTMLElement>);
  private readonly vcr      = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  readonly isOpen = signal(false);

  @HostListener('click')
  toggle(): void { this.isOpen() ? this.close() : this.open(); }

  open(): void {
    if (this.overlayRef?.hasAttached()) return;

    const side  = this.popoverSide();
    const align = this.popoverAlign();

    const positions: ConnectedPosition[] = [];

    if (side === 'bottom') {
      if (align === 'start') positions.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 });
      if (align === 'end') positions.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 });
      if (align === 'center') positions.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 });
      positions.push({ originX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center', originY: 'top', overlayX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center', overlayY: 'bottom', offsetY: -8 });
    } else if (side === 'top') {
      if (align === 'start') positions.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 });
      if (align === 'end') positions.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -8 });
      if (align === 'center') positions.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 });
    } else if (side === 'left') {
      if (align === 'start') positions.push({ originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -8 });
      if (align === 'end') positions.push({ originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -8 });
      if (align === 'center') positions.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 });
    } else if (side === 'right') {
      if (align === 'start') positions.push({ originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 8 });
      if (align === 'end') positions.push({ originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 8 });
      if (align === 'center') positions.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 });
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      hasBackdrop:   true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe(e => { if (e.key === 'Escape') this.close(); });

    const portal = new TemplatePortal(this.kPopoverTrigger(), this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
  }

  close(): void {
    this.overlayRef?.detach();
    this.isOpen.set(false);
  }

  ngOnDestroy(): void { this.overlayRef?.dispose(); }
}
