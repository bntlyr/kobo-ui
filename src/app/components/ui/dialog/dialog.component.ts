import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Injectable,
  Injector,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { cn } from '../../../core/utils/cn';

// ---- Dialog Service ----

export interface KDialogConfig<T = unknown> {
  data?: T;
  panelClass?: string | string[];
  disableClose?: boolean;
  ariaLabel?: string;
}

@Injectable({ providedIn: 'root' })
export class KDialogService {
  private readonly cdkDialog = inject(Dialog);
  private readonly injector   = inject(Injector);

  open<C, D = unknown>(
    component: new (...args: unknown[]) => C,
    config?: KDialogConfig<D>
  ): DialogRef<unknown, C> {
    return this.cdkDialog.open<unknown, D, C>(component, {
      panelClass:   config?.panelClass,
      disableClose: config?.disableClose ?? false,
      ariaLabel:    config?.ariaLabel,
      data:         config?.data,
      injector:     this.injector,
    });
  }
}

export { DIALOG_DATA as K_DIALOG_DATA };

// ---- Dialog Overlay Backdrop ----

/**
 * <k-dialog-backdrop>
 * Used internally by the CDK overlay host configuration.
 */
@Component({
  selector: 'k-dialog-backdrop',
  template: ``,
  host: {
    class: 'fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in z-40',
    'aria-hidden': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDialogBackdrop {}

import { cva, type VariantProps } from 'class-variance-authority';

const dialogVariants = cva(
  [
    'relative z-50 grid w-full gap-4 rounded-xl border border-border',
    'bg-background p-6 shadow-2xl',
    'animate-slide-in-up',
    'sm:rounded-xl',
  ],
  {
    variants: {
      size: {
        sm:      'max-w-sm',
        default: 'max-w-lg',
        lg:      'max-w-2xl',
        xl:      'max-w-4xl',
        full:    'max-w-[95vw] min-h-[95vh] flex flex-col',
      }
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

export type DialogSize = NonNullable<VariantProps<typeof dialogVariants>['size']>;

/**
 * <k-dialog>
 *
 * The root dialog panel. Wrap your dialog content in this.
 * Uses CDK's focus trap automatically via the Dialog CDK service.
 *
 * @example
 * // In your dialog component template:
 * <k-dialog>
 *   <k-dialog-header>
 *     <k-dialog-title>Confirm action</k-dialog-title>
 *     <k-dialog-description>This cannot be undone.</k-dialog-description>
 *   </k-dialog-header>
 *   <k-dialog-content>...</k-dialog-content>
 *   <k-dialog-footer>...</k-dialog-footer>
 * </k-dialog>
 */
@Component({
  selector: 'k-dialog',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDialog {
  readonly size = input<DialogSize>('default');
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(dialogVariants({ size: this.size() }), this.class())
  );
}

// ---- Dialog Header ----

@Component({
  selector: 'k-dialog-header',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDialogHeader {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('flex flex-col space-y-1.5 text-center sm:text-left', this.class())
  );
}

// ---- Dialog Title ----

@Component({
  selector: 'k-dialog-title',
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'role': 'heading',
    'aria-level': '2',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDialogTitle {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.class())
  );
}

// ---- Dialog Description ----

@Component({
  selector: 'k-dialog-description',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDialogDescription {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

// ---- Dialog Content ----

@Component({
  selector: 'k-dialog-content',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDialogContent {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('py-2', this.class())
  );
}

// ---- Dialog Footer ----

@Component({
  selector: 'k-dialog-footer',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KDialogFooter {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2',
      this.class()
    )
  );
}

// ---- Close Button Directive ----

/**
 * KDialogCloseDirective
 *
 * Selector: button[k-dialog-close]
 * Apply to a button inside a dialog to auto-close on click.
 *
 * @example
 * <button k-button variant="outline" k-dialog-close>Cancel</button>
 */
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[k-dialog-close]',
  host: {
    'type': 'button',
  },
})
export class KDialogClose {
  private readonly dialogRef = inject(DialogRef, { optional: true });

  @HostListener('click')
  onClick(): void {
    this.dialogRef?.close();
  }
}
