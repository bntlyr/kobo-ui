import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs/tabs.component';
import { KAccordion, KAccordionPanel } from '../../components/ui/accordion/accordion.component';
import { KCollapsible, KCollapsibleTrigger, KCollapsibleContent } from '../../components/ui/collapsible/index';
import {
  KBreadcrumb, KBreadcrumbList, KBreadcrumbItem, KBreadcrumbLink,
  KBreadcrumbPage, KBreadcrumbSeparator,
} from '../../components/ui/breadcrumb/index';
import { KPagination } from '../../components/ui/pagination/index';
import { KScrollArea } from '../../components/ui/scroll-area/scroll-area.component';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const KTABS_SRC = `<k-tabs value="account">
  <k-tab-list>
    <k-tab-trigger value="account">Account</k-tab-trigger>
    <k-tab-trigger value="password">Password</k-tab-trigger>
    <k-tab-trigger value="notifications">Notifications</k-tab-trigger>
  </k-tab-list>
  <k-tab-content value="account">Account settings...</k-tab-content>
  <k-tab-content value="password">Password settings...</k-tab-content>
  <k-tab-content value="notifications">Notification prefs...</k-tab-content>
</k-tabs>`;

const BREADCRUMB_SRC = `<k-breadcrumb>
  <k-breadcrumb-list>
    <k-breadcrumb-item>
      <k-breadcrumb-link href="/">Home</k-breadcrumb-link>
    </k-breadcrumb-item>
    <k-breadcrumb-separator />
    <k-breadcrumb-item>
      <k-breadcrumb-link routerLink="/components">Components</k-breadcrumb-link>
    </k-breadcrumb-item>
    <k-breadcrumb-separator />
    <k-breadcrumb-item>
      <k-breadcrumb-page>Breadcrumb</k-breadcrumb-page>
    </k-breadcrumb-item>
  </k-breadcrumb-list>
</k-breadcrumb>`;

const SCROLL_CONTENT = [
  'The quick brown fox jumps over the lazy dog.',
  'Pack my box with five dozen liquor jugs.',
  'How vividly the big sphinx quizzed Jack!',
  'Bright vixens jump; dozy fowl quack.',
  'Pack my red box with five dozen quality jugs.',
  'Jinxed wizards pluck ivy from the big quilt.',
  'The five boxing wizards jump quickly.',
  'How quickly daft jumping zebras vex!',
  'Sphinx of black quartz, judge my vow.',
  'Blowzy red-faced women that thingamajig jived.',
  'Crazy Fredrick bought many very exquisite opal jewels.',
  'We promptly judged antique ivory buckles for the next prize.',
];

