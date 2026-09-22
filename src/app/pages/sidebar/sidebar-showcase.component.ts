import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import {
  KSidebarProvider,
  KSidebar,
  KSidebarTrigger,
  KSidebarHeader,
  KSidebarContent,
  KSidebarFooter,
  KSidebarGroup,
  KSidebarGroupLabel,
  KSidebarGroupContent,
  KSidebarMenu,
  KSidebarMenuItem,
  KSidebarMenuButton,
  KSidebarMenuSub,
  KSidebarMenuSubItem,
  KSidebarMenuSubButton,
} from '../../components/ui/sidebar';

@Component({
  selector: 'app-sidebar-showcase',
  standalone: true,
  imports: [
    KTabs, KTabList, KTabTrigger, KTabContent, 
    KSidebarProvider, KSidebar, KSidebarTrigger, KSidebarContent, KSidebarFooter,
    KSidebarGroup, KSidebarGroupLabel, KSidebarGroupContent, KSidebarMenu, KSidebarMenuItem, KSidebarMenuButton,
    KSidebarMenuSub, KSidebarMenuSubItem, KSidebarMenuSubButton
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
            <k-sidebar-provider #sidebar="kSidebarProvider" class="w-full min-h-full h-full relative">
              <k-sidebar collapsible="icon" class="h-full">
                <k-sidebar-content>
                  <k-sidebar-group>
                    <k-sidebar-group-label>Platform</k-sidebar-group-label>
                    <k-sidebar-group-content>
                      <k-sidebar-menu>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton tooltip="Playground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                            <span>Playground</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-auto size-4 transition-transform duration-200 rotate-90"><path d="m9 18 6-6-6-6"/></svg>
                          </button>
                          <k-sidebar-menu-sub>
                            <k-sidebar-menu-sub-item>
                              <a href="javascript:void(0)" kSidebarMenuSubButton>History</a>
                            </k-sidebar-menu-sub-item>
                            <k-sidebar-menu-sub-item>
                              <a href="javascript:void(0)" kSidebarMenuSubButton>Starred</a>
                            </k-sidebar-menu-sub-item>
                            <k-sidebar-menu-sub-item>
                              <a href="javascript:void(0)" kSidebarMenuSubButton>Settings</a>
                            </k-sidebar-menu-sub-item>
                          </k-sidebar-menu-sub>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton tooltip="Models">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="m16 21 5-5-5-5"/><path d="M21 16H3"/><path d="M8 3 3 8l5 5"/><path d="M3 8h18"/></svg>
                            <span>Models</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-auto size-4 transition-transform duration-200"><path d="m9 18 6-6-6-6"/></svg>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton tooltip="Documentation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                            <span>Documentation</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-auto size-4 transition-transform duration-200"><path d="m9 18 6-6-6-6"/></svg>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton tooltip="Settings">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                            <span>Settings</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-auto size-4 transition-transform duration-200"><path d="m9 18 6-6-6-6"/></svg>
                          </button>
                        </k-sidebar-menu-item>
                      </k-sidebar-menu>
                    </k-sidebar-group-content>
                  </k-sidebar-group>
                </k-sidebar-content>
                <k-sidebar-footer>
                  <k-sidebar-menu>
                    <k-sidebar-menu-item>
                      <button kSidebarMenuButton tooltip="Upgrade subscription">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        <span>Upgrade subscription</span>
                      </button>
                    </k-sidebar-menu-item>
                    <k-sidebar-menu-item>
                      <button kSidebarMenuButton tooltip="Help">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        <span>Help</span>
                      </button>
                    </k-sidebar-menu-item>
                    <k-sidebar-menu-item>
                      <button kSidebarMenuButton tooltip="Collapse sidebar" (click)="sidebar.toggle()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9-3 3 3 3"/></svg>
                        <span>Collapse sidebar</span>
                      </button>
                    </k-sidebar-menu-item>
                  </k-sidebar-menu>
                </k-sidebar-footer>
              </k-sidebar>
              
              <main class="flex-1 p-4 bg-zinc-950 flex flex-col gap-4 overflow-hidden relative">
                <header class="flex h-16 shrink-0 items-center gap-2">
                  <div class="flex items-center gap-2 px-4">
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
  &lt;k-sidebar&gt;
    &lt;div class="p-4 font-bold border-b"&gt;Header&lt;/div&gt;
    &lt;div class="flex-1 overflow-auto p-4"&gt;
      &lt;nav class="flex flex-col space-y-1"&gt;
        &lt;a href="#" class="px-3 py-2 rounded-md bg-sidebar-accent"&gt;Home&lt;/a&gt;
      &lt;/nav&gt;
    &lt;/div&gt;
    &lt;div class="p-4 border-t"&gt;Footer&lt;/div&gt;
  &lt;/k-sidebar&gt;
  
  &lt;main&gt;
    &lt;button kSidebarTrigger&gt;Toggle&lt;/button&gt;
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
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SidebarShowcaseComponent {}
