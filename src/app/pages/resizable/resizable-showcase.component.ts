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

      <k-tabs value="preview">
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResizableShowcaseComponent {}
