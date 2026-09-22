import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KContextMenuTrigger } from '../../components/ui/context-menu';

@Component({
  selector: 'app-context-menu-showcase',
  standalone: true,
  imports: [
    KTabs, KTabList, KTabTrigger, KTabContent, 
    KContextMenuTrigger
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Context Menu</h1>
        <p class="text-muted-foreground mt-2">Displays a menu to the user — such as a set of actions or functions — triggered by a right-click.</p>
      </div>

      <k-tabs value="preview" variant="line">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <div
              [kContextMenuTrigger]="myContextMenu"
              class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
            >
              Right click here
            </div>
            
            <ng-template #myContextMenu>
              <div class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 w-64">
                <button class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                  Back
                  <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘[</span>
                </button>
                <button class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground opacity-50 cursor-not-allowed">
                  Forward
                  <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘]</span>
                </button>
                <button class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                  Reload
                  <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘R</span>
                </button>
                <div class="-mx-1 my-1 h-px bg-border"></div>
                <button class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                  More Tools...
                </button>
              </div>
            </ng-template>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;div
  [kContextMenuTrigger]="myContextMenu"
  class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
&gt;
  Right click here
&lt;/div&gt;

&lt;ng-template #myContextMenu&gt;
  &lt;div class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 w-64"&gt;
    &lt;button class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground"&gt;
      Back
      &lt;span class="ml-auto text-xs tracking-widest text-muted-foreground"&gt;⌘[&lt;/span&gt;
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/ng-template&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KContextMenuTrigger</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">[kContextMenuTrigger]</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">kContextMenuTrigger</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">TemplateRef</td>
                    <td class="px-4 py-3 font-mono text-xs">undefined</td>
                    <td class="px-4 py-3 text-muted-foreground">The template for the context menu.</td>
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
export default class ContextMenuShowcaseComponent {}
