import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KTableDirective, KTableCaptionDirective, KTableHeadDirective, KTableBodyDirective, KTableFootDirective, KTableRowDirective, KTableHeadCellDirective, KTableCellDirective } from '../../components/ui/table';

@Component({
  selector: 'app-data-table-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KTableDirective, KTableCaptionDirective, KTableHeadDirective, KTableBodyDirective, KTableFootDirective, KTableRowDirective, KTableHeadCellDirective, KTableCellDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Data Table</h1>
        <p class="text-muted-foreground mt-2">Powerful table and datagrids built using TanStack Table.</p>
      </div>

      <k-tabs value="preview" variant="line">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] flex-col rounded-md border p-10">
            <table k-table>
              <caption k-caption>A list of your recent invoices.</caption>
              <thead k-thead>
                <tr k-tr>
                  <th k-th class="w-[100px]">Invoice</th>
                  <th k-th>Status</th>
                  <th k-th>Method</th>
                  <th k-th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody k-tbody>
                @for (invoice of invoices; track invoice.invoice) {
                  <tr k-tr>
                    <td k-td class="font-medium">{{ invoice.invoice }}</td>
                    <td k-td>{{ invoice.paymentStatus }}</td>
                    <td k-td>{{ invoice.paymentMethod }}</td>
                    <td k-td class="text-right">{{ invoice.totalAmount }}</td>
                  </tr>
                }
              </tbody>
              <tfoot k-tfoot>
                <tr k-tr>
                  <td k-td colspan="3">Total</td>
                  <td k-td class="text-right">$2,500.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;table k-table&gt;
  &lt;caption k-caption&gt;A list of your recent invoices.&lt;/caption&gt;
  &lt;thead k-thead&gt;
    &lt;tr k-tr&gt;
      &lt;th k-th class="w-[100px]"&gt;Invoice&lt;/th&gt;
      &lt;th k-th&gt;Status&lt;/th&gt;
      &lt;th k-th&gt;Method&lt;/th&gt;
      &lt;th k-th class="text-right"&gt;Amount&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody k-tbody&gt;
    &#64;for (invoice of invoices; track invoice.invoice) {{ '{' }}
      &lt;tr k-tr&gt;
        &lt;td k-td class="font-medium"&gt;{{ '{' }}{{ '{' }} invoice.invoice {{ '}' }}{{ '}' }}&lt;/td&gt;
        &lt;td k-td&gt;{{ '{' }}{{ '{' }} invoice.paymentStatus {{ '}' }}{{ '}' }}&lt;/td&gt;
        &lt;td k-td&gt;{{ '{' }}{{ '{' }} invoice.paymentMethod {{ '}' }}{{ '}' }}&lt;/td&gt;
        &lt;td k-td class="text-right"&gt;{{ '{' }}{{ '{' }} invoice.totalAmount {{ '}' }}{{ '}' }}&lt;/td&gt;
      &lt;/tr&gt;
    {{ '}' }}
  &lt;/tbody&gt;
  &lt;tfoot k-tfoot&gt;
    &lt;tr k-tr&gt;
      &lt;td k-td colspan="3"&gt;Total&lt;/td&gt;
      &lt;td k-td class="text-right"&gt;$2,500.00&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KDataTable</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-data-table</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">data</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">any[]</td>
                    <td class="px-4 py-3 font-mono text-xs">[]</td>
                    <td class="px-4 py-3 text-muted-foreground">Data to display.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DataTableShowcaseComponent {
  readonly invoices = [
    { invoice: 'INV001', paymentStatus: 'Paid', paymentMethod: 'Credit Card', totalAmount: '$250.00' },
    { invoice: 'INV002', paymentStatus: 'Pending', paymentMethod: 'PayPal', totalAmount: '$150.00' },
    { invoice: 'INV003', paymentStatus: 'Unpaid', paymentMethod: 'Bank Transfer', totalAmount: '$350.00' },
    { invoice: 'INV004', paymentStatus: 'Paid', paymentMethod: 'Credit Card', totalAmount: '$450.00' },
    { invoice: 'INV005', paymentStatus: 'Paid', paymentMethod: 'PayPal', totalAmount: '$550.00' },
    { invoice: 'INV006', paymentStatus: 'Pending', paymentMethod: 'Bank Transfer', totalAmount: '$200.00' },
    { invoice: 'INV007', paymentStatus: 'Unpaid', paymentMethod: 'Credit Card', totalAmount: '$300.00' },
  ];
}
