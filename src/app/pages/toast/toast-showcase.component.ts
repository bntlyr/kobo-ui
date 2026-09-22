import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KToastService } from '../../components/ui/toast/toast.service';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const TOAST_USAGE = `import { inject } from '@angular/core';
import { KToastService } from './components/ui/toast/toast.service';

export class MyComponent {
  private toast = inject(KToastService);

  showSuccess()     { this.toast.success('Saved!', 'Your changes have been saved.'); }
  showError()       { this.toast.error('Failed', 'Something went wrong.'); }
  showWarning()     { this.toast.warning('Low storage', 'Only 500MB remaining.'); }
  showInfo()        { this.toast.info('Update available', 'Version 2.0 is ready.'); }
}`;

@Component({
  selector: 'app-toast-showcase',
  imports: [KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">toast</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Toast</h1>
          <p class="text-lg text-muted-foreground">
            Stacked notifications via <code class="font-mono bg-muted px-1 rounded text-xs">KToastService</code>.
            Add <code class="font-mono bg-muted px-1 rounded text-xs">&lt;k-toaster /&gt;</code> to your shell.
          </p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <p class="text-sm text-muted-foreground mb-4">Click a button to trigger a toast notification:</p>
              <div class="flex flex-wrap gap-3">
                <button k-button (click)="showToast('default')">Default</button>
                <button k-button variant="secondary" (click)="showToast('info')">Info</button>
                <button k-button class="!bg-green-600 !text-white hover:!bg-green-700" (click)="showToast('success')">Success</button>
                <button k-button class="!bg-amber-500 !text-white hover:!bg-amber-600" (click)="showToast('warning')">Warning</button>
                <button k-button variant="destructive" (click)="showToast('destructive')">Error</button>
              </div>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="typescript" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KToastService</h3>
            <p class="text-sm text-muted-foreground">Injectable service to show toast notifications.</p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">show</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">options: KToastOptions</td>
                    <td class="px-4 py-3 font-mono text-xs">string</td>
                    <td class="px-4 py-3 text-muted-foreground">Displays a toast and returns its unique ID.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">success</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">title: string, description?: string</td>
                    <td class="px-4 py-3 font-mono text-xs">string</td>
                    <td class="px-4 py-3 text-muted-foreground">Shorthand for showing a success toast.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">error</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">title: string, description?: string</td>
                    <td class="px-4 py-3 font-mono text-xs">string</td>
                    <td class="px-4 py-3 text-muted-foreground">Shorthand for showing a destructive toast.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">warning</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">title: string, description?: string</td>
                    <td class="px-4 py-3 font-mono text-xs">string</td>
                    <td class="px-4 py-3 text-muted-foreground">Shorthand for showing a warning toast.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">info</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">title: string, description?: string</td>
                    <td class="px-4 py-3 font-mono text-xs">string</td>
                    <td class="px-4 py-3 text-muted-foreground">Shorthand for showing an info toast.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">dismiss</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">id: string</td>
                    <td class="px-4 py-3 font-mono text-xs">void</td>
                    <td class="px-4 py-3 text-muted-foreground">Dismisses a toast by its ID.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KToastOptions</h3>
            <p class="text-sm text-muted-foreground">Options passed to the <code>show</code> method.</p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">title</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">(required)</td>
                    <td class="px-4 py-3 text-muted-foreground">The main title of the toast.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">description</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">undefined</td>
                    <td class="px-4 py-3 text-muted-foreground">The secondary description text.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'success' | 'warning' | 'destructive' | 'info'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual variant of the toast.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">duration</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">4000</td>
                    <td class="px-4 py-3 text-muted-foreground">How long the toast stays visible in milliseconds. 0 to disable auto-dismiss.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KToaster</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-toaster</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">position</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">ToastPosition</td>
                    <td class="px-4 py-3 font-mono text-xs">'bottom-right'</td>
                    <td class="px-4 py-3 text-muted-foreground">Where the toasts are displayed on the screen. Options: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'</td>
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
export class ToastShowcaseComponent {
  private readonly toast = inject(KToastService);
  
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = TOAST_USAGE;

  showToast(variant: string): void {
    const msgs: Record<string, () => void> = {
      default:     () => this.toast.show({ title: 'Notification', description: 'This is a default toast.' }),
      info:        () => this.toast.info('Heads up!', 'A new version of Kobo UI is available.'),
      success:     () => this.toast.success('Saved!', 'Your changes have been applied successfully.'),
      warning:     () => this.toast.warning('Storage low', 'Only 500 MB remaining.'),
      destructive: () => this.toast.error('Error', 'Failed to connect to the server.'),
    };
    msgs[variant]?.();
  }
}
