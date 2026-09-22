import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KStepper, KStepperStep } from '../../components/ui/stepper';
import { KDialogService } from '../../components/ui/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { KFormField, KFormError, KFormHint } from '../../components/ui/form-field';
import { KLabelDirective } from '../../components/ui/label/label.directive';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { TabsComponent } from '../../shared/tabs.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-wizard-dialog',
  imports: [
    ReactiveFormsModule,
    KStepper, KStepperStep,
    KFormField, KFormError,
    KLabelDirective, KInputDirective
  ],
  template: `
    <k-stepper (complete)="onComplete()" size="lg">
      <k-stepper-step label="Personal Info" [formGroup]="personalForm">
        <div class="space-y-4" [formGroup]="personalForm">
          <k-form-field [control]="personalForm.get('name')">
            <label k-label for="name">Full Name</label>
            <input k-input id="name" formControlName="name" placeholder="John Doe" />
            <k-form-error />
          </k-form-field>
          
          <k-form-field [control]="personalForm.get('email')">
            <label k-label for="email">Email</label>
            <input k-input id="email" type="email" formControlName="email" placeholder="john@example.com" />
            <k-form-error />
          </k-form-field>
        </div>
      </k-stepper-step>

      <k-stepper-step label="Billing" [formGroup]="billingForm">
        <div class="space-y-4" [formGroup]="billingForm">
          <k-form-field [control]="billingForm.get('cardNumber')">
            <label k-label for="cardNumber">Card Number</label>
            <input k-input id="cardNumber" formControlName="cardNumber" placeholder="0000 0000 0000 0000" />
            <k-form-error />
          </k-form-field>

          <div class="grid grid-cols-2 gap-4">
            <k-form-field [control]="billingForm.get('expiry')">
              <label k-label for="expiry">Expiry</label>
              <input k-input id="expiry" formControlName="expiry" placeholder="MM/YY" />
              <k-form-error />
            </k-form-field>
            
            <k-form-field [control]="billingForm.get('cvc')">
              <label k-label for="cvc">CVC</label>
              <input k-input id="cvc" formControlName="cvc" placeholder="123" />
              <k-form-error />
            </k-form-field>
          </div>
        </div>
      </k-stepper-step>

      <k-stepper-step label="Review">
        <div class="rounded-xl bg-muted/50 p-6 text-sm">
          <h4 class="font-semibold mb-2">Almost done!</h4>
          <p class="text-muted-foreground">Please review your information before completing the setup. Your card will not be charged yet.</p>
        </div>
      </k-stepper-step>
    </k-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardDialogComponent {
  private dialogRef = inject(DialogRef);

  personalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  billingForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(16)]),
    expiry: new FormControl('', Validators.required),
    cvc: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  onComplete() {
    // Collect the data
    const payload = {
      ...this.personalForm.value,
      ...this.billingForm.value
    };
    
    // Close the dialog and pass the data back to the caller
    this.dialogRef.close(payload);
  }
}

@Component({
  selector: 'app-stepper-showcase',
  imports: [KButtonDirective, TabsComponent, CodeBlockComponent, JsonPipe],
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">stepper</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Stepper</h1>
          <p class="text-lg text-muted-foreground">A modal wizard combining dialogs and multi-step forms.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 flex flex-col items-center gap-4">
              <button k-button (click)="openWizard()">Open Wizard Modal</button>
              
              @if (wizardResult()) {
                <div class="w-full mt-8 space-y-2">
                  <p class="text-sm font-semibold">Result Data:</p>
                  <pre class="rounded-md bg-muted p-4 text-xs overflow-x-auto"><code>{{ wizardResult() | json }}</code></pre>
                </div>
              }
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4 space-y-4">
              <div>
                <p class="text-sm font-semibold mb-2">Usage</p>
                <app-code-block [code]="codeUsage" language="typescript" />
              </div>
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KStepper</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-stepper</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">DialogSize</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The size of the underlying dialog modal.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">(complete)</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">EventEmitter&lt;void&gt;</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">Emitted when the final "Finish" button is clicked.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KStepperStep</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-stepper-step</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">label</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">Required</td>
                    <td class="px-4 py-3 text-muted-foreground">The title displayed in the step indicator.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">formGroup</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">FormGroup</td>
                    <td class="px-4 py-3 font-mono text-xs">null</td>
                    <td class="px-4 py-3 text-muted-foreground">If provided, automatically disables "Next" until the form is valid.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class StepperShowcaseComponent {
  private dialog = inject(KDialogService);
  
  readonly tabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' }
  ];
  readonly tab = signal('preview');

  wizardResult = signal<any>(null);

  openWizard() {
    const ref = this.dialog.open(WizardDialogComponent, { disableClose: true });
    
    ref.closed.subscribe(result => {
      if (result) {
        this.wizardResult.set(result);
      }
    });
  }

  codeUsage = `
@Component({
  template: \`
    <k-stepper (complete)="onComplete()">
      <k-stepper-step label="Profile" [formGroup]="profileForm">
        <!-- Profile inputs -->
      </k-stepper-step>

      <k-stepper-step label="Billing" [formGroup]="billingForm">
        <!-- Billing inputs -->
      </k-stepper-step>
    </k-stepper>
  \`
})
export class WizardDialogComponent {
  profileForm = new FormGroup({...});
  billingForm = new FormGroup({...});

  onComplete() {
    const data = { ...this.profileForm.value, ...this.billingForm.value };
    this.dialogRef.close(data);
  }
}
  `.trim();
}
