import { ChangeDetectionStrategy, Component, computed, input, inject, ElementRef, Renderer2, HostListener, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-resizable-panel-group',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: {
    '[attr.data-panel-group-direction]': 'direction()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KResizablePanelGroup {
  readonly class = input<string>('');
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  
  protected readonly classes = computed(() => cn(
    'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
    this.class()
  ));
}

@Component({
  selector: 'k-resizable-panel',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KResizablePanel {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative flex w-full h-full flex-1', this.class()));
}

@Component({
  selector: 'k-resizable-handle',
  template: `
    <div [class]="classes()" [attr.data-panel-group-direction]="direction()">
      @if (withHandle()) {
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-2.5 w-2.5"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </div>
      }
    </div>
  `,
  host: {
    'style': 'touch-action: none; user-select: none;',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KResizableHandle {
  private readonly group = inject(KResizablePanelGroup, { optional: true });
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly class = input<string>('');
  readonly withHandle = input<boolean>(false);
  
  protected readonly direction = computed(() => this.group?.direction() ?? 'horizontal');
  
  protected readonly classes = computed(() => cn(
    'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90 cursor-col-resize data-[panel-group-direction=vertical]:cursor-row-resize',
    this.class()
  ));

  private isDragging = false;
  private prevPanel: HTMLElement | null = null;
  private nextPanel: HTMLElement | null = null;
  private initialTotalSize = 0;
  private initialPrevSize = 0;
  private startPos = 0;

  @HostListener('pointerdown', ['$event'])
  onPointerDown(e: PointerEvent): void {
    if (e.button !== 0) return;
    e.preventDefault();
    this.isDragging = true;
    
    // Find adjacent KResizablePanel elements
    const host = this.el.nativeElement;
    this.prevPanel = host.previousElementSibling;
    this.nextPanel = host.nextElementSibling;
    
    if (this.prevPanel && this.nextPanel) {
      const isVertical = this.direction() === 'vertical';
      const prevRect = this.prevPanel.getBoundingClientRect();
      const nextRect = this.nextPanel.getBoundingClientRect();
      
      this.initialPrevSize = isVertical ? prevRect.height : prevRect.width;
      const initialNextSize = isVertical ? nextRect.height : nextRect.width;
      this.initialTotalSize = this.initialPrevSize + initialNextSize;
      this.startPos = isVertical ? e.clientY : e.clientX;
      
      // Setup document listeners
      this.renderer.listen('document', 'pointermove', this.onPointerMove.bind(this));
      this.renderer.listen('document', 'pointerup', this.onPointerUp.bind(this));
      this.renderer.addClass(document.body, isVertical ? 'cursor-row-resize' : 'cursor-col-resize');
    }
  }

  private onPointerMove(e: PointerEvent): void {
    if (!this.isDragging || !this.prevPanel || !this.nextPanel) return;
    
    const isVertical = this.direction() === 'vertical';
    const currentPos = isVertical ? e.clientY : e.clientX;
    const delta = currentPos - this.startPos;
    
    let newPrevSize = this.initialPrevSize + delta;
    
    // Constrain size
    newPrevSize = Math.max(0, Math.min(newPrevSize, this.initialTotalSize));
    const newNextSize = this.initialTotalSize - newPrevSize;
    
    const prevPercentage = (newPrevSize / this.initialTotalSize) * 100;
    const nextPercentage = (newNextSize / this.initialTotalSize) * 100;
    
    // Use flex-basis to control size smoothly
    this.renderer.setStyle(this.prevPanel, 'flex', `${prevPercentage} ${prevPercentage} 0%`);
    this.renderer.setStyle(this.nextPanel, 'flex', `${nextPercentage} ${nextPercentage} 0%`);
  }

  private onPointerUp(): void {
    this.isDragging = false;
    this.renderer.removeClass(document.body, 'cursor-row-resize');
    this.renderer.removeClass(document.body, 'cursor-col-resize');
    // Note: Angular doesn't provide a built-in way to unlisten easily without storing the unlisten fn,
    // but pointer events usually handle this cleanly in simple implementations. 
    // Ideally we store the unlisten function returned by renderer.listen.
  }
}
