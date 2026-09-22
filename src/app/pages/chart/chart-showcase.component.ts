import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KChartContainer,
  KChartLegend,
  KBarChart,
  KLineChart,
  KAreaChart,
  KPieChart,
} from '../../components/ui/chart';
import type { ChartDataPoint, ChartConfig } from '../../components/ui/chart';
import {
  KCard,
  KCardHeader,
  KCardTitle,
  KCardDescription,
  KCardContent,
  KCardFooter,
} from '../../components/ui/card';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const BAR_CHART_CODE = `<k-chart-container [config]="chartConfig">
  <k-bar-chart
    [data]="barData"
    index="month"
    [categories]="['desktop', 'mobile']"
    [config]="chartConfig"
  />
  <k-chart-legend [config]="chartConfig" />
</k-chart-container>`;

const LINE_CHART_CODE = `<k-chart-container [config]="lineConfig">
  <k-line-chart
    [data]="lineData"
    index="month"
    [categories]="['revenue', 'expenses']"
    [config]="lineConfig"
  />
  <k-chart-legend [config]="lineConfig" />
</k-chart-container>`;

const AREA_CHART_CODE = `<k-chart-container [config]="areaConfig">
  <k-area-chart
    [data]="areaData"
    index="month"
    [categories]="['users', 'sessions']"
    [config]="areaConfig"
  />
  <k-chart-legend [config]="areaConfig" />
</k-chart-container>`;

const PIE_CHART_CODE = `<k-chart-container [config]="pieConfig">
  <k-pie-chart
    [data]="pieData"
    nameKey="browser"
    valueKey="visitors"
    [config]="pieConfig"
    [donut]="true"
    centerLabel="Visitors"
  />
  <k-chart-legend [config]="pieConfig" />
</k-chart-container>`;

