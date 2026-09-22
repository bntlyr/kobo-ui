import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  KDrawerService,
  KDrawerContent,
  KDrawerHeader,
  KDrawerTitle,
  KDrawerDescription,
  KDrawerFooter,
} from '../../components/ui/drawer';
import { KButtonDirective } from '../../components/ui/button';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const DRAWER_USAGE = `<!-- Trigger -->
<button k-button variant="outline" (click)="drawerService.open(drawerTpl, viewContainerRef)">
  Open Drawer
</button>

<!-- Drawer Template -->
<ng-template #drawerTpl>
  <k-drawer-content>
    <k-drawer-header>
      <k-drawer-title>Move Goal</k-drawer-title>
      <k-drawer-description>Set your daily activity goal.</k-drawer-description>
    </k-drawer-header>
    <div class="p-6">
      <!-- Your content here -->
    </div>
    <k-drawer-footer>
      <button k-button>Submit</button>
      <button k-button variant="outline" (click)="drawerService.close()">Cancel</button>
    </k-drawer-footer>
  </k-drawer-content>
</ng-template>`;

@Component({
  selector: 'app-drawer-showcase',
  imports: [
    KDrawerContent,
    KDrawerHeader,
    KDrawerTitle,
    KDrawerDescription,
    KDrawerFooter,
    KButtonDirective,
    CodeBlockComponent,
    TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">drawer</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Drawer</h1>
          <p class="text-lg text-muted-foreground">
            A mobile-style bottom drawer with drag-to-dismiss. Swipe down on the handle to close.
          </p>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="opacity-60">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>
            <span>Unlike <strong>Sheet</strong>, the Drawer always slides from the bottom and supports drag gestures.</span>
          </div>
        </div>

        <!-- Basic Drawer Demo -->
        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="mt-4">
              <div class="flex min-h-[350px] items-center justify-center rounded-xl border border-border bg-card/50 p-10">
                <button k-button variant="outline" (click)="openDrawer(goalTpl)">Open Drawer</button>

                <ng-template #goalTpl>
                  <k-drawer-content>
                    <k-drawer-header>
                      <k-drawer-title>Move Goal</k-drawer-title>
                      <k-drawer-description>Set your daily activity goal.</k-drawer-description>
                    </k-drawer-header>
                    <div class="px-6 py-4">
                      <div class="flex items-center justify-center gap-4">
                        <button k-button variant="outline"
                                class="h-10 w-10 shrink-0 rounded-full p-0 text-lg"
                                (click)="decrementGoal()">
                          <!-- Minus icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"/>
                          </svg>
                        </button>
                        <div class="flex-1 text-center">
                          <div class="text-7xl font-bold tracking-tighter">
                            {{ goal() }}
                          </div>
                          <div class="text-xs uppercase text-muted-foreground mt-1">
                            Calories/day
                          </div>
                        </div>
                        <button k-button variant="outline"
                                class="h-10 w-10 shrink-0 rounded-full p-0 text-lg"
                                (click)="incrementGoal()">
                          <!-- Plus icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"/><path d="M12 5v14"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <k-drawer-footer>
                      <button k-button (click)="drawerService.close()">Submit</button>
                      <button k-button variant="outline" (click)="drawerService.close()">Cancel</button>
                    </k-drawer-footer>
                  </k-drawer-content>
                </ng-template>
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <!-- Responsive Dialog + Drawer Demo -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">With Form Content</h2>
        <p class="text-muted-foreground">Drawers work great for mobile forms. Drag the handle down to dismiss.</p>

        <div class="flex min-h-[200px] items-center justify-center rounded-xl border border-border bg-card/50 p-10">
          <button k-button (click)="openDrawer(formTpl)">Edit Profile</button>

          <ng-template #formTpl>
            <k-drawer-content>
              <k-drawer-header>
                <k-drawer-title>Edit Profile</k-drawer-title>
                <k-drawer-description>Update your profile information below.</k-drawer-description>
              </k-drawer-header>
              <div class="px-6 py-4 space-y-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium">Name</label>
                  <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                               ring-offset-background placeholder:text-muted-foreground
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                         placeholder="Enter your name" />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">Email</label>
                  <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                               ring-offset-background placeholder:text-muted-foreground
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                         placeholder="Enter your email" type="email" />
                </div>
              </div>
              <k-drawer-footer>
                <button k-button (click)="drawerService.close()">Save Changes</button>
                <button k-button variant="outline" (click)="drawerService.close()">Cancel</button>
              </k-drawer-footer>
            </k-drawer-content>
          </ng-template>
        </div>
      </section>

      <!-- API Reference -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KDrawerService</h3>
            <p class="text-sm text-muted-foreground">Injectable service to open drawers programmatically.</p>
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Method</th>
                    <th class="px-4 py-3 font-medium">Parameters</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">open()</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">TemplateRef, ViewContainerRef</td>
                    <td class="px-4 py-3 text-muted-foreground">Opens a template as a bottom drawer.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">close()</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">-</td>
                    <td class="px-4 py-3 text-muted-foreground">Closes the currently open drawer.</td>
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
                    <td class="px-4 py-3 font-mono text-xs">KDrawerContent</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-drawer-content</td>
                    <td class="px-4 py-3 text-muted-foreground">Root container with drag handle and gesture support.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KDrawerHeader</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-drawer-header</td>
                    <td class="px-4 py-3 text-muted-foreground">Header section with grid layout.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KDrawerTitle</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-drawer-title</td>
                    <td class="px-4 py-3 text-muted-foreground">Title text for the drawer.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KDrawerDescription</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-drawer-description</td>
                    <td class="px-4 py-3 text-muted-foreground">Description text for the drawer.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KDrawerFooter</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">k-drawer-footer</td>
                    <td class="px-4 py-3 text-muted-foreground">Footer with action buttons.</td>
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
export default class DrawerShowcaseComponent {
  readonly drawerService = inject(KDrawerService);
  private readonly vcr = inject(ViewContainerRef);

  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
  ];
  readonly tab = signal('preview');
  readonly usage = DRAWER_USAGE;

  readonly goal = signal(350);

  openDrawer(tpl: TemplateRef<any>): void {
    this.drawerService.open(tpl, this.vcr);
  }

  incrementGoal(): void {
    this.goal.update(v => Math.min(v + 10, 1000));
  }

  decrementGoal(): void {
    this.goal.update(v => Math.max(v - 10, 0));
  }
}
