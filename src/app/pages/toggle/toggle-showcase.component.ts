import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KToggleDirective } from '../../components/ui/toggle';

@Component({
  selector: 'app-toggle-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KToggleDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Toggle</h1>
        <p class="text-muted-foreground mt-2">A two-state button that can be either on or off.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
              <button k-toggle aria-label="Toggle italic">
                <span class="h-4 w-4 text-center font-bold">B</span>
              </button>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;button k-toggle aria-label="Toggle italic"&gt;
  &lt;lucide-icon [img]="BoldIcon" class="w-4 h-4"&gt;&lt;/lucide-icon&gt;
&lt;/button&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToggleShowcaseComponent {}
