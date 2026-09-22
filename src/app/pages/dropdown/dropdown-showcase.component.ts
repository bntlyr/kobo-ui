import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KDropdownTrigger, KDropdownContent, KDropdownItem, KDropdownSeparator, KDropdownLabel } from '../../components/ui/dropdown/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const DROPDOWN_SRC = `<!-- Trigger -->
<button k-button variant="outline" [kDropdownTrigger]="menu" dropdownAlign="start">
  Open Menu
</button>

<!-- Content template -->
<ng-template #menu>
  <k-dropdown-content>
    <k-dropdown-label>My Account</k-dropdown-label>
    <k-dropdown-separator />
    <k-dropdown-item>Profile</k-dropdown-item>
    <k-dropdown-item>Settings</k-dropdown-item>
    <k-dropdown-separator />
    <k-dropdown-item>Log out</k-dropdown-item>
  </k-dropdown-content>
</ng-template>`;

@Component({
  selector: 'app-dropdown-showcase',
  imports: [
    KButtonDirective,
    KDropdownTrigger, KDropdownContent, KDropdownItem, KDropdownSeparator, KDropdownLabel,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">dropdown</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Dropdown Menu</h1>
          <p class="text-lg text-muted-foreground">CDK overlay dropdown with keyboard navigation and auto-positioning.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 flex flex-wrap gap-4">
              <!-- Standard dropdown -->
              <button k-button variant="outline" [kDropdownTrigger]="accountMenu" [dropdownAlign]="'start'">
                Account ▾
              </button>
              <ng-template #accountMenu>
                <k-dropdown-content>
                  <k-dropdown-label>My Account</k-dropdown-label>
                  <k-dropdown-separator />
                  <k-dropdown-item>Profile</k-dropdown-item>
                  <k-dropdown-item>Billing</k-dropdown-item>
                  <k-dropdown-item>Settings</k-dropdown-item>
                  <k-dropdown-separator />
                  <k-dropdown-item>Log out</k-dropdown-item>
                </k-dropdown-content>
              </ng-template>

              <!-- Actions dropdown -->
              <button k-button [kDropdownTrigger]="actionsMenu" [dropdownAlign]="'end'">
                Actions ▾
              </button>
              <ng-template #actionsMenu>
                <k-dropdown-content>
                  <k-dropdown-item>Duplicate</k-dropdown-item>
                  <k-dropdown-item>Archive</k-dropdown-item>
                  <k-dropdown-separator />
                  <k-dropdown-item [disabled]="true">Export (unavailable)</k-dropdown-item>
                  <k-dropdown-separator />
                  <k-dropdown-item class="text-destructive">Delete</k-dropdown-item>
                </k-dropdown-content>
              </ng-template>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KDropdownTrigger</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">[kDropdownTrigger]</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">kDropdownTrigger</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">TemplateRef&lt;unknown&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">(required)</td>
                    <td class="px-4 py-3 text-muted-foreground">The template reference for the dropdown menu content.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">dropdownAlign</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'start' | 'end' | 'center'</td>
                    <td class="px-4 py-3 font-mono text-xs">'center'</td>
                    <td class="px-4 py-3 text-muted-foreground">Alignment of the dropdown relative to the trigger.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">dropdownSide</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'top' | 'bottom' | 'left' | 'right'</td>
                    <td class="px-4 py-3 font-mono text-xs">'bottom'</td>
                    <td class="px-4 py-3 text-muted-foreground">Side of the trigger where the dropdown appears.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KDropdownContent</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-dropdown-content</code></p>
            
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
            <h3 class="text-lg font-semibold">KDropdownItem</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-dropdown-item</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'destructive'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual variant of the item.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Disables the item, preventing interaction.</td>
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
            <h3 class="text-lg font-semibold">KDropdownSeparator, KDropdownLabel</h3>
            <p class="text-sm text-muted-foreground">Selectors: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-dropdown-separator</code>, <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-dropdown-label</code></p>
            
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
export class DropdownShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = DROPDOWN_SRC;
}
