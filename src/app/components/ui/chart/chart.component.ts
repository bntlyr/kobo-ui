import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-chart',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  styles: [`
    :host {
      --color-1: hsl(var(--primary));
      --color-2: hsl(var(--muted-foreground));
      --color-3: hsl(var(--accent));
      --color-4: hsl(var(--destructive));
      --color-5: hsl(var(--ring));
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KChart {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke="#ccc"]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke="#fff"]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke="#ccc"]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke="#ccc"]]:stroke-border [&_.recharts-sector[stroke="#fff"]]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none', this.class()));
}

@Component({
  selector: 'k-chart-tooltip',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KChartTooltip {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('rounded-lg border bg-background px-3 py-1.5 text-sm shadow-xl', this.class()));
}

@Component({
  selector: 'k-chart-legend',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KChartLegend {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex items-center justify-center gap-4 pt-3 text-sm', this.class()));
}
