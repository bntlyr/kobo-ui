import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../../core/utils/cn';

/**
 * <k-switch>
 *
 * Accessible toggle switch implementing ControlValueAccessor.
 * Uses role="switch" with aria-checked for screen reader compatibility.
 *
 * @example
 * <k-switch [(checked)]="isEnabled">Enable notifications</k-switch>
 * <k-switch formControlName="darkMode" />
 */
@Component({
  selector: 'k-switch',
  template: `
    <label class="flex items-center gap-3 cursor-pointer select-none group"
           [class.opacity-50]="disabled()"
           [class.cursor-not-allowed]="disabled()">

      <button
        type="button"
        role="switch"
        [attr.aria-checked]="checked()"
        [attr.disabled]="disabled() ? '' : null"
        (click)="toggle()"
        class="relative inline-flex shrink-0 cursor-pointer items-center rounded-full
               border-2 border-transparent transition-all duration-200
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
               disabled:cursor-not-allowed disabled:opacity-50"
        [class]="trackClasses()"
      >
        <span
          class="pointer-events-none block rounded-full bg-background shadow-lg ring-0
                 transition-transform duration-200"
          [class]="thumbClasses()"
        ></span>
      </button>

      <ng-content />
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KSwitch),
      multi: true,
    },
  ],
})
export class KSwitch implements ControlValueAccessor {
  readonly size    = input<'sm' | 'default' | 'lg'>('default');
  readonly checked  = model<boolean>(false);
  readonly disabled = signal<boolean>(false);

  private _onChange: (value: boolean) => void = () => {};
  private _onTouched: () => void = () => {};

  protected readonly trackClasses = computed(() => {
    const size = this.size();
    return cn(
      this.checked() ? 'bg-primary' : 'bg-input',
      {
        sm:      'h-5 w-9',
        default: 'h-6 w-11',
        lg:      'h-7 w-14',
      }[size]
    );
  });

  protected readonly thumbClasses = computed(() => {
    const size = this.size();
    const on = this.checked();
    return cn(
      {
        sm:      on ? 'h-4 w-4 translate-x-4' : 'h-4 w-4 translate-x-0',
        default: on ? 'h-5 w-5 translate-x-5' : 'h-5 w-5 translate-x-0',
        lg:      on ? 'h-6 w-6 translate-x-7' : 'h-6 w-6 translate-x-0',
      }[size]
    );
  });

  toggle(): void {
    if (this.disabled()) return;
    const next = !this.checked();
    this.checked.set(next);
    this._onChange(next);
    this._onTouched();
  }

  writeValue(value: boolean): void { this.checked.set(!!value); }
  registerOnChange(fn: (v: boolean) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled.set(disabled); }
}
