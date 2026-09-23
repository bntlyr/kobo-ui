import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideLayoutDashboard, LucideBarChart3, LucideUsers, LucideSettings,
  LucideShoppingCart, LucidePackage, LucideMegaphone, LucideFileText,
} from '@lucide/angular';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import {
  KSidebarProvider,
  KSidebar,
  KSidebarTrigger,
  KSidebarHeader,
  KSidebarContent,
  KSidebarMenu,
  KSidebarMenuItem,
  KSidebarMenuButton,
} from '../../components/ui/sidebar';

@Component({
  selector: 'app-sidebar-showcase',
  standalone: true,
  imports: [
    LucideLayoutDashboard, LucideBarChart3, LucideUsers, LucideSettings,
    LucideShoppingCart, LucidePackage, LucideMegaphone, LucideFileText,
    KButtonDirective,
    KTabs, KTabList, KTabTrigger, KTabContent,
    KSidebarProvider, KSidebar, KSidebarTrigger, KSidebarHeader, KSidebarContent,
    KSidebarMenu, KSidebarMenuItem, KSidebarMenuButton,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Sidebar</h1>
        <p class="text-muted-foreground mt-2">A composable, themeable and customizable sidebar component.</p>
      </div>

      <k-tabs value="preview" variant="line">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>

        <k-tab-content value="preview" class="mt-4">
          <div class="flex h-[450px] rounded-xl border overflow-hidden relative shadow-sm">
            <!-- Simulated application shell -->
            <k-sidebar-provider #sidebar="kSidebarProvider" class="w-full h-full relative !min-h-0">
              <k-sidebar collapsible="icon" class="border-r border-border bg-background !h-full !sticky !top-0">
                    <k-sidebar-header class="h-14 border-b border-border flex flex-row items-center font-semibold shrink-0">
                      <div class="flex items-center gap-2 w-full overflow-hidden group-data-[collapsible=icon]:ml-0">
                        <div class="size-8 bg-primary rounded-md flex items-center justify-center shadow-sm shrink-0">
                          <svg lucideLayoutDashboard class="size-4 text-primary-foreground"></svg>
                        </div>
                        <span class="text-base font-bold tracking-tight leading-none whitespace-nowrap group-data-[collapsible=icon]:hidden">Beautifully Crafted</span>
                      </div>
                    </k-sidebar-header>
                    <k-sidebar-content class="p-2">
                      <k-sidebar-menu>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton [isActive]="true">
                            <svg lucideLayoutDashboard></svg> <span>Dashboard</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideBarChart3></svg> <span>Analytics</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideUsers></svg> <span>Visitors</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideShoppingCart></svg> <span>Sales</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucidePackage></svg> <span>Products</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideMegaphone></svg> <span>Marketing</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideFileText></svg> <span>Reports</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideSettings></svg> <span>Settings</span>
                          </button>
                        </k-sidebar-menu-item>
                      </k-sidebar-menu>
                    </k-sidebar-content>
                  </k-sidebar>

              <main class="flex-1 p-4 bg-zinc-950 flex flex-col gap-4 overflow-hidden relative">
                <header class="flex h-10 shrink-0 items-center gap-2">
                  <div class="flex items-center gap-2 px-2">
                    <k-sidebar-trigger class="-ml-1 text-zinc-400 hover:text-zinc-100"></k-sidebar-trigger>
                  </div>
                </header>
                <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
                  <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div class="aspect-video rounded-xl bg-zinc-900/50"></div>
                    <div class="aspect-video rounded-xl bg-zinc-900/50"></div>
                    <div class="aspect-video rounded-xl bg-zinc-900/50"></div>
                  </div>
                  <div class="flex-1 rounded-xl bg-zinc-900/50"></div>
                </div>
              </main>
            </k-sidebar-provider>
          </div>
        </k-tab-content>

        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-sidebar-provider&gt;
  &lt;k-sidebar collapsible="icon"&gt;
    &lt;k-sidebar-header&gt;...&lt;/k-sidebar-header&gt;
    &lt;k-sidebar-content&gt;
      &lt;k-sidebar-menu&gt;
        &lt;k-sidebar-menu-item&gt;
          &lt;button kSidebarMenuButton [isActive]="true"&gt;
            &lt;svg lucideLayoutDashboard&gt;&lt;/svg&gt;
            &lt;span&gt;Dashboard&lt;/span&gt;
          &lt;/button&gt;
        &lt;/k-sidebar-menu-item&gt;
      &lt;/k-sidebar-menu&gt;
    &lt;/k-sidebar-content&gt;
    &lt;k-sidebar-footer&gt;...&lt;/k-sidebar-footer&gt;
  &lt;/k-sidebar&gt;

  &lt;main&gt;
    &lt;k-sidebar-trigger /&gt;
    &lt;p&gt;Main content area.&lt;/p&gt;
  &lt;/main&gt;
&lt;/k-sidebar-provider&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSidebarProvider</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-sidebar-provider</code></p>
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Default</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">open</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">true</td>
                    <td class="px-4 py-3 text-muted-foreground">Two-way binding for the sidebar state via <code class="font-mono bg-muted px-1 rounded text-xs">[(open)]</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSidebar</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-sidebar</code></p>
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Default</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">collapsible</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'offcanvas' | 'icon' | 'none'</td>
                    <td class="px-4 py-3 font-mono text-xs">'offcanvas'</td>
                    <td class="px-4 py-3 text-muted-foreground">How the sidebar behaves when collapsed.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSidebarMenuButton</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">[kSidebarMenuButton]</code></p>
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Default</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'outline'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">Visual style variant of the menu button.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">Size of the menu button.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">isActive</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether the button is in an active/selected state.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SidebarShowcaseComponent {}
