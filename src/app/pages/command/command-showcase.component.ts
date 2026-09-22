import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KCommand,
  KCommandInput,
  KCommandList,
  KCommandEmpty,
  KCommandGroup,
  KCommandItem,
  KCommandSeparator,
  KCommandShortcut,
  KCommandFooter
} from '../../components/ui/command';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const COMMAND_USAGE = `<k-command class="rounded-lg border shadow-md md:min-w-[450px]">
  <k-command-input placeholder="Type a command or search..." />
  <k-command-list>
    <k-command-empty>No results found.</k-command-empty>
    <k-command-group heading="Suggestions">
      <button k-command-item>
        <svg ...><!-- calendar icon --></svg>
        <span>Calendar</span>
      </button>
    </k-command-group>
    <k-command-separator />
    <k-command-group heading="Settings">
      <button k-command-item>
        <svg ...><!-- user icon --></svg>
        <span>Profile</span>
        <k-command-shortcut>\\u2318P</k-command-shortcut>
      </button>
    </k-command-group>
  </k-command-list>
</k-command>`;

@Component({
  selector: 'app-command-showcase',
  imports: [
    KCommand,
    KCommandInput,
    KCommandList,
    KCommandEmpty,
    KCommandGroup,
    KCommandItem,
    KCommandSeparator,
    KCommandShortcut,
    KCommandFooter,
    CodeBlockComponent,
    TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">command</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Command</h1>
          <p class="text-lg text-muted-foreground">
            Fast, composable, unstyled command menu for Angular.
          </p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="mt-4">
              <div class="flex min-h-[350px] items-center justify-center rounded-xl border border-border bg-card/50 p-10">
                <k-command class="rounded-lg border shadow-md md:min-w-[450px] max-h-[450px]">
                  <k-command-input placeholder="Type a command or search..."></k-command-input>
                  <k-command-list class="flex-1 overflow-y-auto">
                    <k-command-empty>No results found.</k-command-empty>
                    <k-command-group heading="Suggestions">
                      <button k-command-item>
                        <!-- Calendar icon (Lucide) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="shrink-0 opacity-60">
                          <path d="M8 2v4"/><path d="M16 2v4"/>
                          <rect width="18" height="18" x="3" y="4" rx="2"/>
                          <path d="M3 10h18"/>
                        </svg>
                        <span>Calendar</span>
                      </button>
                      <button k-command-item>
                        <!-- Search icon (Lucide) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="shrink-0 opacity-60">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                        </svg>
                        <span>Search Components</span>
                      </button>
                      <button k-command-item>
                        <!-- Calculator icon (Lucide) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="shrink-0 opacity-60">
                          <rect width="16" height="20" x="4" y="2" rx="2"/>
                          <line x1="8" x2="16" y1="6" y2="6"/>
                          <line x1="16" x2="16" y1="14" y2="18"/>
                          <path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/>
                          <path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>
                        </svg>
                        <span>Calculator</span>
                      </button>
                    </k-command-group>
                    <k-command-separator></k-command-separator>
                    <k-command-group heading="Settings">
                      <button k-command-item>
                        <!-- User icon (Lucide) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="shrink-0 opacity-60">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span>Profile</span>
                        <k-command-shortcut>&#8984;P</k-command-shortcut>
                      </button>
                      <button k-command-item>
                        <!-- CreditCard icon (Lucide) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="shrink-0 opacity-60">
                          <rect width="20" height="14" x="2" y="5" rx="2"/>
                          <line x1="2" x2="22" y1="10" y2="10"/>
                        </svg>
                        <span>Billing</span>
                        <k-command-shortcut>&#8984;B</k-command-shortcut>
                      </button>
                      <button k-command-item>
                        <!-- Settings icon (Lucide) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             class="shrink-0 opacity-60">
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        <span>Settings</span>
                        <k-command-shortcut>&#8984;S</k-command-shortcut>
                      </button>
                    </k-command-group>
                  </k-command-list>
                  <k-command-footer class="justify-between">
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                      Command Menu
                    </span>
                    <div class="flex items-center gap-3">
                      <span class="flex items-center gap-1">
                        <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">↑</kbd>
                        <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">↓</kbd>
                        to navigate
                      </span>
                      <span class="flex items-center gap-1">
                        <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">↵</kbd>
                        to select
                      </span>
                      <span class="flex items-center gap-1">
                        <kbd class="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-sans">ESC</kbd>
                        to close
                      </span>
                    </div>
                  </k-command-footer>
                </k-command>
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <!-- API Reference -->
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
                    <td class="px-4 py-3 text-muted-foreground">The current search input value (two-way bindable).</td>
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

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Sub-components</h3>
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Component</th>
                    <th class="px-4 py-3 font-medium">Selector</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KCommandInput</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-command-input</td>
                    <td class="px-4 py-3 text-muted-foreground">Search input with magnifying glass icon.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KCommandList</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-command-list</td>
                    <td class="px-4 py-3 text-muted-foreground">Scrollable results container.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KCommandEmpty</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-command-empty</td>
                    <td class="px-4 py-3 text-muted-foreground">Shown when no results match.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KCommandGroup</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-command-group</td>
                    <td class="px-4 py-3 text-muted-foreground">Groups items with an optional heading.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KCommandItem</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">button[k-command-item]</td>
                    <td class="px-4 py-3 text-muted-foreground">A selectable command item.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KCommandSeparator</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-command-separator</td>
                    <td class="px-4 py-3 text-muted-foreground">Visual separator between groups.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KCommandShortcut</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-command-shortcut</td>
                    <td class="px-4 py-3 text-muted-foreground">Keyboard shortcut hint aligned to the right.</td>
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
export default class CommandShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];
  readonly tab = signal('preview');
  readonly usage = COMMAND_USAGE;
}
