import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { ThemeToggleComponent } from '../shared/theme-toggle.component';
import { ThemeColorSwitcherComponent } from '../shared/theme-color-switcher.component';
import { KCommandSearchDialog } from '../shared/command-search-dialog.component';

@Component({
  selector: 'app-nav-header',
  imports: [RouterLink, ThemeToggleComponent, ThemeColorSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-border/60
                   bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div class="flex h-14 items-center px-4 gap-4 max-w-screen-2xl mx-auto">

        <!-- Logo / Brand -->
        <a routerLink="/"
           class="flex items-center gap-2.5 font-semibold text-foreground hover:opacity-80 transition-opacity no-underline shrink-0">
          <!-- Kobo Icon (Angular Shield + Cog) -->
          <svg viewBox="0 0 24 24" class="w-7 h-7 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <!-- Shield shape adapted for 24x24 viewBox -->
            <path d="M12 1.5L2 5l1.5 13.5L12 23l8.5-4.5L22 5l-10-3.5z" fill="#DD0031"/>
            <path d="M12 1.5L22 5l-1.5 13.5L12 23V1.5z" fill="#C3002F"/>
            <!-- Cog / Settings shape centered and scaled -->
            <g transform="translate(4,4) scale(0.666)" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="12" r="3"/>
            </g>
          </svg>
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
                aria-label="Search documentation"
                (click)="openSearch()">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <span class="text-xs">Search...</span>
          <kbd class="ml-4 text-xs bg-muted px-1.5 py-0.5 rounded font-mono">&#8984;K</kbd>
        </button>

        <!-- GitHub -->
        <a href="https://github.com/bntlyr/kobo-ui" target="_blank" rel="noopener noreferrer"
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

        <!-- Theme & Color Toggles -->
        <div class="flex items-center gap-1">
          <app-theme-color-switcher />
          <app-theme-toggle />
        </div>
      </div>
    </header>
  `,
})
export class NavHeaderComponent {
  private readonly dialog = inject(Dialog);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private dialogRef: any = null;

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  openSearch(): void {
    if (this.dialogRef) return;
    this.dialogRef = this.dialog.open(KCommandSearchDialog, {
      panelClass: 'k-command-search-overlay',
      hasBackdrop: false,
    });
    this.dialogRef.closed.subscribe(() => {
      this.dialogRef = null;
    });
  }
}
