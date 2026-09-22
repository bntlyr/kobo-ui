import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { KPasswordInput } from '../../components/ui/password-input/password-input.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-password-input-showcase',
  imports: [ReactiveFormsModule, KPasswordInput, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">password-input</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Password Input</h1>
          <p class="text-lg text-muted-foreground">Input field specifically for passwords with a built-in visibility toggle.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="space-y-4 max-w-sm">
                <k-password-input [formControl]="control" placeholder="Enter your password" />
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-password-input formControlName=&quot;password&quot; placeholder=&quot;Enter your password&quot; />" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Hide Toggle Button</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="space-y-4 max-w-sm">
            <k-password-input placeholder="No toggle button" [hideToggle]="true" />
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KPasswordInput</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-password-input</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Placeholder text.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the component.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">error</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether to apply error styling.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">hideToggle</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">If true, hides the show/hide password toggle button.</td>
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
export class PasswordInputShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly control = new FormControl('');
}
