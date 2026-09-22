import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default:  '',
        striped:  '[&_tbody_tr:nth-child(even)]:bg-muted/50',
        bordered: 'border border-border [&_th]:border-r last:[&_th]:border-r-0 [&_td]:border-r last:[&_td]:border-r-0',
        hover:    '[&_tbody_tr:hover]:bg-muted/50 transition-colors',
      },
      size: {
        sm:      '[&_th]:px-2 [&_th]:py-1.5 [&_th]:h-8 [&_td]:p-2',
        default: '',
        lg:      '[&_th]:px-6 [&_th]:py-4 [&_th]:h-12 [&_td]:p-6',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    }
  }
);

export type TableVariant = NonNullable<VariantProps<typeof tableVariants>['variant']>;
export type TableSize = NonNullable<VariantProps<typeof tableVariants>['size']>;

/**
 * Table attribute directives
 *
 * Apply to native HTML table elements to add Kobo styling.
 *
 * @example
 * <table k-table variant="striped" size="sm">
 *   <thead k-thead>
 *     <tr k-tr>
 *       <th k-th>Name</th>
 *       <th k-th>Status</th>
 *     </tr>
 *   </thead>
 *   <tbody k-tbody>
 *     <tr k-tr>
 *       <td k-td>Alice</td>
 *       <td k-td>Active</td>
 *     </tr>
 *   </tbody>
 * </table>
 */

@Directive({
  selector: 'table[k-table]',
  host: { '[class]': 'classes()' },
})
export class KTableDirective {
  readonly variant = input<TableVariant>('default');
  readonly size    = input<TableSize>('default');
  readonly class   = input<string>('');

  protected readonly classes = computed(() =>
    cn(tableVariants({ variant: this.variant(), size: this.size() }), this.class())
  );
}

@Directive({
  selector: 'caption[k-caption]',
  host: { '[class]': 'classes()' },
})
export class KTableCaptionDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('mt-4 text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: 'thead[k-thead]',
  host: { '[class]': 'classes()' },
})
export class KTableHeadDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('[&_tr]:border-b [&_tr]:border-border', this.class())
  );
}

@Directive({
  selector: 'tbody[k-tbody]',
  host: { '[class]': 'classes()' },
})
export class KTableBodyDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('[&_tr:last-child]:border-0', this.class())
  );
}

@Directive({
  selector: 'tfoot[k-tfoot]',
  host: { '[class]': 'classes()' },
})
export class KTableFootDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0', this.class())
  );
}

@Directive({
  selector: 'tr[k-tr]',
  host: { '[class]': 'classes()' },
})
export class KTableRowDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'border-b border-border transition-colors',
      'hover:bg-muted/50',
      'data-[state=selected]:bg-muted',
      this.class()
    )
  );
}

@Directive({
  selector: 'th[k-th]',
  host: { '[class]': 'classes()' },
})
export class KTableHeadCellDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
      '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this.class()
    )
  );
}

@Directive({
  selector: 'td[k-td]',
  host: { '[class]': 'classes()' },
})
export class KTableCellDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'p-4 align-middle',
      '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this.class()
    )
  );
}
