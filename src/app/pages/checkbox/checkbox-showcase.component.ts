import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { KCheckbox } from '../../components/ui/checkbox/checkbox.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-checkbox-showcase',
  imports: [ReactiveFormsModule, KCheckbox, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">checkbox</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Checkbox</h1>
          <p class="text-lg text-muted-foreground">A control that allows the user to toggle between checked and not checked.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <k-checkbox [formControl]="control">Accept terms and conditions</k-checkbox>
              <p class="mt-4 text-xs text-muted-foreground">Checked: {{ control.value }}</p>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-checkbox formControlName=&quot;terms&quot;>Accept terms</k-checkbox>" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">States</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="grid sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <k-checkbox [disabled]="true">Disabled (unchecked)</k-checkbox>
            </div>
            <div class="space-y-2">
              <k-checkbox [disabled]="true" [checked]="true">Disabled (checked)</k-checkbox>
            </div>
            <div class="space-y-2">
              <k-checkbox [error]="true">Error state</k-checkbox>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KCheckbox</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-checkbox</code></p>
            <p class="text-sm text-muted-foreground">Implements <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">ControlValueAccessor</code> for use with <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">ngModel</code> and Reactive Forms.</p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">checked</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ModelSignal&lt;boolean&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Two-way bound model for the checked state.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">indeterminate</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ModelSignal&lt;boolean&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Two-way bound model for indeterminate state.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The size of the checkbox.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">error</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether to apply error styling.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ModelSignal&lt;boolean&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Two-way bound model for the disabled state.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes applied to the root label element.</td>
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
export class CheckboxShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly control = new FormControl(false);
}
