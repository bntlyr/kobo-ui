import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KTableDirective, KTableHeadDirective, KTableBodyDirective,
  KTableRowDirective, KTableHeadCellDirective, KTableCellDirective,
  KTableFootDirective,
} from '../../components/ui/table/table.directives';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';
import { KSelect, KSelectContent, KSelectItem, KSelectSeparator, KSelectLabel } from '../../components/ui/select/index';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
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

const SELECT_SRC = `<!-- Simple select (model binding) -->
<k-select [(value)]="selectedFruit" placeholder="Pick a fruit">
  <k-select-content>
    <k-select-item value="apple" [label]="'Apple'">Apple</k-select-item>
    <k-select-item value="banana" [label]="'Banana'">Banana</k-select-item>
    <k-select-item value="mango" [label]="'Mango'">Mango</k-select-item>
  </k-select-content>
</k-select>

<!-- Reactive forms -->
<k-select formControlName="country" placeholder="Select country">
  ...
</k-select>`;

interface Invoice {
  id: string;
  status: 'paid' | 'pending' | 'failed';
  method: string;
  amount: string;
}

@Component({
  selector: 'app-data-showcase',
  imports: [
    KTableDirective, KTableHeadDirective, KTableBodyDirective,
    KTableRowDirective, KTableHeadCellDirective, KTableCellDirective, KTableFootDirective,
    KBadgeDirective,
    KSelect, KSelectContent, KSelectItem, KSelectSeparator, KSelectLabel,
    KSeparatorDirective,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>components</span><span>/</span><span class="text-foreground">data</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Data</h1>
        <p class="text-lg text-muted-foreground">Table directives and Select component.</p>
      </div>

      <!-- Table -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Table</h2>
        <p class="text-muted-foreground text-sm">
          Attribute directives applied to native semantic table elements.
          Full screen reader support, hover rows, and zebra striping.
        </p>

        <app-tabs [tabs]="tabs" [(active)]="tableTab">
          @if (tableTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card mt-4 overflow-hidden">
              <table k-table>
                <thead k-thead>
                  <tr k-tr>
                    <th k-th>Invoice</th>
                    <th k-th>Status</th>
                    <th k-th>Method</th>
                    <th k-th class="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody k-tbody>
                  @for (inv of invoices; track inv.id) {
                    <tr k-tr>
                      <td k-td class="font-medium">{{ inv.id }}</td>
                      <td k-td>
                        <span k-badge [variant]="badgeVariant(inv.status)">{{ inv.status }}</span>
                      </td>
                      <td k-td class="text-muted-foreground">{{ inv.method }}</td>
                      <td k-td class="text-right">{{ inv.amount }}</td>
                    </tr>
                  }
                </tbody>
                <tfoot k-tfoot>
                  <tr k-tr>
                    <td k-td colspan="3" class="font-medium">Total</td>
                    <td k-td class="text-right font-medium">$2,750.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          }
          @if (tableTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="tableSrc" language="html" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator />

      <!-- Select -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold">Select</h2>
        <p class="text-muted-foreground text-sm">
          Custom styled select with CDK overlay, grouped options, searchable variant, and ControlValueAccessor support.
        </p>

        <app-tabs [tabs]="tabs" [(active)]="selectTab">
          @if (selectTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">
              <div class="grid sm:grid-cols-2 gap-6">
                <!-- Fruit select -->
                <div class="space-y-2">
                  <label class="text-sm font-medium">Favourite fruit</label>
                  <k-select placeholder="Pick a fruit..." class="w-full"
                            (valueChange)="selectedFruit.set($event)">
                    <k-select-label>Tropical</k-select-label>
                    <k-select-item value="mango" label="🥭 Mango">🥭 Mango</k-select-item>
                    <k-select-item value="pineapple" label="🍍 Pineapple">🍍 Pineapple</k-select-item>
                    <k-select-item value="papaya" label="🍈 Papaya">🍈 Papaya</k-select-item>
                    <k-select-separator />
                    <k-select-label>Temperate</k-select-label>
                    <k-select-item value="apple" label="🍎 Apple">🍎 Apple</k-select-item>
                    <k-select-item value="pear" label="🍐 Pear">🍐 Pear</k-select-item>
                    <k-select-item value="cherry" label="🍒 Cherry">🍒 Cherry</k-select-item>
                  </k-select>
                  @if (selectedFruit()) {
                    <p class="text-xs text-muted-foreground">Selected: {{ selectedFruit() }}</p>
                  }
                </div>

                <!-- Searchable select -->
                <div class="space-y-2">
                  <label class="text-sm font-medium">Timezone (searchable)</label>
                  <k-select placeholder="Select timezone..." class="w-full"
                            [searchable]="true"
                            (valueChange)="selectedTz.set($event)">
                    <k-select-label>North America</k-select-label>
                    <k-select-item value="est" label="Eastern (UTC-5)">Eastern (UTC-5)</k-select-item>
                    <k-select-item value="cst" label="Central (UTC-6)">Central (UTC-6)</k-select-item>
                    <k-select-item value="pst" label="Pacific (UTC-8)">Pacific (UTC-8)</k-select-item>
                    <k-select-separator />
                    <k-select-label>Europe</k-select-label>
                    <k-select-item value="gmt" label="London (UTC+0)">London (UTC+0)</k-select-item>
                    <k-select-item value="cet" label="Berlin (UTC+1)">Berlin (UTC+1)</k-select-item>
                    <k-select-separator />
                    <k-select-label>Asia</k-select-label>
                    <k-select-item value="jst" label="Tokyo (UTC+9)">Tokyo (UTC+9)</k-select-item>
                    <k-select-item value="sgt" label="Singapore (UTC+8)">Singapore (UTC+8)</k-select-item>
                  </k-select>
                  @if (selectedTz()) {
                    <p class="text-xs text-muted-foreground">Selected: {{ selectedTz() }}</p>
                  }
                </div>
              </div>
            </div>
          }
          @if (selectTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="selectSrc" language="html" /></div>
          }
        </app-tabs>
      </section>

    </div>
  `,
})
export class DataShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tableTab    = signal('preview');
  readonly selectTab   = signal('preview');
  readonly selectedFruit = signal('');
  readonly selectedTz    = signal('');
  readonly tableSrc    = TABLE_SRC;
  readonly selectSrc   = SELECT_SRC;

  readonly invoices: Invoice[] = [
    { id: 'INV-001', status: 'paid',    method: 'Credit Card',   amount: '$250.00' },
    { id: 'INV-002', status: 'pending', method: 'PayPal',        amount: '$150.00' },
    { id: 'INV-003', status: 'paid',    method: 'Bank Transfer',  amount: '$350.00' },
    { id: 'INV-004', status: 'failed',  method: 'Credit Card',   amount: '$450.00' },
    { id: 'INV-005', status: 'paid',    method: 'Crypto',        amount: '$550.00' },
    { id: 'INV-006', status: 'pending', method: 'Invoice',       amount: '$200.00' },
    { id: 'INV-007', status: 'paid',    method: 'Credit Card',   amount: '$800.00' },
  ];

  badgeVariant(status: Invoice['status']): 'default' | 'secondary' | 'destructive' | 'outline' {
    return { paid: 'default', pending: 'secondary', failed: 'destructive' }[status] as any;
  }
}
