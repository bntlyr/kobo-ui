import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KCombobox, KComboboxItem } from '../../components/ui/combobox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-combobox-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KCombobox, FormsModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Combobox</h1>
        <p class="text-muted-foreground mt-2">Autocomplete input and command palette with a list of suggestions.</p>
      </div>

      <k-tabs value="preview" variant="line">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-combobox
              [items]="frameworks"
              [(value)]="selectedFramework"
              placeholder="Select framework..."
              searchPlaceholder="Search framework..."
              emptyText="No framework found."
            ></k-combobox>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-combobox
  [items]="frameworks"
  [(value)]="selectedFramework"
  placeholder="Select framework..."
  searchPlaceholder="Search framework..."
  emptyText="No framework found."
&gt;&lt;/k-combobox&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KCombobox</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-combobox</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">items</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">KComboboxItem[]</td>
                    <td class="px-4 py-3 font-mono text-xs">[]</td>
                    <td class="px-4 py-3 text-muted-foreground">The array of items to display.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">The selected value (two-way bindable).</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">placeholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Select framework...'</td>
                    <td class="px-4 py-3 text-muted-foreground">Placeholder text for the trigger button.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">searchPlaceholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Search framework...'</td>
                    <td class="px-4 py-3 text-muted-foreground">Placeholder text for the search input.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">emptyText</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'No framework found.'</td>
                    <td class="px-4 py-3 text-muted-foreground">Text to display when no items match the search.</td>
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
export default class ComboboxShowcaseComponent {
  readonly frameworks: KComboboxItem[] = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
    { value: 'angular', label: 'Angular' },
  ];
  readonly selectedFramework = model<string>('');
}
