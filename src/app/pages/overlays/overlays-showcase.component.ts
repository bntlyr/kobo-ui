import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KAlertDialogService } from '../../components/ui/alert-dialog/index';
import { KSheetService, KSheet, KSheetHeader, KSheetTitle, KSheetDescription, KSheetContent, KSheetFooter, K_SHEET_CONFIG } from '../../components/ui/sheet/index';
import { KDropdownTrigger, KDropdownContent, KDropdownItem, KDropdownSeparator, KDropdownLabel } from '../../components/ui/dropdown/index';
import { KPopoverTrigger, KPopoverContent } from '../../components/ui/popover/index';
import { KTooltipDirective } from '../../components/ui/tooltip/tooltip.directive';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

// ---- Demo sheet component ----
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

const TOOLTIP_SRC = `<button k-button kTooltip="This action will delete your account."
        kTooltipSide="top">
  Hover me
</button>`;

@Component({
  selector: 'app-overlays-showcase',
  imports: [
    KButtonDirective, KSeparatorDirective,
    KDropdownTrigger, KDropdownContent, KDropdownItem, KDropdownSeparator, KDropdownLabel,
    KPopoverTrigger, KPopoverContent,
    KTooltipDirective,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">

      <div class="space-y-2">
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>components</span><span>/</span><span class="text-foreground">overlays</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Overlays</h1>
        <p class="text-lg text-muted-foreground">
          Alert Dialog, Sheet, Dropdown Menu, Popover, and Tooltip — all built on
          <code class="font-mono text-sm bg-muted px-1 py-0.5 rounded">@angular/cdk/overlay</code>.
        </p>
      </div>

      <!-- Alert Dialog -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Alert Dialog</h2>
        <p class="text-muted-foreground text-sm">Interruptive confirmation dialog. Returns <code class="font-mono bg-muted px-1 rounded text-xs">Observable&lt;boolean&gt;</code>.</p>
        <div class="flex gap-3 flex-wrap">
          <button k-button variant="destructive" (click)="openDeleteDialog()">
            Delete Account
          </button>
          <button k-button variant="outline" (click)="openConfirmDialog()">
            Confirm Action
          </button>
        </div>
        @if (alertResult() !== null) {
          <p class="text-sm text-muted-foreground">
            Result: <code class="font-mono bg-muted px-1 rounded text-xs">{{ alertResult() }}</code>
          </p>
        }
      </section>

      <hr k-separator />

      <!-- Sheet -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Sheet</h2>
        <p class="text-muted-foreground text-sm">Sliding side panels via CDK overlay with 4 directions.</p>
        <div class="flex flex-wrap gap-3">
          @for (side of sides; track side) {
            <button k-button variant="outline" (click)="openSheet(side)">
              Open {{ side }}
            </button>
          }
        </div>
      </section>

      <hr k-separator />

      <!-- Dropdown Menu -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Dropdown Menu</h2>
        <p class="text-muted-foreground text-sm">CDK overlay dropdown with keyboard navigation and auto-positioning.</p>

        <app-tabs [tabs]="tabs" [(active)]="dropTab">
          @if (dropTab() === 'preview') {
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
          @if (dropTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="dropdownSrc" language="html" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator />

      <!-- Popover -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Popover</h2>
        <p class="text-muted-foreground text-sm">Floating contextual container.</p>

        <div class="rounded-xl border border-border bg-card p-8 mt-4 flex flex-wrap gap-4">
          <button k-button variant="outline" [kPopoverTrigger]="popContent">
            Open Popover
          </button>
          <ng-template #popContent>
            <k-popover-content>
              <p class="text-sm font-semibold mb-1">Dimensions</p>
              <p class="text-xs text-muted-foreground mb-3">Set the dimensions for the layer.</p>
              <div class="grid grid-cols-3 items-center gap-2">
                <label class="text-xs text-muted-foreground">Width</label>
                <input class="col-span-2 h-7 text-xs border border-input rounded px-2 bg-background" value="100%">
                <label class="text-xs text-muted-foreground">Max width</label>
                <input class="col-span-2 h-7 text-xs border border-input rounded px-2 bg-background" value="300px">
              </div>
            </k-popover-content>
          </ng-template>
        </div>
      </section>

      <hr k-separator />

      <!-- Tooltip -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Tooltip</h2>
        <p class="text-muted-foreground text-sm">300ms delayed hover tooltip, auto-positioned.</p>

        <app-tabs [tabs]="tabs" [(active)]="tooltipTab">
          @if (tooltipTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 flex flex-wrap gap-4 items-center">
              <button k-button kTooltip="Top tooltip (default)" kTooltipSide="top">Top</button>
              <button k-button variant="outline" kTooltip="Right tooltip" kTooltipSide="right">Right</button>
              <button k-button variant="secondary" kTooltip="Bottom tooltip" kTooltipSide="bottom">Bottom</button>
              <button k-button variant="ghost" kTooltip="Left tooltip" kTooltipSide="left">Left</button>
            </div>
          }
          @if (tooltipTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="tooltipSrc" language="html" /></div>
          }
        </app-tabs>
      </section>

    </div>
  `,
})
export class OverlaysShowcaseComponent {
  private readonly alertDialog = inject(KAlertDialogService);
  private readonly sheetService = inject(KSheetService);

  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly dropTab    = signal('preview');
  readonly tooltipTab = signal('preview');
  readonly alertResult = signal<string | null>(null);

  readonly sides = ['top', 'right', 'bottom', 'left'] as const;
  readonly dropdownSrc = DROPDOWN_SRC;
  readonly tooltipSrc  = TOOLTIP_SRC;

  openDeleteDialog(): void {
    this.alertDialog.open({
      title: 'Are you absolutely sure?',
      description: 'This will permanently delete your account and remove your data.',
      confirmLabel: 'Delete Account',
      cancelLabel: 'Cancel',
      intent: 'destructive',
    }).subscribe(result => this.alertResult.set(result ? 'confirmed (deleted)' : 'cancelled'));
  }

  openConfirmDialog(): void {
    this.alertDialog.open({
      title: 'Confirm action',
      description: 'This action will apply the selected changes.',
      confirmLabel: 'Continue',
    }).subscribe(result => this.alertResult.set(result ? 'confirmed' : 'cancelled'));
  }

  openSheet(side: 'top' | 'right' | 'bottom' | 'left'): void {
    this.sheetService.open(SettingsSheetComponent, { side });
  }
}
