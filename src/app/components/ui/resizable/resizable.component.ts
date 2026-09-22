import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-resizable-panel-group',
  template: `<div [class]="classes()"><ng-content /></div>`,
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
    <div [class]="classes()">
      @if (withHandle()) {
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-2.5 w-2.5"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KResizableHandle {
  readonly class = input<string>('');
  readonly withHandle = input<boolean>(false);
  
  protected readonly classes = computed(() => cn(
    'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
    this.class()
  ));
}
