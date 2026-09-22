import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  InjectionToken,
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
import { cn } from '../../../core/utils/cn';

// ---- Types ----

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ---- DI Context ----

export const K_SELECT = new InjectionToken<{
  select: (v: string, l: string) => void;
  selected: ReturnType<typeof signal<string>>;
  close: () => void;
  searchTerm: ReturnType<typeof signal<string>>;
}>('K_SELECT');

// ---- Select Content ----

@Component({
  selector: 'k-select-content',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSelectContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover',
      'text-popover-foreground shadow-md z-50 py-1 animate-slide-in-up',
      this.class()
    )
  );
}

// ---- Select Item ----

@Component({
  selector: 'k-select-item',
  template: `
    <div
      [class]="itemClasses()"
      (click)="select()"
      [attr.aria-selected]="isSelected()"
      [attr.data-disabled]="disabled() ? '' : null"
      role="option"
    >
      <span class="flex items-center gap-2">
        <span class="w-4">
          @if (isSelected()) {
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                 stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          }
        </span>
        <ng-content />
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSelectItem {
  readonly value    = input.required<string>();
  readonly label    = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly class    = input<string>('');

  private readonly ctx = inject(K_SELECT, { optional: true });

  protected readonly isSelected = computed(() => this.ctx?.selected() === this.value());

  protected readonly isVisible = computed(() => {
    const term = this.ctx?.searchTerm();
    if (!term) return true;
    const itemLabel = this.label() || this.value();
    return itemLabel.toLowerCase().includes(term.toLowerCase());
  });

  protected readonly itemClasses = computed(() =>
    cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5',
      'text-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:bg-accent focus:text-accent-foreground',
      this.isSelected() ? 'bg-accent/50' : '',
      this.disabled() ? 'pointer-events-none opacity-50' : '',
      !this.isVisible() ? 'hidden' : '',
      this.class()
    )
  );

  select(): void {
    if (this.disabled() || !this.ctx) return;
    const label = this.label() || this.value();
    this.ctx.select(this.value(), label);
    this.ctx.close();
  }
}

// ---- Select Label ----

@Component({
  selector: 'k-select-label',
  template: `<div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSelectLabel {}

// ---- Select Separator ----

@Component({
  selector: 'k-select-separator',
  template: `<div class="-mx-1 my-1 h-px bg-border" role="separator"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSelectSeparator {}

// ---- Select Root (Trigger) ----

@Component({
  selector: 'k-select',
  template: `
    <!-- Trigger button -->
    <button
      #triggerBtn
      type="button"
      role="combobox"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-haspopup]="'listbox'"
      [attr.disabled]="disabled() ? '' : null"
      (click)="toggle()"
      [class]="triggerClasses()"
    >
      <span [class.text-muted-foreground]="!selectedLabel()">
        {{ selectedLabel() || placeholder() }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round" class="shrink-0 opacity-50 transition-transform duration-150"
           [class.rotate-180]="isOpen()">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </button>

    <!-- Content template ref (opened via CDK overlay) -->
    <ng-template #contentTpl>
      <div class="w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md z-50 animate-slide-in-up">
        @if (searchable()) {
          <div class="flex items-center border-b border-border px-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="shrink-0 text-muted-foreground mr-2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              #searchInput
              type="text"
              [placeholder]="searchPlaceholder()"
              [value]="searchTerm()"
              (input)="onSearchInput($event)"
              class="flex-1 bg-transparent border-0 outline-none ring-0 py-2 text-sm placeholder:text-muted-foreground"
            />
          </div>
        }
        <div class="max-h-60 overflow-y-auto py-1">
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  host: { '[class]': '"contents"' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KSelect),
      multi: true,
    },
    {
      provide: K_SELECT,
      useFactory: () => {
        const s = inject(KSelect, { self: true });
        return {
          selected: s._selected,
          select: (v: string, l: string) => s._selectValue(v, l),
          close: () => s.close(),
          searchTerm: s.searchTerm,
        };
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSelect implements ControlValueAccessor, OnDestroy {
  readonly placeholder       = input<string>('Select an option…');
  readonly searchPlaceholder = input<string>('Search…');
  readonly searchable        = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly class             = input<string>('');
  readonly disabled          = signal<boolean>(false);

  readonly valueChange = output<string>();

  readonly _selected      = signal<string>('');
  readonly selectedLabel  = signal<string>('');
  readonly isOpen         = signal<boolean>(false);
  readonly searchTerm     = signal<string>('');

  @ViewChild('contentTpl', { static: true }) contentTpl!: TemplateRef<unknown>;
  @ViewChild('searchInput') searchInputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('triggerBtn', { static: true }) triggerBtn!: ElementRef<HTMLButtonElement>;

  private _onChange: (v: string) => void = () => {};
  private _onTouched: () => void = () => {};
  private overlayRef: OverlayRef | null = null;

  private readonly overlay = inject(Overlay);
  private readonly elRef   = inject(ElementRef<HTMLElement>);
  private readonly vcr     = inject(ViewContainerRef);

  protected readonly triggerClasses = computed(() =>
    cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md',
      'border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
      'ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      '[&>span]:line-clamp-1 text-left',
      this.class()
    )
  );

  toggle(): void { this.isOpen() ? this.close() : this.open(); }

  open(): void {
    if (this.overlayRef?.hasAttached() || this.disabled()) return;

    const positions: ConnectedPosition[] = [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
    ];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.triggerBtn)
      .withPositions(positions)
      .withGrowAfterOpen(true);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      width: this.triggerBtn.nativeElement.offsetWidth,
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new TemplatePortal(this.contentTpl, this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    // Focus search input
    if (this.searchable()) {
      setTimeout(() => this.searchInputEl?.nativeElement?.focus(), 0);
    }
  }

  close(): void {
    this.overlayRef?.detach();
    this.isOpen.set(false);
    this.searchTerm.set('');
    this._onTouched();
  }

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  _selectValue(value: string, label: string): void {
    this._selected.set(value);
    this.selectedLabel.set(label);
    this._onChange(value);
    this.valueChange.emit(value);
  }

  writeValue(v: string): void { this._selected.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled.set(d); }

  ngOnDestroy(): void { this.overlayRef?.dispose(); }
}
