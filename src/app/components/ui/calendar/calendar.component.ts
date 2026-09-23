import { ChangeDetectionStrategy, Component, computed, input, model, signal, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

export type CalendarValue = Date | { start: Date; end: Date | null } | null;

@Component({
  selector: 'k-calendar',
  template: `
    <div [class]="classes()">
      <!-- Header -->
      <div class="flex items-center justify-between pt-1 relative">
        <button
          type="button"
          (click)="prev()"
          class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div class="text-sm font-medium">{{ currentHeaderLabel() }}</div>
        <button
          type="button"
          (click)="next()"
          class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border border-input hover:bg-accent hover:text-accent-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Date Grid -->
      @if (type() === 'date') {
        <table class="w-full border-collapse space-y-1 mt-4">
        <thead>
          <tr class="flex">
            @for (day of weekDays; track day) {
              <th class="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]">{{ day }}</th>
            }
          </tr>
        </thead>
        <tbody class="grid gap-1 mt-2">
          @for (week of weeks(); track $index) {
            <tr class="flex w-full mt-2">
              @for (date of week; track date?.getTime()) {
                <td class="h-9 w-9 p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20">
                  @if (date) {
                    <button
                      type="button"
                      (click)="selectDate(date)"
                      [class]="dayClasses(date)"
                      [attr.aria-selected]="isSelected(date) || isInRange(date) ? 'true' : null"
                    >
                      {{ date.getDate() }}
                    </button>
                  }
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
      }

      <!-- Month Grid -->
      @if (type() === 'month') {
        <div class="grid grid-cols-3 gap-2 mt-4">
          @for (m of shortMonths; track $index) {
            <button
              type="button"
              (click)="selectMonth($index)"
              [class]="monthYearClasses($index, 'month')"
            >
              {{ m }}
            </button>
          }
        </div>
      }

      <!-- Year Grid -->
      @if (type() === 'year') {
        <div class="grid grid-cols-3 gap-2 mt-4">
          @for (y of displayedYears(); track y) {
            <button
              type="button"
              (click)="selectYear(y)"
              [class]="monthYearClasses(y, 'year')"
            >
              {{ y }}
            </button>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCalendar {
  readonly class = input<string>('');
  readonly mode = input<'single' | 'range'>('single');
  readonly type = input<'date' | 'month' | 'year'>('date');
  readonly value = model<CalendarValue>(null);

  protected readonly classes = computed(() => cn('p-3', this.class()));
  
  protected readonly viewDate = signal(new Date());

  protected readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  protected readonly shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  protected readonly currentHeaderLabel = computed(() => {
    const t = this.type();
    if (t === 'date') return this.viewDate().toLocaleString('default', { month: 'long', year: 'numeric' });
    if (t === 'month') return this.viewDate().getFullYear().toString();
    if (t === 'year') {
      const startYear = Math.floor(this.viewDate().getFullYear() / 12) * 12;
      return `${startYear} - ${startYear + 11}`;
    }
    return '';
  });

  protected readonly weeks = computed(() => {
    const d = this.viewDate();
    const year = d.getFullYear();
    const month = d.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = Array(firstDay.getDay()).fill(null);
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      currentWeek.push(new Date(year, month, i));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  });

  protected readonly displayedYears = computed(() => {
    const startYear = Math.floor(this.viewDate().getFullYear() / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  });

  prev(): void {
    const d = this.viewDate();
    if (this.type() === 'date') this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    if (this.type() === 'month') this.viewDate.set(new Date(d.getFullYear() - 1, d.getMonth(), 1));
    if (this.type() === 'year') this.viewDate.set(new Date(d.getFullYear() - 12, d.getMonth(), 1));
  }

  next(): void {
    const d = this.viewDate();
    if (this.type() === 'date') this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    if (this.type() === 'month') this.viewDate.set(new Date(d.getFullYear() + 1, d.getMonth(), 1));
    if (this.type() === 'year') this.viewDate.set(new Date(d.getFullYear() + 12, d.getMonth(), 1));
  }

  selectDate(d: Date): void {
    if (this.mode() === 'single') {
      this.value.set(d);
    } else {
      const current = this.value() as { start: Date; end: Date | null } | null;
      if (!current || (current.start && current.end)) {
        this.value.set({ start: d, end: null });
      } else if (current.start && !current.end) {
        if (d < current.start) {
          this.value.set({ start: d, end: null });
        } else {
          this.value.set({ start: current.start, end: d });
        }
      }
    }
  }

  selectMonth(month: number): void {
    const val = this.value();
    const current = (val instanceof Date) ? val : new Date();
    const d = new Date(this.viewDate().getFullYear(), month, current.getDate());
    this.selectDate(d);
  }

  selectYear(year: number): void {
    const val = this.value();
    const current = (val instanceof Date) ? val : new Date();
    const d = new Date(year, current.getMonth(), current.getDate());
    this.selectDate(d);
  }

  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getDate() === d2.getDate();
  }

  isSelected(d: Date): boolean {
    const val = this.value();
    if (!val) return false;
    
    if (this.mode() === 'single') {
      return this.isSameDay(d, val as Date);
    } else {
      const range = val as { start: Date; end: Date | null };
      if (range.start && this.isSameDay(d, range.start)) return true;
      if (range.end && this.isSameDay(d, range.end)) return true;
      return false;
    }
  }

  isInRange(d: Date): boolean {
    if (this.mode() !== 'range') return false;
    const val = this.value() as { start: Date; end: Date | null } | null;
    if (!val || !val.start || !val.end) return false;
    
    const dTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const startTime = new Date(val.start.getFullYear(), val.start.getMonth(), val.start.getDate()).getTime();
    const endTime = new Date(val.end.getFullYear(), val.end.getMonth(), val.end.getDate()).getTime();
    
    return dTime > startTime && dTime < endTime;
  }

  isToday(d: Date): boolean {
    return this.isSameDay(d, new Date());
  }

  dayClasses(d: Date): string {
    const selected = this.isSelected(d);
    const inRange = this.isInRange(d);
    const today = this.isToday(d);
    
    return cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
      selected ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground' 
      : inRange ? 'bg-accent/50 text-accent-foreground' 
      : 'hover:bg-accent hover:text-accent-foreground',
      today && !selected && !inRange ? 'bg-accent text-accent-foreground' : ''
    );
  }

  monthYearClasses(val: number, type: 'month' | 'year'): string {
    const currentVal = this.value();
    const d = currentVal instanceof Date ? currentVal : new Date();
    
    let isSelected = false;
    let isToday = false;

    if (currentVal) {
      if (type === 'month') {
        isSelected = d.getMonth() === val && d.getFullYear() === this.viewDate().getFullYear();
      } else {
        isSelected = d.getFullYear() === val;
      }
    }

    const todayDate = new Date();
    if (type === 'month') {
      isToday = todayDate.getMonth() === val && todayDate.getFullYear() === this.viewDate().getFullYear();
    } else {
      isToday = todayDate.getFullYear() === val;
    }
    
    return cn(
      'inline-flex h-9 w-full items-center justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      isSelected ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground' 
      : 'hover:bg-accent hover:text-accent-foreground',
      isToday && !isSelected ? 'bg-accent text-accent-foreground' : ''
    );
  }
}

