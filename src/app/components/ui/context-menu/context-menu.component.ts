import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[kContextMenuTrigger]',
})
export class KContextMenuTrigger implements OnDestroy {
  readonly kContextMenuTrigger = input.required<TemplateRef<void>>();

  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.open(event);
  }

  open(event: MouseEvent): void {
    if (this.overlayRef) {
      this.close();
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: event.clientX, y: event.clientY })
      .withPositions([
        { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
        { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
        { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
      ]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new TemplatePortal(this.kContextMenuTrigger(), this.vcr);
    this.overlayRef.attach(portal);
  }

  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  ngOnDestroy(): void {
    this.close();
  }
}
