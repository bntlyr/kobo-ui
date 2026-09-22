import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KButtonGroup } from '../../components/ui/button-group';
import { KButtonDirective } from '../../components/ui/button';

@Component({
  selector: 'app-button-group-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KButtonGroup, KButtonDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Button Group</h1>
        <p class="text-muted-foreground mt-2">Group a series of buttons together on a single line or column with the button group component.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-button-group>
              <button k-button variant="outline">Left</button>
              <button k-button variant="outline">Middle</button>
              <button k-button variant="outline">Right</button>
            </k-button-group>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-button-group&gt;
  &lt;button k-button variant="outline"&gt;Left&lt;/button&gt;
  &lt;button k-button variant="outline"&gt;Middle&lt;/button&gt;
  &lt;button k-button variant="outline"&gt;Right&lt;/button&gt;
&lt;/k-button-group&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KButtonGroup</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-button-group</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">orientation</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'horizontal' | 'vertical'</td>
                    <td class="px-4 py-3 font-mono text-xs">'horizontal'</td>
                    <td class="px-4 py-3 text-muted-foreground">Layout direction of the button group.</td>
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
export default class ButtonGroupShowcaseComponent {}
