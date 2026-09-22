import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KNativeSelectDirective } from '../../components/ui/native-select';

@Component({
  selector: 'app-native-select-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KNativeSelectDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Native Select</h1>
        <p class="text-muted-foreground mt-2">A styled native select component.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <select k-native-select class="w-[180px]">
              <option value="" disabled selected>Select a fruit</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="blueberry">Blueberry</option>
              <option value="grapes">Grapes</option>
              <option value="pineapple">Pineapple</option>
            </select>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;select k-native-select class="w-[180px]"&gt;
  &lt;option value="" disabled selected&gt;Select a fruit&lt;/option&gt;
  &lt;option value="apple"&gt;Apple&lt;/option&gt;
  &lt;option value="banana"&gt;Banana&lt;/option&gt;
  &lt;option value="blueberry"&gt;Blueberry&lt;/option&gt;
  &lt;option value="grapes"&gt;Grapes&lt;/option&gt;
  &lt;option value="pineapple"&gt;Pineapple&lt;/option&gt;
&lt;/select&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NativeSelectShowcaseComponent {}
