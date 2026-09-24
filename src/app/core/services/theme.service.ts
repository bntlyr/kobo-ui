import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ColorTheme = 'zinc' | 'slate' | 'neutral' | 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly isDark = signal<boolean>(false);
  readonly colorTheme = signal<ColorTheme>('zinc');

  constructor() {
    this.initializeTheme();
  }

  toggleDark(): void {
    this.setDark(!this.isDark());
  }

  setDark(dark: boolean): void {
    this.isDark.set(dark);
    if (dark) {
      this.doc.documentElement.classList.add('dark');
    } else {
      this.doc.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kobo-theme-mode', dark ? 'dark' : 'light');
  }

  setColorTheme(theme: ColorTheme): void {
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
    const storedMode = localStorage.getItem('kobo-theme-mode');
    if (storedMode) {
      this.setDark(storedMode === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDark(prefersDark);
    }

    const storedColorTheme = localStorage.getItem('kobo-color-theme') as ColorTheme | null;
    if (storedColorTheme) {
      this.setColorTheme(storedColorTheme);
    } else {
      this.setColorTheme('zinc');
    }
  }
}
