import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../core/utils/cn';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden',
  {
    variants: {
      size: {
        xs:      'h-6 w-6 text-[10px]',
        sm:      'h-8 w-8 text-xs',
        default: 'h-10 w-10 text-sm',
        lg:      'h-12 w-12 text-base',
        xl:      'h-16 w-16 text-lg',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      }
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
    },
  }
);

export type AvatarSize  = NonNullable<VariantProps<typeof avatarVariants>['size']>;
export type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>['shape']>;

// ---- Avatar Root ----

/**
 * <k-avatar>
 * Circular or square avatar container. Manages the fallback visibility signal
 * shared with child image/fallback components via template variables.
 *
 * @example
 * <k-avatar>
 *   <k-avatar-image src="https://..." alt="John Doe" />
 *   <k-avatar-fallback>JD</k-avatar-fallback>
 * </k-avatar>
 */
@Component({
  selector: 'k-avatar',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAvatar {
  readonly size  = input<AvatarSize>('default');
  readonly shape = input<AvatarShape>('circle');
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(avatarVariants({ size: this.size(), shape: this.shape() }), this.class())
  );
}

// ---- Avatar Image ----

@Component({
  selector: 'k-avatar-image',
  template: `
    <img
      [src]="src()"
      [alt]="alt()"
      (error)="onError()"
      (load)="onLoad()"
      [class]="imageClasses()"
    />
  `,
  host: {
    '[class]': '"contents"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAvatarImage {
  readonly src   = input.required<string>();
  readonly alt   = input<string>('');
  readonly class = input<string>('');

  /** Set to false when image fails to load — drives CSS visibility */
  readonly loaded = signal(true);

  protected readonly imageClasses = computed(() =>
    cn(
      'aspect-square h-full w-full object-cover transition-opacity duration-200',
      this.loaded() ? 'opacity-100' : 'opacity-0 absolute inset-0',
      this.class()
    )
  );

  onError(): void { this.loaded.set(false); }
  onLoad():  void { this.loaded.set(true); }
}

// ---- Avatar Fallback ----

@Component({
  selector: 'k-avatar-fallback',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAvatarFallback {
  readonly class = input<string>('');

  protected readonly classes = computed(() =>
    cn(
      'flex h-full w-full items-center justify-center rounded-full',
      'bg-muted text-muted-foreground text-sm font-medium select-none',
      this.class()
    )
  );
}
