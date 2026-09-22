import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const INPUT_SOURCE = `import { Directive, computed, input } from '@angular/core';
import { cn } from '../../core/utils/cn';

@Directive({
  selector: 'input[k-input]',
  host: { '[class]': 'classes()' },
})
export class KInputDirective {
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(
      ['flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1',
       'text-sm shadow-sm transition-colors placeholder:text-muted-foreground',
       'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
       'disabled:cursor-not-allowed disabled:opacity-50'],
      this.class()
    )
  );
}`;

const INPUT_USAGE = `import { KInputDirective } from './components/ui/input/input.directive';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  imports: [KInputDirective, ReactiveFormsModule],
  template: \`
    <!-- Basic -->
    <input k-input type="text" placeholder="Enter text..." />

    <!-- With label -->
    <label class="text-sm font-medium" for="email">Email</label>
    <input k-input id="email" type="email" formControlName="email" />

    <!-- Disabled -->
    <input k-input type="text" disabled value="Not editable" />

    <!-- File -->
    <input k-input type="file" />
  \`
})
export class MyComponent {}`;

@Component({
  selector: 'app-input-showcase',
  imports: [FormsModule, KInputDirective, KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">input</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Input</h1>
        <p class="text-lg text-muted-foreground">
          A styled input directive fully compatible with Angular Reactive Forms and
          <code class="font-mono text-sm bg-muted px-1 py-0.5 rounded">ngModel</code>.
          Applied as an attribute — no wrapper element needed.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6 max-w-sm">

            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground" for="demo-text">Text input</label>
              <input k-input id="demo-text" type="text" placeholder="Type something..." />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground" for="demo-email">Email</label>
              <input k-input id="demo-email" type="email" placeholder="you@example.com" />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground" for="demo-password">Password</label>
              <input k-input id="demo-password" type="password" placeholder="••••••••" />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground" for="demo-search">Search</label>
              <div class="relative">
                <svg class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input k-input id="demo-search" type="search" placeholder="Search..." class="pl-8" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground" for="demo-disabled">Disabled</label>
              <input k-input id="demo-disabled" type="text" [disabled]="true" value="Not editable" />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground" for="demo-file">File</label>
              <input k-input id="demo-file" type="file" />
            </div>

            <!-- Submit row -->
            <div class="flex gap-2 pt-2">
              <input k-input type="text" placeholder="Your name..." class="flex-1" />
              <button k-button>Submit</button>
            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add input" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Source</p>
              <app-code-block [code]="inputSource" language="typescript"
                              filename="src/app/components/ui/input/input.directive.ts" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Usage</p>
              <app-code-block [code]="inputUsage" language="typescript" />
            </div>
          </div>
        }
      </app-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KInputDirective</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">input[k-input]</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the input.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">error</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether to apply error styling. Automatically inferred if inside a <code class="font-mono text-xs">k-form-field</code> with an invalid/touched control.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Disables the input. (Also applies native disabled attribute).</td>
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
          <p class="text-sm text-muted-foreground">
            All native <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">input</code> attributes are preserved
            (type, placeholder, disabled, required, formControlName, etc.).
          </p>
        </div>
      </section>
    </div>
  `,
})
export class InputShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');
  readonly inputSource = INPUT_SOURCE;
  readonly inputUsage  = INPUT_USAGE;
}
