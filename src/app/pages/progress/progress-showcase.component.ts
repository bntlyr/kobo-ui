import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KProgress } from '../../components/ui/progress/progress.component';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-progress-showcase',
  imports: [KProgress, KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">progress</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Progress</h1>
          <p class="text-lg text-muted-foreground">Linear progress bar with ARIA attributes.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">
              @for (item of progressItems; track item.label) {
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="font-medium">{{ item.label }}</span>
                    <span class="text-muted-foreground">{{ item.value }}%</span>
                  </div>
                  <k-progress [value]="item.value" [class]="item.class" />
                </div>
              }

              <div class="flex gap-3">
                <button k-button size="sm" variant="outline" (click)="decrementProgress()">−10%</button>
                <button k-button size="sm" variant="outline" (click)="incrementProgress()">+10%</button>
                <span class="text-sm text-muted-foreground self-center">Live: {{ liveProgress() }}%</span>
              </div>
              <k-progress [value]="liveProgress()" class="h-3" />
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-progress [value]=&quot;60&quot; />" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4 max-w-md">
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="sm"</span>
            <k-progress [value]="60" size="sm" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="default"</span>
            <k-progress [value]="60" size="default" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="lg"</span>
            <k-progress [value]="60" size="lg" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="xl"</span>
            <k-progress [value]="60" size="xl" />
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">States</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4 max-w-md">
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">state="normal" (default)</span>
            <k-progress [value]="60" state="normal" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">state="success"</span>
            <k-progress [value]="100" state="success" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">state="error"</span>
            <k-progress [value]="40" state="error" />
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KProgress</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-progress</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">0</td>
                    <td class="px-4 py-3 text-muted-foreground">The current progress value.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">max</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">100</td>
                    <td class="px-4 py-3 text-muted-foreground">The maximum progress value.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg' | 'xl'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The height of the progress bar.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">state</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'normal' | 'error' | 'success'</td>
                    <td class="px-4 py-3 font-mono text-xs">'normal'</td>
                    <td class="px-4 py-3 text-muted-foreground">The color state of the progress indicator.</td>
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
export class ProgressShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  
  readonly liveProgress = signal(45);

  readonly progressItems = [
    { label: 'Storage',     value: 66,  class: '' },
    { label: 'Bandwidth',   value: 34,  class: 'h-3' },
    { label: 'API Credits', value: 92,  class: 'h-1.5' },
  ];

  incrementProgress(): void { this.liveProgress.update(v => Math.min(100, v + 10)); }
  decrementProgress(): void { this.liveProgress.update(v => Math.max(0, v - 10)); }
}
