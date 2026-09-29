import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { LucideAlertTriangle } from '@lucide/angular';

const CLI_CREATE = `ng new my-app
cd my-app`;
const CLI_INSTALL = `npm i kobo-ui @angular/animations`;
const CLI_INIT = `npx kobo init`;
const CLI_ADD = `# Add specific components
npx kobo add button
npx kobo add dialog card toast

# Add all components
npx kobo add --all

# List all 65 available components
npx kobo list`;

const CLI_SKILLS = `# Install Kobo UI AI agent skills (via skills.sh)
npx skills add bntlyr/kobo-ui`;

const INSTALL_CODE = `npm install kobo-ui @angular/cdk class-variance-authority clsx tailwind-merge @lucide/angular @angular/animations`;

const CLI_INIT_SPECIFIC = `# Initialize Kobo UI in a dedicated CSS file
npx kobo init --specific`;

const KOBO_UI_CSS_CODE = `/* src/styles/kobo-ui.css */
/* --- Kobo UI Tailwind CSS v4 Configuration --- */
@import "tailwindcss";
@import "./tokens.css";
@import "./themes.css";

@theme {
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  /* Sidebar */
  --color-sidebar: hsl(var(--sidebar-background));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-primary: hsl(var(--sidebar-primary));
  --color-sidebar-primary-foreground: hsl(var(--sidebar-primary-foreground));
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-ring: hsl(var(--sidebar-ring));
}

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 19%;

  --card: 0 0% 100%;
  --card-foreground: 0 0% 19%;

  --primary: 180 33% 50%;
  --primary-foreground: 0 0% 100%;

  --secondary: 75 59% 51%;
  --secondary-foreground: 0 0% 19%;

  --muted: 0 0% 92%;
  --muted-foreground: 0 0% 44%;

  --accent: 180 33% 95%;
  --accent-foreground: 0 0% 19%;

  --border: 0 0% 86%;
  --input: 0 0% 86%;
  --ring: 180 33% 50%;

  --destructive: 0 33% 50%;
  --destructive-foreground: 0 0% 100%;

  --radius: 0.25rem;
}`;

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

