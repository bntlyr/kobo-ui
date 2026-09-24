import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { LucidePanelLeftClose } from '@lucide/angular';
import {
  KSidebar,
  KSidebarContent,
  KSidebarFooter,
  KSidebarGroup,
  KSidebarMenu,
  KSidebarMenuItem,
  KSidebarMenuButton,
  K_SIDEBAR
} from '../sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgComponentOutlet,
    KSidebar,
    KSidebarContent,
    KSidebarFooter,
    KSidebarGroup,
    KSidebarMenu,
    KSidebarMenuItem,
    KSidebarMenuButton,
  ],
  template: `
    <k-sidebar collapsible="icon" [class]="class()">
      <k-sidebar-content>
        <k-sidebar-group>
          <k-sidebar-menu>
            @for (item of navItems(); track item.path) {
              <k-sidebar-menu-item>
                <button kSidebarMenuButton [routerLink]="'/' + item.path" routerLinkActive="active" #rla="routerLinkActive" [isActive]="rla.isActive">
                  @if (item.icon) {
                    <ng-container *ngComponentOutlet="item.icon"></ng-container>
                  }
                  <span>{{ item.title }}</span>
                </button>
              </k-sidebar-menu-item>
            }
          </k-sidebar-menu>
        </k-sidebar-group>
      </k-sidebar-content>

      <k-sidebar-footer>
        <k-sidebar-menu>
          <k-sidebar-menu-item>
            <button kSidebarMenuButton (click)="provider.toggle()">
              <ng-container *ngComponentOutlet="CollapseIcon"></ng-container>
              <span>Collapse</span>
            </button>
          </k-sidebar-menu-item>
        </k-sidebar-menu>
      </k-sidebar-footer>
    </k-sidebar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': '"contents"' },
})
export class AppSidebarComponent {
  readonly class = input<string>('');

  private readonly router = inject(Router);
  protected readonly provider = inject(K_SIDEBAR);

  protected readonly CollapseIcon = LucidePanelLeftClose;

  protected readonly navItems = computed(() => {
    return this.router.config
      .filter(route => route.path && route.data && !route.data['hidden'])
      .map(route => ({
        path: route.path,
        title: route.data?.['title'] || route.path,
        icon: route.data?.['icon']
      }));
  });
}
