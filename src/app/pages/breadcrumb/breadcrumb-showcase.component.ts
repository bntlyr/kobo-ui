import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KBreadcrumb, KBreadcrumbList, KBreadcrumbItem, KBreadcrumbLink,
  KBreadcrumbPage, KBreadcrumbSeparator,
} from '../../components/ui/breadcrumb/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const BREADCRUMB_SRC = `<k-breadcrumb>
  <k-breadcrumb-list>
    <k-breadcrumb-item>
      <k-breadcrumb-link href="/">Home</k-breadcrumb-link>
    </k-breadcrumb-item>
    <k-breadcrumb-separator />
    <k-breadcrumb-item>
      <k-breadcrumb-link href="/components">Components</k-breadcrumb-link>
    </k-breadcrumb-item>
    <k-breadcrumb-separator />
    <k-breadcrumb-item>
      <k-breadcrumb-page>Breadcrumb</k-breadcrumb-page>
    </k-breadcrumb-item>
  </k-breadcrumb-list>
</k-breadcrumb>`;

@Component({
  selector: 'app-breadcrumb-showcase',
  imports: [
    KBreadcrumb, KBreadcrumbList, KBreadcrumbItem, KBreadcrumbLink,
    KBreadcrumbPage, KBreadcrumbSeparator, CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">breadcrumb</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Breadcrumb</h1>
          <p class="text-lg text-muted-foreground">Semantic navigation trail.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-4">
              <k-breadcrumb>
                <k-breadcrumb-list>
                  <k-breadcrumb-item><k-breadcrumb-link href="/">Home</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator />
                  <k-breadcrumb-item><k-breadcrumb-link href="/components">Components</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator />
                  <k-breadcrumb-item><k-breadcrumb-page>Breadcrumb</k-breadcrumb-page></k-breadcrumb-item>
                </k-breadcrumb-list>
              </k-breadcrumb>

              <k-breadcrumb>
                <k-breadcrumb-list>
                  <k-breadcrumb-item><k-breadcrumb-link href="/">Home</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator>/</k-breadcrumb-separator>
                  <k-breadcrumb-item><k-breadcrumb-link href="/docs">Docs</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator>/</k-breadcrumb-separator>
                  <k-breadcrumb-item><k-breadcrumb-page>Navigation</k-breadcrumb-page></k-breadcrumb-item>
                </k-breadcrumb-list>
              </k-breadcrumb>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="sm"</span>
            <k-breadcrumb>
              <k-breadcrumb-list size="sm">
                <k-breadcrumb-item><k-breadcrumb-link href="#">Home</k-breadcrumb-link></k-breadcrumb-item>
                <k-breadcrumb-separator />
                <k-breadcrumb-item><k-breadcrumb-page>Current</k-breadcrumb-page></k-breadcrumb-item>
              </k-breadcrumb-list>
            </k-breadcrumb>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="default"</span>
            <k-breadcrumb>
              <k-breadcrumb-list size="default">
                <k-breadcrumb-item><k-breadcrumb-link href="#">Home</k-breadcrumb-link></k-breadcrumb-item>
                <k-breadcrumb-separator />
                <k-breadcrumb-item><k-breadcrumb-page>Current</k-breadcrumb-page></k-breadcrumb-item>
              </k-breadcrumb-list>
            </k-breadcrumb>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="lg"</span>
            <k-breadcrumb>
              <k-breadcrumb-list size="lg">
                <k-breadcrumb-item><k-breadcrumb-link href="#">Home</k-breadcrumb-link></k-breadcrumb-item>
                <k-breadcrumb-separator />
                <k-breadcrumb-item><k-breadcrumb-page>Current</k-breadcrumb-page></k-breadcrumb-item>
              </k-breadcrumb-list>
            </k-breadcrumb>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KBreadcrumb</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-breadcrumb</code></p>
            
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
            <h3 class="text-lg font-semibold">KBreadcrumbList</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-breadcrumb-list</code></p>
            
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
                    <td class="px-4 py-3 text-muted-foreground">The size of the breadcrumb list.</td>
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
            <h3 class="text-lg font-semibold">KBreadcrumbItem</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-breadcrumb-item</code></p>
            
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
            <h3 class="text-lg font-semibold">KBreadcrumbLink</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-breadcrumb-link</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">href</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Standard HTML href attribute.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">routerLink</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string | unknown[]</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Angular routerLink attribute.</td>
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
            <h3 class="text-lg font-semibold">KBreadcrumbPage</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-breadcrumb-page</code></p>
            
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
            <h3 class="text-lg font-semibold">KBreadcrumbSeparator</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-breadcrumb-separator</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">type</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'chevron' | 'slash'</td>
                    <td class="px-4 py-3 font-mono text-xs">'chevron'</td>
                    <td class="px-4 py-3 text-muted-foreground">The icon type to display.</td>
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
            <h3 class="text-lg font-semibold">KBreadcrumbEllipsis</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-breadcrumb-ellipsis</code></p>
            
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
export class BreadcrumbShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = BREADCRUMB_SRC;
}