@Component({
  selector: 'app-navigation-showcase',
  imports: [
    KTabs, KTabList, KTabTrigger, KTabContent,
    KAccordion, KAccordionPanel,
    KCollapsible, KCollapsibleTrigger, KCollapsibleContent,
    KBreadcrumb, KBreadcrumbList, KBreadcrumbItem, KBreadcrumbLink,
    KBreadcrumbPage, KBreadcrumbSeparator,
    KPagination, KScrollArea,
    KSeparatorDirective,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>components</span><span>/</span><span class="text-foreground">navigation</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Navigation & Layout</h1>
        <p class="text-lg text-muted-foreground">
          Tabs, Accordion, Collapsible, Breadcrumb, Pagination, and Scroll Area.
        </p>
      </div>

      <!-- k-tabs -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Tabs</h2>
        <p class="text-muted-foreground text-sm">Accessible ARIA tabs driven by Angular Signals.</p>

        <app-tabs [tabs]="previewTabs" [(active)]="tabsTab">
          @if (tabsTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <k-tabs value="account">
                <k-tab-list>
                  <k-tab-trigger value="account">Account</k-tab-trigger>
                  <k-tab-trigger value="password">Password</k-tab-trigger>
                  <k-tab-trigger value="notifications">Notifications</k-tab-trigger>
                </k-tab-list>
                <k-tab-content value="account" class="space-y-4 pt-4">
                  <h3 class="font-semibold">Account settings</h3>
                  <p class="text-sm text-muted-foreground">Make changes to your account here.</p>
                </k-tab-content>
                <k-tab-content value="password" class="space-y-4 pt-4">
                  <h3 class="font-semibold">Password</h3>
                  <p class="text-sm text-muted-foreground">Change your password here. After saving, you'll be logged out.</p>
                </k-tab-content>
                <k-tab-content value="notifications" class="space-y-4 pt-4">
                  <h3 class="font-semibold">Notifications</h3>
                  <p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
                </k-tab-content>
              </k-tabs>
            </div>
          }
          @if (tabsTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="kTabsSrc" language="html" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator />

      <!-- Accordion -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Accordion</h2>
        <p class="text-muted-foreground text-sm">Collapsible panels with Angular animations.</p>

        <div class="rounded-xl border border-border bg-card p-6 mt-4">
          <k-accordion>
            @for (item of faqItems; track item.q) {
              <k-accordion-panel [title]="item.q">{{ item.a }}</k-accordion-panel>
            }
          </k-accordion>
        </div>
      </section>

      <hr k-separator />

      <!-- Collapsible -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Collapsible</h2>
        <p class="text-muted-foreground text-sm">Simple show/hide primitive with animated height.</p>

        <div class="rounded-xl border border-border bg-card p-6 mt-4">
          <k-collapsible>
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-semibold">&#64;peduarte starred 3 repositories</h4>
              <k-collapsible-trigger class="w-auto">
                <span class="text-xs text-muted-foreground">Toggle</span>
              </k-collapsible-trigger>
            </div>
            <div class="rounded-md border border-border px-4 py-2 font-mono text-sm mb-2">
              &#64;radix-ui/primitives
            </div>
            <k-collapsible-content>
              <div class="space-y-2">
                <div class="rounded-md border border-border px-4 py-2 font-mono text-sm">
                  &#64;radix-ui/colors
                </div>
                <div class="rounded-md border border-border px-4 py-2 font-mono text-sm">
                  &#64;stitches/react
                </div>
              </div>
            </k-collapsible-content>
          </k-collapsible>
        </div>
      </section>

      <hr k-separator />

      <!-- Breadcrumb -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Breadcrumb</h2>
        <p class="text-muted-foreground text-sm">Semantic navigation trail.</p>

        <app-tabs [tabs]="previewTabs" [(active)]="breadTab">
          @if (breadTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-4">
              <k-breadcrumb>
                <k-breadcrumb-list>
                  <k-breadcrumb-item><k-breadcrumb-link href="/">Home</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator />
                  <k-breadcrumb-item><k-breadcrumb-link href="/components">Components</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator />
                  <k-breadcrumb-item><k-breadcrumb-page>Breadcrumb</k-breadcrumb-page></k-breadcrumb-item>
                </k-breadcrumb-list>
              </k-breadcrumb>

              <k-breadcrumb>
                <k-breadcrumb-list>
                  <k-breadcrumb-item><k-breadcrumb-link href="/">Home</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator>/</k-breadcrumb-separator>
                  <k-breadcrumb-item><k-breadcrumb-link href="/docs">Docs</k-breadcrumb-link></k-breadcrumb-item>
                  <k-breadcrumb-separator>/</k-breadcrumb-separator>
                  <k-breadcrumb-item><k-breadcrumb-page>Navigation</k-breadcrumb-page></k-breadcrumb-item>
                </k-breadcrumb-list>
              </k-breadcrumb>
            </div>
          }
          @if (breadTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="breadcrumbSrc" language="html" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator />

      <!-- Pagination -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Pagination</h2>
        <p class="text-muted-foreground text-sm">Smart page range with ellipsis.</p>

        <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">
          <k-pagination
            [page]="page()"
            [pageCount]="12"
            (pageChange)="page.set($event)"
          />
          <p class="text-sm text-center text-muted-foreground">
            Page {{ page() }} of 12
          </p>
        </div>
      </section>

      <hr k-separator />

      <!-- Scroll Area -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Scroll Area</h2>
        <p class="text-muted-foreground text-sm">Custom styled scrollbar, cross-browser.</p>

        <div class="rounded-xl border border-border bg-card p-8 mt-4">
          <k-scroll-area class="h-64 w-full rounded-md border border-border">
            <div class="p-4 space-y-3">
              @for (line of scrollLines; track $index) {
                <p class="text-sm text-muted-foreground">{{ line }}</p>
              }
            </div>
          </k-scroll-area>
        </div>
      </section>

      <!-- ============================================ -->
      <!-- VARIANT MATRIX -->
      <!-- ============================================ -->
      <hr k-separator />

      <h2 class="text-2xl font-bold tracking-tight">Variant Matrix</h2>

      <!-- Accordion Variants -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Accordion — Variants</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="default"</span>
            <k-accordion variant="default">
              <k-accordion-panel title="Default variant item 1">Content for item 1.</k-accordion-panel>
              <k-accordion-panel title="Default variant item 2">Content for item 2.</k-accordion-panel>
            </k-accordion>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="outline"</span>
            <k-accordion variant="outline">
              <k-accordion-panel title="Outline variant item 1">Content for item 1.</k-accordion-panel>
              <k-accordion-panel title="Outline variant item 2">Content for item 2.</k-accordion-panel>
            </k-accordion>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="separated"</span>
            <k-accordion variant="separated">
              <k-accordion-panel title="Separated variant item 1">Content for item 1.</k-accordion-panel>
              <k-accordion-panel title="Separated variant item 2">Content for item 2.</k-accordion-panel>
            </k-accordion>
          </div>
        </div>
      </section>

      <!-- Tabs Variants -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Tabs — Variants</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="pills" (default)</span>
            <k-tabs value="a" variant="pills">
              <k-tab-list>
                <k-tab-trigger value="a">Account</k-tab-trigger>
                <k-tab-trigger value="b">Password</k-tab-trigger>
                <k-tab-trigger value="c">Settings</k-tab-trigger>
              </k-tab-list>
              <k-tab-content value="a">Account settings content.</k-tab-content>
              <k-tab-content value="b">Password content.</k-tab-content>
              <k-tab-content value="c">Settings content.</k-tab-content>
            </k-tabs>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="line"</span>
            <k-tabs value="a" variant="line">
              <k-tab-list>
                <k-tab-trigger value="a">Account</k-tab-trigger>
                <k-tab-trigger value="b">Password</k-tab-trigger>
                <k-tab-trigger value="c">Settings</k-tab-trigger>
              </k-tab-list>
              <k-tab-content value="a">Account settings content.</k-tab-content>
              <k-tab-content value="b">Password content.</k-tab-content>
              <k-tab-content value="c">Settings content.</k-tab-content>
            </k-tabs>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="outline"</span>
            <k-tabs value="a" variant="outline">
              <k-tab-list>
                <k-tab-trigger value="a">Account</k-tab-trigger>
                <k-tab-trigger value="b">Password</k-tab-trigger>
                <k-tab-trigger value="c">Settings</k-tab-trigger>
              </k-tab-list>
              <k-tab-content value="a">Account settings content.</k-tab-content>
              <k-tab-content value="b">Password content.</k-tab-content>
              <k-tab-content value="c">Settings content.</k-tab-content>
            </k-tabs>
          </div>
        </div>
      </section>

      <!-- Tabs Sizes -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Tabs — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="sm"</span>
            <k-tabs value="a" size="sm">
              <k-tab-list>
                <k-tab-trigger value="a">Tab 1</k-tab-trigger>
                <k-tab-trigger value="b">Tab 2</k-tab-trigger>
              </k-tab-list>
            </k-tabs>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="default"</span>
            <k-tabs value="a" size="default">
              <k-tab-list>
                <k-tab-trigger value="a">Tab 1</k-tab-trigger>
                <k-tab-trigger value="b">Tab 2</k-tab-trigger>
              </k-tab-list>
            </k-tabs>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="lg"</span>
            <k-tabs value="a" size="lg">
              <k-tab-list>
                <k-tab-trigger value="a">Tab 1</k-tab-trigger>
                <k-tab-trigger value="b">Tab 2</k-tab-trigger>
              </k-tab-list>
            </k-tabs>
          </div>
        </div>
      </section>

      <!-- Breadcrumb Sizes -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Breadcrumb — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="sm"</span>
            <k-breadcrumb>
              <k-breadcrumb-list size="sm">
                <k-breadcrumb-item><k-breadcrumb-link href="#">Home</k-breadcrumb-link></k-breadcrumb-item>
                <k-breadcrumb-separator />
                <k-breadcrumb-item><k-breadcrumb-page>Current</k-breadcrumb-page></k-breadcrumb-item>
              </k-breadcrumb-list>
            </k-breadcrumb>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="default"</span>
            <k-breadcrumb>
              <k-breadcrumb-list size="default">
                <k-breadcrumb-item><k-breadcrumb-link href="#">Home</k-breadcrumb-link></k-breadcrumb-item>
                <k-breadcrumb-separator />
                <k-breadcrumb-item><k-breadcrumb-page>Current</k-breadcrumb-page></k-breadcrumb-item>
              </k-breadcrumb-list>
            </k-breadcrumb>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="lg"</span>
            <k-breadcrumb>
              <k-breadcrumb-list size="lg">
                <k-breadcrumb-item><k-breadcrumb-link href="#">Home</k-breadcrumb-link></k-breadcrumb-item>
                <k-breadcrumb-separator />
                <k-breadcrumb-item><k-breadcrumb-page>Current</k-breadcrumb-page></k-breadcrumb-item>
              </k-breadcrumb-list>
            </k-breadcrumb>
          </div>
        </div>
      </section>

      <!-- Pagination Variants -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Pagination — Variants</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="default"</span>
            <k-pagination [page]="1" [pageCount]="5" variant="default" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="outline"</span>
            <k-pagination [page]="1" [pageCount]="5" variant="outline" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="ghost"</span>
            <k-pagination [page]="1" [pageCount]="5" variant="ghost" />
          </div>
        </div>
      </section>

      <!-- Pagination Sizes -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Pagination — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="sm"</span>
            <k-pagination [page]="1" [pageCount]="5" size="sm" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="default"</span>
            <k-pagination [page]="1" [pageCount]="5" size="default" />
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">size="lg"</span>
            <k-pagination [page]="1" [pageCount]="5" size="lg" />
          </div>
        </div>
      </section>

    </div>
  `,
})
export class NavigationShowcaseComponent {
  readonly previewTabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tabsTab  = signal('preview');
  readonly breadTab = signal('preview');
  readonly page     = signal(1);

  readonly kTabsSrc      = KTABS_SRC;
  readonly breadcrumbSrc = BREADCRUMB_SRC;
  readonly scrollLines   = SCROLL_CONTENT;

  readonly faqItems = [
    { q: 'Is it accessible?',    a: 'Yes. The accordion is built with proper aria-expanded and keyboard navigation.' },
    { q: 'Is it animated?',      a: 'Yes. The height transition uses Angular\'s @angular/animations with 200ms ease-in-out.' },
    { q: 'Is it unstyled?',      a: 'No, it ships with Tailwind styles but you can override any class.' },
    { q: 'Can it be open by default?', a: 'Yes. Set [defaultOpen]="true" on a k-accordion-panel.' },
  ];
}
