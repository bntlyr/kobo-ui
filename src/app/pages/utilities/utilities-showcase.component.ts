import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KShimmer } from '../../components/ui/utilities';

@Component({
  selector: 'app-utilities-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KShimmer],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Utilities</h1>
        <p class="text-muted-foreground mt-2">Useful utility components and directives for UI enhancements.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex flex-col gap-8 min-h-[350px] items-center justify-center rounded-md border p-10 bg-muted/20">
            <div class="w-full max-w-sm space-y-4">
              <h3 class="font-medium">Shimmer Effect</h3>
              <div class="w-full h-12 rounded-md bg-muted relative overflow-hidden">
                <k-shimmer></k-shimmer>
              </div>
            </div>
            
            <div class="w-full max-w-sm space-y-4">
              <h3 class="font-medium">Scroll Fade</h3>
              <div class="relative h-[150px] w-full overflow-auto rounded-md border bg-background" kScrollFade>
                <div class="p-4 h-[300px]">
                  <p>Scroll down to see the fade effect.</p>
                  <p class="mt-4 text-muted-foreground">The top and bottom edges will have a gradient fade depending on the scroll position.</p>
                  <p class="mt-20">You have reached the bottom.</p>
                </div>
              </div>
            </div>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;!-- Shimmer --&gt;
&lt;div class="w-full h-12 rounded-md bg-muted relative overflow-hidden"&gt;
  &lt;k-shimmer&gt;&lt;/k-shimmer&gt;
&lt;/div&gt;

&lt;!-- Scroll Fade --&gt;
&lt;div class="relative h-[150px] w-full overflow-auto rounded-md border bg-background" kScrollFade&gt;
  &lt;div class="p-4 h-[300px]"&gt;
    &lt;!-- Long content here --&gt;
  &lt;/div&gt;
&lt;/div&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UtilitiesShowcaseComponent {}
