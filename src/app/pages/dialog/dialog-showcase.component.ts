import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  KDialogService,
  KDialog,
  KDialogHeader,
  KDialogTitle,
  KDialogDescription,
  KDialogContent,
  KDialogFooter,
  KDialogClose,
} from '../../components/ui/dialog/index';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

// ---- Demo Dialog Components ----

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    KDialog, KDialogHeader, KDialogTitle, KDialogDescription,
    KDialogContent, KDialogFooter, KDialogClose, KButtonDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <k-dialog>
      <k-dialog-header>
        <k-dialog-title>Are you absolutely sure?</k-dialog-title>
        <k-dialog-description>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </k-dialog-description>
      </k-dialog-header>
      <k-dialog-content>
        <div class="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          ⚠️ All your data will be permanently removed.
        </div>
      </k-dialog-content>
      <k-dialog-footer>
        <button k-button variant="outline" k-dialog-close>Cancel</button>
        <button k-button variant="destructive" (click)="confirm()">Delete Account</button>
      </k-dialog-footer>
    </k-dialog>
  `,
})
export class ConfirmDialogComponent {
  private readonly ref = inject(DialogRef);
  confirm(): void { this.ref.close('confirmed'); }
}

@Component({
  selector: 'app-form-dialog',
  imports: [
    KDialog, KDialogHeader, KDialogTitle, KDialogDescription,
    KDialogContent, KDialogFooter, KDialogClose, KButtonDirective, KInputDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <k-dialog>
      <k-dialog-header>
        <k-dialog-title>Edit Profile</k-dialog-title>
        <k-dialog-description>
          Make changes to your profile here. Click save when you're done.
        </k-dialog-description>
      </k-dialog-header>
      <k-dialog-content class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <label class="text-sm font-medium" for="dialog-first">First name</label>
            <input k-input id="dialog-first" type="text" value="Pedro" />
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-medium" for="dialog-last">Last name</label>
            <input k-input id="dialog-last" type="text" value="Duarte" />
          </div>
        </div>
        <div class="space-y-1.5">
          <label class="text-sm font-medium" for="dialog-username">Username</label>
          <input k-input id="dialog-username" type="text" value="&#64;peduarte" />
        </div>
      </k-dialog-content>
      <k-dialog-footer>
        <button k-button variant="outline" k-dialog-close>Cancel</button>
        <button k-button (click)="save()">Save changes</button>
      </k-dialog-footer>
    </k-dialog>
  `,
})
export class FormDialogComponent {
  private readonly ref = inject(DialogRef);
  save(): void { this.ref.close('saved'); }
}

// ---- Constants ----

const DIALOG_SOURCE = `import { inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import {
  KDialogService, KDialog, KDialogHeader, KDialogTitle,
  KDialogDescription, KDialogContent, KDialogFooter, KDialogClose,
} from './components/ui/dialog';

// 1. Create your dialog component
@Component({
  imports: [KDialog, KDialogHeader, KDialogTitle, KDialogDescription,
            KDialogContent, KDialogFooter, KDialogClose, KButtonDirective],
  template: \`
    <k-dialog>
      <k-dialog-header>
        <k-dialog-title>Confirm</k-dialog-title>
        <k-dialog-description>Are you sure?</k-dialog-description>
      </k-dialog-header>
      <k-dialog-footer>
        <button k-button variant="outline" k-dialog-close>Cancel</button>
        <button k-button (click)="confirm()">Confirm</button>
      </k-dialog-footer>
    </k-dialog>
  \`
})
export class ConfirmDialog {
  private ref = inject(DialogRef);
  confirm() { this.ref.close('confirmed'); }
}

// 2. Open from a parent component
@Component({
  providers: [],  // KDialogService is providedIn: 'root'
  template: \`<button k-button (click)="open()">Open Dialog</button>\`
})
export class MyComponent {
  private dialog = inject(KDialogService);
  open() {
    const ref = this.dialog.open(ConfirmDialog);
    ref.closed.subscribe(result => console.log('Result:', result));
  }
}`;

// ---- Showcase ----

