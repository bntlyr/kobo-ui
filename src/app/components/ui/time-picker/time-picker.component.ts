import { ChangeDetectionStrategy, Component, computed, input, model, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { FormsModule } from '@angular/forms';

export interface TimeValue {
  hours: number;
  minutes: number;
  meridian: 'AM' | 'PM';
}

@Component({
  selector: 'k-time-picker',
  imports: [FormsModule],
  template: `
    <div [class]="classes()">
      <div class="flex items-center gap-2">
        <select
          class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          [ngModel]="value()?.hours || 12"
          (ngModelChange)="updateTime($event, 'hours')"
        >
          @for (h of hoursList; track h) {
            <option [value]="h">{{ h }}</option>
          }
        </select>
        <span class="text-muted-foreground font-medium">:</span>
        <select
          class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          [ngModel]="value()?.minutes || 0"
          (ngModelChange)="updateTime($event, 'minutes')"
        >
          @for (m of minutesList; track m) {
            <option [value]="m">{{ m.toString().padStart(2, '0') }}</option>
          }
        </select>
        <select
          class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          [ngModel]="value()?.meridian || 'AM'"
          (ngModelChange)="updateTime($event, 'meridian')"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTimePicker {
  readonly class = input<string>('');
  readonly value = model<TimeValue | null>(null);

  protected readonly classes = computed(() => cn('p-3 border-t border-border', this.class()));
  
  protected readonly hoursList = Array.from({ length: 12 }, (_, i) => i + 1);
  protected readonly minutesList = Array.from({ length: 60 }, (_, i) => i);

  updateTime(newVal: any, field: keyof TimeValue) {
    const current = this.value() || { hours: 12, minutes: 0, meridian: 'AM' };
    this.value.set({
      ...current,
      [field]: field === 'meridian' ? newVal : Number(newVal)
    });
  }
}
