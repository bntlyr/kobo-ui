import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KResizablePanelGroup, KResizablePanel, KResizableHandle } from '../../components/ui/resizable';

@Component({
  selector: 'app-resizable-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KResizablePanelGroup, KResizablePanel, KResizableHandle],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Resizable</h1>
        <p class="text-muted-foreground mt-2">Accessible resizable panel groups and layouts with keyboard support.</p>
      </div>

      <k-tabs value="preview" variant="line">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-resizable-panel-group
              direction="horizontal"
              class="max-w-md rounded-lg border md:min-w-[450px]"
            >
              <k-resizable-panel>
                <div class="flex h-[200px] items-center justify-center p-6">
                  <span class="font-semibold">One</span>
                </div>
              </k-resizable-panel>
              <k-resizable-handle></k-resizable-handle>
              <k-resizable-panel>
                <k-resizable-panel-group direction="vertical">
                  <k-resizable-panel>
                    <div class="flex h-full items-center justify-center p-6">
                      <span class="font-semibold">Two</span>
                    </div>
                  </k-resizable-panel>
                  <k-resizable-handle></k-resizable-handle>
                  <k-resizable-panel>
                    <div class="flex h-full items-center justify-center p-6">
                      <span class="font-semibold">Three</span>
                    </div>
                  </k-resizable-panel>
                </k-resizable-panel-group>
              </k-resizable-panel>
            </k-resizable-panel-group>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-resizable-panel-group direction="horizontal" class="max-w-md rounded-lg border md:min-w-[450px]"&gt;
  &lt;k-resizable-panel&gt;
    &lt;div class="flex h-[200px] items-center justify-center p-6"&gt;
      &lt;span class="font-semibold"&gt;One&lt;/span&gt;
    &lt;/div&gt;
  &lt;/k-resizable-panel&gt;
  &lt;k-resizable-handle&gt;&lt;/k-resizable-handle&gt;
  &lt;k-resizable-panel&gt;
    &lt;k-resizable-panel-group direction="vertical"&gt;
      &lt;k-resizable-panel&gt;
        &lt;div class="flex h-full items-center justify-center p-6"&gt;
          &lt;span class="font-semibold"&gt;Two&lt;/span&gt;
        &lt;/div&gt;
      &lt;/k-resizable-panel&gt;
      &lt;k-resizable-handle&gt;&lt;/k-resizable-handle&gt;
      &lt;k-resizable-panel&gt;
        &lt;div class="flex h-full items-center justify-center p-6"&gt;
          &lt;span class="font-semibold"&gt;Three&lt;/span&gt;
        &lt;/div&gt;
      &lt;/k-resizable-panel&gt;
    &lt;/k-resizable-panel-group&gt;
  &lt;/k-resizable-panel&gt;
&lt;/k-resizable-panel-group&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KResizablePanelGroup</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-resizable-panel-group</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">direction</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'horizontal' | 'vertical'</td>
                    <td class="px-4 py-3 font-mono text-xs">'horizontal'</td>
                    <td class="px-4 py-3 text-muted-foreground">The flex direction of the resizable panels.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KResizableHandle</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-resizable-handle</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">withHandle</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">If true, renders a grab handle icon on the resizer.</td>
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
export default class ResizableShowcaseComponent {}
