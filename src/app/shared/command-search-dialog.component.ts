import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import {
  KCommand,
  KCommandInput,
  KCommandList,
  KCommandEmpty,
  KCommandGroup,
  KCommandItem,
  KCommandSeparator,
  KCommandShortcut,
  KCommandFooter,
} from '../components/ui/command';

interface SearchItem {
  label: string;
  route: string;
  group: string;
}

const ALL_ITEMS: SearchItem[] = [
  // Getting Started
  { label: 'Introduction', route: '/introduction', group: 'Getting Started' },
  { label: 'Installation', route: '/installation', group: 'Getting Started' },
  // Components
  { label: 'Accordion', route: '/accordion', group: 'Components' },
  { label: 'Alert', route: '/alert', group: 'Components' },
  { label: 'Alert Dialog', route: '/alert-dialog', group: 'Components' },
  { label: 'Aspect Ratio', route: '/aspect-ratio', group: 'Components' },
  { label: 'Autocomplete', route: '/autocomplete', group: 'Components' },
  { label: 'Avatar', route: '/avatar', group: 'Components' },
  { label: 'Badge', route: '/badge', group: 'Components' },
  { label: 'Breadcrumb', route: '/breadcrumb', group: 'Components' },
  { label: 'Button', route: '/button', group: 'Components' },
  { label: 'Button Group', route: '/button-group', group: 'Components' },
  { label: 'Calendar', route: '/calendar', group: 'Components' },
  { label: 'Card', route: '/card', group: 'Components' },
  { label: 'Carousel', route: '/carousel', group: 'Components' },
  { label: 'Chart', route: '/chart', group: 'Components' },
  { label: 'Checkbox', route: '/checkbox', group: 'Components' },
  { label: 'Collapsible', route: '/collapsible', group: 'Components' },
  { label: 'Combobox', route: '/combobox', group: 'Components' },
  { label: 'Command', route: '/command', group: 'Components' },
  { label: 'Context Menu', route: '/context-menu', group: 'Components' },
  { label: 'Data Table', route: '/data-table', group: 'Components' },
  { label: 'Date Picker', route: '/date-picker', group: 'Components' },
  { label: 'Dialog', route: '/dialog', group: 'Components' },
  { label: 'Drawer', route: '/drawer', group: 'Components' },
  { label: 'Dropdown', route: '/dropdown', group: 'Components' },
  { label: 'Empty', route: '/empty', group: 'Components' },
  { label: 'Form Field', route: '/form-field', group: 'Components' },
  { label: 'Hover Card', route: '/hover-card', group: 'Components' },
  { label: 'Input', route: '/input', group: 'Components' },
  { label: 'Input Group', route: '/input-group', group: 'Components' },
  { label: 'Input OTP', route: '/input-otp', group: 'Components' },
  { label: 'Kbd', route: '/kbd', group: 'Components' },
  { label: 'Label', route: '/label', group: 'Components' },
  { label: 'Logo', route: '/logo', group: 'Components' },
  { label: 'Menubar', route: '/menubar', group: 'Components' },
  { label: 'Messaging', route: '/messaging', group: 'Components' },
  { label: 'Multi Select', route: '/multi-select', group: 'Components' },
  { label: 'Native Select', route: '/native-select', group: 'Components' },
  { label: 'Navigation Menu', route: '/navigation-menu', group: 'Components' },
  { label: 'Pagination', route: '/pagination', group: 'Components' },
  { label: 'Password Input', route: '/password-input', group: 'Components' },
  { label: 'Popover', route: '/popover', group: 'Components' },
  { label: 'Progress', route: '/progress', group: 'Components' },
  { label: 'Questionnaire', route: '/questionnaire', group: 'Components' },
  { label: 'Radio Group', route: '/radio-group', group: 'Components' },
  { label: 'Resizable', route: '/resizable', group: 'Components' },
  { label: 'Scroll Area', route: '/scroll-area', group: 'Components' },
  { label: 'Select', route: '/select', group: 'Components' },
  { label: 'Separator', route: '/separator', group: 'Components' },
  { label: 'Sheet', route: '/sheet', group: 'Components' },
  { label: 'Sidebar', route: '/sidebar', group: 'Components' },
  { label: 'Skeleton', route: '/skeleton', group: 'Components' },
  { label: 'Slider', route: '/slider', group: 'Components' },
  { label: 'Spinner', route: '/spinner', group: 'Components' },
  { label: 'Switch', route: '/switch', group: 'Components' },
  { label: 'Table', route: '/table', group: 'Components' },
  { label: 'Tabs', route: '/tabs', group: 'Components' },
  { label: 'Textarea', route: '/textarea', group: 'Components' },
  { label: 'Toast', route: '/toast', group: 'Components' },
  { label: 'Toggle', route: '/toggle', group: 'Components' },
  { label: 'Toggle Group', route: '/toggle-group', group: 'Components' },
  { label: 'Tooltip', route: '/tooltip', group: 'Components' },
  { label: 'Typography', route: '/typography', group: 'Components' },
  { label: 'Utilities', route: '/utilities', group: 'Components' },
];

/**
 * Command search dialog content — opened by the nav header ⌘K trigger.
 * Uses CDK Dialog directly for the overlay.
 */
@Component({
  selector: 'k-command-search-dialog',
  imports: [
    KCommand,
    KCommandInput,
    KCommandList,
    KCommandEmpty,
    KCommandGroup,
    KCommandItem,
    KCommandFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" (click)="close()"></div>
    <div class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" (click)="close()">
      <k-command
        class="rounded-lg border shadow-2xl w-full max-w-lg max-h-[450px] bg-popover animate-slide-in-up overflow-hidden"
        [(value)]="query"
        (click)="$event.stopPropagation()"
      >
        <k-command-input
          placeholder="Search components..."
          (keydown.escape)="close()"
        ></k-command-input>
        <k-command-list class="flex-1 overflow-y-auto">
          @if (filtered().length === 0) {
            <k-command-empty>No results found.</k-command-empty>
          }
          @for (group of groups(); track group.name) {
            @if (group.items.length > 0) {
              <k-command-group [heading]="group.name">
                @for (item of group.items; track item.route) {
                  <button k-command-item (click)="navigate(item.route)">
                    <!-- Component icon (Lucide Layers) -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="shrink-0 opacity-60">
                      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
                      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
                      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
                    </svg>
                    <span>{{ item.label }}</span>
                  </button>
                }
              </k-command-group>
            }
          }
        </k-command-list>
        <k-command-footer class="justify-between">
          <span class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            Command Menu
          </span>
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1">
              <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">↑</kbd>
              <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">↓</kbd>
              to navigate
            </span>
            <span class="flex items-center gap-1">
              <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">↵</kbd>
              to select
            </span>
            <span class="flex items-center gap-1">
              <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">ESC</kbd>
              to close
            </span>
          </div>
        </k-command-footer>
      </k-command>
    </div>
  `,
})
export class KCommandSearchDialog {
  private readonly router = inject(Router);
  private readonly dialogRef = inject(DialogRef);

  readonly query = signal('');

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return ALL_ITEMS;
    return ALL_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(q)
    );
  });

  readonly groups = computed(() => {
    const items = this.filtered();
    const map = new Map<string, SearchItem[]>();
    for (const item of items) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return Array.from(map.entries()).map(([name, items]) => ({
      name,
      items,
    }));
  });

  navigate(route: string): void {
    this.router.navigate([route]);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
