import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KInputGroup, KInputGroupText } from '../../components/ui/input-group';
import { KInputDirective } from '../../components/ui/input';

@Component({
  selector: 'app-input-group-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KInputGroup, KInputGroupText, KInputDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Input Group</h1>
        <p class="text-muted-foreground mt-2">Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <div class="flex w-full max-w-sm flex-col gap-4">
              <k-input-group>
                <k-input-group-text>https://</k-input-group-text>
                <input k-input placeholder="example.com" />
              </k-input-group>
              
              <k-input-group>
                <input k-input placeholder="Amount" />
                <k-input-group-text>.00</k-input-group-text>
              </k-input-group>
            </div>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-input-group&gt;
  &lt;k-input-group-text&gt;https://&lt;/k-input-group-text&gt;
  &lt;input k-input placeholder="example.com" /&gt;
&lt;/k-input-group&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputGroupShowcaseComponent {}
