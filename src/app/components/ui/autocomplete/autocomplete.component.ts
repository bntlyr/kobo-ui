import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  booleanAttribute,
} from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

// ---- Types ----

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

// ---- CVA ----

const autocompleteVariants = cva(
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

export type AutocompleteSize = NonNullable<VariantProps<typeof autocompleteVariants>['size']>;

/**
 * KAutocomplete
 *
 * A searchable text input with a suggestions dropdown.
 * Implements ControlValueAccessor for Reactive Forms.
 *
 * @example
 * <k-autocomplete [options]="countries" placeholder="Search country..." />
 * <k-autocomplete [options]="users" formControlName="user" [freeText]="true" />
 */
@Component({
  selector: 'k-autocomplete',
  template: `
    <div #wrapperDiv [class]="wrapperClasses()" (click)="onTriggerClick()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="shrink-0 text-muted-foreground"
           [class.ml-2]="size() === 'sm'"
           [class.ml-2.5]="size() === 'default'"
           [class.ml-3]="size() === 'lg'">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
      <input
        #inputEl
        type="text"
        [placeholder]="placeholder()"
        [value]="searchTerm()"
        [disabled]="disabled()"
        (input)="onSearchInput($event)"
        (focus)="open()"
        (blur)="onBlur()"
        (keydown.arrowDown)="onArrowDown($event)"
        (keydown.arrowUp)="onArrowUp($event)"
        (keydown.enter)="onEnter($event)"
        (keydown.escape)="close()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-autocomplete]="'list'"
        role="combobox"
        [class]="inputClasses()"
      />
      @if (searchTerm() && !disabled()) {
        <button
          type="button"
          tabindex="-1"
          (mousedown)="clearSearch($event)"
          class="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-0 outline-none"
          [class.mr-2]="size() === 'sm'"
          [class.mr-2.5]="size() === 'default'"
          [class.mr-3]="size() === 'lg'"
          aria-label="Clear"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      }
    </div>

    <!-- Dropdown template -->
    <ng-template #dropdownTpl>
      <div [class]="dropdownClasses()">
        <div class="max-h-60 overflow-y-auto py-1" role="listbox">
          @for (opt of filteredOptions(); track opt.value; let i = $index) {
            <div
              [class]="optionClasses(opt, i)"
              (mousedown)="selectOption(opt, $event)"
              role="option"
              [attr.aria-selected]="value() === opt.value"
            >
              <div class="flex flex-col">
                <span>{{ opt.label }}</span>
                @if (opt.description) {
                  <span class="text-xs text-muted-foreground">{{ opt.description }}</span>
                }
              </div>
              @if (value() === opt.value) {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                     stroke-linejoin="round" class="shrink-0 ml-auto">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              }
            </div>
          } @empty {
            <div class="px-2 py-4 text-center text-sm text-muted-foreground">
              @if (emptyMessage()) {
                {{ emptyMessage() }}
              } @else {
                No results found
              }
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KAutocomplete),
      multi: true,
    },
  ],
})
export class KAutocomplete implements ControlValueAccessor, OnDestroy {
  readonly options      = input.required<AutocompleteOption[]>();
  readonly placeholder  = input<string>('Search…');
  readonly size         = input<AutocompleteSize>('default');
  readonly error        = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly freeText     = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly emptyMessage = input<string>('');
  readonly class        = input<string>('');

  readonly value           = model<string>('');
  readonly optionSelected  = output<AutocompleteOption>();

  readonly disabled     = signal<boolean>(false);
  readonly isOpen       = signal<boolean>(false);
  readonly searchTerm   = signal<string>('');
  readonly activeIndex  = signal<number>(-1);

  @ViewChild('dropdownTpl', { static: true }) dropdownTpl!: TemplateRef<unknown>;
  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('wrapperDiv', { static: true }) wrapperDiv!: ElementRef<HTMLDivElement>;

  private readonly overlay = inject(Overlay);
  private readonly elRef   = inject(ElementRef<HTMLElement>);
  private readonly vcr     = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;

  private _onChange: (v: string) => void = () => {};
  private _onTouched: () => void = () => {};

  protected readonly filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const opts = this.options();
    if (!term) return opts;
    return opts.filter(o =>
      o.label.toLowerCase().includes(term) ||
      (o.description?.toLowerCase().includes(term) ?? false)
    );
  });

  protected readonly wrapperClasses = computed(() =>
    cn(
      autocompleteVariants({ size: this.size(), error: this.error() }),
      'flex items-center',
      this.class()
    )
  );

  protected readonly inputClasses = computed(() =>
    cn(
      'flex-1 bg-transparent border-0 outline-none ring-0',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed',
      this.size() === 'sm' ? 'px-1.5 py-1' : this.size() === 'lg' ? 'px-3 py-3' : 'px-2 py-2',
      'h-full w-full',
    )
  );

  protected readonly dropdownClasses = computed(() =>
    cn(
      'w-full overflow-hidden rounded-md border border-border bg-popover',
      'text-popover-foreground shadow-md z-50 animate-slide-in-up',
    )
  );

  protected optionClasses(opt: AutocompleteOption, index: number): string {
    return cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5',
      'text-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      this.value() === opt.value ? 'bg-accent/50' : '',
      this.activeIndex() === index ? 'bg-accent text-accent-foreground' : '',
      opt.disabled ? 'pointer-events-none opacity-50' : '',
    );
  }

  onTriggerClick(): void {
    this.inputEl?.nativeElement?.focus();
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchTerm.set(val);
    this.activeIndex.set(-1);
    if (this.freeText()) {
      this.value.set(val);
      this._onChange(val);
    }
    if (!this.isOpen()) this.open();
  }

  selectOption(opt: AutocompleteOption, event?: Event): void {
    event?.preventDefault();
    if (opt.disabled) return;
    this.value.set(opt.value);
    this.searchTerm.set(opt.label);
    this._onChange(opt.value);
    this.optionSelected.emit(opt);
    this.close();
  }

  clearSearch(event: Event): void {
    event.preventDefault();
    this.searchTerm.set('');
    this.value.set('');
    this._onChange('');
    this.inputEl?.nativeElement?.focus();
  }

  onArrowDown(event: Event): void {
    event.preventDefault();
    const opts = this.filteredOptions();
    if (opts.length === 0) return;
    this.activeIndex.update(i => Math.min(i + 1, opts.length - 1));
    if (!this.isOpen()) this.open();
  }

  onArrowUp(event: Event): void {
    event.preventDefault();
    this.activeIndex.update(i => Math.max(i - 1, 0));
  }

  onEnter(event: Event): void {
    event.preventDefault();
    const idx = this.activeIndex();
    const opts = this.filteredOptions();
    if (idx >= 0 && idx < opts.length) {
      this.selectOption(opts[idx]);
    }
  }

  onBlur(): void {
    // Delay to allow mousedown on option to fire first
    setTimeout(() => {
      if (this.isOpen()) this.close();
      this._onTouched();
    }, 150);
  }

  open(): void {
    if (this.overlayRef?.hasAttached() || this.disabled()) return;

    const positions: ConnectedPosition[] = [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.wrapperDiv)
      .withPositions(positions)
      .withGrowAfterOpen(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      width: this.wrapperDiv.nativeElement.offsetWidth,
    });

    this.overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new TemplatePortal(this.dropdownTpl, this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
  }

  close(): void {
    this.overlayRef?.detach();
    this.isOpen.set(false);
    this.activeIndex.set(-1);
  }

  writeValue(v: string): void {
    this.value.set(v ?? '');
    // Set the search term to the matching label
    const opt = this.options().find(o => o.value === v);
    if (opt) this.searchTerm.set(opt.label);
    else this.searchTerm.set(v ?? '');
  }
  registerOnChange(fn: (v: string) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled.set(d); }

  ngOnDestroy(): void { this.overlayRef?.dispose(); }
}
