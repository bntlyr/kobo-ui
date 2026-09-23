import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KDatePicker } from '../../components/ui/date-picker';
import { CalendarValue } from '../../components/ui/calendar/calendar.component';
import { KTimePicker, KTimeRangePicker, TimeValue, TimeRangeValue } from '../../components/ui/time-picker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KDatePicker, KTimePicker, KTimeRangePicker, FormsModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Date Picker</h1>
        <p class="text-muted-foreground mt-2">A date picker component with range, time, and standalone time picker support.</p>
      </div>

      <k-tabs value="preview" variant="line">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex flex-col gap-6 min-h-[450px] items-center justify-center rounded-md border p-10">
            
            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Standard Date Picker</label>
              <k-date-picker [(value)]="date" placeholder="Pick a date"></k-date-picker>
            </div>
            
            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Date Range Picker</label>
              <k-date-picker [(value)]="dateRange" mode="range" placeholder="Pick a date range"></k-date-picker>
            </div>

            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Date & Time Picker</label>
              <k-date-picker [(value)]="dateTime" [showTime]="true" placeholder="Pick date and time"></k-date-picker>
            </div>

            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Month Picker</label>
              <k-date-picker [(value)]="month" type="month" placeholder="Pick a month"></k-date-picker>
            </div>

            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Year Picker</label>
              <k-date-picker [(value)]="year" type="year" placeholder="Pick a year"></k-date-picker>
            </div>

            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Date & Time Range Picker</label>
              <k-date-picker [(value)]="dateTimeRange" mode="range" [showTime]="true" placeholder="Pick date and time range"></k-date-picker>
            </div>

            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Standalone Time Picker</label>
              <k-time-picker [(value)]="time" placeholder="Pick a time"></k-time-picker>
            </div>

            <div class="space-y-2 w-full max-w-sm">
              <label class="text-sm font-medium">Time Range Picker</label>
              <k-time-range-picker [(value)]="timeRange" placeholder="Pick a time range"></k-time-range-picker>
            </div>

          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;!-- Standard Date Picker --&gt;
&lt;k-date-picker [(value)]="date" placeholder="Pick a date"&gt;&lt;/k-date-picker&gt;

&lt;!-- Date Range Picker --&gt;
&lt;k-date-picker [(value)]="dateRange" mode="range" placeholder="Pick a date range"&gt;&lt;/k-date-picker&gt;

&lt;!-- Date & Time Picker --&gt;
&lt;k-date-picker [(value)]="dateTime" [showTime]="true" placeholder="Pick date and time"&gt;&lt;/k-date-picker&gt;

&lt;!-- Date & Time Range Picker --&gt;
&lt;k-date-picker [(value)]="dateTimeRange" mode="range" [showTime]="true" placeholder="Pick date and time range"&gt;&lt;/k-date-picker&gt;

&lt;!-- Month Picker --&gt;
&lt;k-date-picker [(value)]="month" type="month" placeholder="Pick a month"&gt;&lt;/k-date-picker&gt;

&lt;!-- Year Picker --&gt;
&lt;k-date-picker [(value)]="year" type="year" placeholder="Pick a year"&gt;&lt;/k-date-picker&gt;

&lt;!-- Standalone Time Picker --&gt;
&lt;k-time-picker [(value)]="time" placeholder="Pick a time"&gt;&lt;/k-time-picker&gt;

&lt;!-- Time Range Picker --&gt;
&lt;k-time-range-picker [(value)]="timeRange" placeholder="Pick a time range"&gt;&lt;/k-time-range-picker&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KDatePicker</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-date-picker</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">CalendarValue | null</td>
                    <td class="px-4 py-3 font-mono text-xs">null</td>
                    <td class="px-4 py-3 text-muted-foreground">The selected date or range.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">mode</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'single' | 'range'</td>
                    <td class="px-4 py-3 font-mono text-xs">'single'</td>
                    <td class="px-4 py-3 text-muted-foreground">Determines if picking a single date or a range of dates.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">type</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'date' | 'month' | 'year'</td>
                    <td class="px-4 py-3 font-mono text-xs">'date'</td>
                    <td class="px-4 py-3 text-muted-foreground">Determines the visual grid to show: dates, months, or years.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">showTime</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Enables time picking below the calendar.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">placeholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Pick a date'</td>
                    <td class="px-4 py-3 text-muted-foreground">The placeholder text.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KTimePicker</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-time-picker</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">TimeValue | null</td>
                    <td class="px-4 py-3 font-mono text-xs">null</td>
                    <td class="px-4 py-3 text-muted-foreground">The selected time (hours, minutes, meridian).</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">inline</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Renders inline selects without trigger (used inside date-picker).</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">placeholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Pick a time'</td>
                    <td class="px-4 py-3 text-muted-foreground">The placeholder text for the trigger button.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KTimeRangePicker</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-time-range-picker</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">TimeRangeValue | null</td>
                    <td class="px-4 py-3 font-mono text-xs">null</td>
                    <td class="px-4 py-3 text-muted-foreground">The selected time range (start and end).</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">placeholder</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Pick a time range'</td>
                    <td class="px-4 py-3 text-muted-foreground">The placeholder text for the trigger button.</td>
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
export default class DatePickerShowcaseComponent {
  readonly date = model<Date | null>(null);
  readonly dateRange = model<CalendarValue>(null);
  readonly dateTime = model<Date | null>(null);
  readonly dateTimeRange = model<CalendarValue>(null);
  readonly month = model<Date | null>(null);
  readonly year = model<Date | null>(null);
  readonly time = model<TimeValue | null>(null);
  readonly timeRange = model<TimeRangeValue | null>(null);
}
