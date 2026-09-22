import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { cn } from '../core/utils/cn';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Tab List -->
    <div class="flex items-center border-b border-border gap-1" role="tablist">
      @for (tab of tabs(); track tab.id) {
        <button
          role="tab"
          [id]="'tab-' + tab.id"
          [attr.aria-selected]="active() === tab.id"
          [attr.aria-controls]="'panel-' + tab.id"
          (click)="active.set(tab.id)"
          class="relative px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer
                 border-0 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-md"
          [class]="tabClass(tab.id)"
        >
          {{ tab.label }}
        </button>
      }
    </div>

    <!-- Tab Panel -->
    <div
      [id]="'panel-' + active()"
      [attr.aria-labelledby]="'tab-' + active()"
      role="tabpanel"
      class="mt-0"
    >
      <ng-content />
    </div>
  `,
})
export class TabsComponent {
  readonly tabs   = input.required<Tab[]>();
  readonly active = model<string>('');

  tabClass(id: string): string {
    return cn(
      id === this.active()
        ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[\'\']'
        : 'text-muted-foreground hover:text-foreground'
    );
  }
}
