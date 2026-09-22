import { ChangeDetectionStrategy, Component, computed, input, output, signal, contentChildren, ViewEncapsulation, InjectionToken, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cn } from '../../../core/utils/cn';
import { KDialog, KDialogHeader, KDialogTitle, KDialogContent, KDialogFooter, KDialogClose } from '../dialog/dialog.component';
import { KButtonDirective } from '../button/button.directive';
import { NgClass } from '@angular/common';

export interface StepperContext {
  steps: () => readonly KStepperStep[];
  currentStepIndex: () => number;
}

export const K_STEPPER = new InjectionToken<StepperContext>('K_STEPPER');

@Component({
  selector: 'k-stepper-step',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    '[attr.inert]': '_isActive() ? null : true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KStepperStep {
  private readonly ctx = inject(K_STEPPER);

  readonly class = input<string>('');
  readonly label = input.required<string>();
  readonly formGroup = input<FormGroup | null>(null);

  protected readonly _isActive = computed(() => {
    const steps = this.ctx.steps();
    const idx = this.ctx.currentStepIndex();
    return steps[idx] === this;
  });

  protected readonly classes = computed(() => cn(
    'col-start-1 row-start-1 block w-full transition-all duration-300',
    this._isActive() 
      ? 'opacity-100 z-10 animate-in fade-in slide-in-from-right-4' 
      : 'opacity-0 z-0 pointer-events-none invisible',
    this.class()
  ));

  isValid(): boolean {
    const fg = this.formGroup();
    return fg ? fg.valid : true;
  }
}

@Component({
  selector: 'k-stepper',
  imports: [KDialog, KDialogHeader, KDialogTitle, KDialogContent, KDialogFooter, KButtonDirective, NgClass],
  providers: [{
    provide: K_STEPPER,
    useExisting: KStepper,
  }],
  template: `
    <k-dialog [size]="size()">
      <k-dialog-header>
        @if (currentStep(); as step) {
          <k-dialog-title>{{ step.label() }}</k-dialog-title>
        }
        
        <!-- Step Indicators -->
        <div class="mt-4 flex w-full items-center pb-2">
          @for (step of steps(); track step.label(); let i = $index; let isLast = $last) {
            <div class="flex items-center" [class.flex-1]="!isLast">
              <div 
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300"
                [ngClass]="{
                  'bg-primary text-primary-foreground': currentStepIndex() >= i,
                  'bg-muted text-muted-foreground': currentStepIndex() < i
                }"
              >
                {{ i + 1 }}
              </div>
              @if (!isLast) {
                <div 
                  class="mx-2 h-1 w-full transition-colors duration-300"
                  [ngClass]="{
                    'bg-primary': currentStepIndex() > i,
                    'bg-muted': currentStepIndex() <= i
                  }"
                ></div>
              }
            </div>
          }
        </div>
      </k-dialog-header>

      <k-dialog-content>
        <!-- Grid wrapper so all steps occupy the exact same space. The container naturally fits the largest step. -->
        <div class="grid w-full">
          <ng-content />
        </div>
      </k-dialog-content>

      <k-dialog-footer>
        <button 
          k-button 
          variant="outline" 
          (click)="previous()" 
          [disabled]="isFirst()"
        >
          Back
        </button>
        <button 
          k-button 
          (click)="next()" 
        >
          {{ isLast() ? 'Finish' : 'Next' }}
        </button>
      </k-dialog-footer>
    </k-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KStepper implements StepperContext {
  readonly size = input<'sm' | 'default' | 'lg' | 'xl' | 'full'>('default');
  readonly complete = output<void>();

  readonly steps = contentChildren(KStepperStep);
  readonly currentStepIndex = signal<number>(0);

  protected readonly currentStep = computed(() => {
    const stepsArr = this.steps();
    return stepsArr[this.currentStepIndex()] ?? null;
  });

  protected readonly isFirst = computed(() => this.currentStepIndex() === 0);
  protected readonly isLast = computed(() => this.currentStepIndex() === this.steps().length - 1);
  
  isValidCurrentStep(): boolean {
    const step = this.currentStep();
    return step ? step.isValid() : false;
  }

  next() {
    if (!this.isValidCurrentStep()) {
      const fg = this.currentStep()?.formGroup();
      if (fg) fg.markAllAsTouched();
      return;
    }

    if (this.isLast()) {
      this.complete.emit();
    } else {
      this.currentStepIndex.update(v => v + 1);
    }
  }

  previous() {
    this.currentStepIndex.update(v => Math.max(0, v - 1));
  }
}

