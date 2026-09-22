import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KPagination } from '../../components/ui/pagination/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-pagination-showcase',
  imports: [KPagination, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">pagination</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Pagination</h1>
          <p class="text-lg text-muted-foreground">Smart page range with ellipsis.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">
              <k-pagination
                [page]="page()"
                [pageCount]="12"
                (pageChange)="page.set($event)"
              />
              <p class="text-sm text-center text-muted-foreground">
                Page {{ page() }} of 12
              </p>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-pagination [page]=&quot;1&quot; [pageCount]=&quot;12&quot; />" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Variants</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="default"</span>
            <k-pagination [page]="1" [pageCount]="5" variant="default" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="outline"</span>
            <k-pagination [page]="1" [pageCount]="5" variant="outline" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="ghost"</span>
            <k-pagination [page]="1" [pageCount]="5" variant="ghost" />
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="sm"</span>
            <k-pagination [page]="1" [pageCount]="5" size="sm" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="default"</span>
            <k-pagination [page]="1" [pageCount]="5" size="default" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="lg"</span>
            <k-pagination [page]="1" [pageCount]="5" size="lg" />
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KPagination</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-pagination</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">page</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">1</td>
                    <td class="px-4 py-3 text-muted-foreground">The current active page.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">pageCount</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">1</td>
                    <td class="px-4 py-3 text-muted-foreground">The total number of pages.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">siblingCount</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">1</td>
                    <td class="px-4 py-3 text-muted-foreground">Number of pages to show before and after the current page.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'outline' | 'ghost'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">Button variant styling.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">Button size styling.</td>
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
export class PaginationShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly page = signal(1);
}
