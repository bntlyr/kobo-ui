import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KTableDirective, KTableHeadDirective, KTableBodyDirective,
  KTableRowDirective, KTableHeadCellDirective, KTableCellDirective,
} from '../../components/ui/table/table.directives';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const TABLE_SRC = `<table k-table>
  <thead k-thead>
    <tr k-tr>
      <th k-th>Invoice</th>
      <th k-th>Status</th>
      <th k-th class="text-right">Amount</th>
    </tr>
  </thead>
  <tbody k-tbody>
    <tr k-tr>
      <td k-td class="font-medium">INV-001</td>
      <td k-td><span k-badge variant="secondary">Paid</span></td>
      <td k-td class="text-right">$250.00</td>
    </tr>
  </tbody>
</table>`;

interface Invoice {
  id: string;
  status: 'paid' | 'pending' | 'failed';
  method: string;
  amount: string;
}

@Component({
  selector: 'app-table-showcase',
  imports: [
    KTableDirective, KTableHeadDirective, KTableBodyDirective,
    KTableRowDirective, KTableHeadCellDirective, KTableCellDirective,
    KBadgeDirective, CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">table</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Table</h1>
          <p class="text-lg text-muted-foreground">
            Attribute directives applied to native semantic table elements.
            Full screen reader support, hover rows, and zebra striping.
          </p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card overflow-hidden mt-4">
              <table k-table>
                <thead k-thead>
                  <tr k-tr>
                    <th k-th class="w-[100px]">Invoice</th>
                    <th k-th>Status</th>
                    <th k-th>Method</th>
                    <th k-th class="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody k-tbody>
                  @for (invoice of invoices; track invoice.id) {
                    <tr k-tr>
                      <td k-td class="font-medium">{{ invoice.id }}</td>
                      <td k-td>
                        <span k-badge [variant]="badgeVariant(invoice.status)">
                          {{ invoice.status }}
                        </span>
                      </td>
                      <td k-td>{{ invoice.method }}</td>
                      <td k-td class="text-right font-medium">{{ invoice.amount }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KTableDirective</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">table[k-table]</code></p>
            
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Default</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'striped' | 'bordered' | 'hover'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual style of the table.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sm' | 'default' | 'lg'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual size of the table.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Other Directives</h3>
            <p class="text-sm text-muted-foreground">Other table elements include structural styling directives.</p>
            
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Directive</th>
                    <th class="px-4 py-3 font-medium">Selector</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KTableHeadDirective</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">thead[k-thead]</td>
                    <td class="px-4 py-3 text-muted-foreground">Applies styling to the table header.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KTableBodyDirective</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">tbody[k-tbody]</td>
                    <td class="px-4 py-3 text-muted-foreground">Applies styling to the table body.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KTableRowDirective</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">tr[k-tr]</td>
                    <td class="px-4 py-3 text-muted-foreground">Applies styling to a table row.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KTableHeadCellDirective</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">th[k-th]</td>
                    <td class="px-4 py-3 text-muted-foreground">Applies styling to a table header cell.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KTableCellDirective</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">td[k-td]</td>
                    <td class="px-4 py-3 text-muted-foreground">Applies styling to a table cell.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">KTableCaptionDirective</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">caption[k-caption]</td>
                    <td class="px-4 py-3 text-muted-foreground">Applies styling to a table caption.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class TableShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = TABLE_SRC;

  readonly invoices: Invoice[] = [
    { id: 'INV-001', status: 'paid',    method: 'Credit Card',   amount: '$250.00' },
    { id: 'INV-002', status: 'pending', method: 'PayPal',        amount: '$150.00' },
    { id: 'INV-003', status: 'paid',    method: 'Bank Transfer', amount: '$350.00' },
    { id: 'INV-004', status: 'failed',  method: 'Credit Card',   amount: '$450.00' },
    { id: 'INV-005', status: 'paid',    method: 'Crypto',        amount: '$550.00' },
  ];

  badgeVariant(status: Invoice['status']): 'default' | 'secondary' | 'destructive' {
    return { paid: 'default', pending: 'secondary', failed: 'destructive' }[status] as any;
  }
}
