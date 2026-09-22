import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KSheetService, KSheet, KSheetHeader, KSheetTitle, KSheetDescription, KSheetContent, KSheetFooter, K_SHEET_CONFIG } from '../../components/ui/sheet/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-settings-sheet',
  imports: [KSheet, KSheetHeader, KSheetTitle, KSheetDescription, KSheetContent, KSheetFooter, KButtonDirective, KInputDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <k-sheet [side]="sheetConfig?.side ?? 'right'" [size]="sheetConfig?.size ?? 'default'">
      <k-sheet-header>
        <k-sheet-title>Edit Profile</k-sheet-title>
        <k-sheet-description>Make changes to your profile. Click save when you're done.</k-sheet-description>
      </k-sheet-header>
      <k-sheet-content class="space-y-4 mt-4">
        <div class="space-y-1.5">
          <label class="text-sm font-medium">Name</label>
          <input k-input type="text" value="Pedro Duarte" />
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium">Username</label>
          <input k-input type="text" value="@peduarte" />
        </div>
      </k-sheet-content>
      <k-sheet-footer>
        <button k-button variant="outline">Cancel</button>
        <button k-button>Save changes</button>
      </k-sheet-footer>
    </k-sheet>
  `,
})
export class SettingsSheetComponent {
  protected readonly sheetConfig = inject(K_SHEET_CONFIG, { optional: true });
}

@Component({
  selector: 'app-sheet-showcase',
  imports: [KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">sheet</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Sheet</h1>
          <p class="text-lg text-muted-foreground">Sliding side panels via CDK overlay with 4 directions.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="flex flex-wrap gap-3">
                @for (side of sides; track side) {
                  <button k-button variant="outline" (click)="openSheet(side)">
                    Open {{ side }}
                  </button>
                }
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="this.sheetService.open(SettingsSheetComponent, { side: 'right' });" language="typescript" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSheetService</h3>
            <p class="text-sm text-muted-foreground">Injectable service to open sheets.</p>
            
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Method</th>
                    <th class="px-4 py-3 font-medium">Parameters</th>
                    <th class="px-4 py-3 font-medium">Returns</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">open</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">component, config?</td>
                    <td class="px-4 py-3 font-mono text-xs">OverlayRef</td>
                    <td class="px-4 py-3 text-muted-foreground">Opens the provided component in a sheet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSheetConfig</h3>
            <p class="text-sm text-muted-foreground">Configuration options for opening a sheet.</p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">side</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'top' | 'right' | 'bottom' | 'left'</td>
                    <td class="px-4 py-3 font-mono text-xs">'right'</td>
                    <td class="px-4 py-3 text-muted-foreground">The side of the screen the sheet opens from.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg' | 'xl' | 'full'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the sheet.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">data</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">unknown</td>
                    <td class="px-4 py-3 font-mono text-xs">undefined</td>
                    <td class="px-4 py-3 text-muted-foreground">Data passed to the sheet component.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KSheet</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-sheet</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">side</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'top' | 'right' | 'bottom' | 'left'</td>
                    <td class="px-4 py-3 font-mono text-xs">'right'</td>
                    <td class="px-4 py-3 text-muted-foreground">The side of the screen the sheet opens from.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg' | 'xl' | 'full'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the sheet.</td>
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
export class SheetShowcaseComponent {
  private readonly sheetService = inject(KSheetService);

  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');

  readonly sides = ['top', 'right', 'bottom', 'left'] as const;

  openSheet(side: 'top' | 'right' | 'bottom' | 'left'): void {
    this.sheetService.open(SettingsSheetComponent, { side });
  }
}
