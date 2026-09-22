import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  InjectionToken,
  input,
  model,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../../core/utils/cn';

export const K_INPUT_OTP = new InjectionToken<KInputOtp>('K_INPUT_OTP');

@Component({
  selector: 'k-input-otp',
  template: `
    <div [class]="classes()">
      <input
        #otpInput
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        [maxLength]="maxLength()"
        [value]="value()"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        class="absolute inset-0 z-[-1] opacity-0"
      />
      
      <div class="flex items-center gap-2">
        <ng-content />
      </div>
    </div>
  `,
  host: {
    '(click)': 'focusInput()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KInputOtp {
  readonly class = input<string>('');
  readonly maxLength = input<number>(6);
  readonly value = model<string>('');
  
  readonly isFocused = signal<boolean>(false);
  private readonly _slots = signal<KInputOtpSlot[]>([]);

  @ViewChild('otpInput') inputElement!: ElementRef<HTMLInputElement>;

  protected readonly classes = computed(() => cn('relative flex items-center gap-2 has-[:disabled]:opacity-50 cursor-text', this.class()));

  registerSlot(slot: KInputOtpSlot): void {
    this._slots.update(slots => [...slots, slot]);
  }

  getSlotIndex(slot: KInputOtpSlot): number {
    return this._slots().indexOf(slot);
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    const digitsOnly = val.replace(/\\D/g, '').slice(0, this.maxLength());
    this.value.set(digitsOnly);
    if (this.inputElement) {
      this.inputElement.nativeElement.value = digitsOnly;
    }
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }

  focusInput(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }
}

@Component({
  selector: 'k-input-otp-group',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KInputOtpGroup {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex items-center', this.class()));
}

@Component({
  selector: 'k-input-otp-slot',
  template: `
    <div [class]="classes()">
      {{ char() }}
      @if (isActive()) {
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-foreground duration-1000"></div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KInputOtpSlot implements OnInit {
  readonly class = input<string>('');
  
  private readonly otp = inject(KInputOtp);

  readonly index = computed(() => this.otp.getSlotIndex(this));
  readonly char = computed(() => this.otp.value()[this.index()] ?? '');
  
  readonly isActive = computed(() => {
    const valLen = this.otp.value().length;
    const idx = this.index();
    const isFocused = this.otp.isFocused();
    if (!isFocused) return false;
    
    // Active if it's the next slot to be filled, or if we're at the end and it's the last slot.
    if (idx === valLen) return true;
    if (valLen === this.otp.maxLength() && idx === valLen - 1) return true;
    return false;
  });

  protected readonly classes = computed(() => cn(
    'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
    this.isActive() && 'z-10 ring-2 ring-ring ring-offset-background',
    this.class()
  ));

  ngOnInit() {
    this.otp.registerSlot(this);
  }
}

@Component({
  selector: 'k-input-otp-separator',
  template: `
    <div role="separator" [class]="classes()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><circle cx="12" cy="12" r="1"/></svg>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KInputOtpSeparator {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('', this.class()));
}
