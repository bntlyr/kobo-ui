import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, KButtonDirective, KBadgeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-24">

      <!-- Hero Section -->
      <section class="relative pt-10 pb-16 text-center">
        <!-- Ambient glow -->
        <div class="pointer-events-none absolute inset-x-0 -top-20 h-72
                    bg-gradient-to-b from-primary/10 via-primary/5 to-transparent
                    rounded-full blur-3xl mx-auto max-w-2xl">
        </div>

        <div class="relative space-y-6">
          <!-- Version badge -->
          <div class="flex justify-center">
            <span k-badge variant="outline"
                  class="gap-1.5 border-primary/30 text-primary bg-primary/5 text-xs px-3 py-1">
              <span class="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              v0.0.0 — Early Preview
            </span>
          </div>

          <!-- Headline -->
          <h1 class="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Build Angular UIs<br/>
            <span class="bg-gradient-to-r from-primary via-blue-400 to-violet-500
                         bg-clip-text text-transparent">
              faster than ever.
            </span>
          </h1>

          <!-- Subheadline -->
          <p class="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            <strong class="text-foreground font-medium">Kobo UI (工房)</strong> is a copy-and-own component registry
            for Angular 21+. Accessible primitives, semantic design tokens,
            Tailwind CSS styling — yours to own and customize.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap justify-center gap-3 pt-2">
            <a routerLink="/introduction" k-button size="lg">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
            <a routerLink="/button" k-button variant="outline" size="lg">
              Browse Components
            </a>
          </div>
        </div>
      </section>

      <!-- Feature Grid -->
      <section class="space-y-8">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-bold tracking-tight">Why Kobo UI?</h2>
          <p class="text-muted-foreground">
            Designed from the ground up for modern Angular development.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (feature of features; track feature.title) {
            <div class="group relative rounded-xl border border-border/60 bg-card p-5
                        hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
                        transition-all duration-200 cursor-default">
              <!-- Icon -->
              <div class="mb-4 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center
                          text-primary group-hover:bg-primary/20 transition-colors duration-200">
                <span class="text-xl leading-none">{{ feature.icon }}</span>
              </div>
              <h3 class="font-semibold text-foreground mb-1.5">{{ feature.title }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Component preview strip -->
      <section class="space-y-8">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-bold tracking-tight">Components</h2>
          <p class="text-muted-foreground">Start with our primitives. Extend them endlessly.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          @for (comp of components; track comp.name) {
            <a [routerLink]="comp.route"
               class="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/60
                      hover:border-primary/30 hover:bg-accent/50 transition-all duration-150
                      no-underline text-center group cursor-pointer">
              <span class="text-2xl">{{ comp.icon }}</span>
              <span class="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {{ comp.name }}
              </span>
              <span class="text-xs text-muted-foreground font-mono">{{ comp.selector }}</span>
            </a>
          }
        </div>
      </section>

      <!-- Install teaser -->
      <section class="rounded-2xl border border-border bg-card p-8 text-center space-y-4">
        <div class="space-y-2">
          <h2 class="text-xl font-bold">Ready to start?</h2>
          <p class="text-muted-foreground text-sm">No npm publish. No version conflicts. Just copy.</p>
        </div>
        <div class="inline-flex items-center gap-3 bg-[hsl(220_13%_9%)] border border-border/50
                    rounded-lg px-4 py-2.5 font-mono text-sm text-green-400">
          <span class="text-muted-foreground select-none">$</span>
          npx kobo-ui add button
        </div>
        <div class="pt-2">
          <a routerLink="/installation" k-button variant="ghost" size="sm">
            View installation guide →
          </a>
        </div>
      </section>

    </div>
  `,
})
export class HomePageComponent {
  readonly features = [
    {
      icon: '🧱',
      title: 'Copy & Own',
      description: 'No package to update. The code lives in your project, fully under your control.',
    },
    {
      icon: '♿',
      title: 'Accessible First',
      description: 'Built on @angular/cdk primitives — focus trapping, ARIA, keyboard navigation out of the box.',
    },
    {
      icon: '⚡',
      title: 'Angular Signals',
      description: 'Uses input(), computed(), and model() signals for optimal change detection performance.',
    },
    {
      icon: '🎨',
      title: 'Design Tokens',
      description: 'Semantic CSS custom properties for effortless theming and dark mode support.',
    },
    {
      icon: '🔀',
      title: 'Variant System',
      description: 'class-variance-authority + tailwind-merge for type-safe, conflict-free class composition.',
    },
    {
      icon: '📦',
      title: 'Zero Lock-in',
      description: 'No runtime dependency on Kobo UI. Just Angular, Tailwind, and your code.',
    },
  ];

  readonly components = [
    { name: 'Button',  icon: '🔘', route: '/button',  selector: 'button[k-button]' },
    { name: 'Badge',   icon: '🏷️', route: '/badge',   selector: 'span[k-badge]' },
    { name: 'Input',   icon: '📝', route: '/input',   selector: 'input[k-input]' },
    { name: 'Card',    icon: '🃏', route: '/card',    selector: 'k-card' },
    { name: 'Dialog',  icon: '💬', route: '/dialog',  selector: 'k-dialog' },
  ];
}
