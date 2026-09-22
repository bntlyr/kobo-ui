import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { KSlider } from '../../components/ui/slider/slider.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-slider-showcase',
  imports: [ReactiveFormsModule, KSlider, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">slider</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Slider</h1>
          <p class="text-lg text-muted-foreground">An input where the user selects a value from within a given range.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="space-y-4 max-w-md">
                <k-slider [formControl]="control" [min]="0" [max]="100" [step]="5" />
                <p class="text-xs text-muted-foreground">Value: {{ control.value }}</p>
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-slider formControlName=&quot;volume&quot; [min]=&quot;0&quot; [max]=&quot;100&quot; />" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">States</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="grid sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <span class="text-sm font-medium">Disabled</span>
              <k-slider [disabled]="true" [formControl]="control" />
            </div>
            <div class="space-y-2">
              <span class="text-sm font-medium">Error state</span>
              <k-slider [formControl]="control" />
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSlider</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-slider</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">min</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">0</td>
                    <td class="px-4 py-3 text-muted-foreground">The minimum allowed value.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">max</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">100</td>
                    <td class="px-4 py-3 text-muted-foreground">The maximum allowed value.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">step</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">1</td>
                    <td class="px-4 py-3 text-muted-foreground">The step size for value increments.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the slider track and thumb.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">orientation</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'horizontal' | 'vertical'</td>
                    <td class="px-4 py-3 font-mono text-xs">'horizontal'</td>
                    <td class="px-4 py-3 text-muted-foreground">The orientation of the slider.</td>
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
export class SliderShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly control = new FormControl(50);
}
