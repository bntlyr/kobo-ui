import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const BADGE_SOURCE = `import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../core/utils/cn';

const badgeVariants = cva(
  ['inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
   'transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'],
  {
    variants: {
      variant: {
        default:     'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:   'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline:     'text-foreground border-border',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

@Directive({
  selector: 'span[k-badge]',
  host: { '[class]': 'classes()' },
})
export class KBadgeDirective {
  readonly variant = input<BadgeVariant>('default');
  readonly class   = input<string>('');
  protected readonly classes = computed(() =>
    cn(badgeVariants({ variant: this.variant() }), this.class())
  );
}`;

const BADGE_USAGE = `import { KBadgeDirective } from './components/ui/badge/badge.directive';

@Component({
  imports: [KBadgeDirective],
  template: \`
    <span k-badge>New</span>
    <span k-badge variant="secondary">Beta</span>
    <span k-badge variant="destructive">Error</span>
    <span k-badge variant="outline">Draft</span>
  \`
})
export class MyComponent {}`;

@Component({
  selector: 'app-badge-showcase',
  imports: [KBadgeDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">badge</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Badge</h1>
        <p class="text-lg text-muted-foreground">
          A small status descriptor with semantic color variants. Applied as an attribute directive on
          <code class="font-mono text-sm bg-muted px-1 py-0.5 rounded">span</code> elements.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">

            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants</p>
              <div class="flex flex-wrap gap-3">
                <span k-badge>Default</span>
                <span k-badge variant="secondary">Secondary</span>
                <span k-badge variant="destructive">Destructive</span>
                <span k-badge variant="outline">Outline</span>
              </div>
            </div>

            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                In context — Status labels
              </p>
              <div class="flex flex-wrap gap-3">
                <span k-badge variant="default">✓ Published</span>
                <span k-badge variant="secondary">In Review</span>
                <span k-badge variant="outline">Draft</span>
                <span k-badge variant="destructive">Failed</span>
              </div>
            </div>

            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Version tags
              </p>
              <div class="flex flex-wrap gap-2">
                <span k-badge variant="outline">v1.0.0</span>
                <span k-badge variant="secondary">Beta</span>
                <span k-badge>New</span>
                <span k-badge variant="destructive">Deprecated</span>
              </div>
            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add badge" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Source</p>
              <app-code-block [code]="badgeSource" language="typescript"
                              filename="src/app/components/ui/badge/badge.directive.ts" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Usage</p>
              <app-code-block [code]="badgeUsage" language="typescript" />
            </div>
          </div>
        }
      </app-tabs>

      <div class="space-y-4">
        <h2 class="text-xl font-bold">API Reference</h2>
        <div class="rounded-xl border border-border overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-muted/50">
              <tr>
                <th class="text-left px-4 py-3 font-semibold">Input</th>
                <th class="text-left px-4 py-3 font-semibold">Type</th>
                <th class="text-left px-4 py-3 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr class="hover:bg-muted/30">
                <td class="px-4 py-3 font-mono text-primary text-xs">variant</td>
                <td class="px-4 py-3 font-mono text-xs text-muted-foreground">'default' | 'secondary' | 'destructive' | 'outline'</td>
                <td class="px-4 py-3 font-mono text-xs">'default'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class BadgeShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');
  readonly badgeSource = BADGE_SOURCE;
  readonly badgeUsage  = BADGE_USAGE;
}
