import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KCarousel, KCarouselContent, KCarouselItem, KCarouselPrevious, KCarouselNext } from '../../components/ui/carousel';
import { KCard, KCardContent } from '../../components/ui/card';

@Component({
  selector: 'app-carousel-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KCarousel, KCarouselContent, KCarouselItem, KCarouselPrevious, KCarouselNext, KCard, KCardContent],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Carousel</h1>
        <p class="text-muted-foreground mt-2">A carousel with motion and swipe built using Embla.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-carousel class="w-full max-w-xs">
              <k-carousel-content>
                @for (item of items; track item) {
                  <k-carousel-item>
                    <div class="p-1">
                      <k-card>
                        <k-card-content class="flex aspect-square items-center justify-center p-6">
                          <span class="text-4xl font-semibold">{{ item }}</span>
                        </k-card-content>
                      </k-card>
                    </div>
                  </k-carousel-item>
                }
              </k-carousel-content>
              <button k-carousel-previous></button>
              <button k-carousel-next></button>
            </k-carousel>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-carousel class="w-full max-w-xs"&gt;
  &lt;k-carousel-content&gt;
    &#64;for (item of items; track item) {{ '{' }}
      &lt;k-carousel-item&gt;
        &lt;div class="p-1"&gt;
          &lt;k-card&gt;
            &lt;k-card-content class="flex aspect-square items-center justify-center p-6"&gt;
              &lt;span class="text-4xl font-semibold"&gt;{{ '{' }}{{ '{' }} item {{ '}' }}{{ '}' }}&lt;/span&gt;
            &lt;/k-card-content&gt;
          &lt;/k-card&gt;
        &lt;/div&gt;
      &lt;/k-carousel-item&gt;
    {{ '}' }}
  &lt;/k-carousel-content&gt;
  &lt;button k-carousel-previous&gt;&lt;/button&gt;
  &lt;button k-carousel-next&gt;&lt;/button&gt;
&lt;/k-carousel&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KCarousel</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-carousel</code></p>
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
                    <td class="px-4 py-3 text-muted-foreground">The orientation of the carousel.</td>
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
export default class CarouselShowcaseComponent {
  readonly items = Array.from({ length: 5 }).map((_, i) => i + 1);
}
