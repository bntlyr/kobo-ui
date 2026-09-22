import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KInputOtp, KInputOtpGroup, KInputOtpSlot, KInputOtpSeparator } from '../../components/ui/input-otp/input-otp.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-input-otp-showcase',
  imports: [KInputOtp, KInputOtpGroup, KInputOtpSlot, KInputOtpSeparator, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">input-otp</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Input OTP</h1>
        <p class="text-lg text-muted-foreground">
          Accessible one-time password component with copy paste functionality.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4">
            <div class="flex min-h-[350px] items-center justify-center">
              <k-input-otp [maxLength]="6" [(value)]="otpValue">
                <k-input-otp-group>
                  <k-input-otp-slot />
                  <k-input-otp-slot />
                  <k-input-otp-slot />
                </k-input-otp-group>
                <k-input-otp-separator />
                <k-input-otp-group>
                  <k-input-otp-slot />
                  <k-input-otp-slot />
                  <k-input-otp-slot />
                </k-input-otp-group>
              </k-input-otp>
            </div>
            <div class="text-center mt-4 text-sm text-muted-foreground">
              Value: {{ otpValue() || 'None' }}
            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add input-otp" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Usage</p>
              <app-code-block code="&lt;k-input-otp [maxLength]=&quot;6&quot; [(value)]=&quot;val&quot;&gt;
  &lt;k-input-otp-group&gt;
    &lt;k-input-otp-slot /&gt;
    &lt;k-input-otp-slot /&gt;
    &lt;k-input-otp-slot /&gt;
  &lt;/k-input-otp-group&gt;
  &lt;k-input-otp-separator /&gt;
  &lt;k-input-otp-group&gt;
    &lt;k-input-otp-slot /&gt;
    &lt;k-input-otp-slot /&gt;
    &lt;k-input-otp-slot /&gt;
  &lt;/k-input-otp-group&gt;
&lt;/k-input-otp&gt;" language="html" />
            </div>
          </div>
        }
      </app-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KInputOtp</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-input-otp</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs text-primary">ModelSignal&lt;string&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">The current value of the OTP input. Supports two-way binding.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">maxLength</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">number</td>
                    <td class="px-4 py-3 font-mono text-xs">6</td>
                    <td class="px-4 py-3 text-muted-foreground">Maximum length of the OTP string.</td>
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
            <h3 class="text-lg font-semibold">KInputOtpSlot</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-input-otp-slot</code></p>
            
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
export default class InputOtpShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');
  readonly otpValue = signal<string>('');
}
