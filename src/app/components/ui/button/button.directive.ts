import { Directive, computed, input, effect, inject, ElementRef, Renderer2, booleanAttribute } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

// ---- CVA Variant Definition ----
export const buttonVariants = cva(
  // Base classes applied to every variant
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'transition-all duration-150 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'cursor-pointer select-none',
  ],
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]',
        secondary:   'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-[0.98]',
        outline:     'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
        ghost:       'hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]',
        link:        'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm:      'h-8 rounded-md px-3 text-xs',
        lg:      'h-11 rounded-md px-8 text-base',
        icon:    'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
export type ButtonSize    = NonNullable<VariantProps<typeof buttonVariants>['size']>;

/**
 * KButtonDirective
 *
 * Selector: button[k-button], a[k-button]
 */
@Directive({
  selector: 'button[k-button], a[k-button]',
  host: {
    '[class]': 'classes()',
    '[attr.disabled]': 'isDisabled() ? true : null',
  },
})
export class KButtonDirective {
  readonly variant   = input<ButtonVariant>('default');
  readonly size      = input<ButtonSize>('default');
  readonly class     = input<string>('');
  readonly loading   = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly fullWidth = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly disabled  = input<boolean, unknown>(false, { transform: booleanAttribute });

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private spinnerNode: any = null;

  constructor() {
    effect(() => {
      if (this.loading()) {
        this.addSpinner();
      } else {
        this.removeSpinner();
      }
    });
  }

  private addSpinner() {
    if (this.spinnerNode) return;
    const svgStr = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;
    const div = this.renderer.createElement('div');
    div.innerHTML = svgStr;
    this.spinnerNode = div.firstChild;
    this.renderer.insertBefore(this.el.nativeElement, this.spinnerNode, this.el.nativeElement.firstChild);
  }

  private removeSpinner() {
    if (this.spinnerNode) {
      this.renderer.removeChild(this.el.nativeElement, this.spinnerNode);
      this.spinnerNode = null;
    }
  }

  protected readonly isDisabled = computed(() => this.loading() || this.disabled());

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.fullWidth() ? 'w-full' : '',
      this.loading() ? 'pointer-events-none opacity-70' : '',
      this.class()
    )
  );
}
