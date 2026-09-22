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

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ---- CVA ----

const multiSelectVariants = cva(
  [
    'flex min-h-[2.5rem] w-full flex-wrap items-center gap-1 rounded-md border bg-transparent',
    'px-2 py-1.5 text-sm shadow-sm transition-colors',
    'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50',
  ],
  {
    variants: {
      size: {
        sm:      'min-h-[2rem] px-2 py-1 text-xs gap-0.5',
        default: 'min-h-[2.5rem] px-2 py-1.5 text-sm gap-1',
        lg:      'min-h-[3rem] px-3 py-2 text-base gap-1.5',
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

export type MultiSelectSize = NonNullable<VariantProps<typeof multiSelectVariants>['size']>;

/**
 * KMultiSelect
 *
 * A multi-select component with chip/tag display for selected items.
 * Supports searchable filtering of options.
 * Implements ControlValueAccessor for Reactive Forms.
 *
 * @example
 * <k-multi-select [options]="fruits" placeholder="Select fruits..." />
 * <k-multi-select [options]="tags" [searchable]="true" formControlName="tags" />
 */
@Component({
  selector: 'k-multi-select',
  template: `
    <!-- Trigger -->
    <div
      #triggerDiv
      [class]="triggerClasses()"
      (click)="onTriggerClick()"
      role="combobox"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-haspopup]="'listbox'"
    >
      <!-- Selected chips -->
      @for (item of selectedItems(); track item.value) {
        <span [class]="chipClasses()">
          {{ item.label }}
          <button
            type="button"
            (click)="removeItem(item.value, $event)"
            class="ml-1 rounded-full outline-none hover:bg-foreground/20 transition-colors"
            [attr.aria-label]="'Remove ' + item.label"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </span>
      }

      <!-- Search input (when searchable) or placeholder -->
      @if (searchable()) {
        <input
          #searchInput
          type="text"
          [placeholder]="selectedItems().length === 0 ? placeholder() : ''"
          [value]="searchTerm()"
          (input)="onSearchInput($event)"
          (keydown.backspace)="onBackspace()"
          class="flex-1 min-w-[60px] bg-transparent border-0 outline-none ring-0 placeholder:text-muted-foreground text-inherit"
          [class.text-xs]="size() === 'sm'"
          [class.text-base]="size() === 'lg'"
        />
      } @else {
        @if (selectedItems().length === 0) {
          <span class="text-muted-foreground">{{ placeholder() }}</span>
        }
      }

      <!-- Chevron icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="shrink-0 opacity-50 ml-auto transition-transform duration-150"
           [class.rotate-180]="isOpen()">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>

    <!-- Dropdown template -->
    <ng-template #dropdownTpl>
      <div [class]="dropdownClasses()">
        @if (searchable() && !isOpen()) {
          <!-- Search input inside dropdown for non-inline search -->
        }
        <div class="max-h-60 overflow-y-auto py-1">
          @for (opt of filteredOptions(); track opt.value) {
            <div
              [class]="optionClasses(opt)"
              (click)="toggleOption(opt)"
              role="option"
              [attr.aria-selected]="isSelected(opt.value)"
            >
              <span class="flex items-center gap-2">
                <span [class]="checkboxClasses(opt)">
                  @if (isSelected(opt.value)) {
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  }
                </span>
                {{ opt.label }}
              </span>
            </div>
          } @empty {
            <div class="px-2 py-4 text-center text-sm text-muted-foreground">No options found</div>
          }
        </div>

        @if (selectedValues().length > 0) {
          <div class="border-t border-border px-2 py-1.5">
            <button
              type="button"
              (click)="clearAll()"
              class="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center cursor-pointer bg-transparent border-0 outline-none py-1"
            >
              Clear all ({{ selectedValues().length }})
            </button>
          </div>
        }
      </div>
    </ng-template>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KMultiSelect),
      multi: true,
    },
  ],
})
export class KMultiSelect implements ControlValueAccessor, OnDestroy {
  readonly options     = input.required<MultiSelectOption[]>();
  readonly placeholder = input<string>('Select items…');
  readonly searchable  = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly size        = input<MultiSelectSize>('default');
  readonly error       = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly maxItems    = input<number>(Infinity);
  readonly class       = input<string>('');

  readonly selectedValues = model<string[]>([]);
  readonly selectionChange = output<string[]>();

  readonly disabled    = signal<boolean>(false);
  readonly isOpen      = signal<boolean>(false);
  readonly searchTerm  = signal<string>('');

  @ViewChild('dropdownTpl', { static: true }) dropdownTpl!: TemplateRef<unknown>;
  @ViewChild('searchInput') searchInputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('triggerDiv', { static: true }) triggerDiv!: ElementRef<HTMLDivElement>;

  private readonly overlay = inject(Overlay);
  private readonly elRef   = inject(ElementRef<HTMLElement>);
  private readonly vcr     = inject(ViewContainerRef);
  private overlayRef: OverlayRef | null = null;

  private _onChange: (v: string[]) => void = () => {};
  private _onTouched: () => void = () => {};

  protected readonly selectedItems = computed(() => {
    const vals = this.selectedValues();
    const opts = this.options();
    return vals
      .map(v => opts.find(o => o.value === v))
      .filter((o): o is MultiSelectOption => !!o);
  });

  protected readonly filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const opts = this.options();
    if (!term) return opts;
    return opts.filter(o => o.label.toLowerCase().includes(term));
  });

  protected readonly triggerClasses = computed(() =>
    cn(
      multiSelectVariants({ size: this.size(), error: this.error() }),
      'cursor-pointer',
      this.disabled() ? 'pointer-events-none opacity-50' : '',
      this.class()
    )
  );

  protected readonly chipClasses = computed(() =>
    cn(
      'inline-flex items-center gap-0.5 rounded-md bg-secondary text-secondary-foreground',
      'font-medium transition-colors',
      this.size() === 'sm' ? 'px-1 py-0 text-[10px]' : this.size() === 'lg' ? 'px-2.5 py-1 text-sm' : 'px-1.5 py-0.5 text-xs',
    )
  );

  protected readonly dropdownClasses = computed(() =>
    cn(
      'w-full overflow-hidden rounded-md border border-border bg-popover',
      'text-popover-foreground shadow-md z-50 animate-slide-in-up',
    )
  );

  protected optionClasses(opt: MultiSelectOption): string {
    return cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5',
      'text-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      this.isSelected(opt.value) ? 'bg-accent/50' : '',
      opt.disabled ? 'pointer-events-none opacity-50' : '',
    );
  }

  protected checkboxClasses(opt: MultiSelectOption): string {
    return cn(
      'flex items-center justify-center w-4 h-4 rounded border transition-colors shrink-0',
      this.isSelected(opt.value)
        ? 'bg-primary border-primary text-primary-foreground'
        : 'border-input',
    );
  }

  isSelected(value: string): boolean {
    return this.selectedValues().includes(value);
  }

  toggleOption(opt: MultiSelectOption): void {
    if (opt.disabled || this.disabled()) return;
    const current = [...this.selectedValues()];
    const idx = current.indexOf(opt.value);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      if (current.length >= this.maxItems()) return;
      current.push(opt.value);
    }
    this.selectedValues.set(current);
    this._onChange(current);
    this.selectionChange.emit(current);
  }

  removeItem(value: string, event: Event): void {
    event.stopPropagation();
    const current = this.selectedValues().filter(v => v !== value);
    this.selectedValues.set(current);
    this._onChange(current);
    this.selectionChange.emit(current);
  }

  clearAll(): void {
    this.selectedValues.set([]);
    this._onChange([]);
    this.selectionChange.emit([]);
    this.close();
  }

  onTriggerClick(): void {
    if (this.disabled()) return;
    this.isOpen() ? this.close() : this.open();
  }

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onBackspace(): void {
    if (this.searchTerm() === '' && this.selectedValues().length > 0) {
      const current = [...this.selectedValues()];
      current.pop();
      this.selectedValues.set(current);
      this._onChange(current);
      this.selectionChange.emit(current);
    }
  }

  open(): void {
    if (this.overlayRef?.hasAttached() || this.disabled()) return;

    const positions: ConnectedPosition[] = [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.triggerDiv)
      .withPositions(positions)
      .withGrowAfterOpen(true);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      width: this.triggerDiv.nativeElement.offsetWidth,
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new TemplatePortal(this.dropdownTpl, this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    // Focus search input
    setTimeout(() => this.searchInputEl?.nativeElement?.focus(), 0);
  }

  close(): void {
    this.overlayRef?.detach();
    this.isOpen.set(false);
    this.searchTerm.set('');
    this._onTouched();
  }

  writeValue(v: string[]): void { this.selectedValues.set(v ?? []); }
  registerOnChange(fn: (v: string[]) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled.set(d); }

  ngOnDestroy(): void { this.overlayRef?.dispose(); }
}
