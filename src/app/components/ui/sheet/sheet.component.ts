import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Injectable,
  Injector,
  ViewEncapsulation,
  computed,
  inject,
  input,
  Directive,
  HostListener,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const sheetVariants = cva(
  'fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b animate-slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t animate-slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full border-r animate-slide-in-from-left',
        right: 'inset-y-0 right-0 h-full border-l animate-slide-in-from-right',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
        xl: '',
        full: '',
      }
    },
    compoundVariants: [
      { side: ['top', 'bottom'], size: 'sm', class: 'h-1/4' },
      { side: ['top', 'bottom'], size: 'default', class: 'h-1/3' },
      { side: ['top', 'bottom'], size: 'lg', class: 'h-1/2' },
      { side: ['top', 'bottom'], size: 'xl', class: 'h-3/4' },
      { side: ['top', 'bottom'], size: 'full', class: 'h-screen' },
      { side: ['right', 'left'], size: 'sm', class: 'w-3/4 sm:max-w-sm' },
      { side: ['right', 'left'], size: 'default', class: 'w-3/4 sm:max-w-md' },
      { side: ['right', 'left'], size: 'lg', class: 'w-3/4 sm:max-w-lg' },
      { side: ['right', 'left'], size: 'xl', class: 'w-3/4 sm:max-w-xl' },
      { side: ['right', 'left'], size: 'full', class: 'w-screen' },
    ],
    defaultVariants: {
      side: 'right',
      size: 'default',
    },
  }
);

export type SheetSide = NonNullable<VariantProps<typeof sheetVariants>['side']>;
export type SheetSize = NonNullable<VariantProps<typeof sheetVariants>['size']>;

export interface KSheetConfig<D = unknown> {
  side?: SheetSide;
  size?: SheetSize;
  data?: D;
  backdropClass?: string;
}

/** Injection token for accessing the sheet config from inside a sheet component */
export const K_SHEET_CONFIG = new InjectionToken<KSheetConfig>('K_SHEET_CONFIG');

// ---- Sheet Service ----

@Injectable({ providedIn: 'root' })
export class KSheetService {
  private readonly overlay   = inject(Overlay);
  private readonly injector  = inject(Injector);

  open<C>(
    component: new (...args: unknown[]) => C,
    config?: KSheetConfig
  ): OverlayRef {
    const side = config?.side ?? 'right';
    const size = config?.size ?? 'default';

    const positionStrategy = this.overlay.position().global();
    switch (side) {
      case 'right':  positionStrategy.right('0').top('0').height('100%'); break;
      case 'left':   positionStrategy.left('0').top('0').height('100%'); break;
      case 'top':    positionStrategy.top('0').left('0').width('100%'); break;
      case 'bottom': positionStrategy.bottom('0').left('0').width('100%'); break;
    }

    const overlayRef = this.overlay.create({
      hasBackdrop:   true,
      backdropClass: ['fixed', 'inset-0', 'bg-black/50', 'backdrop-blur-sm', 'z-40'],
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
    overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') overlayRef.detach();
    });

    // Create a child injector that provides the sheet config and the overlay ref
    const sheetConfig: KSheetConfig = { side, size, ...config };
    const sheetInjector = Injector.create({
      providers: [
        { provide: K_SHEET_CONFIG, useValue: sheetConfig },
        { provide: OverlayRef, useValue: overlayRef }
      ],
      parent: this.injector,
    });

    const portal = new ComponentPortal(component, null, sheetInjector);
    overlayRef.attach(portal);

    return overlayRef;
  }
}

// ---- Sheet Container Components ----

@Component({
  selector: 'k-sheet',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSheet {
  readonly side  = input<SheetSide>('right');
  readonly size  = input<SheetSize>('default');
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(sheetVariants({ side: this.side(), size: this.size() }), this.class())
  );
}

@Component({
  selector: 'k-sheet-header',
  template: `<ng-content />`,
  host: { '[class]': '"flex flex-col gap-1.5"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSheetHeader {}

@Component({
  selector: 'k-sheet-title',
  template: `<ng-content />`,
  host: { '[class]': '"text-lg font-semibold text-foreground"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSheetTitle {}

@Component({
  selector: 'k-sheet-description',
  template: `<ng-content />`,
  host: { '[class]': '"text-sm text-muted-foreground"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSheetDescription {}

@Component({
  selector: 'k-sheet-content',
  template: `<ng-content />`,
  host: { '[class]': '"flex-1 overflow-y-auto"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSheetContent {}

@Component({
  selector: 'k-sheet-footer',
  template: `<ng-content />`,
  host: { '[class]': '"flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-border"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KSheetFooter {}

@Directive({
  selector: '[kSheetClose]',
  standalone: true,
})
export class KSheetClose {
  private readonly overlayRef = inject(OverlayRef, { optional: true });

  @HostListener('click')
  onClick(): void {
    this.overlayRef?.detach();
  }
}
