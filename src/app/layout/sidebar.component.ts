import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem  { label: string; route: string; badge?: string; }
interface NavGroup { title: string; items: NavItem[]; }

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="hidden md:flex flex-col w-60 shrink-0 border-r border-border
                  h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto no-scrollbar py-6 px-3">
      @for (group of navGroups; track group.title) {
        <div class="mb-5">
          <p class="px-3 mb-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            {{ group.title }}
          </p>
          <ul class="space-y-0.5 list-none p-0 m-0">
            @for (item of group.items; track item.route) {
              <li>
                <a
                  [routerLink]="item.route"
                  routerLinkActive="bg-accent text-accent-foreground font-medium"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  class="flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-sm
                         text-muted-foreground hover:text-foreground hover:bg-accent
                         transition-colors duration-100 no-underline"
                >
                  <span>{{ item.label }}</span>
                  @if (item.badge) {
                    <span class="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
                      {{ item.badge }}
                    </span>
                  }
                </a>
              </li>
            }
          </ul>
        </div>
      }

      <div class="mt-auto pt-4 px-3 border-t border-border">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                       bg-primary/10 text-primary font-mono font-medium">v0.1.0</span>
          <span>Kobo UI</span>
        </div>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  readonly navGroups: NavGroup[] = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Introduction', route: '/introduction' },
        { label: 'Installation',  route: '/installation'  },
        { label: 'Theming',       route: '/theming'       },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Accordion', route: '/accordion' },
        { label: 'Alert', route: '/alert' },
        { label: 'Alert Dialog', route: '/alert-dialog' },
        { label: 'Aspect Ratio', route: '/aspect-ratio', badge: 'New' },
        { label: 'Autocomplete', route: '/autocomplete' },
        { label: 'Avatar', route: '/avatar' },
        { label: 'Badge', route: '/badge' },
        { label: 'Breadcrumb', route: '/breadcrumb' },
        { label: 'Button', route: '/button' },
        { label: 'Button Group', route: '/button-group', badge: 'New' },
        { label: 'Calendar', route: '/calendar', badge: 'New' },
        { label: 'Full Calendar', route: '/full-calendar', badge: 'New' },
        { label: 'Card', route: '/card' },
        { label: 'Carousel', route: '/carousel', badge: 'New' },
        { label: 'Chart', route: '/chart', badge: 'New' },
        { label: 'Checkbox', route: '/checkbox' },
        { label: 'Collapsible', route: '/collapsible' },
        { label: 'Combobox', route: '/combobox', badge: 'New' },
        { label: 'Command', route: '/command', badge: 'New' },
        { label: 'Context Menu', route: '/context-menu', badge: 'New' },
        { label: 'Data Table', route: '/data-table', badge: 'New' },
        { label: 'Date Picker', route: '/date-picker', badge: 'New' },
        { label: 'Dialog', route: '/dialog' },
        { label: 'Drawer', route: '/drawer', badge: 'New' },
        { label: 'Dropdown', route: '/dropdown' },
        { label: 'Empty', route: '/empty', badge: 'New' },
        { label: 'Form Field', route: '/form-field' },
        { label: 'Hover Card', route: '/hover-card', badge: 'New' },
        { label: 'Input', route: '/input' },
        { label: 'Input Group', route: '/input-group', badge: 'New' },
        { label: 'Input OTP', route: '/input-otp', badge: 'New' },
        { label: 'Kbd', route: '/kbd', badge: 'New' },
        { label: 'Label', route: '/label' },
        { label: 'Logo', route: '/logo' },
        { label: 'Menubar', route: '/menubar', badge: 'New' },
        { label: 'Messaging', route: '/messaging', badge: 'New' },
        { label: 'Multi Select', route: '/multi-select' },
        { label: 'Native Select', route: '/native-select', badge: 'New' },
        { label: 'Navigation Menu', route: '/navigation-menu', badge: 'New' },
        { label: 'Pagination', route: '/pagination' },
        { label: 'Password Input', route: '/password-input' },
        { label: 'Popover', route: '/popover' },
        { label: 'Progress', route: '/progress' },
        { label: 'Questionnaire', route: '/questionnaire', badge: 'New' },
        { label: 'Radio Group', route: '/radio-group' },
        { label: 'Resizable', route: '/resizable', badge: 'New' },
        { label: 'Scroll Area', route: '/scroll-area' },
        { label: 'Select', route: '/select' },
        { label: 'Separator', route: '/separator' },
        { label: 'Sheet', route: '/sheet' },
        { label: 'Sidebar', route: '/sidebar', badge: 'New' },
        { label: 'Skeleton', route: '/skeleton' },
        { label: 'Slider', route: '/slider' },
        { label: 'Spinner', route: '/spinner' },
        { label: 'Stepper', route: '/stepper', badge: 'New' },
        { label: 'Switch', route: '/switch' },
        { label: 'Table', route: '/table' },
        { label: 'Tabs', route: '/tabs' },
        { label: 'Textarea', route: '/textarea' },
        { label: 'Toast', route: '/toast' },
        { label: 'Toggle', route: '/toggle', badge: 'New' },
        { label: 'Toggle Group', route: '/toggle-group', badge: 'New' },
        { label: 'Tooltip', route: '/tooltip' },
        { label: 'Typography', route: '/typography' },
        { label: 'Utilities', route: '/utilities', badge: 'New' },
      ],
    },
  ];
}
