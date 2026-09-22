import { ChangeDetectionStrategy, Component, computed, inject, Injectable, input, signal, TemplateRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../../../core/utils/cn';

@Injectable({ providedIn: 'root' })
export class KDrawerService {
  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef, { optional: true });
  private overlayRef: OverlayRef | null = null;

  open(template: TemplateRef<any>, vcr?: ViewContainerRef): void {
    if (this.overlayRef) this.close();
    
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'bg-black/80',
      positionStrategy: this.overlay.position().global().centerHorizontally().bottom(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    
    const portal = new TemplatePortal(template, vcr || this.vcr!);
    this.overlayRef.attach(portal);
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}

@Component({
  selector: 'k-drawer-content',
  template: `
    <div [class]="classes()">
      <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div>
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
    'animate-in slide-in-from-bottom-full duration-300',
    this.class()
  ));
}

@Component({
  selector: 'k-drawer-header',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerHeader {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('grid gap-1.5 p-4 text-center sm:text-left', this.class()));
}

@Component({
  selector: 'k-drawer-footer',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDrawerFooter {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('mt-auto flex flex-col gap-2 p-4', this.class()));
}
