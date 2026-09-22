import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KMenubar } from '../../components/ui/menubar/menubar.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-menubar-showcase',
  imports: [KMenubar, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">menubar</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Menubar</h1>
        <p class="text-lg text-muted-foreground">
          A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4">
            <div class="flex min-h-[250px] items-center justify-center">
              <k-menubar>
                <div class="relative group">
                  <button class="px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-sm outline-none">File</button>
                  <div class="absolute left-0 top-full hidden group-hover:block w-48 bg-popover text-popover-foreground rounded-md border shadow-md p-1 z-50">
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground flex justify-between items-center">
                      New Tab <span class="text-xs tracking-widest text-muted-foreground">⌘T</span>
                    </button>
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground flex justify-between items-center">
                      New Window <span class="text-xs tracking-widest text-muted-foreground">⌘N</span>
                    </button>
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm opacity-50 cursor-not-allowed">New Incognito Window</button>
                    <div class="h-px bg-border my-1"></div>
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground flex justify-between items-center">
                      Print... <span class="text-xs tracking-widest text-muted-foreground">⌘P</span>
                    </button>
                  </div>
                </div>
                
                <div class="relative group">
                  <button class="px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-sm outline-none">Edit</button>
                  <div class="absolute left-0 top-full hidden group-hover:block w-48 bg-popover text-popover-foreground rounded-md border shadow-md p-1 z-50">
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground flex justify-between items-center">
                      Undo <span class="text-xs tracking-widest text-muted-foreground">⌘Z</span>
                    </button>
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground flex justify-between items-center">
                      Redo <span class="text-xs tracking-widest text-muted-foreground">⇧⌘Z</span>
                    </button>
                    <div class="h-px bg-border my-1"></div>
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground">Cut</button>
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground">Copy</button>
                    <button class="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground">Paste</button>
                  </div>
                </div>
              </k-menubar>
            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add menubar" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Usage</p>
              <app-code-block code="&lt;k-menubar&gt;
  &lt;div class=&quot;relative group&quot;&gt;
    &lt;button class=&quot;px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-sm outline-none&quot;&gt;File&lt;/button&gt;
    &lt;div class=&quot;absolute left-0 top-full hidden group-hover:block w-48 bg-popover text-popover-foreground rounded-md border shadow-md p-1 z-50&quot;&gt;
      &lt;button class=&quot;w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground flex justify-between items-center&quot;&gt;
        New Tab &lt;span class=&quot;text-xs tracking-widest text-muted-foreground&quot;&gt;⌘T&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/k-menubar&gt;" language="html" />
            </div>
          </div>
        }
      </app-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KMenubar</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-menubar</code></p>
            
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
        </div>
      </section>
    </div>
  `,
})
export default class MenubarShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');
}
