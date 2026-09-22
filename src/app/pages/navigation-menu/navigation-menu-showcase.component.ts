import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KNavigationMenu, KNavigationMenuItem, KNavigationMenuLink } from '../../components/ui/navigation-menu';

@Component({
  selector: 'app-navigation-menu-showcase',
  standalone: true,
  imports: [
    KTabs, KTabList, KTabTrigger, KTabContent, 
    KNavigationMenu, KNavigationMenuItem, KNavigationMenuLink
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Navigation Menu</h1>
        <p class="text-muted-foreground mt-2">A collection of links for navigating websites.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-navigation-menu>
                <k-navigation-menu-item>
                  <button class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">Getting started</button>
                  <div class="absolute left-0 top-full flex justify-center w-full">
                    <ul class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-popover rounded-md shadow-md border text-popover-foreground">
                      <li class="row-span-3">
                        <a
                          class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
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
                        <a kNavigationMenuLink href="/introduction" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none">Introduction</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Re-usable components built using Radix UI and Tailwind CSS.
                          </p>
                        </a>
                      </li>
                      <li>
                        <a kNavigationMenuLink href="/installation" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none">Installation</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            How to install dependencies and structure your app.
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </k-navigation-menu-item>
                
                <k-navigation-menu-item>
                  <button class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">Components</button>
                  <div class="absolute left-0 top-full flex justify-center w-full">
                    <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover rounded-md shadow-md border text-popover-foreground">
                      <li>
                        <a kNavigationMenuLink href="/alert" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none">Alert</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Displays a callout for user attention.
                          </p>
                        </a>
                      </li>
                      <li>
                        <a kNavigationMenuLink href="/hover-card" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div class="text-sm font-medium leading-none">Hover Card</div>
                          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            For sighted users to preview content available behind a link.
                          </p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </k-navigation-menu-item>
                
                <k-navigation-menu-item>
                  <a kNavigationMenuLink href="/documentation" class="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Documentation
                  </a>
                </k-navigation-menu-item>
            </k-navigation-menu>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-navigation-menu&gt;
  &lt;k-navigation-menu-item&gt;
    &lt;button class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"&gt;Item One&lt;/button&gt;
    &lt;div class="absolute left-0 top-full"&gt;
      &lt;a kNavigationMenuLink href="/"&gt;Link&lt;/a&gt;
    &lt;/div&gt;
  &lt;/k-navigation-menu-item&gt;
&lt;/k-navigation-menu&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavigationMenuShowcaseComponent {}
