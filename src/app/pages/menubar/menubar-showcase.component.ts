import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KMenubar } from '../../components/ui/menubar';

@Component({
  selector: 'app-menubar-showcase',
  standalone: true,
  imports: [
    KTabs, KTabList, KTabTrigger, KTabContent, 
    KMenubar
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Menubar</h1>
        <p class="text-muted-foreground mt-2">A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
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
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-menubar&gt;
  &lt;div class="relative group"&gt;
    &lt;button class="px-3 py-1"&gt;File&lt;/button&gt;
    &lt;div class="absolute left-0 top-full hidden group-hover:block"&gt;
      &lt;button&gt;New Tab&lt;/button&gt;
      &lt;button&gt;New Window&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/k-menubar&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenubarShowcaseComponent {}
