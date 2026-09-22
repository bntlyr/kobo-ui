import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KSelect, KSelectItem, KSelectSeparator, KSelectLabel } from '../../components/ui/select/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const SELECT_SRC = `<!-- Simple select (model binding) -->
<k-select [(value)]="selectedFruit" placeholder="Pick a fruit">
  <k-select-item value="apple" label="Apple">Apple</k-select-item>
  <k-select-item value="banana" label="Banana">Banana</k-select-item>
  <k-select-item value="mango" label="Mango">Mango</k-select-item>
</k-select>

<!-- Reactive forms -->
<k-select formControlName="country" placeholder="Select country">
  ...
</k-select>`;

@Component({
  selector: 'app-select-showcase',
  imports: [KSelect, KSelectItem, KSelectSeparator, KSelectLabel, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">select</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Select</h1>
          <p class="text-lg text-muted-foreground">
            Custom styled select with CDK overlay, grouped options, searchable variant, and ControlValueAccessor support.
          </p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">
              <div class="grid sm:grid-cols-2 gap-6">
                <!-- Fruit select -->
                <div class="space-y-2">
                  <label class="text-sm font-medium">Favourite fruit</label>
                  <k-select placeholder="Pick a fruit..." class="w-full"
                            (valueChange)="selectedFruit.set($event)">
                    <k-select-label>Tropical</k-select-label>
                    <k-select-item value="mango" label="Mango">Mango</k-select-item>
                    <k-select-item value="pineapple" label="Pineapple">Pineapple</k-select-item>
                    <k-select-item value="papaya" label="Papaya">Papaya</k-select-item>
                    <k-select-separator />
                    <k-select-label>Temperate</k-select-label>
                    <k-select-item value="apple" label="Apple">Apple</k-select-item>
                    <k-select-item value="pear" label="Pear">Pear</k-select-item>
                    <k-select-item value="cherry" label="Cherry">Cherry</k-select-item>
                  </k-select>
                  @if (selectedFruit()) {
                    <p class="text-xs text-muted-foreground">Selected: {{ selectedFruit() }}</p>
                  }
                </div>

                <!-- Searchable select -->
                <div class="space-y-2">
                  <label class="text-sm font-medium">Timezone (searchable)</label>
                  <k-select placeholder="Select timezone..." class="w-full"
                            [searchable]="true"
                            (valueChange)="selectedTz.set($event)">
                    <k-select-label>North America</k-select-label>
                    <k-select-item value="est" label="Eastern (UTC-5)">Eastern (UTC-5)</k-select-item>
                    <k-select-item value="cst" label="Central (UTC-6)">Central (UTC-6)</k-select-item>
                    <k-select-item value="pst" label="Pacific (UTC-8)">Pacific (UTC-8)</k-select-item>
                    <k-select-separator />
                    <k-select-label>Europe</k-select-label>
                    <k-select-item value="gmt" label="London (UTC+0)">London (UTC+0)</k-select-item>
                    <k-select-item value="cet" label="Berlin (UTC+1)">Berlin (UTC+1)</k-select-item>
                    <k-select-separator />
                    <k-select-label>Asia</k-select-label>
                    <k-select-item value="jst" label="Tokyo (UTC+9)">Tokyo (UTC+9)</k-select-item>
                    <k-select-item value="sgt" label="Singapore (UTC+8)">Singapore (UTC+8)</k-select-item>
                  </k-select>
                  @if (selectedTz()) {
                    <p class="text-xs text-muted-foreground">Selected: {{ selectedTz() }}</p>
                  }
                </div>
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
            <h3 class="text-lg font-semibold">KSelect</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-select</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">placeholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Select an option…'</td>
                    <td class="px-4 py-3 text-muted-foreground">Placeholder text when no item is selected.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">searchable</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether to include a text input to filter options.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">searchPlaceholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Search…'</td>
                    <td class="px-4 py-3 text-muted-foreground">Placeholder text for the search input.</td>
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
            <h3 class="text-lg font-semibold">KSelectItem</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-select-item</code></p>
            
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
                    <td class="px-4 py-3 text-muted-foreground">The value of the select item.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">label</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">The text label used for searching and displaying when selected.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether the individual select item is disabled.</td>
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
export class SelectShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = SELECT_SRC;

  readonly selectedFruit = signal('');
  readonly selectedTz    = signal('');
}
