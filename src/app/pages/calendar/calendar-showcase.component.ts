import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KCalendar } from '../../components/ui/calendar';

@Component({
  selector: 'app-calendar-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KCalendar],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Calendar</h1>
        <p class="text-muted-foreground mt-2">A date field component that allows users to enter and edit date.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-calendar
              mode="single"
              class="rounded-md border shadow"
            ></k-calendar>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-calendar
  mode="single"
  class="rounded-md border shadow"
&gt;&lt;/k-calendar&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalendarShowcaseComponent {}
