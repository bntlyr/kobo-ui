import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const SEP_USAGE = `<hr k-separator class="my-4" />

<!-- Vertical -->
<div class="flex items-center gap-4 h-8">
  <span>Blog</span>
  <div k-separator orientation="vertical" class="h-full"></div>
  <span>Docs</span>
</div>`;

@Component({
  selector: 'app-separator-showcase',
  imports: [KSeparatorDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">separator</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Separator</h1>
          <p class="text-lg text-muted-foreground">A visual divider between content sections.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-4">
              <div class="space-y-1">
                <h4 class="text-sm font-medium leading-none">Kobo UI</h4>
                <p class="text-sm text-muted-foreground">An open-source UI component registry.</p>
              </div>
              <hr k-separator>
              <div class="flex h-5 items-center gap-4 text-sm">
                <span>Blog</span>
                <div k-separator orientation="vertical" class="h-full"></div>
                <span>Docs</span>
                <div k-separator orientation="vertical" class="h-full"></div>
                <span>Source</span>
              </div>
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
            <h3 class="text-lg font-semibold">KSeparatorDirective</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">hr[k-separator], [k-separator]</code></p>
            
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
                    <td class="px-4 py-3 text-muted-foreground">The orientation of the separator.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">decorative</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether the separator is purely decorative. If true, sets role="none".</td>
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
export class SeparatorShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = SEP_USAGE;
}
