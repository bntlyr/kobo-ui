import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const INSTALL_CODE = `npm install @angular/cdk class-variance-authority clsx tailwind-merge @lucide/angular`;

const STYLES_CODE = `/* src/styles.css */
@import "tailwindcss";
@import "./styles/tokens.css";

@theme {
  --color-primary: hsl(var(--primary));
  --color-background: hsl(var(--background));
  /* ... other token mappings */
}`;

const TOKENS_CODE = `/* src/styles/tokens.css */
:root {
  --background: 0 0% 100%;
  --foreground: 224 71% 4%;
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  --radius: 0.5rem;
  /* ... */
}

.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --primary: 217 91% 60%;
  /* ... */
}`;

const USAGE_CODE = `<!-- After copying button.directive.ts to your project -->
import { KButtonDirective } from './components/ui/button/button.directive';

@Component({
  imports: [KButtonDirective],
  template: \`
    <button k-button variant="default">Click me</button>
    <button k-button variant="outline" size="sm">Small outline</button>
  \`
})
export class MyComponent {}`;

@Component({
  selector: 'app-installation-page',
  imports: [RouterLink, KButtonDirective, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-10 max-w-3xl">
      <div class="space-y-3">
        <h1 class="text-4xl font-bold tracking-tight">Installation</h1>
        <p class="text-lg text-muted-foreground">
          Set up Kobo UI in your Angular project in minutes.
        </p>
      </div>

      <!-- Prerequisites -->
      <div class="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
        <span class="text-amber-500 shrink-0">⚠️</span>
        <div class="text-sm">
          <p class="font-semibold text-foreground mb-1">Prerequisites</p>
          <p class="text-muted-foreground">Angular 18+ project with Tailwind CSS 4.x configured.</p>
        </div>
      </div>

      <!-- Steps -->
      <div class="space-y-8">

        <!-- Step 1 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">1</span>
            <h2 class="text-xl font-semibold">Install peer dependencies</h2>
          </div>
          <app-code-block [code]="installCode" language="bash" />
        </div>

        <!-- Step 2 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">2</span>
            <h2 class="text-xl font-semibold">Add design tokens</h2>
          </div>
          <p class="text-sm text-muted-foreground">
            Copy <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tokens.css</code> to
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/styles/tokens.css</code>:
          </p>
          <app-code-block [code]="tokensCode" language="typescript" filename="src/styles/tokens.css" />
        </div>

        <!-- Step 3 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">3</span>
            <h2 class="text-xl font-semibold">Configure Tailwind styles</h2>
          </div>
          <app-code-block [code]="stylesCode" language="typescript" filename="src/styles.css" />
        </div>

        <!-- Step 4 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">4</span>
            <h2 class="text-xl font-semibold">Copy a component & use it</h2>
          </div>
          <p class="text-sm text-muted-foreground">
            Browse to any component page, copy the source from the Code tab, and paste it into your project.
          </p>
          <app-code-block [code]="usageCode" language="typescript" />
        </div>
      </div>

      <!-- CTA -->
      <div class="flex gap-3 pt-4 border-t border-border">
        <a routerLink="/button" k-button>Browse Components →</a>
      </div>
    </div>
  `,
})
export class InstallationPageComponent {
  readonly installCode = INSTALL_CODE;
  readonly stylesCode  = STYLES_CODE;
  readonly tokensCode  = TOKENS_CODE;
  readonly usageCode   = USAGE_CODE;
}
