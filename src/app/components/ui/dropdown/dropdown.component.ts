import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostListener,
  InjectionToken,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../../../core/utils/cn';

// ---- Context token ----
export const K_DROPDOWN = new InjectionToken<{ close: () => void }>('K_DROPDOWN');

// ---- Dropdown Content Component ----

@Component({
  selector: 'k-dropdown-content',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDropdownContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover',
      'p-1 text-popover-foreground shadow-md z-50',
      'animate-slide-in-up',
      this.class()
    )
  );
}

// ---- Dropdown Items ----

import { cva, type VariantProps } from 'class-variance-authority';

const dropdownItemVariants = cva(
  'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        destructive: 'text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: 'cursor-pointer',
      }
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
    }
  }
);

export type DropdownItemVariant = NonNullable<VariantProps<typeof dropdownItemVariants>['variant']>;

@Component({
  selector: 'k-dropdown-item',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    role: 'menuitem',
    tabindex: '-1',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDropdownItem {
  readonly variant  = input<DropdownItemVariant>('default');
  readonly disabled = input<boolean>(false);
  readonly class    = input<string>('');
  private readonly ctx = inject(K_DROPDOWN, { optional: true });

  protected readonly classes = computed(() =>
    cn(dropdownItemVariants({ variant: this.variant(), disabled: this.disabled() }), this.class())
  );

  onClick(): void {
    if (!this.disabled()) this.ctx?.close();
  }
}

@Component({
  selector: 'k-dropdown-separator',
  template: ``,
  host: { '[class]': '"-mx-1 my-1 h-px bg-border"', role: 'separator' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDropdownSeparator {}

@Component({
  selector: 'k-dropdown-label',
  template: `<ng-content />`,
  host: { '[class]': '"px-2 py-1.5 text-xs font-semibold text-muted-foreground"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDropdownLabel {}

// ---- Trigger Directive ----

@Directive({
  selector: '[kDropdownTrigger]',
  host: {
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'isOpen()',
  },
  providers: [
    {
      provide: K_DROPDOWN,
      useFactory: () => {
        const dir = inject(KDropdownTrigger, { self: true });
        return { close: () => dir.close() };
      },
    },
  ],
})
export class KDropdownTrigger implements OnDestroy {
  readonly kDropdownTrigger = input.required<TemplateRef<unknown>>();
  readonly dropdownAlign    = input<'start' | 'end' | 'center'>('center');
  readonly dropdownSide     = input<'top' | 'bottom' | 'left' | 'right'>('bottom');

  private readonly overlay   = inject(Overlay);
  private readonly el        = inject(ElementRef<HTMLElement>);
  private readonly vcr       = inject(ViewContainerRef);

  private overlayRef: OverlayRef | null = null;
  readonly isOpen = signal(false);

  @HostListener('click')
  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.overlayRef?.hasAttached()) return;

    const side = this.dropdownSide();
    const align = this.dropdownAlign();

    const positions: ConnectedPosition[] = [];

    if (side === 'bottom') {
      if (align === 'start') positions.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 });
      if (align === 'end') positions.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 });
      if (align === 'center') positions.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 4 });
      positions.push({ originX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center', originY: 'top', overlayX: align === 'start' ? 'start' : align === 'end' ? 'end' : 'center', overlayY: 'bottom', offsetY: -4 });
    } else if (side === 'top') {
      if (align === 'start') positions.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 });
      if (align === 'end') positions.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 });
      if (align === 'center') positions.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -4 });
    } else if (side === 'left') {
      if (align === 'start') positions.push({ originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -4 });
      if (align === 'end') positions.push({ originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -4 });
      if (align === 'center') positions.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -4 });
    } else if (side === 'right') {
      if (align === 'start') positions.push({ originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 4 });
      if (align === 'end') positions.push({ originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 4 });
      if (align === 'center') positions.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 4 });
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({
      hasBackdrop:   true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new TemplatePortal(this.kDropdownTrigger(), this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);
  }

  close(): void {
    this.overlayRef?.detach();
    this.isOpen.set(false);
  }

  ngOnDestroy(): void { this.overlayRef?.dispose(); }
}
