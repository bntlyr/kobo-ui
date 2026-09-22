import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KTooltipDirective } from '../../components/ui/tooltip/tooltip.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const TOOLTIP_SRC = `<button k-button kTooltip="This action will delete your account."
        kTooltipSide="top">
  Hover me
</button>`;

@Component({
  selector: 'app-tooltip-showcase',
  imports: [KButtonDirective, KTooltipDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">tooltip</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Tooltip</h1>
          <p class="text-lg text-muted-foreground">300ms delayed hover tooltip, auto-positioned.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 flex flex-wrap gap-4 items-center">
              <button k-button kTooltip="Top tooltip (default)" kTooltipSide="top">Top</button>
              <button k-button variant="outline" kTooltip="Right tooltip" kTooltipSide="right">Right</button>
              <button k-button variant="secondary" kTooltip="Bottom tooltip" kTooltipSide="bottom">Bottom</button>
              <button k-button variant="ghost" kTooltip="Left tooltip" kTooltipSide="left">Left</button>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KTooltipDirective</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">[kTooltip]</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">kTooltip</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">The text content of the tooltip. If empty, the tooltip will not be shown.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">kTooltipDelay</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">300</td>
                    <td class="px-4 py-3 text-muted-foreground">The delay in milliseconds before the tooltip appears on hover/focus.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">kTooltipSide</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'top' | 'bottom' | 'left' | 'right'</td>
                    <td class="px-4 py-3 font-mono text-xs">'top'</td>
                    <td class="px-4 py-3 text-muted-foreground">The preferred side to place the tooltip relative to the trigger.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">kTooltipAlign</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'start' | 'center' | 'end'</td>
                    <td class="px-4 py-3 font-mono text-xs">'center'</td>
                    <td class="px-4 py-3 text-muted-foreground">The alignment of the tooltip along its side.</td>
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
export class TooltipShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = TOOLTIP_SRC;
}
