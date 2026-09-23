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
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const checkboxVariants = cva(
  'shrink-0 flex items-center justify-center rounded-sm border transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm:      'h-3 w-3 mt-1',
        default: 'h-4 w-4 mt-0.5',
        lg:      'h-5 w-5 mt-0',
      },
      error: {
        true:  'border-destructive',
        false: 'border-input hover:border-primary',
      },
      state: {
        checked: 'bg-primary border-primary text-primary-foreground',
        unchecked: 'bg-background',
      }
    },
    defaultVariants: {
      size: 'default',
      error: false,
      state: 'unchecked',
    }
  }
);

export type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>['size']>;

/**
 * <k-checkbox>
 *
 * Accessible checkbox implementing ControlValueAccessor.
 * Supports indeterminate state, keyboard interaction, and CDK focus styling.
 *
 * @example
 * <!-- Standalone -->
 * <k-checkbox [(checked)]="accepted">I accept the terms</k-checkbox>
 *
 * <!-- Reactive forms -->
 * <k-checkbox formControlName="newsletter" [error]="true">Subscribe to newsletter</k-checkbox>
 */
@Component({
  selector: 'k-checkbox',
  template: `
    <label
      [id]="'checkbox-wrapper-' + _uid"
      [class]="wrapperClasses()"
      [class.opacity-50]="disabled()"
      [class.cursor-not-allowed]="disabled()"
    >
      <!-- Hidden native checkbox for form compatibility -->
      <input
        #inputEl
        type="checkbox"
        class="sr-only"
        [id]="'checkbox-' + _uid"
        [disabled]="disabled()"
        [indeterminate]="indeterminate()"
        [checked]="checked()"
        (change)="onNativeChange($event)"
        (blur)="onTouched()"
      />

      <!-- Styled checkbox box -->
      <span
        [attr.aria-hidden]="'true'"
        [class]="boxClasses()"
      >
        @if (indeterminate()) {
          <svg [class]="iconClasses()" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M2 6h8"/>
          </svg>
        } @else if (checked()) {
          <svg [class]="iconClasses()" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2 6 5 9 10 3"/>
          </svg>
        }
      </span>

      <!-- Label content -->
      @if (hasContent) {
        <span class="text-sm leading-relaxed text-foreground">
          <ng-content />
        </span>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KCheckbox),
      multi: true,
    },
  ],
})
export class KCheckbox implements ControlValueAccessor {
  readonly _uid = Math.random().toString(36).slice(2, 8);
  readonly hasContent = true; // ng-content always present in template

  readonly indeterminate = model<boolean>(false);
  readonly checked       = model<boolean>(false);
  readonly size          = input<CheckboxSize>('default');
  readonly error         = input<boolean>(false);
  readonly class         = input<string>('');
  readonly disabled      = model<boolean>(false);

  private _onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  protected readonly wrapperClasses = computed(() => 
    cn('flex items-start gap-2 cursor-pointer select-none group', this.class())
  );

  protected readonly boxClasses = computed(() => {
    const c = this.checked();
    const i = this.indeterminate();
    const e = this.error();
    return cn(
      checkboxVariants({
        size: this.size(),
        error: e,
        state: (c || i) ? 'checked' : 'unchecked',
      }),
      'border-2',
      (c || i) && e ? 'border-destructive bg-destructive' : ''
    );
  });

  protected readonly iconClasses = computed(() => {
    return cn(
      'text-primary-foreground',
      this.size() === 'sm' ? 'h-2.5 w-2.5' :
      this.size() === 'lg' ? 'h-4 w-4' : 'h-3 w-3'
    );
  });

  onNativeChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.indeterminate.set(false);
    this.checked.set(checked);
    this._onChange(checked);
  }

  // ControlValueAccessor
  writeValue(value: boolean): void       { this.checked.set(!!value); }
  registerOnChange(fn: (v: boolean) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled.set(disabled); }
}
