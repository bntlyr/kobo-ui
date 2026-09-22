import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../shared/theme-toggle.component';

@Component({
  selector: 'app-nav-header',
  imports: [RouterLink, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-border/60
                   bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div class="flex h-14 items-center px-4 gap-4 max-w-screen-2xl mx-auto">

        <!-- Logo / Brand -->
        <a routerLink="/"
           class="flex items-center gap-2.5 font-semibold text-foreground hover:opacity-80 transition-opacity no-underline shrink-0">
          <!-- Kobo Icon -->
          <div class="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
            <span class="text-primary-foreground text-xs font-bold leading-none">工</span>
          </div>
          <span class="text-sm font-semibold tracking-tight">Kobo UI</span>
          <span class="text-muted-foreground/60 text-xs font-normal hidden sm:inline">工房</span>
        </a>

        <!-- Nav Links (center) -->
        <nav class="hidden md:flex items-center gap-1 ml-4">
          <a routerLink="/introduction"
             class="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground
                    rounded-md hover:bg-accent transition-colors no-underline">
            Docs
          </a>
          <a routerLink="/button"
             class="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground
                    rounded-md hover:bg-accent transition-colors no-underline">
            Components
          </a>
        </nav>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Search trigger -->
        <button class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md
                       border border-border text-muted-foreground text-sm
                       hover:bg-accent hover:text-foreground transition-colors
                       bg-transparent cursor-pointer"
                aria-label="Search documentation">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <span class="text-xs">Search...</span>
          <kbd class="ml-4 text-xs bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </button>

        <!-- GitHub -->
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
           aria-label="View on GitHub"
           class="inline-flex items-center justify-center w-9 h-9 rounded-md
                  border border-border text-muted-foreground
                  hover:bg-accent hover:text-accent-foreground
                  transition-colors no-underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="currentColor">
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                     0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757
                     -1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997
                     .108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221
                     -.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.509 11.509 0 0 1 12 5.803
                     c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176
                     .77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222
                     0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12
                     c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <!-- Theme Toggle -->
        <app-theme-toggle />
      </div>
    </header>
  `,
})
export class NavHeaderComponent {}
