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

      <k-tabs value="preview" variant="line">
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

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KToggleGroup</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-toggle-group</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">type</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'single' | 'multiple'</td>
                    <td class="px-4 py-3 font-mono text-xs">'single'</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether single or multiple toggles can be selected.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ToggleVariant</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual style variant applied to children.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ToggleSize</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The size variant applied to children.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string | string[]</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Two-way bindable selected value(s).</td>
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
export default class ToggleGroupShowcaseComponent {}
