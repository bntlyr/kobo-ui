import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KCommand, KCommandInput, KCommandList, KCommandEmpty, KCommandGroup, KCommandItem } from '../../components/ui/command';

@Component({
  selector: 'app-command-showcase',
  standalone: true,
  imports: [
    KTabs, KTabList, KTabTrigger, KTabContent, 
    KCommand, KCommandInput, KCommandList, KCommandEmpty, 
    KCommandGroup, KCommandItem
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Command</h1>
        <p class="text-muted-foreground mt-2">Fast, composable, unstyled command menu for Angular.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-command class="rounded-lg border shadow-md md:min-w-[450px]">
              <k-command-input placeholder="Type a command or search..."></k-command-input>
              <k-command-list>
                <k-command-empty>No results found.</k-command-empty>
                <k-command-group heading="Suggestions">
                  <button k-command-item>
                    <span class="mr-2 h-4 w-4">📅</span>
                    <span>Calendar</span>
                  </button>
                  <button k-command-item>
                    <span class="mr-2 h-4 w-4">😊</span>
                    <span>Search Emoji</span>
                  </button>
                  <button k-command-item disabled>
                    <span class="mr-2 h-4 w-4">🧮</span>
                    <span>Calculator</span>
                  </button>
                </k-command-group>
                <div class="-mx-1 h-px bg-border"></div>
                <k-command-group heading="Settings">
                  <button k-command-item>
                    <span class="mr-2 h-4 w-4">👤</span>
                    <span>Profile</span>
                    <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘P</span>
                  </button>
                  <button k-command-item>
                    <span class="mr-2 h-4 w-4">💳</span>
                    <span>Billing</span>
                    <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘B</span>
                  </button>
                  <button k-command-item>
                    <span class="mr-2 h-4 w-4">⚙️</span>
                    <span>Settings</span>
                    <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘S</span>
                  </button>
                </k-command-group>
              </k-command-list>
            </k-command>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-command class="rounded-lg border shadow-md"&gt;
  &lt;k-command-input placeholder="Type a command or search..."&gt;&lt;/k-command-input&gt;
  &lt;k-command-list&gt;
    &lt;k-command-empty&gt;No results found.&lt;/k-command-empty&gt;
    
    &lt;k-command-group heading="Suggestions"&gt;
      &lt;button k-command-item&gt;
        &lt;span class="mr-2 h-4 w-4"&gt;📅&lt;/span&gt;
        &lt;span&gt;Calendar&lt;/span&gt;
      &lt;/button&gt;
    &lt;/k-command-group&gt;
    
    &lt;div class="-mx-1 h-px bg-border"&gt;&lt;/div&gt;
    
    &lt;k-command-group heading="Settings"&gt;
      &lt;button k-command-item&gt;
        &lt;span class="mr-2 h-4 w-4"&gt;👤&lt;/span&gt;
        &lt;span&gt;Profile&lt;/span&gt;
        &lt;span class="ml-auto text-xs tracking-widest text-muted-foreground"&gt;⌘P&lt;/span&gt;
      &lt;/button&gt;
    &lt;/k-command-group&gt;
    
  &lt;/k-command-list&gt;
&lt;/k-command&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KCommand</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-command</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">value</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">The value of the search input.</td>
                  </tr>
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
export default class CommandShowcaseComponent {}
