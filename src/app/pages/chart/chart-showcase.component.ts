import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';

@Component({
  selector: 'app-chart-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Chart</h1>
        <p class="text-muted-foreground mt-2">Beautiful charts using Recharts.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <div class="w-full max-w-md bg-card border rounded-xl p-6">
              <h3 class="font-semibold mb-4 text-center">Monthly Revenue</h3>
              <div class="h-[200px] w-full bg-muted/20 rounded-md border border-dashed flex items-center justify-center text-muted-foreground text-sm">
                <!-- Placeholder for actual chart rendering which typically uses an external library -->
                Chart Visualization Region
              </div>
            </div>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-chart-container&gt;
  &lt;k-chart [config]="chartConfig" [data]="chartData"&gt;
    &lt;k-chart-tooltip&gt;&lt;/k-chart-tooltip&gt;
    &lt;!-- Series definitions go here --&gt;
  &lt;/k-chart&gt;
&lt;/k-chart-container&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KChart</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-chart</code></p>
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
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes.</td>
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
export default class ChartShowcaseComponent {}
