import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KHoverCardTrigger, KHoverCardContent } from '../../components/ui/hover-card';
import { KAvatar, KAvatarImage, KAvatarFallback } from '../../components/ui/avatar';

@Component({
  selector: 'app-hover-card-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KHoverCardTrigger, KHoverCardContent, KAvatar, KAvatarImage, KAvatarFallback],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Hover Card</h1>
        <p class="text-muted-foreground mt-2">For sighted users to preview content available behind a link.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <div class="flex justify-center p-12">
              <button [kHoverCardTrigger]="hoverCardContent" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 underline-offset-4 hover:underline text-primary">
                &#64;nextjs
              </button>
              
              <ng-template #hoverCardContent>
                <k-hover-card-content class="w-80">
                  <div class="flex justify-between space-x-4">
                    <k-avatar>
                      <k-avatar-image src="https://github.com/vercel.png" alt="&#64;vercel"></k-avatar-image>
                      <k-avatar-fallback>VC</k-avatar-fallback>
                    </k-avatar>
                    <div class="space-y-1">
                      <h4 class="text-sm font-semibold">&#64;nextjs</h4>
                      <p class="text-sm text-muted-foreground">
                        The React Framework – created and maintained by &#64;vercel.
                      </p>
                      <div class="flex items-center pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 opacity-70"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        <span class="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </k-hover-card-content>
              </ng-template>
            </div>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;button [kHoverCardTrigger]="hoverCardContent" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 underline-offset-4 hover:underline text-primary"&gt;
  &#64;nextjs
&lt;/button&gt;

&lt;ng-template #hoverCardContent&gt;
  &lt;k-hover-card-content class="w-80"&gt;
    &lt;div class="flex justify-between space-x-4"&gt;
      &lt;k-avatar&gt;
        &lt;k-avatar-image src="https://github.com/vercel.png" alt="&#64;vercel"&gt;&lt;/k-avatar-image&gt;
        &lt;k-avatar-fallback&gt;VC&lt;/k-avatar-fallback&gt;
      &lt;/k-avatar&gt;
      &lt;div class="space-y-1"&gt;
        &lt;h4 class="text-sm font-semibold"&gt;&#64;nextjs&lt;/h4&gt;
        &lt;p class="text-sm text-muted-foreground"&gt;
          The React Framework – created and maintained by &#64;vercel.
        &lt;/p&gt;
        &lt;div class="flex items-center pt-2"&gt;
          &lt;svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 opacity-70"&gt;&lt;rect width="18" height="18" x="3" y="4" rx="2" ry="2"/&gt;&lt;line x1="16" x2="16" y1="2" y2="6"/&gt;&lt;line x1="8" x2="8" y1="2" y2="6"/&gt;&lt;line x1="3" x2="21" y1="10" y2="10"/&gt;&lt;/svg&gt;
          &lt;span class="text-xs text-muted-foreground"&gt;
            Joined December 2021
          &lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/k-hover-card-content&gt;
&lt;/ng-template&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KHoverCard</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-hover-card</code></p>
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
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HoverCardShowcaseComponent {}
