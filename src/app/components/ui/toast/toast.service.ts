import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  OnInit,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../../core/utils/cn';

// ---- Types ----

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info';

export interface KToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface Toast extends KToastOptions {
  id: string;
  removing: boolean;
}

// ---- Service ----

@Injectable({ providedIn: 'root' })
export class KToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(options: KToastOptions): string {
    const id = Math.random().toString(36).slice(2, 10);
    const toast: Toast = {
      id,
      removing: false,
      variant: 'default',
      duration: 4000,
      ...options,
    };
    this._toasts.update(t => [...t, toast]);

    // Auto-dismiss
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }
    return id;
  }

  success(title: string, description?: string): string {
    return this.show({ title, description, variant: 'success' });
  }

  error(title: string, description?: string): string {
    return this.show({ title, description, variant: 'destructive' });
  }

  warning(title: string, description?: string): string {
    return this.show({ title, description, variant: 'warning' });
  }

  info(title: string, description?: string): string {
    return this.show({ title, description, variant: 'info' });
  }

  dismiss(id: string): void {
    // Mark as removing for exit animation
    this._toasts.update(toasts =>
      toasts.map(t => t.id === id ? { ...t, removing: true } : t)
    );
    // Remove after animation completes
    setTimeout(() => {
      this._toasts.update(toasts => toasts.filter(t => t.id !== id));
    }, 300);
  }
}

// ---- Toaster Component ----

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  default:     'border-border bg-background text-foreground',
  success:     'border-success/50 bg-success/10 text-success',
  warning:     'border-warning/50 bg-warning/10 text-warning',
  destructive: 'border-destructive/50 bg-destructive/10 text-destructive',
  info:        'border-info/50 bg-info/10 text-info',
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
  default:     '🔔',
  success:     '✓',
  warning:     '⚠',
  destructive: '✕',
  info:        'ℹ',
};

export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

/**
 * <k-toaster>
 * Add to the app shell. Renders toasts from KToastService.
 *
 * @example
 * <!-- In shell.component.ts template: -->
 * <k-toaster position="bottom-right" />
 */
@Component({
  selector: 'k-toaster',
  template: `
    <div
      [class]="containerClasses()"
      aria-live="polite"
      aria-label="Notifications"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          role="status"
          class="pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg
                 transition-all duration-300 cursor-pointer"
          [class]="toastClasses(toast)"
          (click)="dismiss(toast.id)"
        >
          <!-- Icon -->
          <span class="shrink-0 text-base leading-none mt-0.5 font-bold">
            {{ variantIcon(toast.variant ?? 'default') }}
          </span>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold leading-none mb-1">{{ toast.title }}</p>
            @if (toast.description) {
              <p class="text-xs opacity-80 leading-relaxed">{{ toast.description }}</p>
            }
          </div>

          <!-- Close -->
          <button
            type="button"
            (click)="dismiss(toast.id); $event.stopPropagation()"
            class="shrink-0 opacity-50 hover:opacity-100 transition-opacity text-sm font-bold leading-none"
            aria-label="Dismiss notification"
          >×</button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KToaster {
  readonly position = input<ToastPosition>('bottom-right');
  protected readonly toastService = inject(KToastService);

  protected readonly containerClasses = computed(() => {
    const pos = this.position();
    return cn(
      'fixed z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4 sm:p-6',
      {
        'top-left':      'top-0 left-0',
        'top-right':     'top-0 right-0',
        'top-center':    'top-0 left-1/2 -translate-x-1/2',
        'bottom-left':   'bottom-0 left-0 flex-col-reverse',
        'bottom-right':  'bottom-0 right-0 flex-col-reverse',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
      }[pos]
    );
  });

  toastClasses(toast: Toast): string {
    const isTop = this.position().startsWith('top');
    return cn(
      VARIANT_CLASSES[toast.variant ?? 'default'],
      toast.removing
        ? (isTop ? 'opacity-0 -translate-y-full' : 'opacity-0 translate-y-full')
        : (isTop ? 'animate-slide-in-from-top opacity-100' : 'animate-slide-in-from-bottom opacity-100')
    );
  }

  variantIcon(variant: ToastVariant): string {
    return VARIANT_ICONS[variant];
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
