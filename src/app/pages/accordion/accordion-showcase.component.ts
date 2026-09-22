import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KAccordion, KAccordionPanel } from '../../components/ui/accordion/accordion.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-accordion-showcase',
  imports: [KAccordion, KAccordionPanel, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">accordion</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Accordion</h1>
          <p class="text-lg text-muted-foreground">Collapsible panels with Angular animations.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-6 mt-4">
              <k-accordion>
                @for (item of faqItems; track item.q) {
                  <k-accordion-panel [title]="item.q">{{ item.a }}</k-accordion-panel>
                }
              </k-accordion>
            </div>
          }
          @if (tab() === 'code') {
            <div class="mt-4">
              <app-code-block code="<k-accordion>
  <k-accordion-panel title=&quot;Is it accessible?&quot;>Yes.</k-accordion-panel>
  <k-accordion-panel title=&quot;Is it styled?&quot;>Yes.</k-accordion-panel>
</k-accordion>" language="html" />
            </div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Variants</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="default"</span>
            <k-accordion variant="default">
              <k-accordion-panel title="Default variant item 1">Content for item 1.</k-accordion-panel>
              <k-accordion-panel title="Default variant item 2">Content for item 2.</k-accordion-panel>
            </k-accordion>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="outline"</span>
            <k-accordion variant="outline">
              <k-accordion-panel title="Outline variant item 1">Content for item 1.</k-accordion-panel>
              <k-accordion-panel title="Outline variant item 2">Content for item 2.</k-accordion-panel>
            </k-accordion>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">variant="separated"</span>
            <k-accordion variant="separated">
              <k-accordion-panel title="Separated variant item 1">Content for item 1.</k-accordion-panel>
              <k-accordion-panel title="Separated variant item 2">Content for item 2.</k-accordion-panel>
            </k-accordion>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAccordion</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-accordion</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'outline' | 'separated'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual variant of the accordion.</td>
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
            <h3 class="text-lg font-semibold">KAccordionPanel</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-accordion-panel</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">title <span class="text-destructive">*</span></td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">The title displayed on the panel trigger. Required.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">defaultOpen</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Whether the panel should be open by default on load.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply to the panel container.</td>
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
export class AccordionShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');

  readonly faqItems = [
    { q: 'Is it accessible?',    a: 'Yes. The accordion is built with proper aria-expanded and keyboard navigation.' },
    { q: 'Is it animated?',      a: 'Yes. The height transition uses Angular\'s @angular/animations with 200ms ease-in-out.' },
    { q: 'Is it unstyled?',      a: 'No, it ships with Tailwind styles but you can override any class.' },
    { q: 'Can it be open by default?', a: 'Yes. Set [defaultOpen]="true" on a k-accordion-panel.' },
  ];
}
