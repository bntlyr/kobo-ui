import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { KTabs, KTabList, KTabTrigger } from '../components/ui/tabs';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <k-tabs [value]="active()" (valueChange)="active.set($event)" variant="line">
      <k-tab-list>
        @for (tab of tabs(); track tab.id) {
          <k-tab-trigger [value]="tab.id">{{ tab.label }}</k-tab-trigger>
        }
      </k-tab-list>
      
      <div class="mt-4">
        <ng-content />
      </div>
    </k-tabs>
  `,
})
export class TabsComponent {
  readonly tabs   = input.required<Tab[]>();
  readonly active = model<string>('');
}