@Component({
  selector: 'app-dialog-showcase',
  imports: [KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">dialog</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Dialog</h1>
        <p class="text-lg text-muted-foreground">
          An accessible dialog built on <code class="font-mono text-sm bg-muted px-1 py-0.5 rounded">@angular/cdk/dialog</code>.
          Includes focus trapping, ESC-to-close, backdrop blur, and slide-in animation.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">
            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Demo dialogs
              </p>
              <div class="flex flex-wrap gap-3">
                <button k-button variant="destructive" (click)="openConfirm()">
                  Delete Account (Confirm Dialog)
                </button>
                <button k-button variant="outline" (click)="openForm()">
                  Edit Profile (Form Dialog)
                </button>
              </div>
            </div>

            @if (lastResult()) {
              <div class="rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm">
                <span class="text-muted-foreground">Last result: </span>
                <code class="font-mono text-primary">{{ lastResult() }}</code>
              </div>
            }

            <div class="space-y-3 border-t border-border pt-4">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Features</p>
              <ul class="text-sm text-muted-foreground space-y-1.5 list-none p-0 m-0">
                @for (f of features; track f) {
                  <li class="flex items-center gap-2">
                    <span class="text-green-500 shrink-0">✓</span>{{ f }}
                  </li>
                }
              </ul>
            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add dialog" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Source &amp; Usage</p>
              <app-code-block [code]="dialogSource" language="typescript"
                              filename="src/app/components/ui/dialog/dialog.component.ts" />
            </div>
          </div>
        }
      </app-tabs>

      <!-- Components -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold">API Reference</h2>
        <div class="rounded-xl border border-border overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-muted/50">
              <tr>
                <th class="text-left px-4 py-3 font-semibold">Item</th>
                <th class="text-left px-4 py-3 font-semibold">Type</th>
                <th class="text-left px-4 py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              @for (item of apiItems; track item.name) {
                <tr class="hover:bg-muted/30">
                  <td class="px-4 py-3 font-mono text-primary text-xs">{{ item.name }}</td>
                  <td class="px-4 py-3 font-mono text-xs text-muted-foreground">{{ item.type }}</td>
                  <td class="px-4 py-3 text-muted-foreground text-xs">{{ item.desc }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class DialogShowcaseComponent {
  private readonly dialogService = inject(KDialogService);

  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab  = signal<string>('preview');
  readonly lastResult = signal<string>('');
  readonly dialogSource = DIALOG_SOURCE;

  readonly features = [
    'Focus trapped inside the dialog while open',
    'ESC key closes the dialog',
    'Backdrop blur + 50% opacity overlay',
    'Slide-in animation via CSS keyframes',
    'Emits result via DialogRef.closed observable',
    'disableClose option prevents accidental dismissal',
    'Accessible role="dialog" with aria-labelledby',
  ];

  readonly apiItems = [
    { name: 'KDialogService',     type: 'Service',    desc: 'Injectable service — call .open(Component, config)' },
    { name: 'KDialog',            type: 'Component',  desc: 'Root dialog panel <k-dialog>' },
    { name: 'KDialogHeader',      type: 'Component',  desc: '<k-dialog-header> — header section' },
    { name: 'KDialogTitle',       type: 'Component',  desc: '<k-dialog-title> — dialog heading' },
    { name: 'KDialogDescription', type: 'Component',  desc: '<k-dialog-description> — subtitle' },
    { name: 'KDialogContent',     type: 'Component',  desc: '<k-dialog-content> — body area' },
    { name: 'KDialogFooter',      type: 'Component',  desc: '<k-dialog-footer> — action buttons area' },
    { name: 'KDialogClose',       type: 'Directive',  desc: '[k-dialog-close] — closes dialog on button click' },
    { name: 'K_DIALOG_DATA',      type: 'InjectionToken', desc: 'Inject data passed via config.data' },
  ];

  openConfirm(): void {
    const ref = this.dialogService.open(ConfirmDialogComponent);
    ref.closed.subscribe(result => {
      this.lastResult.set(result as string ?? 'cancelled');
    });
  }

  openForm(): void {
    const ref = this.dialogService.open(FormDialogComponent);
    ref.closed.subscribe(result => {
      this.lastResult.set(result as string ?? 'cancelled');
    });
  }
}
