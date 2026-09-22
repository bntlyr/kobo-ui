import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs/tabs.component';
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

@Component({
  selector: 'app-tabs-showcase',
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">tabs</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Tabs</h1>
          <p class="text-lg text-muted-foreground">Accessible ARIA tabs driven by Angular Signals.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
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
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Variants</h3>
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

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Sizes</h3>
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

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KTabs</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-tabs</code></p>
            
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
                    <td class="px-4 py-3 text-muted-foreground">The value of the currently selected tab. Supports two-way binding.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'pills' | 'line' | 'outline'</td>
                    <td class="px-4 py-3 font-mono text-xs">'pills'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual style of the tabs.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the tabs.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">orientation</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'horizontal' | 'vertical'</td>
                    <td class="px-4 py-3 font-mono text-xs">'horizontal'</td>
                    <td class="px-4 py-3 text-muted-foreground">The orientation of the tabs.</td>
                  </tr>
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
            <h3 class="text-lg font-semibold">KTabList</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-tab-list</code></p>
            
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
            <h3 class="text-lg font-semibold">KTabTrigger</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-tab-trigger</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">(required)</td>
                    <td class="px-4 py-3 text-muted-foreground">The value of the tab. When selected, the k-tabs value matches this.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether the tab trigger is disabled.</td>
                  </tr>
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
            <h3 class="text-lg font-semibold">KTabContent</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-tab-content</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">(required)</td>
                    <td class="px-4 py-3 text-muted-foreground">The value of the tab content. Displays when the k-tabs value matches this.</td>
                  </tr>
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
export class TabsShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = KTABS_SRC;
}
