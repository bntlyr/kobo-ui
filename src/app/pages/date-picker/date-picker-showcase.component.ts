import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KDatePicker } from '../../components/ui/date-picker';
import { CalendarValue } from '../../components/ui/calendar/calendar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KDatePicker, FormsModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Date Picker</h1>
        <p class="text-muted-foreground mt-2">A date picker component with range and time support.</p>
      </div>

      <k-tabs value="preview">
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
              <label class="text-sm font-medium">Date & Time Range Picker</label>
              <k-date-picker [(value)]="dateTimeRange" mode="range" [showTime]="true" placeholder="Pick date and time range"></k-date-picker>
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
}
