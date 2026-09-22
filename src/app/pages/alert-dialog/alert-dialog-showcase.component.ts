import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KAlertDialogService } from '../../components/ui/alert-dialog/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-alert-dialog-showcase',
  imports: [KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">alert-dialog</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Alert Dialog</h1>
          <p class="text-lg text-muted-foreground">Interruptive confirmation dialog. Returns <code class="font-mono bg-muted px-1 rounded text-xs">Observable&lt;boolean&gt;</code>.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="flex gap-3 flex-wrap">
                <button k-button variant="destructive" (click)="openDeleteDialog()">
                  Delete Account
                </button>
                <button k-button variant="outline" (click)="openConfirmDialog()">
                  Confirm Action
                </button>
              </div>
              @if (alertResult() !== null) {
                <p class="mt-4 text-sm text-muted-foreground">
                  Result: <code class="font-mono bg-muted px-1 rounded text-xs">{{ alertResult() }}</code>
                </p>
              }
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="this.alertDialog.open({
  title: 'Are you sure?',
  description: 'This action cannot be undone.',
  intent: 'destructive'
}).subscribe(result => console.log(result));" language="typescript" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAlertDialogService</h3>
            <p class="text-sm text-muted-foreground">Injectable service: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">KAlertDialogService</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">open()</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">config: KAlertDialogConfig</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">Observable&lt;boolean&gt;</td>
                    <td class="px-4 py-3 text-muted-foreground">Opens the alert dialog. Returns an observable that resolves to true if confirmed, false if cancelled.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAlertDialogConfig</h3>
            <p class="text-sm text-muted-foreground">Interface for configuring the alert dialog.</p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">title <span class="text-destructive">*</span></td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">The title of the alert dialog.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">description</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">undefined</td>
                    <td class="px-4 py-3 text-muted-foreground">The description text of the alert dialog.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">confirmLabel</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Continue'</td>
                    <td class="px-4 py-3 text-muted-foreground">The text for the confirmation button.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">cancelLabel</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Cancel'</td>
                    <td class="px-4 py-3 text-muted-foreground">The text for the cancellation button.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">intent</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'destructive'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual intent of the confirmation button.</td>
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
export class AlertDialogShowcaseComponent {
  private readonly alertDialog = inject(KAlertDialogService);

  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly alertResult = signal<string | null>(null);

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
}
