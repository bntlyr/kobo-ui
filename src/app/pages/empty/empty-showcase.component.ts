import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KEmpty, KEmptyIcon, KEmptyTitle, KEmptyDescription } from '../../components/ui/empty';
import { KButtonDirective } from '../../components/ui/button';

@Component({
  selector: 'app-empty-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KEmpty, KEmptyIcon, KEmptyTitle, KEmptyDescription, KButtonDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Empty State</h1>
        <p class="text-muted-foreground mt-2">Displays a placeholder when no data is available.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10 bg-accent/20">
            <k-empty class="w-full max-w-sm">
              <k-empty-icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </k-empty-icon>
              <k-empty-title>No items selected</k-empty-title>
              <k-empty-description>
                You have not selected any items yet. Add one to see it here.
              </k-empty-description>
              <div class="mt-4 flex justify-center">
                <button k-button>Add Item</button>
              </div>
            </k-empty>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-empty class="w-full max-w-sm"&gt;
  &lt;k-empty-icon&gt;
    &lt;svg&gt;...&lt;/svg&gt;
  &lt;/k-empty-icon&gt;
  &lt;k-empty-title&gt;No items selected&lt;/k-empty-title&gt;
  &lt;k-empty-description&gt;
    You have not selected any items yet. Add one to see it here.
  &lt;/k-empty-description&gt;
  &lt;div class="mt-4 flex justify-center"&gt;
    &lt;button k-button&gt;Add Item&lt;/button&gt;
  &lt;/div&gt;
&lt;/k-empty&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmptyShowcaseComponent {}
