import { ChangeDetectionStrategy, Component, computed, input, model, ViewChild, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { KPopoverTrigger, KPopoverContent } from '../popover/popover.component';
import { KCalendar, CalendarValue } from '../calendar/calendar.component';
import { KTimePicker, TimeValue } from '../time-picker/time-picker.component';

@Component({
  selector: 'k-date-picker',
  imports: [KPopoverTrigger, KPopoverContent, KCalendar, KTimePicker],
  template: `
    <button [kPopoverTrigger]="content" [class]="classes()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 opacity-70"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
      <span class="truncate">{{ formattedDate() }}</span>
    </button>
    <ng-template #content>
      <k-popover-content class="w-auto p-0" align="start">
        <k-calendar 
          [value]="value()" 
          [mode]="mode()" 
          [type]="type()"
          (valueChange)="onDateSelect($event)">
        </k-calendar>
        @if (showTime()) {
          <k-time-picker 
            [inline]="true"
            [value]="timeValue()"
            (valueChange)="onTimeSelect($event)">
          </k-time-picker>
        }
      </k-popover-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDatePicker {
  readonly class = input<string>('');
  readonly placeholder = input<string>('Pick a date');
  readonly mode = input<'single' | 'range'>('single');
  readonly type = input<'date' | 'month' | 'year'>('date');
  readonly showTime = input<boolean>(false);
  
  readonly value = model<CalendarValue>(null);
  
  @ViewChild(KPopoverTrigger) trigger!: KPopoverTrigger;

  protected readonly classes = computed(() => cn(
    'flex h-10 w-full items-center justify-start rounded-md border border-input bg-background px-3 py-2 text-sm text-left font-normal ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    !this.value() && 'text-muted-foreground',
    this.class()
  ));

  protected readonly timeValue = computed(() => {
    const val = this.value();
    if (!val) return null;
    let targetDate: Date | undefined;
    if (this.mode() === 'single') {
      targetDate = val as Date;
    } else {
      targetDate = (val as {start: Date}).start;
    }
    if (!targetDate) return null;
    let hours = targetDate.getHours();
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return { hours, minutes: targetDate.getMinutes(), meridian } as TimeValue;
  });

  protected readonly formattedDate = computed(() => {
    const val = this.value();
    if (!val) return this.placeholder();
    
    const timeOptions: Intl.DateTimeFormatOptions = this.showTime() ? { hour: 'numeric', minute: 'numeric' } : {};
    
    if (this.mode() === 'single') {
      const d = val as Date;
      if (this.type() === 'month') return d.toLocaleDateString('default', { month: 'long', ...timeOptions });
      if (this.type() === 'year') return d.getFullYear().toString();
      return d.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric', ...timeOptions });
    } else {
      const range = val as { start: Date; end: Date | null };
      if (!range.start) return this.placeholder();
      
      let startStr = range.start.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric', ...timeOptions });
      if (this.type() === 'month') startStr = range.start.toLocaleDateString('default', { month: 'short' });
      if (this.type() === 'year') startStr = range.start.getFullYear().toString();
      
      if (!range.end) return `${startStr} - ...`;
      
      let endStr = range.end.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric', ...timeOptions });
      if (this.type() === 'month') endStr = range.end.toLocaleDateString('default', { month: 'short' });
      if (this.type() === 'year') endStr = range.end.getFullYear().toString();
      
      return `${startStr} - ${endStr}`;
    }
  });

  onDateSelect(date: CalendarValue): void {
    if (this.showTime() && date) {
      // Preserve time from previous value if available, or set to current time
      const currTime = this.timeValue() || { hours: 12, minutes: 0, meridian: 'AM' };
      
      const applyTime = (d: Date) => {
        const newD = new Date(d);
        let h = currTime.hours;
        if (currTime.meridian === 'PM' && h < 12) h += 12;
        if (currTime.meridian === 'AM' && h === 12) h = 0;
        newD.setHours(h, currTime.minutes, 0, 0);
        return newD;
      };

      if (this.mode() === 'single') {
        this.value.set(applyTime(date as Date));
      } else {
        const range = date as { start: Date; end: Date | null };
        const newRange = {
          start: applyTime(range.start),
          end: range.end ? applyTime(range.end) : null
        };
        this.value.set(newRange);
      }
    } else {
      this.value.set(date);
    }
    
    if (!this.showTime() && this.trigger) {
      if (this.mode() === 'single') {
        this.trigger.close();
      } else {
        const range = date as { start: Date; end: Date | null };
        if (range && range.start && range.end) {
          this.trigger.close();
        }
      }
    }
  }

  onTimeSelect(time: TimeValue | null): void {
    if (!time) return;
    const val = this.value();
    if (!val) return;
    
    const applyTime = (d: Date) => {
      const newD = new Date(d);
      let h = time.hours;
      if (time.meridian === 'PM' && h < 12) h += 12;
      if (time.meridian === 'AM' && h === 12) h = 0;
      newD.setHours(h, time.minutes, 0, 0);
      return newD;
    };

    if (this.mode() === 'single') {
      this.value.set(applyTime(val as Date));
    } else {
      const range = val as { start: Date; end: Date | null };
      this.value.set({
        start: applyTime(range.start),
        end: range.end ? applyTime(range.end) : null
      });
    }
  }
}
