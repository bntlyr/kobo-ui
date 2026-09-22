import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KInputOtp, KInputOtpGroup, KInputOtpSlot, KInputOtpSeparator } from '../../components/ui/input-otp';

@Component({
  selector: 'app-input-otp-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KInputOtp, KInputOtpGroup, KInputOtpSlot, KInputOtpSeparator],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Input OTP</h1>
        <p class="text-muted-foreground mt-2">Accessible one-time password component with copy paste functionality.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <k-input-otp [maxLength]="6">
              <k-input-otp-group>
                <k-input-otp-slot char="1"></k-input-otp-slot>
                <k-input-otp-slot char="2"></k-input-otp-slot>
                <k-input-otp-slot char="3"></k-input-otp-slot>
              </k-input-otp-group>
              <k-input-otp-separator></k-input-otp-separator>
              <k-input-otp-group>
                <k-input-otp-slot char="4" [isActive]="true"></k-input-otp-slot>
                <k-input-otp-slot></k-input-otp-slot>
                <k-input-otp-slot></k-input-otp-slot>
              </k-input-otp-group>
            </k-input-otp>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-input-otp [maxLength]="6"&gt;
  <k-input-otp-group>
    <k-input-otp-slot></k-input-otp-slot>
    <k-input-otp-slot></k-input-otp-slot>
    <k-input-otp-slot></k-input-otp-slot>
  </k-input-otp-group>
  <k-input-otp-separator></k-input-otp-separator>
  <k-input-otp-group>
    <k-input-otp-slot></k-input-otp-slot>
    <k-input-otp-slot></k-input-otp-slot>
    <k-input-otp-slot></k-input-otp-slot>
  </k-input-otp-group>
&lt;/k-input-otp&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputOtpShowcaseComponent {}
