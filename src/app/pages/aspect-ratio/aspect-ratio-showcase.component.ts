import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KAspectRatio } from '../../components/ui/aspect-ratio';

@Component({
  selector: 'app-aspect-ratio-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KAspectRatio],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Aspect Ratio</h1>
        <p class="text-muted-foreground mt-2">Displays content within a desired ratio.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] flex-col items-center justify-center rounded-md border p-10">
            <div class="w-[300px]">
              <k-aspect-ratio [ratio]="16 / 9" class="bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Photo by Drew Beamer"
                  class="rounded-md object-cover h-full w-full"
                />
              </k-aspect-ratio>
            </div>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;div class="w-[300px]"&gt;
  &lt;k-aspect-ratio [ratio]="16 / 9" class="bg-muted"&gt;
    &lt;img
      src="..."
      alt="..."
      class="rounded-md object-cover h-full w-full"
    /&gt;
  &lt;/k-aspect-ratio&gt;
&lt;/div&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AspectRatioShowcaseComponent {}
