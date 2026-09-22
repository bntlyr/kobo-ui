import { ChangeDetectionStrategy, Component, computed, input, model, ViewChild, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { KPopoverTrigger, KPopoverContent } from '../popover/popover.component';
import { KCommand, KCommandInput, KCommandList, KCommandEmpty, KCommandGroup, KCommandItem } from '../command/command.component';

export interface KComboboxItem {
  value: string;
  label: string;
}

@Component({
  selector: 'k-combobox',
  imports: [KPopoverTrigger, KPopoverContent, KCommand, KCommandInput, KCommandList, KCommandEmpty, KCommandGroup, KCommandItem],
  template: `
    <button [kPopoverTrigger]="content" [class]="classes()" role="combobox" [attr.aria-expanded]="trigger?.isOpen() || false">
      {{ displayValue() }}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4 shrink-0 opacity-50"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </button>
    <ng-template #content>
      <k-popover-content class="w-[200px] p-0">
        <k-command [(value)]="searchTerm">
          <k-command-input [placeholder]="searchPlaceholder()" />
          <k-command-list>
            @if (filteredItems().length === 0) {
              <k-command-empty>{{ emptyText() }}</k-command-empty>
            }
            <k-command-group>
              @for (item of filteredItems(); track item.value) {
                <button k-command-item (click)="selectItem(item.value)" [class.aria-selected]="item.value === value()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="checkClass(item.value)"><path d="M20 6 9 17l-5-5"/></svg>
                  {{ item.label }}
                </button>
              }
            </k-command-group>
          </k-command-list>
        </k-command>
      </k-popover-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCombobox {
  readonly class = input<string>('');
  readonly placeholder = input<string>('Select framework...');
  readonly searchPlaceholder = input<string>('Search framework...');
  readonly emptyText = input<string>('No framework found.');
  readonly items = input<KComboboxItem[]>([]);
  
  readonly value = model<string>('');
  
  @ViewChild(KPopoverTrigger) trigger?: KPopoverTrigger;
  protected readonly searchTerm = model<string>('');

  protected readonly classes = computed(() => cn(
    'flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    this.class()
  ));

  protected readonly displayValue = computed(() => {
    const val = this.value();
    const item = this.items().find(i => i.value === val);
    return item ? item.label : this.placeholder();
  });

  protected readonly filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.items().filter(i => i.label.toLowerCase().includes(term));
  });

  selectItem(val: string): void {
    this.value.set(val === this.value() ? '' : val);
    if (this.trigger) this.trigger.close();
  }

  checkClass(val: string): string {
    return cn('mr-2 h-4 w-4', this.value() === val ? 'opacity-100' : 'opacity-0');
  }
}
