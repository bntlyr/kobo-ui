import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import { cn } from '../../../core/utils/cn';

import { buttonVariants, type ButtonVariant, type ButtonSize } from '../button/button.directive';

export type PaginationVariant = 'default' | 'outline' | 'ghost';
export type PaginationSize = 'default' | 'sm' | 'lg';

/**
 * <k-pagination>
 *
 * @example
 * <k-pagination [page]="currentPage" [pageCount]="totalPages"
 *               (pageChange)="onPageChange($event)" />
 */
@Component({
  selector: 'k-pagination',
  template: `
    <nav role="navigation" aria-label="pagination" [class]="navClasses()">
      <ul class="flex flex-row items-center gap-1 list-none p-0 m-0">

        <!-- Previous -->
        <li>
          <button
            type="button"
            (click)="prev()"
            [disabled]="page() <= 1"
            [class]="prevNextClasses()"
            aria-label="Go to previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span class="hidden sm:inline">Previous</span>
          </button>
        </li>

        <!-- Page Numbers -->
        @for (p of pageRange(); track p) {
          <li>
            @if (p === -1) {
              <span class="flex h-9 w-9 items-center justify-center text-muted-foreground select-none">
                &hellip;
              </span>
            } @else {
              <button
                type="button"
                (click)="goTo(p)"
                [attr.aria-current]="p === page() ? 'page' : null"
                [class]="pageClasses(p)"
              >{{ p }}</button>
            }
          </li>
        }

        <!-- Next -->
        <li>
          <button
            type="button"
            (click)="next()"
            [disabled]="page() >= pageCount()"
            [class]="prevNextClasses()"
            aria-label="Go to next page"
          >
            <span class="hidden sm:inline">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KPagination {
  readonly page         = input<number>(1);
  readonly pageCount    = input<number>(1);
  readonly siblingCount = input<number>(1);
  readonly variant      = input<PaginationVariant>('default');
  readonly size         = input<PaginationSize>('default');
  readonly class        = input<string>('');

  readonly pageChange = output<number>();

  protected readonly navClasses = computed(() =>
    cn('mx-auto flex w-full justify-center', this.class())
  );

  protected readonly prevNextClasses = computed(() => {
    let v: ButtonVariant = 'ghost';
    if (this.variant() === 'outline') v = 'outline';
    return cn(buttonVariants({ variant: v, size: 'default' }), 'gap-1 pl-2.5 pr-2.5');
  });

  protected pageClasses(p: number) {
    const isCurrent = p === this.page();
    let btnVariant: ButtonVariant = 'ghost';
    
    if (this.variant() === 'default') {
      btnVariant = isCurrent ? 'outline' : 'ghost';
    } else if (this.variant() === 'outline') {
      btnVariant = isCurrent ? 'default' : 'outline';
    } else if (this.variant() === 'ghost') {
      btnVariant = isCurrent ? 'secondary' : 'ghost';
    }
    
    // Map size to button size (default -> icon, sm -> icon-sm)
    const btnSize = this.size() === 'sm' ? 'icon-sm' : (this.size() === 'lg' ? 'default' : 'icon');
    
    return cn(buttonVariants({ variant: btnVariant, size: btnSize }));
  }

  /** Generates array of page numbers with -1 for ellipsis */
  protected readonly pageRange = computed((): number[] => {
    const total    = this.pageCount();
    const current  = this.page();
    const siblings = this.siblingCount();

    if (total <= 7 + siblings * 2) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const left  = Math.max(2, current - siblings);
    const right = Math.min(total - 1, current + siblings);
    const pages: number[] = [1];

    if (left > 2)          pages.push(-1);
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push(-1);
    pages.push(total);

    return pages;
  });

  goTo(p: number): void {
    if (p >= 1 && p <= this.pageCount()) this.pageChange.emit(p);
  }

  prev(): void { this.goTo(this.page() - 1); }
  next(): void { this.goTo(this.page() + 1); }
}
