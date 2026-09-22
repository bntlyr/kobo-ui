import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { KAutocomplete } from '../../components/ui/autocomplete/autocomplete.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-autocomplete-showcase',
  imports: [ReactiveFormsModule, KAutocomplete, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">autocomplete</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Autocomplete</h1>
          <p class="text-lg text-muted-foreground">Input field with a dropdown of suggested options as you type.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="space-y-4 max-w-sm">
                <k-autocomplete [options]="countries" [formControl]="control" placeholder="Search for a country..." />
                @if (control.value) {
                  <p class="text-xs text-muted-foreground">Selected value: {{ control.value }}</p>
                }
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-autocomplete [options]=&quot;countries&quot; formControlName=&quot;country&quot; />" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAutocomplete</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-autocomplete</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">options <span class="text-destructive">*</span></td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">AutocompleteOption[]</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">Array of options to select from. Required.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">placeholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Search…'</td>
                    <td class="px-4 py-3 text-muted-foreground">Placeholder text for the input.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The size of the input field.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">error</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether to apply error styling.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">freeText</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">If true, typing sets the value even if it doesn't match an option.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">emptyMessage</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Message to display when no options match.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ModelSignal&lt;string&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Two-way bound model value.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">optionSelected</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">OutputEmitter&lt;AutocompleteOption&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">Event emitted when an option is selected.</td>
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
            <h3 class="text-lg font-semibold">AutocompleteOption</h3>
            
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 text-muted-foreground">The value of the option.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">label</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 text-muted-foreground">The display label of the option.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">description</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string?</td>
                    <td class="px-4 py-3 text-muted-foreground">Optional subtext displayed below the label.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean?</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether the option is disabled.</td>
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
export class AutocompleteShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly control = new FormControl('');

  readonly countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'jp', label: 'Japan' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
  ];
}
