import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KH1Directive, KH2Directive, KH3Directive, KH4Directive,
  KPDirective, KBlockquoteDirective, KCodeDirective,
  KLeadDirective, KLargeDirective, KSmallDirective, KMutedDirective,
} from '../../components/ui/typography/typography.directives';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const USAGE = `<!-- Heading directives -->
<h1 k-h1>Heading 1</h1>
<h2 k-h2>Heading 2</h2>
<h3 k-h3>Heading 3</h3>
<h4 k-h4>Heading 4</h4>

<!-- Body text -->
<p k-p>The quick brown fox jumps over the lazy dog.</p>
<blockquote k-blockquote>
  "Design is not just what it looks like. Design is how it works." — Steve Jobs
</blockquote>
<code k-code>npm install kobo-ui</code>

<!-- Inline helpers -->
<p k-lead>Large introductory paragraph text.</p>
<span k-large>Large bold text</span>
<span k-small>Small label text</span>
<span k-muted>Muted helper text</span>`;

@Component({
  selector: 'app-typography-showcase',
  imports: [
    KH1Directive, KH2Directive, KH3Directive, KH4Directive,
    KPDirective, KBlockquoteDirective, KCodeDirective,
    KLeadDirective, KLargeDirective, KSmallDirective, KMutedDirective,
    KSeparatorDirective, CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>components</span><span>/</span><span class="text-foreground">typography</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Typography</h1>
        <p class="text-lg text-muted-foreground">
          Heading and text style directives built on semantic HTML elements.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-4">
            <h1 k-h1>The quick brown fox</h1>
            <h2 k-h2>Jumps over the</h2>
            <h3 k-h3>Lazy dog</h3>
            <h4 k-h4>A typography specimen</h4>

            <hr k-separator class="my-2" />

            <p k-lead>Establishing a clear typographic hierarchy guides the reader through your content naturally.</p>
            <p k-p>This is a standard paragraph with a comfortable line height and proper spacing between text blocks. Typography directives apply opinionated, consistent styles without fighting native HTML semantics.</p>

            <blockquote k-blockquote>
              "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
            </blockquote>

            <p class="text-sm">Inline code: <code k-code>npx kobo-ui add typography</code></p>

            <hr k-separator class="my-2" />

            <div class="flex flex-wrap gap-4 items-baseline">
              <span k-large>Large text</span>
              <span k-small>Small text</span>
              <span k-muted>Muted text</span>
            </div>
          </div>
        }
        @if (activeTab() === 'code') {
          <div class="mt-4">
            <app-code-block [code]="usage" language="html" />
          </div>
        }
      </app-tabs>

      <!-- API Table -->
      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Directives</h3>
            <p class="text-sm text-muted-foreground">Attribute directives applied to semantic HTML elements.</p>
            
            <div class="rounded-xl border border-border overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="text-left px-4 py-3 font-semibold">Directive</th>
                    <th class="text-left px-4 py-3 font-semibold">Selector</th>
                    <th class="text-left px-4 py-3 font-semibold">Style Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  @for (d of directives; track d.selector) {
                    <tr class="hover:bg-muted/30">
                      <td class="px-4 py-3 font-mono text-primary text-xs">{{ d.name }}</td>
                      <td class="px-4 py-3 font-mono text-xs text-muted-foreground">{{ d.selector }}</td>
                      <td class="px-4 py-3 text-xs text-muted-foreground">{{ d.style }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class TypographyShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly activeTab = signal('preview');
  readonly usage = USAGE;

  readonly directives = [
    { name: 'KH1Directive',         selector: 'h1[k-h1]',           style: '4xl/5xl font, extrabold' },
    { name: 'KH2Directive',         selector: 'h2[k-h2]',           style: '3xl font, semibold' },
    { name: 'KH3Directive',         selector: 'h3[k-h3]',           style: '2xl font, semibold' },
    { name: 'KH4Directive',         selector: 'h4[k-h4]',           style: 'xl font, semibold' },
    { name: 'KPDirective',          selector: 'p[k-p]',             style: 'leading-7, mt-6 after first' },
    { name: 'KBlockquoteDirective', selector: 'blockquote[k-blockquote]', style: 'Left border accent, italic' },
    { name: 'KCodeDirective',       selector: 'code[k-code]',       style: 'Mono, bg-muted, rounded' },
    { name: 'KListDirective',       selector: 'ul[k-list]',         style: 'List-disc, ml-6' },
    { name: 'KLeadDirective',       selector: '[k-lead]',           style: 'xl, text-muted-foreground' },
    { name: 'KLargeDirective',      selector: '[k-large]',          style: 'lg, font-semibold' },
    { name: 'KSmallDirective',      selector: '[k-small]',          style: 'sm, font-medium' },
    { name: 'KMutedDirective',      selector: '[k-muted]',          style: 'sm, text-muted-foreground' },
  ];
}
