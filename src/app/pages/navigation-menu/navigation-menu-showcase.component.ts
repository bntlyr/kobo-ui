import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KNavigationMenu, KNavigationMenuItem, KNavigationMenuLink } from '../../components/ui/navigation-menu/navigation-menu.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-navigation-menu-showcase',
  imports: [KNavigationMenu, KNavigationMenuItem, KNavigationMenuLink, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">navigation-menu</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Navigation Menu</h1>
        <p class="text-lg text-muted-foreground">
          A collection of links for navigating websites.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4">
            <div class="flex min-h-[350px] justify-center">
              <k-navigation-menu>
                <k-navigation-menu-item class="group/item static">
                  <button class="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Getting started
                  </button>
                  <div class="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover/item:block pt-2 z-50">
                    <ul class="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-[.75fr_1fr] bg-popover rounded-md shadow-md border text-popover-foreground">
                      <li class="row-span-3">
                        <a
                          class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div class="mb-2 mt-4 text-lg font-medium">
                            Kobo UI
                          </div>
                          <p class="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Tailwind CSS.
                          </p>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none mb-2">Introduction</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Re-usable components built using Angular and Tailwind CSS.
                          </p>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none mb-2">Installation</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            How to install dependencies and structure your app.
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </k-navigation-menu-item>
                
                <k-navigation-menu-item class="group/item static">
                  <button class="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Components
                  </button>
                  <div class="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover/item:block pt-2 z-50">
                    <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover rounded-md shadow-md border text-popover-foreground">
                      <li>
                        <a href="#" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none mb-2">Alert</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Displays a callout for user attention.
                          </p>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none mb-2">Hover Card</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            For sighted users to preview content available behind a link.
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </k-navigation-menu-item>
                
                <k-navigation-menu-item>
                  <a kNavigationMenuLink href="#" class="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Documentation
                  </a>
                </k-navigation-menu-item>
              </k-navigation-menu>
            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add navigation-menu" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Usage</p>
              <app-code-block code="&lt;k-navigation-menu&gt;
  &lt;k-navigation-menu-item class=&quot;group&quot;&gt;
    &lt;button class=&quot;inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground&quot;&gt;
      Getting started
    &lt;/button&gt;
    &lt;div class=&quot;absolute left-0 top-full hidden group-hover:block pt-2 z-50&quot;&gt;
      &lt;ul class=&quot;grid gap-3 p-4 w-[400px] bg-popover rounded-md shadow-md border&quot;&gt;
        &lt;li&gt;
          &lt;a kNavigationMenuLink href=&quot;#&quot; class=&quot;block rounded-md p-3 hover:bg-accent&quot;&gt;
            &lt;div class=&quot;font-medium&quot;&gt;Introduction&lt;/div&gt;
          &lt;/a&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/k-navigation-menu-item&gt;
&lt;/k-navigation-menu&gt;" language="html" />
            </div>
          </div>
        }
      </app-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KNavigationMenu</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-navigation-menu</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KNavigationMenuItem</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-navigation-menu-item</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply. Apply <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">group</code> class if using pure CSS hover menus.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KNavigationMenuLink</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">[kNavigationMenuLink]</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply. Merged with the default navigation menu link styles.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class NavigationMenuShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');
}
