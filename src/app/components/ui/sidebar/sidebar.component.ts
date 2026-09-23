import { ChangeDetectionStrategy, Component, Directive, computed, inject, InjectionToken, input, model, ViewEncapsulation } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
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
  exportAs: 'kSidebarProvider',
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
    <div [class]="classes()" [attr.data-state]="provider.open() ? 'expanded' : 'collapsed'" [attr.data-collapsible]="provider.open() ? '' : collapsible()">
      <div class="flex h-full w-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebar {
  readonly collapsible = input<'offcanvas' | 'icon' | 'none'>('offcanvas');
  readonly class = input<string>('');
  readonly provider = inject(K_SIDEBAR);

  protected readonly classes = computed(() => cn(
    'group sticky top-0 z-10 hidden h-svh w-[length:var(--sidebar-width)] shrink-0 transition-[width] duration-300 ease-in-out md:flex flex-col overflow-hidden',
    'data-[state=collapsed]:w-[length:var(--sidebar-width-icon)] group-data-[hidden=true]:hidden',
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

@Component({
  selector: 'k-sidebar-header',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarHeader {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'flex flex-col gap-2 p-2 shrink-0 overflow-hidden',
    'group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:items-center',
    this.class()
  ));
}

@Component({
  selector: 'k-sidebar-footer',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarFooter {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'flex flex-col gap-2 p-2 shrink-0 overflow-hidden',
    'group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:items-center',
    this.class()
  ));
}

@Component({
  selector: 'k-sidebar-content',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
    'group-data-[collapsible=icon]:overflow-hidden',
    this.class()
  ));
}

@Component({
  selector: 'k-sidebar-group',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarGroup {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative flex w-full min-w-0 flex-col p-2 group-data-[collapsible=icon]:p-1', this.class()));
}

@Component({
  selector: 'k-sidebar-group-label',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarGroupLabel {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-300 ease-in-out focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
    'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
    this.class()
  ));
}

@Component({
  selector: 'k-sidebar-group-content',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarGroupContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('w-full text-sm', this.class()));
}

@Component({
  selector: 'k-sidebar-menu',
  template: `<ul [class]="classes()"><ng-content /></ul>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarMenu {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex w-full min-w-0 flex-col gap-1', this.class()));
}

@Component({
  selector: 'k-sidebar-menu-item',
  template: `<li [class]="classes()"><ng-content /></li>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarMenuItem {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('group/menu-item relative', this.class()));
}

export const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] duration-300 ease-in-out group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 group-data-[collapsible=icon]:justify-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>span]:group-data-[collapsible=icon]:hidden',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
export type SidebarMenuButtonVariant = NonNullable<VariantProps<typeof sidebarMenuButtonVariants>['variant']>;
export type SidebarMenuButtonSize = NonNullable<VariantProps<typeof sidebarMenuButtonVariants>['size']>;

@Directive({
  selector: '[kSidebarMenuButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-sidebar]': '"menu-button"',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "true" : null',
  },
})
export class KSidebarMenuButton {
  readonly variant = input<SidebarMenuButtonVariant>('default');
  readonly size = input<SidebarMenuButtonSize>('default');
  readonly isActive = input<boolean>(false);
  readonly class = input<string>('');

  protected readonly classes = computed(() => cn(sidebarMenuButtonVariants({ variant: this.variant(), size: this.size() }), this.class()));
}

@Component({
  selector: 'k-sidebar-menu-badge',
  template: `<div [class]="classes()"><ng-content /></div>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarMenuBadge {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none',
    'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
    'peer-data-[size=sm]/menu-button:top-1',
    'peer-data-[size=default]/menu-button:top-1.5',
    'peer-data-[size=lg]/menu-button:top-2.5',
    'group-data-[collapsible=icon]:hidden',
    this.class()
  ));
}

@Component({
  selector: 'k-sidebar-menu-sub',
  template: `<ul [class]="classes()"><ng-content /></ul>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarMenuSub {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
    'group-data-[collapsible=icon]:hidden',
    this.class()
  ));
}

@Component({
  selector: 'k-sidebar-menu-sub-item',
  template: `<li [class]="classes()"><ng-content /></li>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSidebarMenuSubItem {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('group/menu-sub-item relative', this.class()));
}

@Directive({
  selector: '[kSidebarMenuSubButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-sidebar]': '"menu-sub-button"',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive() ? "true" : null',
  },
})
export class KSidebarMenuSubButton {
  readonly size = input<'sm' | 'md'>('md');
  readonly isActive = input<boolean>(false);
  readonly class = input<string>('');

  protected readonly classes = computed(() => cn(
    'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
    'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
    this.size() === 'sm' && 'text-xs',
    this.size() === 'md' && 'text-sm',
    'group-data-[collapsible=icon]:hidden',
    this.class()
  ));
}
