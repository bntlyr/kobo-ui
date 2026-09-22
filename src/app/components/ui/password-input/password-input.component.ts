import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  model,
  signal,
  booleanAttribute,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const passwordInputVariants = cva(
  [
    'flex w-full rounded-md border bg-transparent',
    'text-sm shadow-sm transition-colors',
    'placeholder:text-muted-foreground',
    'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
  ],
  {
    variants: {
      size: {
        sm:      'h-8 text-xs',
        default: 'h-10 text-sm',
        lg:      'h-12 text-base',
      },
      error: {
        true:  'border-destructive text-destructive focus-within:ring-destructive',
        false: 'border-input focus-within:ring-ring',
      },
    },
    defaultVariants: {
      size: 'default',
      error: false,
    },
  }
);

export type PasswordInputSize = NonNullable<VariantProps<typeof passwordInputVariants>['size']>;

/**
 * KPasswordInput
 *
 * A password input component with a toggle to show/hide the password.
 * Implements ControlValueAccessor for Reactive Forms compatibility.
 *
 * @example
 * <k-password-input placeholder="Enter password" />
 * <k-password-input formControlName="password" size="lg" />
 */
@Component({
  selector: 'k-password-input',
  template: `
    <div [class]="wrapperClasses()">
      <input
        [type]="showPassword() ? 'text' : 'password'"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.id]="id()"
        [attr.name]="name()"
        [attr.autocomplete]="autocomplete()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [class]="inputClasses()"
      />
      <button
        type="button"
        tabindex="-1"
        [disabled]="disabled()"
        (click)="toggleVisibility()"
        [class]="buttonClasses()"
        [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
      >
        @if (showPassword()) {
          <!-- Eye Off icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
            <path d="m2 2 20 20"/>
          </svg>
        } @else {
          <!-- Eye icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        }
      </button>
    </div>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KPasswordInput),
      multi: true,
    },
  ],
})
export class KPasswordInput implements ControlValueAccessor {
  readonly placeholder  = input<string>('');
  readonly size         = input<PasswordInputSize>('default');
  readonly error        = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly id           = input<string>('');
  readonly name         = input<string>('');
  readonly autocomplete = input<string>('current-password');
  readonly class        = input<string>('');

  readonly value        = model<string>('');
  readonly disabled     = signal<boolean>(false);
  readonly showPassword = signal<boolean>(false);

  private _onChange: (v: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected readonly wrapperClasses = computed(() =>
    cn(
      passwordInputVariants({ size: this.size(), error: this.error() }),
      'flex items-center',
      this.class()
    )
  );

  protected readonly inputClasses = computed(() =>
    cn(
      'flex-1 bg-transparent border-0 outline-none ring-0',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed',
      this.size() === 'sm' ? 'px-2.5 py-1' : this.size() === 'lg' ? 'px-4 py-3' : 'px-3 py-2',
      'h-full w-full',
    )
  );

  protected readonly buttonClasses = computed(() =>
    cn(
      'inline-flex items-center justify-center shrink-0',
      'text-muted-foreground hover:text-foreground',
      'transition-colors duration-150',
      'disabled:pointer-events-none disabled:opacity-50',
      'cursor-pointer bg-transparent border-0 outline-none',
      this.size() === 'sm' ? 'px-2' : this.size() === 'lg' ? 'px-3' : 'px-2.5',
    )
  );

  toggleVisibility(): void {
    this.showPassword.update(v => !v);
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this._onChange(val);
  }

  writeValue(v: string): void { this.value.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled.set(d); }
}