@Component({
  selector: 'app-chart-showcase',
  imports: [
    KChartContainer,
    KChartLegend,
    KBarChart,
    KLineChart,
    KAreaChart,
    KPieChart,
    KCard,
    KCardHeader,
    KCardTitle,
    KCardDescription,
    KCardContent,
    KCardFooter,
    CodeBlockComponent,
    TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <!-- Header -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">chart</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Chart</h1>
          <p class="text-lg text-muted-foreground">
            Beautiful, responsive SVG charts with hover tooltips. Built with pure Angular — no external charting library required.
          </p>
        </div>

        <!-- Bar Chart Demo -->
        <app-tabs [tabs]="tabs" [(active)]="barTab">
          @if (barTab() === 'preview') {
            <div class="mt-4">
              <k-card>
                <k-card-header>
                  <k-card-title>Monthly Visitors</k-card-title>
                  <k-card-description>Desktop vs Mobile visitors — January to June 2024</k-card-description>
                </k-card-header>
                <k-card-content>
                  <k-chart-container [config]="barConfig">
                    <k-bar-chart
                      [data]="barData"
                      index="month"
                      [categories]="['desktop', 'mobile']"
                      [config]="barConfig"
                    ></k-bar-chart>
                    <k-chart-legend [config]="barConfig"></k-chart-legend>
                  </k-chart-container>
                </k-card-content>
                <k-card-footer>
                  <p class="text-sm text-muted-foreground">Showing total visitors for the last 6 months</p>
                </k-card-footer>
              </k-card>
            </div>
          }
          @if (barTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="barCode" language="html" /></div>
          }
        </app-tabs>
      </section>

      <!-- Line Chart Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Line Chart</h2>
        <p class="text-muted-foreground">Trend data with interactive hover states and tooltips.</p>

        <app-tabs [tabs]="tabs" [(active)]="lineTab">
          @if (lineTab() === 'preview') {
            <div class="mt-4">
              <k-card>
                <k-card-header>
                  <k-card-title>Revenue vs Expenses</k-card-title>
                  <k-card-description>Financial overview — H1 2024</k-card-description>
                </k-card-header>
                <k-card-content>
                  <k-chart-container [config]="lineConfig">
                    <k-line-chart
                      [data]="lineData"
                      index="month"
                      [categories]="['revenue', 'expenses']"
                      [config]="lineConfig"
                    ></k-line-chart>
                    <k-chart-legend [config]="lineConfig"></k-chart-legend>
                  </k-chart-container>
                </k-card-content>
              </k-card>
            </div>
          }
          @if (lineTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="lineCode" language="html" /></div>
          }
        </app-tabs>
      </section>

      <!-- Area Chart Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Area Chart</h2>
        <p class="text-muted-foreground">Filled area chart with gradient fills for volume visualization.</p>

        <app-tabs [tabs]="tabs" [(active)]="areaTab">
          @if (areaTab() === 'preview') {
            <div class="mt-4">
              <k-card>
                <k-card-header>
                  <k-card-title>User Activity</k-card-title>
                  <k-card-description>Active users and sessions over time</k-card-description>
                </k-card-header>
                <k-card-content>
                  <k-chart-container [config]="areaConfig">
                    <k-area-chart
                      [data]="areaData"
                      index="month"
                      [categories]="['users', 'sessions']"
                      [config]="areaConfig"
                    ></k-area-chart>
                    <k-chart-legend [config]="areaConfig"></k-chart-legend>
                  </k-chart-container>
                </k-card-content>
              </k-card>
            </div>
          }
          @if (areaTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="areaCode" language="html" /></div>
          }
        </app-tabs>
      </section>

      <!-- Pie/Donut Chart Section -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Pie / Donut Chart</h2>
        <p class="text-muted-foreground">Category breakdown with donut visualization and center label.</p>

        <app-tabs [tabs]="tabs" [(active)]="pieTab">
          @if (pieTab() === 'preview') {
            <div class="mt-4">
              <div class="grid sm:grid-cols-2 gap-6">
                <!-- Donut -->
                <k-card>
                  <k-card-header>
                    <k-card-title>Browser Share</k-card-title>
                    <k-card-description>Visitor breakdown by browser</k-card-description>
                  </k-card-header>
                  <k-card-content>
                    <k-chart-container [config]="pieConfig">
                      <k-pie-chart
                        [data]="pieData"
                        nameKey="browser"
                        valueKey="visitors"
                        [config]="pieConfig"
                        [donut]="true"
                        centerLabel="Visitors"
                      ></k-pie-chart>
                      <k-chart-legend [config]="pieConfig"></k-chart-legend>
                    </k-chart-container>
                  </k-card-content>
                </k-card>

                <!-- Full Pie -->
                <k-card>
                  <k-card-header>
                    <k-card-title>Traffic Sources</k-card-title>
                    <k-card-description>Where your visitors come from</k-card-description>
                  </k-card-header>
                  <k-card-content>
                    <k-chart-container [config]="sourceConfig">
                      <k-pie-chart
                        [data]="sourceData"
                        nameKey="source"
                        valueKey="count"
                        [config]="sourceConfig"
                        [donut]="false"
                      ></k-pie-chart>
                      <k-chart-legend [config]="sourceConfig"></k-chart-legend>
                    </k-chart-container>
                  </k-card-content>
                </k-card>
              </div>
            </div>
          }
          @if (pieTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="pieCode" language="html" /></div>
          }
        </app-tabs>
      </section>

      <!-- API Reference -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>

        <div class="space-y-8">
          <!-- KBarChart -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KBarChart</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-bar-chart</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">data <span class="text-destructive">*</span></td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ChartDataPoint[]</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">Array of data points to render.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">index</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'name'</td>
                    <td class="px-4 py-3 text-muted-foreground">The data key used for x-axis labels.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">categories</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string[]</td>
                    <td class="px-4 py-3 font-mono text-xs">{{ '[]' }}</td>
                    <td class="px-4 py-3 text-muted-foreground">Data keys to render as bar series.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">config</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ChartConfig</td>
                    <td class="px-4 py-3 font-mono text-xs">{{ '{}' }}</td>
                    <td class="px-4 py-3 text-muted-foreground">Labels and colors for each category.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">height</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">300</td>
                    <td class="px-4 py-3 text-muted-foreground">SVG viewBox height in px.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- KLineChart -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KLineChart</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-line-chart</code></p>
            <p class="text-sm text-muted-foreground">Same inputs as <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-bar-chart</code>.</p>
          </div>

          <!-- KAreaChart -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAreaChart</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-area-chart</code></p>
            <p class="text-sm text-muted-foreground">Same inputs as <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-line-chart</code>. Renders a gradient-filled area beneath the line.</p>
          </div>

          <!-- KPieChart -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KPieChart</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-pie-chart</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">data <span class="text-destructive">*</span></td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ChartDataPoint[]</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">Array of data points.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">nameKey</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'name'</td>
                    <td class="px-4 py-3 text-muted-foreground">Data key for slice labels.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">valueKey</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'value'</td>
                    <td class="px-4 py-3 text-muted-foreground">Data key for slice values.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">donut</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">true</td>
                    <td class="px-4 py-3 text-muted-foreground">Render as donut with center hole.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">centerLabel</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Total'</td>
                    <td class="px-4 py-3 text-muted-foreground">Label shown in center of donut.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">260</td>
                    <td class="px-4 py-3 text-muted-foreground">Diameter of the chart in px.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ChartConfig -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">ChartConfig</h3>
            <p class="text-sm text-muted-foreground">Configuration object mapping data keys to labels and colors.</p>
            <app-code-block [code]="configTypeCode" language="typescript" />
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class ChartShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];

  readonly barTab = signal('preview');
  readonly lineTab = signal('preview');
  readonly areaTab = signal('preview');
  readonly pieTab = signal('preview');

  // Code strings
  readonly barCode = BAR_CHART_CODE;
  readonly lineCode = LINE_CHART_CODE;
  readonly areaCode = AREA_CHART_CODE;
  readonly pieCode = PIE_CHART_CODE;

  readonly configTypeCode = `interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string; // defaults to --chart-1..5 tokens
  };
}

// Example:
const chartConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
  mobile:  { label: 'Mobile',  color: 'hsl(var(--chart-2))' },
};`;

  // ---- Bar Chart Data ----
  readonly barConfig: ChartConfig = {
    desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
    mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
  };
  readonly barData: ChartDataPoint[] = [
    { month: 'Jan', desktop: 186, mobile: 80 },
    { month: 'Feb', desktop: 305, mobile: 200 },
    { month: 'Mar', desktop: 237, mobile: 120 },
    { month: 'Apr', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'Jun', desktop: 214, mobile: 140 },
  ];

  // ---- Line Chart Data ----
  readonly lineConfig: ChartConfig = {
    revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
    expenses: { label: 'Expenses', color: 'hsl(var(--chart-3))' },
  };
  readonly lineData: ChartDataPoint[] = [
    { month: 'Jan', revenue: 4200, expenses: 3100 },
    { month: 'Feb', revenue: 4800, expenses: 3400 },
    { month: 'Mar', revenue: 5100, expenses: 3200 },
    { month: 'Apr', revenue: 4600, expenses: 3600 },
    { month: 'May', revenue: 5800, expenses: 3500 },
    { month: 'Jun', revenue: 6200, expenses: 3800 },
  ];

  // ---- Area Chart Data ----
  readonly areaConfig: ChartConfig = {
    users: { label: 'Active Users', color: 'hsl(var(--chart-1))' },
    sessions: { label: 'Sessions', color: 'hsl(var(--chart-4))' },
  };
  readonly areaData: ChartDataPoint[] = [
    { month: 'Jan', users: 1200, sessions: 3400 },
    { month: 'Feb', users: 1800, sessions: 4200 },
    { month: 'Mar', users: 2400, sessions: 5100 },
    { month: 'Apr', users: 2100, sessions: 4800 },
    { month: 'May', users: 2800, sessions: 5600 },
    { month: 'Jun', users: 3200, sessions: 6100 },
  ];

  // ---- Pie Chart Data ----
  readonly pieConfig: ChartConfig = {
    chrome: { label: 'Chrome', color: 'hsl(var(--chart-1))' },
    safari: { label: 'Safari', color: 'hsl(var(--chart-2))' },
    firefox: { label: 'Firefox', color: 'hsl(var(--chart-3))' },
    edge: { label: 'Edge', color: 'hsl(var(--chart-4))' },
    other: { label: 'Other', color: 'hsl(var(--chart-5))' },
  };
  readonly pieData: ChartDataPoint[] = [
    { browser: 'chrome', visitors: 275 },
    { browser: 'safari', visitors: 200 },
    { browser: 'firefox', visitors: 187 },
    { browser: 'edge', visitors: 173 },
    { browser: 'other', visitors: 90 },
  ];

  // ---- Source Pie (full pie, no donut) ----
  readonly sourceConfig: ChartConfig = {
    organic: { label: 'Organic', color: 'hsl(var(--chart-1))' },
    direct: { label: 'Direct', color: 'hsl(var(--chart-2))' },
    referral: { label: 'Referral', color: 'hsl(var(--chart-3))' },
    social: { label: 'Social', color: 'hsl(var(--chart-4))' },
  };
  readonly sourceData: ChartDataPoint[] = [
    { source: 'organic', count: 420 },
    { source: 'direct', count: 310 },
    { source: 'referral', count: 180 },
    { source: 'social', count: 90 },
  ];
}
