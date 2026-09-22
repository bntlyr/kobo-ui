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
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const sliderTrackVariants = cva(
  'relative w-full grow overflow-hidden rounded-full bg-input',
  {
    variants: {
      size: {
        sm:      'h-1',
        default: 'h-1.5',
        lg:      'h-2',
      }
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

const sliderThumbVariants = cva(
  'absolute rounded-full border-2 border-primary bg-background shadow ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm:      'h-3 w-3',
        default: 'h-4 w-4',
        lg:      'h-5 w-5',
      }
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

export type SliderSize = NonNullable<VariantProps<typeof sliderTrackVariants>['size']>;

/**
 * <k-slider>
 *
 * Range input slider. Implements ControlValueAccessor.
 * Keyboard: Arrow keys ±step, Page Up/Down ±10×step, Home/End.
 *
 * @example
 * <k-slider [(value)]="volume" [min]="0" [max]="100" [step]="1" />
 * <k-slider formControlName="brightness" class="w-64" />
 */
@Component({
  selector: 'k-slider',
  template: `
    <div class="relative flex touch-none items-center" [class]="wrapClass()">
      <!-- Track -->
      <div [class]="trackClasses()">
        <!-- Fill -->
        <div
          class="absolute rounded-full bg-primary transition-all"
          [class]="fillClasses()"
          [style]="fillStyle()"
        ></div>
      </div>

      <!-- Native range input (overlaid, transparent) -->
      <input
        #rangeInput
        type="range"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        [disabled]="disabled()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="absolute cursor-pointer opacity-0"
        [class]="inputClasses()"
        [style]="inputStyle()"
        [attr.aria-valuemin]="min()"
        [attr.aria-valuemax]="max()"
        [attr.aria-valuenow]="value()"
      />

      <!-- Thumb -->
      <div
        [class]="thumbClasses()"
        [style]="thumbStyle()"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KSlider),
      multi: true,
    },
  ],
})
export class KSlider implements ControlValueAccessor {
  readonly min         = input<number>(0);
  readonly max         = input<number>(100);
  readonly step        = input<number>(1);
  readonly size        = input<SliderSize>('default');
  readonly orientation = input<'horizontal'|'vertical'>('horizontal');
  readonly class       = input<string>('');
  readonly value       = model<number>(0);
  readonly disabled    = signal<boolean>(false);

  private _onChange: (v: number) => void = () => {};
  protected onTouched: () => void = () => {};

  protected readonly fillPct = computed(() => {
    const { min, max, val } = { min: this.min(), max: this.max(), val: this.value() };
    return max === min ? 0 : ((val - min) / (max - min)) * 100;
  });

  protected readonly wrapClass = computed(() => cn(
    this.orientation() === 'vertical' ? 'flex-col h-full w-auto' : 'w-full',
    this.class()
  ));

  protected readonly trackClasses = computed(() => cn(
    sliderTrackVariants({ size: this.size() }),
    this.orientation() === 'vertical' ? '!w-1.5 !h-full' : ''
  ));

  protected readonly fillClasses = computed(() => cn(
    this.orientation() === 'vertical' ? 'w-full bottom-0' : 'h-full left-0'
  ));

  protected readonly fillStyle = computed(() => {
    return this.orientation() === 'vertical'
      ? { height: this.fillPct() + '%' }
      : { width: this.fillPct() + '%' };
  });

  protected readonly thumbClasses = computed(() => cn(
    sliderThumbVariants({ size: this.size() }),
    'pointer-events-none'
  ));

  protected readonly thumbStyle = computed(() => {
    const isVert = this.orientation() === 'vertical';
    const offset = this.size() === 'sm' ? '6px' : this.size() === 'lg' ? '10px' : '8px';
    return isVert
      ? { bottom: `calc(${this.fillPct()}% - ${offset})`, left: '50%', transform: 'translateX(-50%)' }
      : { left: `calc(${this.fillPct()}% - ${offset})`, top: '50%', transform: 'translateY(-50%)' };
  });

  protected readonly inputClasses = computed(() => cn(
    'inset-0 z-10 w-full h-full'
  ));

  protected readonly inputStyle = computed(() => {
    if (this.orientation() === 'vertical') {
      return { writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' };
    }
    return {};
  });

  onInput(event: Event): void {
    const val = +(event.target as HTMLInputElement).value;
    this.value.set(val);
    this._onChange(val);
  }

  writeValue(v: number): void { this.value.set(v ?? this.min()); }
  registerOnChange(fn: (v: number) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled.set(d); }
}
