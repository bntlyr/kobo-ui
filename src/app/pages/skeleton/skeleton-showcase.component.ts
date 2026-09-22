import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KSkeletonDirective } from '../../components/ui/skeleton/skeleton.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const SKEL_USAGE = `<!-- Card skeleton -->
<div class="space-y-3">
  <div k-skeleton class="h-4 w-3/4"></div>
  <div k-skeleton class="h-4 w-full"></div>
  <div k-skeleton class="h-4 w-1/2"></div>
</div>`;

@Component({
  selector: 'app-skeleton-showcase',
  imports: [KSkeletonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">skeleton</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Skeleton</h1>
          <p class="text-lg text-muted-foreground">Placeholder loading animation for deferred content.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="flex items-center gap-4">
                <div k-skeleton class="h-12 w-12 rounded-full"></div>
                <div class="space-y-2 flex-1">
                  <div k-skeleton class="h-4 w-48"></div>
                  <div k-skeleton class="h-4 w-32"></div>
                </div>
              </div>
              <div class="mt-4 space-y-2">
                <div k-skeleton class="h-4 w-full"></div>
                <div k-skeleton class="h-4 w-full"></div>
                <div k-skeleton class="h-4 w-3/4"></div>
              </div>
              <div k-skeleton class="mt-4 h-32 w-full rounded-lg"></div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Animations</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">animation="pulse" (default)</span>
            <div class="flex items-center gap-4">
              <div k-skeleton animation="pulse" class="h-10 w-10 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div k-skeleton animation="pulse" class="h-4 w-48"></div>
                <div k-skeleton animation="pulse" class="h-4 w-32"></div>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">animation="shimmer"</span>
            <div class="flex items-center gap-4">
              <div k-skeleton animation="shimmer" class="h-10 w-10 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div k-skeleton animation="shimmer" class="h-4 w-48"></div>
                <div k-skeleton animation="shimmer" class="h-4 w-32"></div>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">animation="none"</span>
            <div class="flex items-center gap-4">
              <div k-skeleton animation="none" class="h-10 w-10 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div k-skeleton animation="none" class="h-4 w-48"></div>
                <div k-skeleton animation="none" class="h-4 w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSkeletonDirective</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">div[k-skeleton], span[k-skeleton]</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">animation</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'pulse' | 'shimmer' | 'none'</td>
                    <td class="px-4 py-3 font-mono text-xs">'pulse'</td>
                    <td class="px-4 py-3 text-muted-foreground">The type of animation to display.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply. Used to define dimensions.</td>
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
export class SkeletonShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = SKEL_USAGE;
}
