import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Injector,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';
import { KButtonDirective } from '../button/button.directive';

// ---- Types ----

export interface KAlertDialogConfig {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  intent?: 'default' | 'destructive';
}

// ---- Compound Components (declared first to avoid hoisting errors) ----

const alertDialogVariants = cva(
  [
    'relative z-50 grid w-full gap-4 rounded-xl border border-border',
    'bg-background p-6 shadow-2xl animate-slide-in-up sm:rounded-xl',
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

export type AlertDialogSize = NonNullable<VariantProps<typeof alertDialogVariants>['size']>;

@Component({
  selector: 'k-alert-dialog',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertDialog {
  readonly size = input<AlertDialogSize>('default');
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(alertDialogVariants({ size: this.size() }), this.class())
  );
}

@Component({
  selector: 'k-alert-dialog-header',
  template: `<ng-content />`,
  host: { '[class]': '"flex flex-col space-y-2 text-center sm:text-left"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertDialogHeader {}

@Component({
  selector: 'k-alert-dialog-title',
  template: `<ng-content />`,
  host: { '[class]': '"text-lg font-semibold"', role: 'heading', 'aria-level': '2' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertDialogTitle {}

@Component({
  selector: 'k-alert-dialog-description',
  template: `<ng-content />`,
  host: { '[class]': '"text-sm text-muted-foreground"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertDialogDescription {}

@Component({
  selector: 'k-alert-dialog-footer',
  template: `<ng-content />`,
  host: { '[class]': '"flex flex-col-reverse sm:flex-row sm:justify-end gap-2"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertDialogFooter {}

// ---- Alert Dialog Panel (internal, opened programmatically) ----

@Component({
  selector: 'k-alert-dialog-panel',
  template: `
    <k-alert-dialog>
      <k-alert-dialog-header>
        <k-alert-dialog-title>{{ cfg.title }}</k-alert-dialog-title>
        @if (cfg.description) {
          <k-alert-dialog-description>{{ cfg.description }}</k-alert-dialog-description>
        }
      </k-alert-dialog-header>
      <k-alert-dialog-footer>
        <button k-button variant="outline" (click)="cancel()">
          {{ cfg.cancelLabel || 'Cancel' }}
        </button>
        <button k-button [variant]="cfg.intent === 'destructive' ? 'destructive' : 'default'"
                (click)="confirm()">
          {{ cfg.confirmLabel || 'Continue' }}
        </button>
      </k-alert-dialog-footer>
    </k-alert-dialog>
  `,
  imports: [
    KAlertDialog, KAlertDialogHeader, KAlertDialogTitle, KAlertDialogDescription,
    KAlertDialogFooter, KButtonDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAlertDialogPanel {
  protected readonly cfg = inject(DIALOG_DATA) as KAlertDialogConfig;
  private readonly ref   = inject(DialogRef<boolean>);

  confirm(): void { this.ref.close(true); }
  cancel():  void { this.ref.close(false); }
}

// ---- Service ----

@Injectable({ providedIn: 'root' })
export class KAlertDialogService {
  private readonly cdkDialog = inject(Dialog);
  private readonly injector  = inject(Injector);

  /**
   * Open an alert dialog. Returns Observable<boolean> — true if confirmed.
   */
  open(config: KAlertDialogConfig): Observable<boolean> {
    const ref = this.cdkDialog.open<boolean>(KAlertDialogPanel, {
      disableClose: true,
      data: config,
      injector: this.injector,
    });
    return ref.closed.pipe(map(result => result === true));
  }
}
