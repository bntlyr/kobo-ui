import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KAlert, KAlertTitle, KAlertDescription } from '../../components/ui/alert/index';
import { KToastService } from '../../components/ui/toast/toast.service';
import { KProgress } from '../../components/ui/progress/progress.component';
import { KSpinner } from '../../components/ui/spinner/spinner.component';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const ALERT_USAGE = `<k-alert variant="success">
  <k-alert-title>Payment received!</k-alert-title>
  <k-alert-description>Your subscription has been activated.</k-alert-description>
</k-alert>

<k-alert variant="destructive">
  <k-alert-title>Error</k-alert-title>
  <k-alert-description>Invalid API key. Please check your credentials.</k-alert-description>
</k-alert>`;

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
  selector: 'app-feedback-showcase',
  imports: [
    KAlert, KAlertTitle, KAlertDescription,
    KProgress, KSpinner,
    KButtonDirective, KSeparatorDirective,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>components</span><span>/</span><span class="text-foreground">feedback</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Feedback</h1>
        <p class="text-lg text-muted-foreground">Alert, Toast, Progress, and Spinner components.</p>
      </div>

      <!-- Alert -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Alert</h2>
        <p class="text-muted-foreground text-sm">Inline status messages with 5 variants.</p>

        <app-tabs [tabs]="tabs" [(active)]="alertTab">
          @if (alertTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-4">
              <k-alert>
                <k-alert-title>Default alert</k-alert-title>
                <k-alert-description>This is a general informational message.</k-alert-description>
              </k-alert>
              <k-alert variant="info">
                <k-alert-title>Heads up!</k-alert-title>
                <k-alert-description>You can add components to your app using the CLI.</k-alert-description>
              </k-alert>
              <k-alert variant="success">
                <k-alert-title>Payment successful</k-alert-title>
                <k-alert-description>Your subscription has been activated. Thank you!</k-alert-description>
              </k-alert>
              <k-alert variant="warning">
                <k-alert-title>Storage almost full</k-alert-title>
                <k-alert-description>You've used 85% of your 5 GB storage quota.</k-alert-description>
              </k-alert>
              <k-alert variant="destructive">
                <k-alert-title>Error</k-alert-title>
                <k-alert-description>Your session has expired. Please log in again.</k-alert-description>
              </k-alert>
            </div>
          }
          @if (alertTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="alertUsage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator />

      <!-- Toast -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Toast</h2>
        <p class="text-muted-foreground text-sm">
          Stacked notifications via <code class="font-mono bg-muted px-1 rounded text-xs">KToastService</code>.
          Add <code class="font-mono bg-muted px-1 rounded text-xs">&lt;k-toaster /&gt;</code> to your shell.
        </p>

        <app-tabs [tabs]="tabs" [(active)]="toastTab">
          @if (toastTab() === 'preview') {
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
          @if (toastTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="toastUsage" language="typescript" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator />

      <!-- Progress -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Progress</h2>
        <p class="text-muted-foreground text-sm">Linear progress bar with ARIA attributes.</p>

        <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">
          @for (item of progressItems; track item.label) {
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="font-medium">{{ item.label }}</span>
                <span class="text-muted-foreground">{{ item.value }}%</span>
              </div>
              <k-progress [value]="item.value" [class]="item.class" />
            </div>
          }

          <div class="flex gap-3">
            <button k-button size="sm" variant="outline" (click)="decrementProgress()">−10%</button>
            <button k-button size="sm" variant="outline" (click)="incrementProgress()">+10%</button>
            <span class="text-sm text-muted-foreground self-center">Live: {{ liveProgress() }}%</span>
          </div>
          <k-progress [value]="liveProgress()" class="h-3" />
        </div>
      </section>

      <hr k-separator />

      <!-- Spinner -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Spinner</h2>
        <p class="text-muted-foreground text-sm">SVG spinner with 4 sizes and custom color.</p>

        <div class="rounded-xl border border-border bg-card p-8 mt-4">
          <div class="flex flex-wrap items-center gap-8">
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="sm" />
              <span class="text-xs text-muted-foreground">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner />
              <span class="text-xs text-muted-foreground">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" />
              <span class="text-xs text-muted-foreground">lg</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="xl" />
              <span class="text-xs text-muted-foreground">xl</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" class="text-primary" />
              <span class="text-xs text-muted-foreground">primary</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" class="text-green-500" />
              <span class="text-xs text-muted-foreground">success</span>
            </div>
          </div>
          <div class="mt-6 pt-4 border-t border-border">
            <button k-button [disabled]="loading()" (click)="simulateLoad()">
              @if (loading()) {
                <k-spinner size="sm" class="mr-2 text-primary-foreground" />
                Loading...
              } @else {
                Submit
              }
            </button>
          </div>
        </div>
      </section>
      <!-- ============================================ -->
      <!-- VARIANT MATRIX -->
      <!-- ============================================ -->
      <hr k-separator />
      <h2 class="text-2xl font-bold tracking-tight">Variant Matrix</h2>

      <!-- Progress Sizes -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Progress — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4 max-w-md">
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="sm"</span>
            <k-progress [value]="60" size="sm" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="default"</span>
            <k-progress [value]="60" size="default" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="lg"</span>
            <k-progress [value]="60" size="lg" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">size="xl"</span>
            <k-progress [value]="60" size="xl" />
          </div>
        </div>
      </section>

      <!-- Progress States -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Progress — States</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4 max-w-md">
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">state="normal" (default)</span>
            <k-progress [value]="60" state="normal" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">state="success"</span>
            <k-progress [value]="100" state="success" />
          </div>
          <div class="space-y-1">
            <span class="text-xs text-muted-foreground">state="error"</span>
            <k-progress [value]="40" state="error" />
          </div>
        </div>
      </section>

      <!-- Spinner Sizes -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Spinner — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="sm" />
              <span class="text-xs text-muted-foreground">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="default" />
              <span class="text-xs text-muted-foreground">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" />
              <span class="text-xs text-muted-foreground">lg</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="xl" />
              <span class="text-xs text-muted-foreground">xl</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Spinner Colors -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Spinner — Colors</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" color="primary" />
              <span class="text-xs text-muted-foreground">primary</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-spinner size="lg" color="muted" />
              <span class="text-xs text-muted-foreground">muted</span>
            </div>
            <div class="flex flex-col items-center gap-2 bg-primary rounded-lg p-3">
              <k-spinner size="lg" color="white" />
              <span class="text-xs text-primary-foreground">white</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class FeedbackShowcaseComponent {
  private readonly toast = inject(KToastService);

  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly alertTab = signal('preview');
  readonly toastTab = signal('preview');
  readonly alertUsage = ALERT_USAGE;
  readonly toastUsage = TOAST_USAGE;

  readonly liveProgress = signal(45);
  readonly loading       = signal(false);

  readonly progressItems = [
    { label: 'Storage',     value: 66,  class: '' },
    { label: 'Bandwidth',   value: 34,  class: 'h-3' },
    { label: 'API Credits', value: 92,  class: 'h-1.5' },
  ];

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

  incrementProgress(): void { this.liveProgress.update(v => Math.min(100, v + 10)); }
  decrementProgress(): void { this.liveProgress.update(v => Math.max(0, v - 10)); }

  simulateLoad(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.toast.success('Done!', 'The operation completed successfully.');
    }, 2000);
  }
}
