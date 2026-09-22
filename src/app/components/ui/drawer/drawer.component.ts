import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injectable,
  Injector,
  InjectionToken,
  input,
  model,
  signal,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../../../core/utils/cn';

// ---- Drawer Service ----

@Injectable({ providedIn: 'root' })
export class KDrawerService {
  private readonly overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;
  private _closeCallback: (() => void) | null = null;

  open(template: TemplateRef<any>, vcr: ViewContainerRef): void {
    if (this.overlayRef) this.close();

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: ['fixed', 'inset-0', 'bg-black/60', 'backdrop-blur-sm', 'z-40', 'transition-opacity', 'duration-300'],
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      panelClass: ['fixed', 'inset-0', 'z-50', 'pointer-events-none'],
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new TemplatePortal(template, vcr);
    this.overlayRef.attach(portal);
  }

  registerCloseCallback(cb: () => void): void {
    this._closeCallback = cb;
  }

  close(): void {
    if (this._closeCallback) {
      this._closeCallback();
      this._closeCallback = null;
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}

// ---- Drawer Content (draggable bottom panel) ----

@Component({
  selector: 'k-drawer-content',
  template: `
    <div
      [class]="classes()"
      [style.transform]="'translateY(' + dragOffset() + 'px)'"
      [style.transition]="isDragging() ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'"
      (pointerdown)="onPointerDown($event)"
      (pointermove)="onPointerMove($event)"
      (pointerup)="onPointerUp($event)"
      (pointercancel)="onPointerUp($event)"
    >
      <!-- Drag handle -->
      <div class="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing">
        <div class="h-1.5 w-12 rounded-full bg-muted-foreground/20"></div>
      </div>
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerContent {
  readonly class = input<string>('');
  private readonly drawerService = inject(KDrawerService);

  readonly dragOffset = signal(0);
  readonly isDragging = signal(false);

  private startY = 0;
  private startOffset = 0;

  protected readonly classes = computed(() => cn(
    'fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border-t border-border bg-background shadow-2xl pointer-events-auto',
    'max-h-[85vh]',
    this.class()
  ));

  onPointerDown(event: PointerEvent): void {
    // Only drag from the handle area (top 40px)
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const relativeY = event.clientY - rect.top;
    if (relativeY > 48) return;

    this.isDragging.set(true);
    this.startY = event.clientY;
    this.startOffset = this.dragOffset();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging()) return;
    const delta = event.clientY - this.startY;
    // Only allow dragging downward (positive delta)
    this.dragOffset.set(Math.max(0, this.startOffset + delta));
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.isDragging()) return;
    this.isDragging.set(false);

    // If dragged more than 30% of the viewport height, close
    const threshold = window.innerHeight * 0.2;
    if (this.dragOffset() > threshold) {
      // Animate off-screen then close
      this.dragOffset.set(window.innerHeight);
      setTimeout(() => this.drawerService.close(), 300);
    } else {
      // Snap back
      this.dragOffset.set(0);
    }
  }
}

// ---- Drawer Header ----

@Component({
  selector: 'k-drawer-header',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerHeader {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('grid gap-1.5 px-6 py-2 text-center sm:text-left', this.class())
  );
}

// ---- Drawer Title ----

@Component({
  selector: 'k-drawer-title',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerTitle {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.class())
  );
}

// ---- Drawer Description ----

@Component({
  selector: 'k-drawer-description',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerDescription {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

// ---- Drawer Footer ----

@Component({
  selector: 'k-drawer-footer',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerFooter {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('flex flex-col gap-2 px-6 py-4', this.class())
  );
}
