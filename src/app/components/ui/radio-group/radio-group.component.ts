import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  signal,
  effect,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

export type RadioSize = 'sm' | 'default' | 'lg';

// ---- DI Context ----

export interface RadioGroupContext {
  selected: ReturnType<typeof signal<string>>;
  disabled: ReturnType<typeof signal<boolean>>;
  size: ReturnType<typeof signal<RadioSize>>;
  select(value: string): void;
}

export const K_RADIO_GROUP = new InjectionToken<RadioGroupContext>('K_RADIO_GROUP');

// ---- Radio Group ----

/**
 * <k-radio-group>
 *
 * ControlValueAccessor wrapper. Provides context to radio items.
 */
@Component({
  selector: 'k-radio-group',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'role': 'radiogroup',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KRadioGroup),
      multi: true,
    },
    {
      provide: K_RADIO_GROUP,
      useFactory: () => {
        const group = inject(KRadioGroup, { self: true });
        return {
          selected: group._selected,
          disabled: group._disabled,
          size: group._size,
          select: (v: string) => group._select(v),
        };
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KRadioGroup implements ControlValueAccessor {
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly size        = input<RadioSize>('default');
  readonly class       = input<string>('');

  readonly _selected = signal<string>('');
  readonly _disabled = signal<boolean>(false);
  readonly _size     = signal<RadioSize>('default');

  constructor() {
    effect(() => {
      this._size.set(this.size());
    });
  }

  private _onChange: (v: string) => void = () => {};
  private _onTouched: () => void = () => {};

  protected readonly classes = computed(() =>
    cn(
      'flex',
      this.orientation() === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4',
      this.class()
    )
  );

  _select(value: string): void {
    this._selected.set(value);
    this._onChange(value);
    this._onTouched();
  }

  writeValue(v: string): void { this._selected.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(d: boolean): void { this._disabled.set(d); }
}

const radioCircleVariants = cva(
  'flex items-center justify-center rounded-full border-2 transition-all duration-150 bg-background hover:border-primary',
  {
    variants: {
      size: {
        sm:      'h-3 w-3 mt-0.5',
        default: 'h-4 w-4 mt-0.5',
        lg:      'h-5 w-5 mt-0',
      },
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

const radioDotVariants = cva(
  'rounded-full bg-primary',
  {
    variants: {
      size: {
        sm:      'h-1.5 w-1.5',
        default: 'h-2 w-2',
        lg:      'h-2.5 w-2.5',
      },
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

// ---- Radio Item ----

/**
 * <k-radio-item>
 */
@Component({
  selector: 'k-radio-item',
  template: `
    <label class="flex items-start gap-2.5 cursor-pointer select-none"
           [class.opacity-50]="isDisabled()"
           [class.cursor-not-allowed]="isDisabled()">

      <input
        type="radio"
        class="sr-only"
        [value]="value()"
        [checked]="isChecked()"
        [disabled]="isDisabled()"
        (change)="select()"
      />

      <!-- Custom radio circle -->
      <span [class]="circleClasses()">
        @if (isChecked()) {
          <span [class]="dotClasses()"></span>
        }
      </span>

      <span class="text-sm text-foreground"><ng-content /></span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KRadioItem {
  readonly value    = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly class    = input<string>('');

  private readonly group = inject(K_RADIO_GROUP, { optional: true });

  protected readonly isChecked  = computed(() => this.group?.selected() === this.value());
  protected readonly isDisabled = computed(() => this.disabled() || (this.group?.disabled() ?? false));
  protected readonly size = computed(() => this.group?.size() ?? 'default');

  protected readonly circleClasses = computed(() =>
    cn(
      radioCircleVariants({ size: this.size() }),
      this.isChecked() ? 'border-primary' : 'border-input',
    )
  );

  protected readonly dotClasses = computed(() =>
    radioDotVariants({ size: this.size() })
  );

  select(): void {
    if (this.isDisabled()) return;
    this.group?.select(this.value());
  }
}
