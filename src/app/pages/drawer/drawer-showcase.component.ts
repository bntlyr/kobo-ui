import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KDrawerService, KDrawerContent, KDrawerHeader, KDrawerFooter } from '../../components/ui/drawer';
import { KButtonDirective } from '../../components/ui/button';

@Component({
  selector: 'app-drawer-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KDrawerContent, KDrawerHeader, KDrawerFooter, KButtonDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Drawer</h1>
        <p class="text-muted-foreground mt-2">A panel that slides in from the edge of the screen.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <div>
              <button k-button variant="outline" (click)="drawerService.open(drawerTpl)">Open Drawer</button>
              
              <ng-template #drawerTpl>
                <k-drawer-content>
                  <div class="mx-auto w-full max-w-sm">
                    <k-drawer-header>
                      <h2 class="text-lg font-semibold leading-none tracking-tight">Move Goal</h2>
                      <p class="text-sm text-muted-foreground">Set your daily activity goal.</p>
                    </k-drawer-header>
                    <div class="p-4 pb-0">
                      <div class="flex items-center justify-center space-x-2">
                        <button k-button variant="outline" class="h-8 w-8 shrink-0 rounded-full p-0">
                          -
                        </button>
                        <div class="flex-1 text-center">
                          <div class="text-7xl font-bold tracking-tighter">
                            350
                          </div>
                          <div class="text-[0.70rem] uppercase text-muted-foreground">
                            Calories/day
                          </div>
                        </div>
                        <button k-button variant="outline" class="h-8 w-8 shrink-0 rounded-full p-0">
                          +
                        </button>
                      </div>
                    </div>
                    <k-drawer-footer>
                      <button k-button>Submit</button>
                      <button k-button variant="outline" (click)="drawerService.close()">Cancel</button>
                    </k-drawer-footer>
                  </div>
                </k-drawer-content>
              </ng-template>
            </div>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;button k-button variant="outline" (click)="drawerService.open(drawerTpl)"&gt;Open Drawer&lt;/button&gt;

&lt;ng-template #drawerTpl&gt;
  &lt;k-drawer-content&gt;
    &lt;div class="mx-auto w-full max-w-sm"&gt;
      &lt;k-drawer-header&gt;
        &lt;h2 class="text-lg font-semibold leading-none tracking-tight"&gt;Move Goal&lt;/h2&gt;
        &lt;p class="text-sm text-muted-foreground"&gt;Set your daily activity goal.&lt;/p&gt;
      &lt;/k-drawer-header&gt;
      &lt;div class="p-4 pb-0"&gt;
        &lt;!-- Content --&gt;
      &lt;/div&gt;
      &lt;k-drawer-footer&gt;
        &lt;button k-button&gt;Submit&lt;/button&gt;
        &lt;button k-button variant="outline" (click)="drawerService.close()"&gt;Cancel&lt;/button&gt;
      &lt;/k-drawer-footer&gt;
    &lt;/div&gt;
  &lt;/k-drawer-content&gt;
&lt;/ng-template&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KDrawerService</h3>
            <p class="text-sm text-muted-foreground">A service to open and manage drawers.</p>
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Method</th>
                    <th class="px-4 py-3 font-medium">Parameters</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">open</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">component, config?</td>
                    <td class="px-4 py-3 text-muted-foreground">Opens a component in a drawer.</td>
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
export default class DrawerShowcaseComponent {
  readonly drawerService = inject(KDrawerService);
}
