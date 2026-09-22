import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KToggleGroup, KToggleGroupItem } from '../../components/ui/toggle-group';

@Component({
  selector: 'app-toggle-group-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KToggleGroup, KToggleGroupItem],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Toggle Group</h1>
        <p class="text-muted-foreground mt-2">A set of two-state buttons that can be toggled.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-toggle-group type="multiple">
              <button k-toggle-group-item value="bold" aria-label="Toggle bold">
                <span class="h-4 w-4 font-bold">B</span>
              </button>
              <button k-toggle-group-item value="italic" aria-label="Toggle italic">
                <span class="h-4 w-4 italic">I</span>
              </button>
              <button k-toggle-group-item value="underline" aria-label="Toggle underline">
                <span class="h-4 w-4 underline">U</span>
              </button>
            </k-toggle-group>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-toggle-group type="multiple"&gt;
  &lt;button k-toggle-group-item value="bold" aria-label="Toggle bold"&gt;
    &lt;lucide-icon [img]="BoldIcon" class="h-4 w-4"&gt;&lt;/lucide-icon&gt;
  &lt;/button&gt;
  &lt;button k-toggle-group-item value="italic" aria-label="Toggle italic"&gt;
    &lt;lucide-icon [img]="ItalicIcon" class="h-4 w-4"&gt;&lt;/lucide-icon&gt;
  &lt;/button&gt;
  &lt;button k-toggle-group-item value="strikethrough" aria-label="Toggle strikethrough"&gt;
    &lt;lucide-icon [img]="UnderlineIcon" class="h-4 w-4"&gt;&lt;/lucide-icon&gt;
  &lt;/button&gt;
&lt;/k-toggle-group&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToggleGroupShowcaseComponent {}
