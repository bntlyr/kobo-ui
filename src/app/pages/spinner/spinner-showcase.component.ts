import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KSpinner } from '../../components/ui/spinner/spinner.component';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-spinner-showcase',
  imports: [KSpinner, KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">spinner</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Spinner</h1>
          <p class="text-lg text-muted-foreground">SVG spinner with 4 sizes and custom color.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="flex flex-wrap items-center gap-8">
                <div class="flex flex-col items-center gap-2">
                  <k-spinner size="sm" />
                  <span class="text-xs text-muted-foreground">sm</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <k-spinner />
                  <span class="text-xs text-muted-foreground">default</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <k-spinner size="lg" />
                  <span class="text-xs text-muted-foreground">lg</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <k-spinner size="xl" />
                  <span class="text-xs text-muted-foreground">xl</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <k-spinner size="lg" class="text-primary" />
                  <span class="text-xs text-muted-foreground">primary</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <k-spinner size="lg" class="text-green-500" />
                  <span class="text-xs text-muted-foreground">success</span>
                </div>
              </div>
              <div class="mt-6 pt-4 border-t border-border">
                <button k-button [disabled]="loading()" (click)="simulateLoad()">
                  @if (loading()) {
                    <k-spinner size="sm" class="mr-2 text-primary-foreground" />
                    Loading...
                  } @else {
                    Submit
                  }
                </button>
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-spinner />" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="sm" />
              <span class="text-xs text-muted-foreground">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="default" />
              <span class="text-xs text-muted-foreground">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" />
              <span class="text-xs text-muted-foreground">lg</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="xl" />
              <span class="text-xs text-muted-foreground">xl</span>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Colors</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" color="primary" />
              <span class="text-xs text-muted-foreground">primary</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" color="muted" />
              <span class="text-xs text-muted-foreground">muted</span>
            </div>
            <div class="flex flex-col items-center gap-2 bg-primary rounded-lg p-3">
              <k-spinner size="lg" color="white" />
              <span class="text-xs text-primary-foreground">white</span>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSpinner</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-spinner</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg' | 'xl'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the spinner.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">color</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'primary' | 'muted' | 'white'</td>
                    <td class="px-4 py-3 font-mono text-xs">'muted'</td>
                    <td class="px-4 py-3 text-muted-foreground">The color of the spinner.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">label</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Loading...'</td>
                    <td class="px-4 py-3 text-muted-foreground">Accessible label for screen readers.</td>
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
export class SpinnerShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly loading = signal(false);

  simulateLoad(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
  }
}
