import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        
        <!-- Branding / Logo -->
        <a routerLink="/" class="mr-6 flex items-center gap-2.5 font-semibold text-foreground hover:opacity-80 transition-opacity no-underline shrink-0">
          <div class="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <span class="text-primary-foreground font-bold leading-none">K</span>
          </div>
          <span class="text-sm font-semibold tracking-tight">Kobo UI</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <a routerLink="/dashboard" class="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors no-underline">
            Dashboard
          </a>
          <a routerLink="/settings" class="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors no-underline">
            Settings
          </a>
        </nav>

        <div class="flex flex-1 items-center justify-between gap-2 md:justify-end">
          
          <!-- Search Placeholder -->
          <div class="w-full flex-1 md:w-auto md:flex-none">
            <button class="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
              <span class="hidden lg:inline-flex">Search documentation...</span>
              <span class="inline-flex lg:hidden">Search...</span>
              <kbd class="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span class="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
          
          <!-- Theme & Color Toggles -->
          <div class="flex items-center gap-1">
            <!-- Native Color Switcher -->
            <div class="relative inline-flex items-center">
              <select class="h-8 w-28 appearance-none rounded-md border border-border bg-transparent px-3 text-xs text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer focus:ring-1 focus:ring-ring"
                      [value]="colorTheme()"
                      (change)="setColorTheme($event)">
                <option value="zinc">Zinc</option>
                <option value="slate">Slate</option>
                <option value="neutral">Neutral</option>
                <option value="red">Red</option>
                <option value="rose">Rose</option>
                <option value="orange">Orange</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="violet">Violet</option>
              </select>
              <!-- Chevron -->
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute right-2 pointer-events-none text-muted-foreground">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>

            <!-- Dark Mode Toggle -->
            <button (click)="toggleDark()"
                    class="relative inline-flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    [attr.aria-label]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
              @if (isDark()) {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              }
            </button>
          </div>
          
          <!-- User Profile / Avatar Placeholder -->
          <nav class="flex items-center gap-2">
            <button class="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
              <!-- Placeholder avatar -->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </nav>

        </div>
      </div>
    </header>
  `,
})
export class AppHeaderComponent {
  private readonly doc = inject(DOCUMENT);
  
  readonly isDark = signal<boolean>(false);
  readonly colorTheme = signal<string>('zinc');

  constructor() {
    this.initializeTheme();
  }

  toggleDark(): void {
    const dark = !this.isDark();
    this.isDark.set(dark);
    if (dark) {
      this.doc.documentElement.classList.add('dark');
    } else {
      this.doc.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kobo-theme-mode', dark ? 'dark' : 'light');
  }

  setColorTheme(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const theme = select.value;
    
    const prevTheme = this.colorTheme();
    if (prevTheme !== 'zinc') {
      this.doc.documentElement.classList.remove(`theme-${prevTheme}`);
    }
    
    this.colorTheme.set(theme);
    
    if (theme !== 'zinc') {
      this.doc.documentElement.classList.add(`theme-${theme}`);
    }
    
    localStorage.setItem('kobo-color-theme', theme);
  }

  private initializeTheme(): void {
    // 1. Initialize Dark/Light mode
    const storedMode = localStorage.getItem('kobo-theme-mode');
    if (storedMode) {
      const dark = storedMode === 'dark';
      this.isDark.set(dark);
      if (dark) this.doc.documentElement.classList.add('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark.set(prefersDark);
      if (prefersDark) this.doc.documentElement.classList.add('dark');
    }

    // 2. Initialize Color Theme
    const storedColorTheme = localStorage.getItem('kobo-color-theme');
    if (storedColorTheme) {
      this.colorTheme.set(storedColorTheme);
      if (storedColorTheme !== 'zinc') {
        this.doc.documentElement.classList.add(`theme-${storedColorTheme}`);
      }
    }
  }
}
