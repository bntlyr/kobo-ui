import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KKbdDirective } from '../../components/ui/kbd';

@Component({
  selector: 'app-kbd-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KKbdDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Kbd</h1>
        <p class="text-muted-foreground mt-2">Displays a keyboard shortcut.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <p class="text-sm text-muted-foreground">
              Press
              <kbd k-kbd>⌘</kbd>
              <kbd k-kbd>K</kbd>
              to open the command menu.
            </p>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;p class="text-sm text-muted-foreground"&gt;
  Press
  &lt;kbd k-kbd&gt;⌘&lt;/kbd&gt;
  &lt;kbd k-kbd&gt;K&lt;/kbd&gt;
  to open the command menu.
&lt;/p&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KbdShowcaseComponent {}
