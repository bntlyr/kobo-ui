import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KCard, KCardHeader, KCardTitle, KCardDescription,
  KCardContent, KCardFooter,
} from '../../components/ui/card/index';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const CARD_SOURCE = `import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input,
} from '@angular/core';
import { cn } from '../../core/utils/cn';

@Component({
  selector: 'k-card',
  template: \`<ng-content />\`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCard {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm', this.class())
  );
}
// ... KCardHeader, KCardTitle, KCardDescription, KCardContent, KCardFooter`;

const CARD_USAGE = `import {
  KCard, KCardHeader, KCardTitle, KCardDescription,
  KCardContent, KCardFooter
} from './components/ui/card';
import { KButtonDirective } from './components/ui/button/button.directive';

@Component({
  imports: [KCard, KCardHeader, KCardTitle, KCardDescription,
            KCardContent, KCardFooter, KButtonDirective],
  template: \`
    <k-card class="w-[350px]">
      <k-card-header>
        <k-card-title>Create project</k-card-title>
        <k-card-description>Deploy your new project in one-click.</k-card-description>
      </k-card-header>
      <k-card-content>
        <!-- form content -->
      </k-card-content>
      <k-card-footer>
        <button k-button variant="outline" class="flex-1">Cancel</button>
        <button k-button class="flex-1">Deploy</button>
      </k-card-footer>
    </k-card>
  \`
})
export class MyComponent {}`;

@Component({
  selector: 'app-card-showcase',
  imports: [
    KCard, KCardHeader, KCardTitle, KCardDescription, KCardContent, KCardFooter,
    KButtonDirective, KBadgeDirective,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">card</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Card</h1>
        <p class="text-lg text-muted-foreground">
          A composable card container with semantic sub-components for header, content, and footer slots.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card/50 p-8 mt-4">
            <div class="grid sm:grid-cols-2 gap-6">

              <!-- Basic Card -->
              <k-card>
                <k-card-header>
                  <k-card-title>Project Alpha</k-card-title>
                  <k-card-description>A next-gen full-stack application.</k-card-description>
                </k-card-header>
                <k-card-content>
                  <p class="text-sm text-muted-foreground">
                    Deployed to production on September 21, 2026.
                    12 contributors, 340 commits.
                  </p>
                </k-card-content>
                <k-card-footer>
                  <button k-button variant="outline" size="sm" class="flex-1">View</button>
                  <button k-button size="sm" class="flex-1">Deploy</button>
                </k-card-footer>
              </k-card>

              <!-- Stats Card -->
              <k-card>
                <k-card-header>
                  <k-card-description>Total Revenue</k-card-description>
                  <k-card-title class="text-3xl">&#36;45,231.89</k-card-title>
                </k-card-header>
                <k-card-content>
                  <p class="text-xs text-muted-foreground">
                    <span class="text-green-500 font-medium">+20.1%</span> from last month
                  </p>
                </k-card-content>
              </k-card>

              <!-- Notification Card -->
              <k-card class="sm:col-span-2">
                <k-card-header>
                  <div class="flex items-start justify-between">
                    <div>
                      <k-card-title>Notifications</k-card-title>
                      <k-card-description>You have 3 unread messages.</k-card-description>
                    </div>
                    <span k-badge>3 New</span>
                  </div>
                </k-card-header>
                <k-card-content>
                  <div class="space-y-3">
                    @for (n of notifications; track n.id) {
                      <div class="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div class="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-foreground">{{ n.title }}</p>
                          <p class="text-xs text-muted-foreground">{{ n.time }}</p>
                        </div>
                      </div>
                    }
                  </div>
                </k-card-content>
                <k-card-footer>
                  <button k-button variant="outline" size="sm" class="w-full">Mark all as read</button>
                </k-card-footer>
              </k-card>

            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add card" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Source</p>
              <app-code-block [code]="cardSource" language="typescript"
                              filename="src/app/components/ui/card/card.component.ts" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Usage</p>
              <app-code-block [code]="cardUsage" language="typescript" />
            </div>
          </div>
        }
      </app-tabs>

      <!-- Components list -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Components</h2>
        <div class="rounded-xl border border-border overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-muted/50">
              <tr>
                <th class="text-left px-4 py-3 font-semibold">Component</th>
                <th class="text-left px-4 py-3 font-semibold">Selector</th>
                <th class="text-left px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              @for (c of cardComponents; track c.name) {
                <tr class="hover:bg-muted/30">
                  <td class="px-4 py-3 font-mono text-primary text-xs">{{ c.name }}</td>
                  <td class="px-4 py-3 font-mono text-xs text-muted-foreground">{{ c.selector }}</td>
                  <td class="px-4 py-3 text-muted-foreground text-xs">{{ c.desc }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class CardShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');
  readonly cardSource = CARD_SOURCE;
  readonly cardUsage  = CARD_USAGE;

  readonly notifications = [
    { id: 1, title: 'New component added: Dropdown Menu', time: '2 minutes ago' },
    { id: 2, title: 'Registry updated to v0.1.0', time: '1 hour ago' },
    { id: 3, title: 'New contributor joined the project', time: '3 hours ago' },
  ];

  readonly cardComponents = [
    { name: 'KCard',            selector: 'k-card',             desc: 'Root container with border, background, shadow' },
    { name: 'KCardHeader',      selector: 'k-card-header',      desc: 'Top section with spacing' },
    { name: 'KCardTitle',       selector: 'k-card-title',       desc: 'Heading text' },
    { name: 'KCardDescription', selector: 'k-card-description', desc: 'Muted subtitle text' },
    { name: 'KCardContent',     selector: 'k-card-content',     desc: 'Main body area' },
    { name: 'KCardFooter',      selector: 'k-card-footer',      desc: 'Bottom action area, flex row' },
  ];
}
