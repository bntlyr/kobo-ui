import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { cn } from '../../../core/utils/cn';

// ============================================================
// Types
// ============================================================

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

// ============================================================
// KChartContainer — provides chart color CSS vars
// ============================================================

@Component({
  selector: 'k-chart-container',
  template: `<div [class]="classes()" [style]="colorVars()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KChartContainer {
  readonly class = input<string>('');
  readonly config = input<ChartConfig>({});

  protected readonly classes = computed(() =>
    cn('flex flex-col gap-2', this.class())
  );

  protected readonly colorVars = computed(() => {
    const cfg = this.config();
    const vars: string[] = [];
    const keys = Object.keys(cfg);
    keys.forEach((key, i) => {
      const color = cfg[key].color ?? `hsl(var(--chart-${i + 1}))`;
      vars.push(`--color-${key}: ${color}`);
    });
    return vars.join('; ');
  });
}

// ============================================================
// KChartTooltip — styled tooltip
// ============================================================

@Component({
  selector: 'k-chart-tooltip',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KChartTooltip {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xl',
      this.class()
    )
  );
}

// ============================================================
// KChartLegend — legend with color swatches
// ============================================================

@Component({
  selector: 'k-chart-legend',
  template: `
    <div [class]="classes()">
      @for (item of items(); track item.key) {
        <div class="flex items-center gap-2">
          <div
            class="h-3 w-3 rounded-sm shrink-0"
            [style.background-color]="item.color"
          ></div>
          <span class="text-muted-foreground">{{ item.label }}</span>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KChartLegend {
  readonly class = input<string>('');
  readonly config = input<ChartConfig>({});
  readonly colors = input<string[]>([]);

  protected readonly classes = computed(() =>
    cn('flex items-center justify-center gap-4 pt-3 text-sm', this.class())
  );

  protected readonly items = computed(() => {
    const cfg = this.config();
    const clrs = this.colors();
    const defaultColors = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ];
    return Object.keys(cfg).map((key, i) => ({
      key,
      label: cfg[key].label,
      color: cfg[key].color ?? clrs[i] ?? defaultColors[i] ?? defaultColors[0],
    }));
  });
}

// ============================================================
// KBarChart — SVG bar chart
// ============================================================

@Component({
  selector: 'k-bar-chart',
  template: `
    <div class="relative w-full" [class]="class()">
      <svg
        #svgEl
        [attr.viewBox]="viewBox()"
        class="w-full overflow-visible"
        preserveAspectRatio="none"
        (mouseleave)="onMouseLeave()"
      >
        <!-- Y-axis grid lines -->
        @for (tick of yTicks(); track tick.value) {
          <line
            [attr.x1]="padding().left"
            [attr.y1]="tick.y"
            [attr.x2]="chartWidth()"
            [attr.y2]="tick.y"
            class="stroke-border/50"
            stroke-dasharray="4 4"
          />
          <text
            [attr.x]="padding().left - 8"
            [attr.y]="tick.y + 4"
            text-anchor="end"
            class="fill-muted-foreground text-[11px]"
          >{{ tick.label }}</text>
        }

        <!-- X-axis labels -->
        @for (label of xLabels(); track label.text) {
          <text
            [attr.x]="label.x"
            [attr.y]="chartHeight() + 18"
            text-anchor="middle"
            class="fill-muted-foreground text-[11px]"
          >{{ label.text }}</text>
        }

        <!-- Bars -->
        @for (bar of bars(); track bar.id) {
          <rect
            [attr.x]="bar.x"
            [attr.y]="bar.y"
            [attr.width]="bar.width"
            [attr.height]="bar.height"
            [attr.fill]="bar.color"
            [attr.rx]="3"
            class="transition-all duration-200 cursor-pointer"
            [class.opacity-50]="hoveredIndex() !== null && hoveredIndex() !== bar.dataIndex"
            (mouseenter)="onBarHover(bar, $event)"
          />
        }

        <!-- Baseline -->
        <line
          [attr.x1]="padding().left"
          [attr.y1]="chartHeight()"
          [attr.x2]="chartWidth()"
          [attr.y2]="chartHeight()"
          class="stroke-border"
        />
      </svg>

      <!-- Tooltip -->
      @if (tooltip()) {
        <div
          class="absolute pointer-events-none z-10 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xl"
          [style.left.px]="tooltip()!.x"
          [style.top.px]="tooltip()!.y"
          [style.transform]="'translate(-50%, -100%)'"
        >
          <p class="font-medium text-foreground">{{ tooltip()!.label }}</p>
          @for (entry of tooltip()!.entries; track entry.name) {
            <div class="flex items-center gap-2 mt-0.5">
              <div class="h-2.5 w-2.5 rounded-sm" [style.background-color]="entry.color"></div>
              <span class="text-muted-foreground">{{ entry.name }}:</span>
              <span class="font-medium text-foreground ml-auto pl-2">{{ entry.value }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBarChart implements AfterViewInit, OnDestroy {
  readonly class = input<string>('');
  readonly data = input.required<ChartDataPoint[]>();
  readonly index = input<string>('name');
  readonly categories = input<string[]>([]);
  readonly colors = input<string[]>([]);
  readonly height = input<number>(300);
  readonly config = input<ChartConfig>({});

  private readonly svgEl = viewChild<ElementRef<SVGElement>>('svgEl');
  readonly hoveredIndex = signal<number | null>(null);
  readonly tooltip = signal<{
    x: number;
    y: number;
    label: string;
    entries: { name: string; color: string; value: string | number }[];
  } | null>(null);

  protected readonly padding = computed(() => ({
    top: 12,
    right: 12,
    bottom: 28,
    left: 48,
  }));

  protected readonly svgWidth = signal(500);
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    const el = this.svgEl()?.nativeElement;
    if (!el || !el.parentElement) return;
    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        this.svgWidth.set(entries[0].contentRect.width || 500);
      }
    });
    this.resizeObserver.observe(el.parentElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  protected readonly viewBox = computed(
    () => `0 0 ${this.svgWidth()} ${this.height()}`
  );

  protected readonly chartWidth = computed(
    () => this.svgWidth() - this.padding().right
  );

  protected readonly chartHeight = computed(
    () => this.height() - this.padding().bottom
  );

  protected readonly maxValue = computed(() => {
    const d = this.data();
    const cats = this.categories();
    let max = 0;
    for (const point of d) {
      for (const cat of cats) {
        const v = Number(point[cat] ?? 0);
        if (v > max) max = v;
      }
    }
    // Add 15% headroom and round up to the nearest 10
    return max > 0 ? Math.ceil((max * 1.15) / 10) * 10 : 100;
  });

  protected readonly yTicks = computed(() => {
    const max = this.maxValue();
    const p = this.padding();
    const h = this.chartHeight() - p.top;
    const count = 5;
    const step = max / count;
    const ticks: { value: number; y: number; label: string }[] = [];
    for (let i = 0; i <= count; i++) {
      const value = Math.round(step * i);
      const y = this.chartHeight() - (i / count) * h;
      ticks.push({ value, y, label: this.formatNumber(value) });
    }
    return ticks;
  });

  protected readonly xLabels = computed(() => {
    const d = this.data();
    const idx = this.index();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    const groupWidth = w / d.length;
    return d.map((point, i) => ({
      text: String(point[idx] ?? ''),
      x: p.left + groupWidth * i + groupWidth / 2,
    }));
  });

  protected readonly bars = computed(() => {
    const d = this.data();
    const cats = this.categories();
    const idx = this.index();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    const h = this.chartHeight() - p.top;
    const max = this.maxValue();
    const clrs = this.getColors();
    const groupWidth = w / d.length;
    const barWidth = Math.min(
      (groupWidth * 0.7) / cats.length,
      40
    );
    const groupPadding = (groupWidth - barWidth * cats.length) / 2;

    const result: {
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      dataIndex: number;
      category: string;
      value: number;
      label: string;
    }[] = [];

    for (let di = 0; di < d.length; di++) {
      for (let ci = 0; ci < cats.length; ci++) {
        const val = Number(d[di][cats[ci]] ?? 0);
        const barH = (val / max) * h;
        result.push({
          id: `${di}-${ci}`,
          x: p.left + groupWidth * di + groupPadding + barWidth * ci,
          y: this.chartHeight() - barH,
          width: barWidth,
          height: barH,
          color: clrs[ci],
          dataIndex: di,
          category: cats[ci],
          value: val,
          label: String(d[di][idx] ?? ''),
        });
      }
    }
    return result;
  });

  private getColors(): string[] {
    const clrs = this.colors();
    const cfg = this.config();
    const cats = this.categories();
    const defaults = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ];
    return cats.map((cat, i) => {
      if (cfg[cat]?.color) return cfg[cat].color!;
      return clrs[i] ?? defaults[i] ?? defaults[0];
    });
  }

  private formatNumber(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return String(n);
  }

  onBarHover(
    bar: { x: number; y: number; width: number; dataIndex: number; label: string; category: string; value: number; color: string },
    event: MouseEvent
  ): void {
    this.hoveredIndex.set(bar.dataIndex);
    const svgRect = this.svgEl()?.nativeElement.getBoundingClientRect();
    if (!svgRect) return;
    const cats = this.categories();
    const d = this.data();
    const clrs = this.getColors();
    const cfg = this.config();

    const entries = cats.map((cat, i) => ({
      name: cfg[cat]?.label ?? cat,
      color: clrs[i],
      value: d[bar.dataIndex][cat] as number,
    }));

    const scaleX = svgRect.width / this.svgWidth();
    const scaleY = svgRect.height / this.height();
    this.tooltip.set({
      x: (bar.x + bar.width / 2) * scaleX,
      y: bar.y * scaleY - 8,
      label: bar.label,
      entries,
    });
  }

  onMouseLeave(): void {
    this.hoveredIndex.set(null);
    this.tooltip.set(null);
  }
}

// ============================================================
// KLineChart — SVG line chart
// ============================================================

@Component({
  selector: 'k-line-chart',
  template: `
    <div class="relative w-full" [class]="class()">
      <svg
        #svgEl
        [attr.viewBox]="viewBox()"
        class="w-full overflow-visible"
        preserveAspectRatio="none"
        (mouseleave)="onMouseLeave()"
        (mousemove)="onMouseMove($event)"
      >
        <!-- Y-axis grid lines -->
        @for (tick of yTicks(); track tick.value) {
          <line
            [attr.x1]="padding().left"
            [attr.y1]="tick.y"
            [attr.x2]="chartWidth()"
            [attr.y2]="tick.y"
            class="stroke-border/50"
            stroke-dasharray="4 4"
          />
          <text
            [attr.x]="padding().left - 8"
            [attr.y]="tick.y + 4"
            text-anchor="end"
            class="fill-muted-foreground text-[11px]"
          >{{ tick.label }}</text>
        }

        <!-- X-axis labels -->
        @for (label of xLabels(); track label.text) {
          <text
            [attr.x]="label.x"
            [attr.y]="chartHeight() + 18"
            text-anchor="middle"
            class="fill-muted-foreground text-[11px]"
          >{{ label.text }}</text>
        }

        <!-- Lines -->
        @for (line of lines(); track line.category) {
          <polyline
            [attr.points]="line.points"
            [attr.stroke]="line.color"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <!-- Dots -->
          @for (dot of line.dots; track dot.i) {
            <circle
              [attr.cx]="dot.x"
              [attr.cy]="dot.y"
              r="4"
              [attr.fill]="line.color"
              class="stroke-background"
              stroke-width="2"
              [class.opacity-0]="hoveredIndex() !== null && hoveredIndex() !== dot.i"
              [class.opacity-100]="hoveredIndex() === dot.i"
              [class.opacity-0]="hoveredIndex() === null"
            />
          }
        }

        <!-- Hover line -->
        @if (hoveredIndex() !== null) {
          <line
            [attr.x1]="hoverX()"
            [attr.y1]="padding().top"
            [attr.x2]="hoverX()"
            [attr.y2]="chartHeight()"
            class="stroke-border"
            stroke-dasharray="4 4"
          />
        }

        <!-- Invisible hit areas for hover detection -->
        @for (label of xLabels(); track label.text; let i = $index) {
          <rect
            [attr.x]="label.x - hitWidth() / 2"
            [attr.y]="padding().top"
            [attr.width]="hitWidth()"
            [attr.height]="chartHeight() - padding().top"
            fill="transparent"
            class="cursor-pointer"
            (mouseenter)="onHitEnter(i, $event)"
          />
        }

        <!-- Baseline -->
        <line
          [attr.x1]="padding().left"
          [attr.y1]="chartHeight()"
          [attr.x2]="chartWidth()"
          [attr.y2]="chartHeight()"
          class="stroke-border"
        />
      </svg>

      <!-- Tooltip -->
      @if (tooltip()) {
        <div
          class="absolute pointer-events-none z-10 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xl"
          [style.left.px]="tooltip()!.x"
          [style.top.px]="tooltip()!.y"
          [style.transform]="'translate(-50%, -100%)'"
        >
          <p class="font-medium text-foreground">{{ tooltip()!.label }}</p>
          @for (entry of tooltip()!.entries; track entry.name) {
            <div class="flex items-center gap-2 mt-0.5">
              <div class="h-2.5 w-2.5 rounded-full" [style.background-color]="entry.color"></div>
              <span class="text-muted-foreground">{{ entry.name }}:</span>
              <span class="font-medium text-foreground ml-auto pl-2">{{ entry.value }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KLineChart implements AfterViewInit, OnDestroy {
  readonly class = input<string>('');
  readonly data = input.required<ChartDataPoint[]>();
  readonly index = input<string>('name');
  readonly categories = input<string[]>([]);
  readonly colors = input<string[]>([]);
  readonly height = input<number>(300);
  readonly config = input<ChartConfig>({});
  readonly curved = input<boolean>(false);

  private readonly svgEl = viewChild<ElementRef<SVGElement>>('svgEl');
  private readonly cdr = inject(ChangeDetectorRef);
  readonly hoveredIndex = signal<number | null>(null);
  readonly hoverX = signal<number>(0);
  readonly tooltip = signal<{
    x: number;
    y: number;
    label: string;
    entries: { name: string; color: string; value: string | number }[];
  } | null>(null);

  protected readonly padding = computed(() => ({
    top: 12,
    right: 12,
    bottom: 28,
    left: 48,
  }));

  protected readonly svgWidth = signal(500);
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    const el = this.svgEl()?.nativeElement;
    if (!el || !el.parentElement) return;
    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        this.svgWidth.set(entries[0].contentRect.width || 500);
      }
    });
    this.resizeObserver.observe(el.parentElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  protected readonly viewBox = computed(
    () => `0 0 ${this.svgWidth()} ${this.height()}`
  );

  protected readonly chartWidth = computed(
    () => this.svgWidth() - this.padding().right
  );

  protected readonly chartHeight = computed(
    () => this.height() - this.padding().bottom
  );

  protected readonly maxValue = computed(() => {
    const d = this.data();
    const cats = this.categories();
    let max = 0;
    for (const point of d) {
      for (const cat of cats) {
        const v = Number(point[cat] ?? 0);
        if (v > max) max = v;
      }
    }
    // Add 15% headroom and round up to the nearest 10
    return max > 0 ? Math.ceil((max * 1.15) / 10) * 10 : 100;
  });

  protected readonly yTicks = computed(() => {
    const max = this.maxValue();
    const p = this.padding();
    const h = this.chartHeight() - p.top;
    const count = 5;
    const step = max / count;
    const ticks: { value: number; y: number; label: string }[] = [];
    for (let i = 0; i <= count; i++) {
      const value = Math.round(step * i);
      const y = this.chartHeight() - (i / count) * h;
      ticks.push({ value, y, label: this.formatNumber(value) });
    }
    return ticks;
  });

  protected readonly xLabels = computed(() => {
    const d = this.data();
    const idx = this.index();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    const step = d.length > 1 ? w / (d.length - 1) : 0;
    return d.map((point, i) => ({
      text: String(point[idx] ?? ''),
      x: p.left + step * i,
    }));
  });

  protected readonly hitWidth = computed(() => {
    const d = this.data();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    return d.length > 1 ? w / (d.length - 1) : w;
  });

  protected readonly lines = computed(() => {
    const d = this.data();
    const cats = this.categories();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    const h = this.chartHeight() - p.top;
    const max = this.maxValue();
    const clrs = this.getColors();
    const step = d.length > 1 ? w / (d.length - 1) : 0;

    return cats.map((cat, ci) => {
      const dots = d.map((point, i) => {
        const val = Number(point[cat] ?? 0);
        return {
          i,
          x: p.left + step * i,
          y: this.chartHeight() - (val / max) * h,
          value: val,
        };
      });
      const points = dots.map((d) => `${d.x},${d.y}`).join(' ');
      return {
        category: cat,
        color: clrs[ci],
        dots,
        points,
      };
    });
  });

  private getColors(): string[] {
    const clrs = this.colors();
    const cfg = this.config();
    const cats = this.categories();
    const defaults = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ];
    return cats.map((cat, i) => {
      if (cfg[cat]?.color) return cfg[cat].color!;
      return clrs[i] ?? defaults[i] ?? defaults[0];
    });
  }

  private formatNumber(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return String(n);
  }

  onHitEnter(i: number, event: MouseEvent): void {
    this.hoveredIndex.set(i);
    const labels = this.xLabels();
    this.hoverX.set(labels[i]?.x ?? 0);

    const svgRect = this.svgEl()?.nativeElement.getBoundingClientRect();
    if (!svgRect) return;

    const cats = this.categories();
    const d = this.data();
    const clrs = this.getColors();
    const cfg = this.config();
    const idx = this.index();

    const entries = cats.map((cat, ci) => ({
      name: cfg[cat]?.label ?? cat,
      color: clrs[ci],
      value: d[i][cat] as number,
    }));

    const scaleX = svgRect.width / this.svgWidth();
    const lines = this.lines();
    const minY = Math.min(...lines.map((l) => l.dots[i]?.y ?? 0));
    const scaleY = svgRect.height / this.height();

    this.tooltip.set({
      x: labels[i].x * scaleX,
      y: minY * scaleY - 8,
      label: String(d[i][idx] ?? ''),
      entries,
    });
  }

  onMouseMove(event: MouseEvent): void {
    // Handled by hit areas
  }

  onMouseLeave(): void {
    this.hoveredIndex.set(null);
    this.tooltip.set(null);
  }
}

// ============================================================
// KAreaChart — SVG area chart (line chart with filled area)
// ============================================================

@Component({
  selector: 'k-area-chart',
  template: `
    <div class="relative w-full" [class]="class()">
      <svg
        #svgEl
        [attr.viewBox]="viewBox()"
        class="w-full overflow-visible"
        preserveAspectRatio="none"
        (mouseleave)="onMouseLeave()"
      >
        <defs>
          @for (area of areas(); track area.category) {
            <linearGradient [attr.id]="'gradient-' + area.category" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" [attr.stop-color]="area.color" stop-opacity="0.3" />
              <stop offset="100%" [attr.stop-color]="area.color" stop-opacity="0.02" />
            </linearGradient>
          }
        </defs>

        <!-- Y-axis grid lines -->
        @for (tick of yTicks(); track tick.value) {
          <line
            [attr.x1]="padding().left"
            [attr.y1]="tick.y"
            [attr.x2]="chartWidth()"
            [attr.y2]="tick.y"
            class="stroke-border/50"
            stroke-dasharray="4 4"
          />
          <text
            [attr.x]="padding().left - 8"
            [attr.y]="tick.y + 4"
            text-anchor="end"
            class="fill-muted-foreground text-[11px]"
          >{{ tick.label }}</text>
        }

        <!-- X-axis labels -->
        @for (label of xLabels(); track label.text) {
          <text
            [attr.x]="label.x"
            [attr.y]="chartHeight() + 18"
            text-anchor="middle"
            class="fill-muted-foreground text-[11px]"
          >{{ label.text }}</text>
        }

        <!-- Areas + Lines -->
        @for (area of areas(); track area.category) {
          <!-- Filled area -->
          <polygon
            [attr.points]="area.areaPoints"
            [attr.fill]="'url(#gradient-' + area.category + ')'"
          />
          <!-- Line -->
          <polyline
            [attr.points]="area.linePoints"
            [attr.stroke]="area.color"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        }

        <!-- Hover line -->
        @if (hoveredIndex() !== null) {
          <line
            [attr.x1]="hoverX()"
            [attr.y1]="padding().top"
            [attr.x2]="hoverX()"
            [attr.y2]="chartHeight()"
            class="stroke-border"
            stroke-dasharray="4 4"
          />
          <!-- Dots on hover -->
          @for (area of areas(); track area.category) {
            <circle
              [attr.cx]="area.dots[hoveredIndex()!].x"
              [attr.cy]="area.dots[hoveredIndex()!].y"
              r="4"
              [attr.fill]="area.color"
              class="stroke-background"
              stroke-width="2"
            />
          }
        }

        <!-- Invisible hit areas -->
        @for (label of xLabels(); track label.text; let i = $index) {
          <rect
            [attr.x]="label.x - hitWidth() / 2"
            [attr.y]="padding().top"
            [attr.width]="hitWidth()"
            [attr.height]="chartHeight() - padding().top"
            fill="transparent"
            class="cursor-pointer"
            (mouseenter)="onHitEnter(i)"
          />
        }

        <!-- Baseline -->
        <line
          [attr.x1]="padding().left"
          [attr.y1]="chartHeight()"
          [attr.x2]="chartWidth()"
          [attr.y2]="chartHeight()"
          class="stroke-border"
        />
      </svg>

      <!-- Tooltip -->
      @if (tooltip()) {
        <div
          class="absolute pointer-events-none z-10 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xl"
          [style.left.px]="tooltip()!.x"
          [style.top.px]="tooltip()!.y"
          [style.transform]="'translate(-50%, -100%)'"
        >
          <p class="font-medium text-foreground">{{ tooltip()!.label }}</p>
          @for (entry of tooltip()!.entries; track entry.name) {
            <div class="flex items-center gap-2 mt-0.5">
              <div class="h-2.5 w-2.5 rounded-full" [style.background-color]="entry.color"></div>
              <span class="text-muted-foreground">{{ entry.name }}:</span>
              <span class="font-medium text-foreground ml-auto pl-2">{{ entry.value }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAreaChart implements AfterViewInit, OnDestroy {
  readonly class = input<string>('');
  readonly data = input.required<ChartDataPoint[]>();
  readonly index = input<string>('name');
  readonly categories = input<string[]>([]);
  readonly colors = input<string[]>([]);
  readonly height = input<number>(300);
  readonly config = input<ChartConfig>({});

  private readonly svgEl = viewChild<ElementRef<SVGElement>>('svgEl');
  readonly hoveredIndex = signal<number | null>(null);
  readonly hoverX = signal<number>(0);
  readonly tooltip = signal<{
    x: number;
    y: number;
    label: string;
    entries: { name: string; color: string; value: string | number }[];
  } | null>(null);

  protected readonly padding = computed(() => ({
    top: 12,
    right: 12,
    bottom: 28,
    left: 48,
  }));

  protected readonly svgWidth = signal(500);
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    const el = this.svgEl()?.nativeElement;
    if (!el || !el.parentElement) return;
    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        this.svgWidth.set(entries[0].contentRect.width || 500);
      }
    });
    this.resizeObserver.observe(el.parentElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  protected readonly viewBox = computed(
    () => `0 0 ${this.svgWidth()} ${this.height()}`
  );

  protected readonly chartWidth = computed(
    () => this.svgWidth() - this.padding().right
  );

  protected readonly chartHeight = computed(
    () => this.height() - this.padding().bottom
  );

  protected readonly maxValue = computed(() => {
    const d = this.data();
    const cats = this.categories();
    let max = 0;
    for (const point of d) {
      for (const cat of cats) {
        const v = Number(point[cat] ?? 0);
        if (v > max) max = v;
      }
    }
    // Add 15% headroom and round up to the nearest 10
    return max > 0 ? Math.ceil((max * 1.15) / 10) * 10 : 100;
  });

  protected readonly yTicks = computed(() => {
    const max = this.maxValue();
    const p = this.padding();
    const h = this.chartHeight() - p.top;
    const count = 5;
    const step = max / count;
    const ticks: { value: number; y: number; label: string }[] = [];
    for (let i = 0; i <= count; i++) {
      const value = Math.round(step * i);
      const y = this.chartHeight() - (i / count) * h;
      ticks.push({ value, y, label: this.formatNumber(value) });
    }
    return ticks;
  });

  protected readonly xLabels = computed(() => {
    const d = this.data();
    const idx = this.index();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    const step = d.length > 1 ? w / (d.length - 1) : 0;
    return d.map((point, i) => ({
      text: String(point[idx] ?? ''),
      x: p.left + step * i,
    }));
  });

  protected readonly hitWidth = computed(() => {
    const d = this.data();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    return d.length > 1 ? w / (d.length - 1) : w;
  });

  protected readonly areas = computed(() => {
    const d = this.data();
    const cats = this.categories();
    const p = this.padding();
    const w = this.chartWidth() - p.left;
    const h = this.chartHeight() - p.top;
    const max = this.maxValue();
    const clrs = this.getColors();
    const step = d.length > 1 ? w / (d.length - 1) : 0;

    return cats.map((cat, ci) => {
      const dots = d.map((point, i) => {
        const val = Number(point[cat] ?? 0);
        return {
          i,
          x: p.left + step * i,
          y: this.chartHeight() - (val / max) * h,
          value: val,
        };
      });
      const linePoints = dots.map((d) => `${d.x},${d.y}`).join(' ');
      // Close the polygon at baseline
      const areaPoints =
        linePoints +
        ` ${dots[dots.length - 1].x},${this.chartHeight()} ${dots[0].x},${this.chartHeight()}`;
      return {
        category: cat,
        color: clrs[ci],
        dots,
        linePoints,
        areaPoints,
      };
    });
  });

  private getColors(): string[] {
    const clrs = this.colors();
    const cfg = this.config();
    const cats = this.categories();
    const defaults = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ];
    return cats.map((cat, i) => {
      if (cfg[cat]?.color) return cfg[cat].color!;
      return clrs[i] ?? defaults[i] ?? defaults[0];
    });
  }

  private formatNumber(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return String(n);
  }

  onHitEnter(i: number): void {
    this.hoveredIndex.set(i);
    const labels = this.xLabels();
    this.hoverX.set(labels[i]?.x ?? 0);

    const svgRect = this.svgEl()?.nativeElement.getBoundingClientRect();
    if (!svgRect) return;

    const cats = this.categories();
    const d = this.data();
    const clrs = this.getColors();
    const cfg = this.config();
    const idx = this.index();

    const entries = cats.map((cat, ci) => ({
      name: cfg[cat]?.label ?? cat,
      color: clrs[ci],
      value: d[i][cat] as number,
    }));

    const scaleX = svgRect.width / this.svgWidth();
    const areas = this.areas();
    const minY = Math.min(...areas.map((a) => a.dots[i]?.y ?? 0));
    const scaleY = svgRect.height / this.height();

    this.tooltip.set({
      x: labels[i].x * scaleX,
      y: minY * scaleY - 8,
      label: String(d[i][idx] ?? ''),
      entries,
    });
  }

  onMouseLeave(): void {
    this.hoveredIndex.set(null);
    this.tooltip.set(null);
  }
}

// ============================================================
// KPieChart — SVG pie/donut chart
// ============================================================

@Component({
  selector: 'k-pie-chart',
  template: `
    <div class="relative w-full flex items-center justify-center" [class]="class()">
      <svg
        [attr.viewBox]="viewBox()"
        [attr.width]="size()"
        [attr.height]="size()"
        class="overflow-visible"
        (mouseleave)="onMouseLeave()"
      >
        @for (slice of slices(); track slice.id) {
          <path
            [attr.d]="slice.path"
            [attr.fill]="slice.color"
            class="transition-opacity duration-200 cursor-pointer"
            [class.opacity-50]="hoveredId() !== null && hoveredId() !== slice.id"
            [attr.stroke]="'hsl(var(--background))'"
            stroke-width="2"
            (mouseenter)="onSliceHover(slice, $event)"
          />
        }

        <!-- Center label for donut -->
        @if (donut()) {
          <text
            [attr.x]="center()"
            [attr.y]="center() - 6"
            text-anchor="middle"
            class="fill-foreground text-2xl font-bold"
          >{{ totalFormatted() }}</text>
          <text
            [attr.x]="center()"
            [attr.y]="center() + 14"
            text-anchor="middle"
            class="fill-muted-foreground text-[12px]"
          >{{ centerLabel() }}</text>
        }
      </svg>

      <!-- Tooltip -->
      @if (tooltip()) {
        <div
          class="absolute pointer-events-none z-10 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xl"
          [style.left.px]="tooltip()!.x"
          [style.top.px]="tooltip()!.y"
          [style.transform]="'translate(-50%, -100%)'"
        >
          <div class="flex items-center gap-2">
            <div class="h-2.5 w-2.5 rounded-sm" [style.background-color]="tooltip()!.color"></div>
            <span class="text-muted-foreground">{{ tooltip()!.label }}:</span>
            <span class="font-medium text-foreground ml-auto pl-2">{{ tooltip()!.value }}</span>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KPieChart {
  readonly class = input<string>('');
  readonly data = input.required<ChartDataPoint[]>();
  readonly nameKey = input<string>('name');
  readonly valueKey = input<string>('value');
  readonly colors = input<string[]>([]);
  readonly size = input<number>(260);
  readonly donut = input<boolean>(true);
  readonly centerLabel = input<string>('Total');
  readonly config = input<ChartConfig>({});

  readonly hoveredId = signal<string | null>(null);
  readonly tooltip = signal<{
    x: number;
    y: number;
    label: string;
    value: number;
    color: string;
  } | null>(null);

  protected readonly center = computed(() => this.size() / 2);
  protected readonly radius = computed(() => this.size() / 2 - 4);
  protected readonly innerRadius = computed(() =>
    this.donut() ? this.radius() * 0.6 : 0
  );

  protected readonly viewBox = computed(
    () => `0 0 ${this.size()} ${this.size()}`
  );

  protected readonly total = computed(() => {
    const d = this.data();
    const vk = this.valueKey();
    return d.reduce((sum, item) => sum + Number(item[vk] ?? 0), 0);
  });

  protected readonly totalFormatted = computed(() => {
    const t = this.total();
    if (t >= 1000) return (t / 1000).toFixed(1) + 'k';
    return String(t);
  });

  protected readonly slices = computed(() => {
    const d = this.data();
    const nk = this.nameKey();
    const vk = this.valueKey();
    const total = this.total();
    const cx = this.center();
    const cy = this.center();
    const r = this.radius();
    const ir = this.innerRadius();
    const clrs = this.getColors();

    if (total === 0) return [];

    let currentAngle = -Math.PI / 2;
    return d.map((item, i) => {
      const value = Number(item[vk] ?? 0);
      const angle = (value / total) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);

      const ix1 = cx + ir * Math.cos(startAngle);
      const iy1 = cy + ir * Math.sin(startAngle);
      const ix2 = cx + ir * Math.cos(endAngle);
      const iy2 = cy + ir * Math.sin(endAngle);

      const largeArc = angle > Math.PI ? 1 : 0;

      let path: string;
      if (ir > 0) {
        // Donut
        path = [
          `M ${x1} ${y1}`,
          `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
          `L ${ix2} ${iy2}`,
          `A ${ir} ${ir} 0 ${largeArc} 0 ${ix1} ${iy1}`,
          'Z',
        ].join(' ');
      } else {
        // Pie
        path = [
          `M ${cx} ${cy}`,
          `L ${x1} ${y1}`,
          `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
          'Z',
        ].join(' ');
      }

      // Midpoint for tooltip positioning
      const midAngle = startAngle + angle / 2;
      const midR = (r + ir) / 2;

      return {
        id: String(item[nk] ?? i),
        name: String(item[nk] ?? ''),
        value,
        path,
        color: clrs[i],
        midX: cx + midR * Math.cos(midAngle),
        midY: cy + midR * Math.sin(midAngle),
      };
    });
  });

  private getColors(): string[] {
    const clrs = this.colors();
    const cfg = this.config();
    const d = this.data();
    const nk = this.nameKey();
    const defaults = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ];
    return d.map((item, i) => {
      const key = String(item[nk] ?? '');
      if (cfg[key]?.color) return cfg[key].color!;
      return clrs[i] ?? defaults[i % defaults.length];
    });
  }

  onSliceHover(
    slice: { id: string; name: string; value: number; color: string; midX: number; midY: number },
    event: MouseEvent
  ): void {
    this.hoveredId.set(slice.id);
    const el = event.target as SVGElement;
    const svg = el.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = rect.width / this.size();
    const scaleY = rect.height / this.size();
    this.tooltip.set({
      x: slice.midX * scaleX,
      y: slice.midY * scaleY - 12,
      label: slice.name,
      value: slice.value,
      color: slice.color,
    });
  }

  onMouseLeave(): void {
    this.hoveredId.set(null);
    this.tooltip.set(null);
  }
}