const USAGE_CODE = `<!-- After adding button to your project -->
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
  imports: [RouterLink, KButtonDirective, CodeBlockComponent, LucideAlertTriangle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-10 max-w-3xl pb-20">
      <div class="space-y-3">
        <h1 class="text-4xl font-bold tracking-tight">Installation</h1>
        <p class="text-lg text-muted-foreground">
          Set up Kobo UI in your Angular project in minutes using our CLI.
        </p>
      </div>

      <!-- Prerequisites -->
      <div class="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
        <svg lucideAlertTriangle class="text-amber-500 shrink-0 mt-0.5" [size]="20" [strokeWidth]="2"></svg>
        <div class="text-sm">
          <p class="font-semibold text-foreground mb-1">Prerequisites</p>
          <p class="text-muted-foreground">Angular 18+ project with Tailwind CSS 4.x configured.</p>
        </div>
      </div>

      <!-- CLI Steps -->
      <div class="space-y-8">
        <h2 class="text-2xl font-bold tracking-tight border-b border-border pb-2">Using the CLI (Recommended)</h2>

        <!-- Step 1 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">1</span>
            <h3 class="text-xl font-semibold">Create an Angular project</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Start by creating a new Angular project if you don't have one set up already.
          </p>
          <app-code-block [code]="cliCreate" language="bash" />
        </div>

        <!-- Step 2 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">2</span>
            <h3 class="text-xl font-semibold">Install Kobo UI</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Install the base library package into your project.
          </p>
          <app-code-block [code]="cliInstall" language="bash" />
        </div>

        <!-- Step 3 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">3</span>
            <h3 class="text-xl font-semibold">Initialize Kobo UI</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Run the init command to install peer dependencies and configure your styling tokens automatically.
          </p>
          <app-code-block [code]="cliInit" language="bash" />
        </div>

        <!-- Step 4 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">4</span>
            <h3 class="text-xl font-semibold">CLI Usage & Adding Components</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            You can also add individual component source files directly into your project (copy-and-own):
          </p>
          <app-code-block [code]="cliAdd" language="bash" />
        </div>

        <!-- Step 5 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">5</span>
            <h3 class="text-xl font-semibold">Use the component</h3>
          </div>
          <app-code-block [code]="usageCode" language="typescript" />
        </div>

        <!-- Step 6 -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-primary
                         text-primary-foreground text-sm font-bold shrink-0">6</span>
            <h3 class="text-xl font-semibold">AI Agent Guidelines (AGENTS.md)</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Equip your AI coding assistants (Antigravity, Cursor, Claude Code, Copilot, Windsurf) with complete knowledge of Kobo UI components, signal APIs, and Tailwind tokens:
          </p>
          <app-code-block [code]="cliSkills" language="bash" />
        </div>
      </div>

      <!-- Existing Projects -->
      <div class="space-y-8 pt-10">
        <h2 class="text-2xl font-bold tracking-tight border-b border-border pb-2">Existing Projects (Gradual Adoption)</h2>
        <p class="text-sm text-muted-foreground">If you are adding Kobo UI to an already-started project and don't want to touch your global CSS, use the specific initialization.</p>
        
        <!-- Step 1 -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">1. Initialize in a specific file</h3>
          <p class="text-sm text-muted-foreground">This generates <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/styles/kobo-ui.css</code> and adds it to your angular.json.</p>
          <app-code-block [code]="cliInitSpecific" language="bash" />
        </div>
        
        <!-- Step 2 -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">2. Override the theme</h3>
          <p class="text-sm text-muted-foreground">You can easily override the theme tokens by adding a <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">:root</code> block directly to the generated CSS file.</p>
          <app-code-block [code]="koboUiCssCode" language="css" filename="src/styles/kobo-ui.css" />
        </div>
      </div>

      <!-- Manual Steps -->
      <div class="space-y-8 pt-10">
        <h2 class="text-2xl font-bold tracking-tight border-b border-border pb-2">Manual Installation</h2>
        <p class="text-sm text-muted-foreground">If you prefer not to use the CLI, you can set up Kobo UI manually.</p>

        <!-- Step 1 -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">1. Install package and peer dependencies</h3>
          <app-code-block [code]="installCode" language="bash" />
        </div>

        <!-- Step 2 -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">2. Add design tokens</h3>
          <p class="text-sm text-muted-foreground">
            Copy <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tokens.css</code> to
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">src/styles/tokens.css</code>:
          </p>
          <app-code-block [code]="tokensCode" language="css" filename="src/styles/tokens.css" />
        </div>

        <!-- Step 3 -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">3. Configure Tailwind styles</h3>
          <app-code-block [code]="stylesCode" language="css" filename="src/styles.css" />
        </div>

        <!-- Step 4 -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold">4. Copy a component & use it</h3>
          <p class="text-sm text-muted-foreground">
            Browse to any component page, copy the source from the Code tab, and paste it into your project.
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex gap-3 pt-8 border-t border-border mt-10">
        <a routerLink="/button" k-button>Browse Components →</a>
      </div>
    </div>
  `,
})
export class InstallationPageComponent {
  readonly cliCreate   = CLI_CREATE;
  readonly cliInstall  = CLI_INSTALL;
  readonly cliInit     = CLI_INIT;
  readonly cliAdd      = CLI_ADD;
  readonly cliSkills   = CLI_SKILLS;
  readonly cliInitSpecific = CLI_INIT_SPECIFIC;
  readonly installCode = INSTALL_CODE;
  readonly koboUiCssCode = KOBO_UI_CSS_CODE;
  readonly stylesCode  = STYLES_CODE;
  readonly tokensCode  = TOKENS_CODE;
  readonly usageCode   = USAGE_CODE;
}
