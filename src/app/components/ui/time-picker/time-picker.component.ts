import { ChangeDetectionStrategy, Component, computed, input, model, ViewChild, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { FormsModule } from '@angular/forms';
import { KPopoverTrigger, KPopoverContent } from '../popover/popover.component';
import { KNativeSelectDirective, KNativeSelectWrapper } from '../native-select/native-select.directive';

export interface TimeValue {
  hours: number;
  minutes: number;
  meridian: 'AM' | 'PM';
}

export interface TimeRangeValue {
  start: TimeValue;
  end: TimeValue;
}

// ---- Inline time selects (used inside date-picker and as the popover body) ----

@Component({
  selector: 'k-time-picker-inline',
  imports: [FormsModule, KNativeSelectDirective, KNativeSelectWrapper],
  template: `
    <div [class]="classes()">
      @if (label()) {
        <label class="text-xs font-medium text-muted-foreground mb-1 block">{{ label() }}</label>
      }
      <div class="flex items-center gap-2">
        <k-native-select-wrapper class="w-[65px]">
          <select k-native-select class="h-9 !w-[65px] text-sm"
            [ngModel]="value()?.hours || 12"
            (ngModelChange)="updateTime($event, 'hours')"
          >
            @for (h of hoursList; track h) {
              <option [value]="h">{{ h }}</option>
            }
          </select>
        </k-native-select-wrapper>
        <span class="text-muted-foreground font-medium">:</span>
        <k-native-select-wrapper class="w-[65px]">
          <select k-native-select class="h-9 !w-[65px] text-sm"
            [ngModel]="value()?.minutes || 0"
            (ngModelChange)="updateTime($event, 'minutes')"
          >
            @for (m of minutesList; track m) {
              <option [value]="m">{{ m.toString().padStart(2, '0') }}</option>
            }
          </select>
        </k-native-select-wrapper>
        <k-native-select-wrapper class="w-[65px]">
          <select k-native-select class="h-9 !w-[65px] text-sm"
            [ngModel]="value()?.meridian || 'AM'"
            (ngModelChange)="updateTime($event, 'meridian')"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </k-native-select-wrapper>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTimePickerInline {
  readonly class = input<string>('');
  readonly label = input<string>('');
  readonly value = model<TimeValue | null>(null);

  protected readonly classes = computed(() => cn('p-3', this.class()));

  protected readonly hoursList = Array.from({ length: 12 }, (_, i) => i + 1);
  protected readonly minutesList = Array.from({ length: 60 }, (_, i) => i);

  updateTime(newVal: any, field: keyof TimeValue) {
    const current = this.value() || { hours: 12, minutes: 0, meridian: 'AM' as const };
    this.value.set({
      ...current,
      [field]: field === 'meridian' ? newVal : Number(newVal),
    });
  }
}

// ---- Standalone time picker (with trigger button + popover) ----

@Component({
  selector: 'k-time-picker',
  imports: [FormsModule, KPopoverTrigger, KPopoverContent, KTimePickerInline],
  template: `
    @if (inline()) {
      <k-time-picker-inline
        [(value)]="value"
        [label]="label()"
        [class]="inlineWrapperClass()"
      ></k-time-picker-inline>
    } @else {
      <button [kPopoverTrigger]="content" popoverAlign="start" [class]="classes()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 opacity-70"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span class="truncate">{{ formattedTime() }}</span>
      </button>
      <ng-template #content>
        <k-popover-content class="w-auto p-0">
          <k-time-picker-inline [(value)]="value"></k-time-picker-inline>
        </k-popover-content>
      </ng-template>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTimePicker {
  readonly class = input<string>('');
  readonly label = input<string>('');
  readonly placeholder = input<string>('Pick a time');
  readonly inline = input<boolean>(false);
  readonly value = model<TimeValue | null>(null);

  @ViewChild(KPopoverTrigger) trigger?: KPopoverTrigger;

  protected readonly inlineWrapperClass = computed(() => cn('border-t border-border', this.class()));

  protected readonly classes = computed(() => cn(
    'flex h-10 w-full items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm text-left font-normal ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    !this.value() && 'text-muted-foreground',
    this.class(),
  ));

  protected readonly formattedTime = computed(() => {
    const v = this.value();
    if (!v) return this.placeholder();
    const h = v.hours.toString();
    const m = v.minutes.toString().padStart(2, '0');
    return `${h}:${m} ${v.meridian}`;
  });
}

// ---- Time range picker ----

@Component({
  selector: 'k-time-range-picker',
  imports: [FormsModule, KPopoverTrigger, KPopoverContent, KTimePickerInline],
  template: `
    <button [kPopoverTrigger]="content" popoverAlign="start" [class]="classes()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 opacity-70"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span class="truncate">{{ formattedRange() }}</span>
    </button>
    <ng-template #content>
      <k-popover-content class="w-auto p-0">
        <div class="flex flex-col gap-0 divide-y divide-border">
          <k-time-picker-inline
            [(value)]="startTime"
            label="Start time"
          ></k-time-picker-inline>
          <k-time-picker-inline
            [(value)]="endTime"
            label="End time"
          ></k-time-picker-inline>
        </div>
      </k-popover-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KTimeRangePicker {
  readonly class = input<string>('');
  readonly placeholder = input<string>('Pick a time range');
  readonly value = model<TimeRangeValue | null>(null);

  @ViewChild(KPopoverTrigger) trigger?: KPopoverTrigger;

  protected readonly startTime = model<TimeValue | null>(null);
  protected readonly endTime = model<TimeValue | null>(null);

  protected readonly classes = computed(() => cn(
    'flex h-10 w-full items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm text-left font-normal ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    !this.value() && 'text-muted-foreground',
    this.class(),
  ));

  protected readonly formattedRange = computed(() => {
    const s = this.startTime();
    const e = this.endTime();
    if (!s && !e) return this.placeholder();
    const fmt = (v: TimeValue) => `${v.hours}:${v.minutes.toString().padStart(2, '0')} ${v.meridian}`;
    const startStr = s ? fmt(s) : '...';
    const endStr = e ? fmt(e) : '...';
    return `${startStr} - ${endStr}`;
  });

  ngDoCheck(): void {
    const s = this.startTime();
    const e = this.endTime();
    if (s && e) {
      const current = this.value();
      if (!current || current.start !== s || current.end !== e) {
        this.value.set({ start: s, end: e });
      }
    }
  }
}
