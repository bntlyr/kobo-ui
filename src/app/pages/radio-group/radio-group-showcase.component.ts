import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { KRadioGroup, KRadioItem } from '../../components/ui/radio-group/radio-group.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-radio-group-showcase',
  imports: [ReactiveFormsModule, KRadioGroup, KRadioItem, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">radio-group</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Radio Group</h1>
          <p class="text-lg text-muted-foreground">A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <k-radio-group [formControl]="control" class="space-y-3">
                <k-radio-item value="default">Default</k-radio-item>
                <k-radio-item value="comfortable">Comfortable</k-radio-item>
                <k-radio-item value="compact">Compact</k-radio-item>
              </k-radio-group>
              <p class="mt-4 text-xs text-muted-foreground">Selected: {{ control.value }}</p>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-radio-group formControlName=&quot;density&quot;>
  <k-radio-item value=&quot;default&quot;>Default</k-radio-item>
  <k-radio-item value=&quot;comfortable&quot;>Comfortable</k-radio-item>
</k-radio-group>" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">States</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="grid sm:grid-cols-2 gap-6">
            <div class="space-y-4">
              <span class="text-sm font-medium">Disabled Group</span>
              <k-radio-group [disabled]="true" [formControl]="disabledControl" class="space-y-3">
                <k-radio-item value="1">Option 1</k-radio-item>
                <k-radio-item value="2">Option 2</k-radio-item>
              </k-radio-group>
            </div>
            <div class="space-y-4">
              <span class="text-sm font-medium">Disabled Item</span>
              <k-radio-group class="space-y-3">
                <k-radio-item value="1">Available option</k-radio-item>
                <k-radio-item value="2" [disabled]="true">Unavailable option</k-radio-item>
              </k-radio-group>
            </div>
            <div class="space-y-4">
              <span class="text-sm font-medium">Error state</span>
              <k-radio-group class="space-y-3">
                <k-radio-item value="1">Option 1</k-radio-item>
                <k-radio-item value="2">Option 2</k-radio-item>
              </k-radio-group>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KRadioGroup</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-radio-group</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs text-primary">'vertical' | 'horizontal'</td>
                    <td class="px-4 py-3 font-mono text-xs">'vertical'</td>
                    <td class="px-4 py-3 text-muted-foreground">The orientation of the radio group items.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the radio buttons in the group.</td>
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

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KRadioItem</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-radio-item</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">(required)</td>
                    <td class="px-4 py-3 text-muted-foreground">The value of the radio item.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether the individual radio item is disabled.</td>
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
export class RadioGroupShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly control = new FormControl('default');
  readonly disabledControl = new FormControl('1');
}
