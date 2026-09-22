import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ThemeService, ColorTheme } from '../core/services/theme.service';
import {
  KDropdownTrigger,
  KDropdownContent,
  KDropdownItem,
} from '../components/ui/dropdown/index';

@Component({
  selector: 'app-theme-color-switcher',
  imports: [
    KDropdownTrigger, KDropdownContent, KDropdownItem,
    TitleCasePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [kDropdownTrigger]="themeMenu"
            aria-label="Select color theme"
            class="relative inline-flex items-center justify-center w-9 h-9 rounded-md
                   border border-border text-muted-foreground
                   hover:bg-accent hover:text-accent-foreground
                   transition-colors duration-150 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    </button>

    <ng-template #themeMenu>
      <k-dropdown-content class="w-40" align="end">
        <div class="flex flex-col">
          @for (theme of themes; track theme) {
            <k-dropdown-item (click)="themeService.setColorTheme(theme)">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full border border-border" [style.backgroundColor]="getThemeColor(theme)"></div>
                  <span>{{ theme | titlecase }}</span>
                </div>
                @if (themeService.colorTheme() === theme) {
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" 
                       fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="text-primary">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                }
              </div>
            </k-dropdown-item>
          }
        </div>
      </k-dropdown-content>
    </ng-template>
  `,
})
export class ThemeColorSwitcherComponent {
  readonly themeService = inject(ThemeService);
  readonly themes: ColorTheme[] = [
    'zinc', 'slate', 'neutral', 'red', 'rose', 'orange', 'yellow', 'green', 'blue', 'violet'
  ];

  getThemeColor(theme: ColorTheme): string {
    const colors: Record<ColorTheme, string> = {
      zinc: 'hsl(240 5.9% 10%)',
      slate: 'hsl(222.2 47.4% 11.2%)',
      neutral: 'hsl(0 0% 9%)',
      red: 'hsl(0 72.2% 50.6%)',
      rose: 'hsl(346.8 77.2% 49.8%)',
      orange: 'hsl(24.6 95% 53.1%)',
      yellow: 'hsl(47.9 95.8% 53.1%)',
      green: 'hsl(142.1 76.2% 36.3%)',
      blue: 'hsl(221.2 83.2% 53.3%)',
      violet: 'hsl(262.1 83.3% 57.8%)',
    };
    return colors[theme];
  }
}
