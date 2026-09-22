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
      ],
    },
    {
      title: 'Primitives',
      items: [
        { label: 'Button',      route: '/button'      },
        { label: 'Badge',       route: '/badge'       },
        { label: 'Card',        route: '/card'        },
        { label: 'Avatar',      route: '/primitives'  },
        { label: 'Separator',   route: '/primitives'  },
        { label: 'Skeleton',    route: '/primitives'  },
        { label: 'Typography',  route: '/typography'  },
      ],
    },
    {
      title: 'Forms',
      items: [
        { label: 'Input',          route: '/input'   },
        { label: 'Password Input', route: '/forms',  badge: 'New' },
        { label: 'Textarea',       route: '/forms'   },
        { label: 'Form Field',     route: '/forms'   },
        { label: 'Checkbox',       route: '/forms'   },
        { label: 'Switch',         route: '/forms'   },
        { label: 'Radio Group',    route: '/forms'   },
        { label: 'Slider',         route: '/forms'   },
        { label: 'Select',         route: '/data'    },
        { label: 'Multi Select',   route: '/forms',  badge: 'New' },
        { label: 'Autocomplete',   route: '/forms',  badge: 'New' },
      ],
    },
    {
      title: 'Overlays',
      items: [
        { label: 'Dialog',       route: '/dialog'   },
        { label: 'Alert Dialog', route: '/overlays' },
        { label: 'Sheet',        route: '/overlays' },
        { label: 'Dropdown',     route: '/overlays' },
        { label: 'Popover',      route: '/overlays' },
        { label: 'Tooltip',      route: '/overlays' },
      ],
    },
    {
      title: 'Feedback',
      items: [
        { label: 'Alert',    route: '/feedback' },
        { label: 'Toast',    route: '/feedback' },
        { label: 'Progress', route: '/feedback' },
        { label: 'Spinner',  route: '/feedback' },
      ],
    },
    {
      title: 'Navigation',
      items: [
        { label: 'Tabs',        route: '/navigation' },
        { label: 'Accordion',   route: '/navigation' },
        { label: 'Collapsible', route: '/navigation' },
        { label: 'Breadcrumb',  route: '/navigation' },
        { label: 'Pagination',  route: '/navigation' },
        { label: 'Scroll Area', route: '/navigation' },
      ],
    },
    {
      title: 'Data',
      items: [
        { label: 'Table',  route: '/data' },
        { label: 'Select', route: '/data' },
      ],
    },
  ];
}
