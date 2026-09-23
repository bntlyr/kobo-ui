import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { ThemeColorSwitcherComponent } from '../../shared/theme-color-switcher.component';

@Component({
  selector: 'app-theming-page',
  imports: [RouterLink, CodeBlockComponent, KButtonDirective, ThemeColorSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-10 max-w-3xl">
      <div class="space-y-3">
        <h1 class="text-4xl font-bold tracking-tight">Theming</h1>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Learn how to customize Kobo UI's colors, themes, and CSS tokens using Tailwind CSS v4.
        </p>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold tracking-tight">CSS Variables (Custom Properties)</h2>
        <p class="text-muted-foreground leading-7">
          Kobo UI utilizes semantic CSS variables for everything from colors and radiuses to animations. 
          The design system defines variables for the <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">:root</code> (light theme) and <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">.dark</code> class (dark theme). 
          These variables are mapped directly into Tailwind's theme config using the new <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&#64;theme</code> directive in Tailwind v4.
        </p>

        <h3 class="text-xl font-semibold mt-6 mb-3">1. Token Definition (tokens.css)</h3>
        <p class="text-muted-foreground mb-4">
          All semantic HSL values live in <code class="bg-muted px-1 py-0.5 rounded text-sm">src/styles/tokens.css</code>. 
          When you want to override a base color (e.g. your app's primary color), you do it here.
        </p>
        <app-code-block language="css" [code]="tokensCode" />

        <h3 class="text-xl font-semibold mt-8 mb-3">2. Tailwind v4 Integration (styles.css)</h3>
        <p class="text-muted-foreground mb-4">
          The semantic tokens are mapped directly into your Tailwind environment in your global <code class="bg-muted px-1 py-0.5 rounded text-sm">styles.css</code>. 
          You no longer need a <code class="bg-muted px-1 py-0.5 rounded text-sm">tailwind.config.js</code> file.
        </p>
        <app-code-block language="css" [code]="tailwindCode" />
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold tracking-tight">Pre-built Themes</h2>
        <p class="text-muted-foreground leading-7">
          The Kobo UI CLI can generate multiple themes into <code class="bg-muted px-1 py-0.5 rounded text-sm">src/styles/themes.css</code>. 
          To change the theme of your app dynamically, you simply apply the corresponding class (e.g., <code class="bg-muted px-1 py-0.5 rounded text-sm">.theme-blue</code>) to the <code class="bg-muted px-1 py-0.5 rounded text-sm">&lt;body&gt;</code> element.
        </p>
        
        <div class="p-6 border border-border rounded-xl bg-card">
          <p class="text-sm font-medium mb-4">Try changing the theme right now:</p>
          <app-theme-color-switcher />
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold tracking-tight">Adding Custom Colors</h2>
        <p class="text-muted-foreground leading-7">
          To add a new semantic color (like "brand-blue") to your project:
        </p>
        <ol class="list-decimal list-inside space-y-4 text-muted-foreground mt-4">
          <li>
            <strong>Add the token to tokens.css:</strong>
            <div class="mt-2 pl-6">
              <app-code-block language="css" code=":root {&#10;  --brand-blue: 220 90% 50%;&#10;  --brand-blue-foreground: 210 40% 98%;&#10;}" />
            </div>
          </li>
          <li>
            <strong>Map it in styles.css:</strong>
            <div class="mt-2 pl-6">
              <app-code-block language="css" code="@theme {&#10;  --color-brand-blue: hsl(var(--brand-blue));&#10;  --color-brand-blue-foreground: hsl(var(--brand-blue-foreground));&#10;}" />
            </div>
          </li>
          <li>
            <strong>Use it in your components:</strong>
            <p class="mt-2 pl-6">You can now use classes like <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">bg-brand-blue</code> and <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">text-brand-blue-foreground</code>.</p>
          </li>
        </ol>
      </div>

      <!-- Next steps -->
      <div class="flex gap-3 pt-6 border-t border-border">
        <a routerLink="/button" k-button>
          Browse Components
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  `,
})
export class ThemingPageComponent {
  readonly tokensCode = `:root {
  /* Default Zinc Theme */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  /* ... */
}`;

  readonly tailwindCode = `@import "tailwindcss";
@import "./styles/tokens.css";
@import "./styles/themes.css"; /* Optional: generated preset themes */

@theme {
  /* Fonts */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  
  /* Semantic Colors */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  
  /* Border radius */
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}`;
}
