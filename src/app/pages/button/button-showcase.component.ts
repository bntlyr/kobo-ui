import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const BUTTON_SOURCE = `import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../core/utils/cn';

const buttonVariants = cva(
  ['inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
   'transition-all duration-150', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
   'disabled:pointer-events-none disabled:opacity-50', 'cursor-pointer select-none'],
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:     'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:   'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:       'hover:bg-accent hover:text-accent-foreground',
        link:        'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm:      'h-8 rounded-md px-3 text-xs',
        lg:      'h-10 rounded-md px-8',
        icon:    'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

@Directive({
  selector: 'button[k-button], a[k-button]',
  host: { '[class]': 'classes()' },
})
export class KButtonDirective {
  readonly variant = input<ButtonVariant>('default');
  readonly size    = input<ButtonSize>('default');
  readonly class   = input<string>('');
  protected readonly classes = computed(() =>
    cn(buttonVariants({ variant: this.variant(), size: this.size() }), this.class())
  );
}`;

const BUTTON_USAGE = `import { KButtonDirective } from './components/ui/button/button.directive';

@Component({
  imports: [KButtonDirective],
  template: \`
    <!-- Variants -->
    <button k-button>Default</button>
    <button k-button variant="secondary">Secondary</button>
    <button k-button variant="destructive">Destructive</button>
    <button k-button variant="outline">Outline</button>
    <button k-button variant="ghost">Ghost</button>
    <a k-button variant="link" href="#">Link</a>

    <!-- Sizes -->
    <button k-button size="sm">Small</button>
    <button k-button size="default">Default</button>
    <button k-button size="lg">Large</button>

    <!-- Icon -->
    <button k-button size="icon" aria-label="Settings">
      <lucide-icon name="settings" />
    </button>

    <!-- Disabled -->
    <button k-button disabled>Disabled</button>
  \`
})
export class MyComponent {}`;

type BtnVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
type BtnSize    = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'app-button-showcase',
  imports: [KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <!-- Page header -->
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">button</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Button</h1>
        <p class="text-lg text-muted-foreground">
          An accessible button directive with multiple variants and sizes.
          Works on both <code class="font-mono text-sm bg-muted px-1 py-0.5 rounded">button</code> and
          <code class="font-mono text-sm bg-muted px-1 py-0.5 rounded">a</code> elements.
        </p>
      </div>

      <!-- Tabs -->
      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <!-- Preview -->
          <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-6">

            <!-- Variants -->
            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Variants</p>
              <div class="flex flex-wrap gap-2">
                <button k-button variant="default">Default</button>
                <button k-button variant="secondary">Secondary</button>
                <button k-button variant="destructive">Destructive</button>
                <button k-button variant="outline">Outline</button>
                <button k-button variant="ghost">Ghost</button>
                <a k-button variant="link">Link</a>
              </div>
            </div>

            <!-- Sizes -->
            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sizes</p>
              <div class="flex flex-wrap items-center gap-2">
                <button k-button size="sm">Small</button>
                <button k-button size="default">Default</button>
                <button k-button size="lg">Large</button>
                <button k-button size="icon" aria-label="Settings icon button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button k-button size="icon-sm" aria-label="Small icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14"/><path d="M5 12h14"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- With icons -->
            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">With Icons</p>
              <div class="flex flex-wrap gap-2">
                <button k-button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                  </svg>
                  Download
                </button>
                <button k-button variant="outline">
                  Deploy
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Disabled -->
            <div class="space-y-3">
              <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Disabled</p>
              <div class="flex flex-wrap gap-2">
                <button k-button [disabled]="true">Disabled</button>
                <button k-button variant="outline" [disabled]="true">Disabled Outline</button>
              </div>
            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold text-foreground mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add button" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold text-foreground mb-2">Source</p>
              <app-code-block [code]="buttonSource" language="typescript"
                              filename="src/app/components/ui/button/button.directive.ts" />
            </div>
            <div>
              <p class="text-sm font-semibold text-foreground mb-2">Usage</p>
              <app-code-block [code]="buttonUsage" language="typescript" />
            </div>
          </div>
        }
      </app-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KButtonDirective</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">button[k-button]</code>, <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">a[k-button]</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The visual style variant.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'default' | 'sm' | 'lg' | 'icon' | 'icon-sm'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The size variant.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">loading</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Displays a loading spinner and disables the button.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">fullWidth</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Makes the button expand to the full width of its container.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">disabled</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">boolean</td>
                    <td class="px-4 py-3 font-mono text-xs">false</td>
                    <td class="px-4 py-3 text-muted-foreground">Standard HTML disabled attribute.</td>
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
        </div>
      </section>
    </div>
  `,
})
export class ButtonShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');

  readonly buttonSource = BUTTON_SOURCE;
  readonly buttonUsage  = BUTTON_USAGE;
}
