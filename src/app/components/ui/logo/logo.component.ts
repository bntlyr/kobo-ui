import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const logoVariants = cva(
  'flex items-center gap-2.5 font-semibold text-foreground no-underline shrink-0 group',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const iconVariants = cva(
  'rounded-md bg-primary flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-90',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        default: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const textVariants = cva(
  'font-bold leading-none text-primary-foreground',
  {
    variants: {
      size: {
        sm: 'text-[8px]',
        default: 'text-[10px]',
        lg: 'text-xs',
        xl: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type LogoSize = NonNullable<VariantProps<typeof logoVariants>['size']>;

@Component({
  selector: 'k-logo',
  template: `
    <div [class]="iconClasses()">
      <span [class]="textClasses()">工</span>
    </div>
    @if (!iconOnly()) {
      <span class="font-semibold tracking-tight">Kobo UI</span>
    }
  `,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KLogo {
  readonly size = input<LogoSize>('default');
  readonly iconOnly = input<boolean>(false);
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(logoVariants({ size: this.size() }), this.class())
  );

  protected readonly iconClasses = computed(() =>
    iconVariants({ size: this.size() })
  );

  protected readonly textClasses = computed(() =>
    textVariants({ size: this.size() })
  );
}
