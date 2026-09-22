import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KSidebarProvider, KSidebar } from '../../components/ui/sidebar';

@Component({
  selector: 'app-sidebar-showcase',
  standalone: true,
  imports: [
    KTabs, KTabList, KTabTrigger, KTabContent, 
    KSidebarProvider, KSidebar
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Sidebar</h1>
        <p class="text-muted-foreground mt-2">A composable, themeable and customizable sidebar component.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border overflow-hidden relative">
            <!-- Simulated application shell -->
            <k-sidebar-provider class="w-full h-full border border-dashed m-4 h-[400px]">
              <k-sidebar>
                <div class="p-4 font-bold border-b border-sidebar-border">Kobo App</div>
                <div class="flex-1 overflow-auto p-4 space-y-4">
                  <div>
                    <div class="text-xs font-semibold text-sidebar-foreground/70 mb-2 uppercase tracking-wider">Application</div>
                    <nav class="flex flex-col space-y-1">
                      <a href="#" class="px-3 py-2 text-sm rounded-md bg-sidebar-accent text-sidebar-accent-foreground font-medium">Home</a>
                      <a href="#" class="px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground transition-colors">Inbox</a>
                      <a href="#" class="px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground transition-colors">Calendar</a>
                    </nav>
                  </div>
                </div>
                <div class="p-4 border-t border-sidebar-border text-xs text-muted-foreground">User Profile</div>
              </k-sidebar>
              
              <main class="flex-1 overflow-auto p-4 flex flex-col bg-background">
                <button kSidebarTrigger class="self-start p-2 border rounded mb-4">Toggle</button>
                <p>Main content area.</p>
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SidebarShowcaseComponent {}
