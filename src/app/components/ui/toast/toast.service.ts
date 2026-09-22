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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  success:     'border-success bg-success text-success-foreground',
  warning:     'border-warning bg-warning text-warning-foreground',
  destructive: 'border-destructive bg-destructive text-destructive-foreground',
  info:        'border-info bg-info text-info-foreground',
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
  default:     `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  success:     `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  warning:     `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  destructive: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  info:        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
};

export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

import { Directive, ElementRef, OnDestroy, AfterViewInit, output } from '@angular/core';

@Directive({ selector: '[kToastHeight]' })
export class KToastHeightDirective implements AfterViewInit, OnDestroy {
  readonly id = input.required<string>({ alias: 'kToastHeight' });
  readonly heightChange = output<number>();
  private readonly el = inject(ElementRef);
  
  private observer = new ResizeObserver(entries => {
    if (entries[0]) {
      this.heightChange.emit(entries[0].borderBoxSize[0]?.blockSize ?? this.el.nativeElement.offsetHeight);
    }
  });

  ngAfterViewInit() {
    this.observer.observe(this.el.nativeElement);
    // Initial emit
    this.heightChange.emit(this.el.nativeElement.offsetHeight);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}

@Component({
  selector: 'k-toaster',
  imports: [KToastHeightDirective],
  template: `
    <div [class]="containerClasses()" aria-live="polite" aria-label="Notifications">
      <ol 
        class="relative w-full transition-all duration-300 outline-none"
        [class.pointer-events-auto]="visibleToasts().length > 0"
        [style.height.px]="wrapperHeight()"
        (mouseenter)="isHovered.set(true)"
        (mouseleave)="isHovered.set(false)"
      >
        @for (toast of visibleToasts(); track toast.id; let i = $index) {
          <li
            [kToastHeight]="toast.id"
            (heightChange)="updateHeight(toast.id, $event)"
            role="status"
            class="absolute w-full flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 cursor-pointer"
            [class]="toastClasses(toast)"
            [style.z-index]="100 - i"
            [style.transform]="getTransform(i, toast)"
            [style.opacity]="getOpacity(i, toast)"
            [style.bottom]="isBottom() ? '0' : 'auto'"
            [style.top]="!isBottom() ? '0' : 'auto'"
            (click)="dismiss(toast.id)"
          >
            <!-- Icon -->
            <span class="shrink-0 text-base leading-none mt-0.5 font-bold" [innerHTML]="variantIcon(toast.variant ?? 'default')"></span>

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
          </li>
        }
      </ol>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KToaster {
  readonly position = input<ToastPosition>('bottom-right');
  readonly maxToasts = input<number>(3);
  
  protected readonly toastService = inject(KToastService);
  protected readonly sanitizer = inject(DomSanitizer);
  
  protected readonly isHovered = signal(false);
  protected readonly heights = signal<Map<string, number>>(new Map());

  protected readonly isBottom = computed(() => this.position().startsWith('bottom'));

  protected readonly containerClasses = computed(() => {
    const pos = this.position();
    return cn(
      'fixed z-[9999] flex max-w-sm w-full pointer-events-none p-4 sm:p-6',
      {
        'top-left':      'top-0 left-0',
        'top-right':     'top-0 right-0',
        'top-center':    'top-0 left-1/2 -translate-x-1/2',
        'bottom-left':   'bottom-0 left-0 items-end',
        'bottom-right':  'bottom-0 right-0 items-end',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-end',
      }[pos]
    );
  });

  protected readonly visibleToasts = computed(() => {
    const all = this.toastService.toasts();
    // Reverse so newest is index 0
    return [...all].reverse().slice(0, this.maxToasts() + 1);
  });

  protected readonly wrapperHeight = computed(() => {
    const toasts = this.visibleToasts();
    if (toasts.length === 0) return 0;
    
    if (!this.isHovered()) {
      return this.heights().get(toasts[0].id) || 0;
    }
    
    let total = 0;
    const gap = 16;
    for (let i = 0; i < toasts.length; i++) {
      if (toasts[i].removing || i >= this.maxToasts()) continue;
      total += (this.heights().get(toasts[i].id) || 0) + (i > 0 ? gap : 0);
    }
    return total;
  });

  updateHeight(id: string, height: number) {
    this.heights.update(m => {
      const nm = new Map(m);
      nm.set(id, height);
      return nm;
    });
  }

  getTransform(index: number, toast: Toast): string {
    const isBottom = this.isBottom();
    const dir = isBottom ? -1 : 1;
    const gap = 16;

    if (toast.removing) {
      // Exit animation: slide away based on position
      const x = this.position().endsWith('right') ? '100%' : this.position().endsWith('left') ? '-100%' : '0';
      const y = this.position().endsWith('center') ? (isBottom ? '100%' : '-100%') : '0';
      return `translate3d(${x}, ${y}, 0) scale(0.9)`;
    }

    if (!this.isHovered()) {
      // Collapsed stack
      const y = index * 16 * dir;
      const scale = 1 - (index * 0.05);
      return `translate3d(0, ${y}px, 0) scale(${scale})`;
    } else {
      // Expanded column
      let offset = 0;
      for (let i = 0; i < index; i++) {
        const t = this.visibleToasts()[i];
        offset += (this.heights().get(t.id) || 0) + gap;
      }
      return `translate3d(0, ${offset * dir}px, 0) scale(1)`;
    }
  }

  getOpacity(index: number, toast: Toast): number {
    if (toast.removing) return 0;
    // Hide items beyond maxToasts
    if (index >= this.maxToasts()) return 0;
    return 1;
  }

  toastClasses(toast: Toast): string {
    return cn(VARIANT_CLASSES[toast.variant ?? 'default']);
  }

  variantIcon(variant: ToastVariant): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(VARIANT_ICONS[variant]);
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
