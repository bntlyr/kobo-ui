import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KPopoverTrigger, KPopoverContent } from '../../components/ui/popover/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-popover-showcase',
  imports: [KButtonDirective, KPopoverTrigger, KPopoverContent, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">popover</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Popover</h1>
          <p class="text-lg text-muted-foreground">Floating contextual container.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 flex flex-wrap gap-4">
              <button k-button variant="outline" [kPopoverTrigger]="popContent">
                Open Popover
              </button>
              <ng-template #popContent>
                <k-popover-content>
                  <p class="text-sm font-semibold mb-1">Dimensions</p>
                  <p class="text-xs text-muted-foreground mb-3">Set the dimensions for the layer.</p>
                  <div class="grid grid-cols-3 items-center gap-2">
                    <label class="text-xs text-muted-foreground">Width</label>
                    <input class="col-span-2 h-7 text-xs border border-input rounded px-2 bg-background" value="100%">
                    <label class="text-xs text-muted-foreground">Max width</label>
                    <input class="col-span-2 h-7 text-xs border border-input rounded px-2 bg-background" value="300px">
                  </div>
                </k-popover-content>
              </ng-template>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<button k-button [kPopoverTrigger]=&quot;pop&quot;>Open</button>
<ng-template #pop>
  <k-popover-content>
    <p>Content goes here.</p>
  </k-popover-content>
</ng-template>" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KPopoverTrigger</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">[kPopoverTrigger]</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">kPopoverTrigger</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">TemplateRef&lt;unknown&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">(required)</td>
                    <td class="px-4 py-3 text-muted-foreground">The template reference containing the popover content.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">popoverAlign</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'start' | 'end' | 'center'</td>
                    <td class="px-4 py-3 font-mono text-xs">'center'</td>
                    <td class="px-4 py-3 text-muted-foreground">Alignment of the popover relative to the trigger.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">popoverSide</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'top' | 'bottom' | 'left' | 'right'</td>
                    <td class="px-4 py-3 font-mono text-xs">'bottom'</td>
                    <td class="px-4 py-3 text-muted-foreground">Side of the trigger to place the popover.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KPopoverContent</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-popover-content</code></p>
            
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
export class PopoverShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
}
