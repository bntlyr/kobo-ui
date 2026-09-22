import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn } from '../../../core/utils/cn';

/**
 * Breadcrumb compound components — semantic nav with aria-label="breadcrumb".
 *
 * @example
 * <k-breadcrumb>
 *   <k-breadcrumb-list>
 *     <k-breadcrumb-item>
 *       <k-breadcrumb-link href="/">Home</k-breadcrumb-link>
 *     </k-breadcrumb-item>
 *     <k-breadcrumb-separator />
 *     <k-breadcrumb-item>
 *       <k-breadcrumb-link href="/components">Components</k-breadcrumb-link>
 *     </k-breadcrumb-item>
 *     <k-breadcrumb-separator />
 *     <k-breadcrumb-item>
 *       <k-breadcrumb-page>Button</k-breadcrumb-page>
 *     </k-breadcrumb-item>
 *   </k-breadcrumb-list>
 * </k-breadcrumb>
 */

@Component({
  selector: 'k-breadcrumb',
  template: `<nav aria-label="breadcrumb" [class]="classes()"><ng-content /></nav>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBreadcrumb {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(this.class()));
}

import { cva, type VariantProps } from 'class-variance-authority';

const breadcrumbListVariants = cva(
  'flex flex-wrap items-center gap-1.5 break-words text-muted-foreground sm:gap-2.5 list-none p-0 m-0',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      }
    },
    defaultVariants: { size: 'default' }
  }
);

export type BreadcrumbSize = NonNullable<VariantProps<typeof breadcrumbListVariants>['size']>;

@Component({
  selector: 'k-breadcrumb-list',
  template: `<ol [class]="classes()"><ng-content /></ol>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBreadcrumbList {
  readonly size = input<BreadcrumbSize>('default');
  readonly class = input<string>('');

  protected readonly classes = computed(() => cn(breadcrumbListVariants({ size: this.size() }), this.class()));
}

@Component({
  selector: 'k-breadcrumb-item',
  template: `<li class="inline-flex items-center gap-1.5"><ng-content /></li>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBreadcrumbItem {}

@Component({
  selector: 'k-breadcrumb-link',
  template: `
    @if (href()) {
      <a [href]="href()" [class]="linkClasses()"><ng-content /></a>
    } @else if (routerLink()) {
      <a [routerLink]="routerLink()" [class]="linkClasses()"><ng-content /></a>
    } @else {
      <span [class]="linkClasses()"><ng-content /></span>
    }
  `,
  imports: [RouterLink],
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBreadcrumbLink {
  readonly href        = input<string>('');
  readonly routerLink  = input<string | unknown[]>('');
  readonly class       = input<string>('');

  protected readonly linkClasses = computed(() =>
    cn('transition-colors hover:text-foreground no-underline', this.class())
  );
}

@Component({
  selector: 'k-breadcrumb-page',
  template: `<span role="link" aria-disabled="true" aria-current="page" class="font-normal text-foreground"><ng-content /></span>`,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBreadcrumbPage {}

@Component({
  selector: 'k-breadcrumb-separator',
  template: `
    <li role="presentation" aria-hidden="true" class="[&>svg]:w-3.5 [&>svg]:h-3.5">
      <ng-content>
        @if (type() === 'slash') {
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 2 2 22"/>
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        }
      </ng-content>
    </li>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBreadcrumbSeparator {
  readonly type = input<'chevron' | 'slash'>('chevron');
}

@Component({
  selector: 'k-breadcrumb-ellipsis',
  template: `
    <span role="presentation" aria-hidden="true" class="flex h-9 w-9 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
      </svg>
      <span class="sr-only">More</span>
    </span>
  `,
  host: { '[class]': '"contents"' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBreadcrumbEllipsis {}
