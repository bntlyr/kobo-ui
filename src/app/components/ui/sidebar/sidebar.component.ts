import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, model, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

export const K_SIDEBAR = new InjectionToken<KSidebarProvider>('K_SIDEBAR');

@Component({
  selector: 'k-sidebar-provider',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: {
    '[style.--sidebar-width]': '"16rem"',
    '[style.--sidebar-width-icon]': '"3rem"',
  },
  providers: [{ provide: K_SIDEBAR, useExisting: KSidebarProvider }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarProvider {
  readonly class = input<string>('');
  readonly open = model<boolean>(true);
  
  protected readonly classes = computed(() => cn('flex min-h-screen w-full group/sidebar-wrapper', this.class()));

  toggle(): void {
    this.open.update(v => !v);
  }
}

@Component({
  selector: 'k-sidebar',
  template: `
    <div [class]="classes()" [attr.data-state]="provider.open() ? 'expanded' : 'collapsed'">
      <div class="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebar {
  readonly class = input<string>('');
  readonly provider = inject(K_SIDEBAR);

  protected readonly classes = computed(() => cn(
    'fixed inset-y-0 left-0 z-10 hidden h-screen w-[--sidebar-width] transition-[width] duration-200 ease-linear md:flex flex-col',
    'data-[state=collapsed]:w-[--sidebar-width-icon] group-data-[hidden=true]:hidden',
    this.class()
  ));
}

@Component({
  selector: 'k-sidebar-trigger',
  template: `
    <button (click)="provider.toggle()" [class]="classes()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
      <span class="sr-only">Toggle Sidebar</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarTrigger {
  readonly class = input<string>('');
  readonly provider = inject(K_SIDEBAR);

  protected readonly classes = computed(() => cn('inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9', this.class()));
}
