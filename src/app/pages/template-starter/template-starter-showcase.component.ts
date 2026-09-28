import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';

const CLI_START = `ng new my-app
cd my-app

npm i kobo-ui @angular/animations 

npx kobo init

npx kobo add --all

# Scaffold application shell layout components
npx kobo set template-starter  # Generates both header and sidebar in a combined layout
npx kobo set app-sidebar
npx kobo set app-header

# Lock the application theme mode
npx kobo set theme dark
npx kobo set theme light

# Programmatic theme mode toggling (scaffolds a ThemeService)
npx kobo set theme both

# Lock the primary color theme (e.g. rose, blue, zinc)
npx kobo set color-theme rose

# Add specific components to your project
npx kobo add button
npx kobo add dialog card toast

# Add all components
npx kobo add --all

# List all 65 available components
npx kobo list`;

@Component({
  selector: 'app-template-starter-page',
  imports: [RouterLink, KButtonDirective, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-10 max-w-3xl pb-20">
      <div class="space-y-3">
        <h1 class="text-4xl font-bold tracking-tight">Template Starter</h1>
        <p class="text-lg text-muted-foreground">
          Kickstart your project with a full application layout out of the box using our CLI.
        </p>
      </div>

      <!-- CLI Steps -->
      <div class="space-y-8">
        <h2 class="text-2xl font-bold tracking-tight border-b border-border pb-2">Full Project Setup</h2>
        <p class="text-muted-foreground leading-7">
          You can use the Kobo UI CLI to seamlessly bootstrap a full dashboard layout (sidebar + header) 
          and inject all the 65 components automatically into your project. Here is the full end-to-end flow:
        </p>

        <app-code-block [code]="cliStart" language="bash" />
      </div>

      <!-- Layouts -->
      <div class="space-y-8 pt-10">
        <h2 class="text-2xl font-bold tracking-tight border-b border-border pb-2">Layout Components Explained</h2>
        
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Template Starter</h3>
          <p class="text-muted-foreground leading-7">
            Running <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">npx kobo set template-starter</code> will scaffold a responsive side-navigation dashboard wrapper inside your <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">app.component.ts</code>. It uses our <b>Sidebar Provider</b> combined with a responsive header to get you started immediately.
          </p>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Themes & Color Schemes</h3>
          <p class="text-muted-foreground leading-7">
            Use <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">npx kobo set theme ...</code> and <code class="bg-muted px-1 py-0.5 rounded text-sm text-foreground">npx kobo set color-theme ...</code> to automatically configure and switch your theme presets. Learn more on the <a routerLink="/theming" class="text-primary hover:underline font-medium">Theming page</a>.
          </p>
        </div>
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
export class TemplateStarterPageComponent {
  readonly cliStart = CLI_START;
}
