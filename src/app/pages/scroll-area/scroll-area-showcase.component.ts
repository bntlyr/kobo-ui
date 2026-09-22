import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KScrollArea } from '../../components/ui/scroll-area/scroll-area.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const SCROLL_CONTENT = [
  'The quick brown fox jumps over the lazy dog.',
  'Pack my box with five dozen liquor jugs.',
  'How vividly the big sphinx quizzed Jack!',
  'Bright vixens jump; dozy fowl quack.',
  'Pack my red box with five dozen quality jugs.',
  'Jinxed wizards pluck ivy from the big quilt.',
  'The five boxing wizards jump quickly.',
  'How quickly daft jumping zebras vex!',
  'Sphinx of black quartz, judge my vow.',
  'Blowzy red-faced women that thingamajig jived.',
  'Crazy Fredrick bought many very exquisite opal jewels.',
  'We promptly judged antique ivory buckles for the next prize.',
];

@Component({
  selector: 'app-scroll-area-showcase',
  imports: [KScrollArea, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">scroll-area</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Scroll Area</h1>
          <p class="text-lg text-muted-foreground">Custom styled scrollbar, cross-browser.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <k-scroll-area class="h-64 w-full rounded-md border border-border">
                <div class="p-4 space-y-3">
                  @for (line of scrollLines; track $index) {
                    <p class="text-sm text-muted-foreground">{{ line }}</p>
                  }
                </div>
              </k-scroll-area>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-scroll-area class=&quot;h-64 w-full&quot;>
  <div>...content...</div>
</k-scroll-area>" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KScrollArea</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-scroll-area</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs text-primary">'vertical' | 'horizontal' | 'both'</td>
                    <td class="px-4 py-3 font-mono text-xs">'vertical'</td>
                    <td class="px-4 py-3 text-muted-foreground">The scroll orientation.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The thickness of the scrollbar.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ScrollAreaShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly scrollLines = SCROLL_CONTENT;
}
