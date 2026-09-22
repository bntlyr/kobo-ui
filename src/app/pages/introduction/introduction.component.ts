import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { LucideBox, LucideAccessibility, LucidePalette, LucideRuler, LucideIconData } from '@lucide/angular';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-introduction-page',
  imports: [RouterLink, KButtonDirective, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-10 max-w-3xl">
      <div class="space-y-3">
        <h1 class="text-4xl font-bold tracking-tight">Introduction</h1>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Kobo UI is not a UI library. It's a component registry.
        </p>
      </div>

      <div class="space-y-4 text-muted-foreground leading-7">
        <p>
          <strong class="text-foreground">The philosophy:</strong> instead of shipping a versioned npm package that you
          must update and that imposes constraints on your codebase, Kobo UI distributes its components via a <strong>CLI</strong> and a <strong>component registry</strong>. 
          You run <code>npx kobo-ui add</code> to pull the raw Angular source code into your project. You own it completely.
        </p>
        <p>
          This means you can rename selectors, adjust animations, change the Tailwind classes,
          remove CDK dependencies — do anything. There's no upstream lock-in.
        </p>
      </div>

      <!-- Principles -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Core Principles</h2>
        <div class="space-y-3">
          @for (p of principles; track p.title) {
            <div class="flex gap-4 p-4 rounded-lg border border-border bg-card">
              <div class="shrink-0 mt-0.5 text-foreground/80 [&>svg]:w-7 [&>svg]:h-7 [&>svg]:stroke-[1.5]">
                <ng-container *ngComponentOutlet="$any(p.icon)" />
              </div>
              <div>
                <h3 class="font-semibold text-sm text-foreground mb-1">{{ p.title }}</h3>
                <p class="text-sm text-muted-foreground">{{ p.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Tech Stack</h2>
        <div class="rounded-xl border border-border overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-muted/50">
              <tr>
                <th class="text-left px-4 py-3 font-semibold text-foreground">Technology</th>
                <th class="text-left px-4 py-3 font-semibold text-foreground">Purpose</th>
                <th class="text-left px-4 py-3 font-semibold text-foreground">Version</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              @for (row of techStack; track row.tech) {
                <tr class="hover:bg-muted/30 transition-colors">
                  <td class="px-4 py-3 font-mono text-primary text-xs">{{ row.tech }}</td>
                  <td class="px-4 py-3 text-muted-foreground">{{ row.purpose }}</td>
                  <td class="px-4 py-3 text-muted-foreground font-mono text-xs">{{ row.version }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Next steps -->
      <div class="flex gap-3 pt-4 border-t border-border">
        <a routerLink="/installation" k-button>
          Installation Guide
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
        <a routerLink="/button" k-button variant="outline">Browse Components</a>
      </div>
    </div>
  `,
})
export class IntroductionPageComponent {
  readonly principles = [
    {
      icon: LucideBox,
      title: 'CLI-driven, not install-and-pray',
      description: 'Add components via our CLI. The source code is written to your project. No runtime Kobo UI dependency.',
    },
    {
      icon: LucideAccessibility,
      title: 'Accessibility is non-negotiable',
      description: 'All interactive components use @angular/cdk for ARIA, focus management, and keyboard navigation.',
    },
    {
      icon: LucidePalette,
      title: 'Design tokens over hard-coded values',
      description: 'Semantic CSS variables power every color, radius, and animation — swap your entire theme in one file.',
    },
    {
      icon: LucideRuler,
      title: 'Angular idioms, not wrappers',
      description: 'Attribute directives on native elements. Compound components for structural containers. No unnecessary wrappers.',
    },
  ];

  readonly techStack = [
    { tech: 'Angular',                    purpose: 'Framework — standalone components, Signals', version: '21+' },
    { tech: '@angular/cdk',               purpose: 'Accessibility primitives (Dialog, Overlay, A11y)', version: '21+' },
    { tech: 'Tailwind CSS',               purpose: 'Utility-first styling engine', version: '4.x' },
    { tech: 'class-variance-authority',   purpose: 'Type-safe variant management (CVA)', version: 'latest' },
    { tech: 'clsx + tailwind-merge',      purpose: 'Class merging (cn() helper)', version: 'latest' },
    { tech: '@lucide/angular',            purpose: 'Icon set', version: 'latest' },
    { tech: 'highlight.js',              purpose: 'Documentation syntax highlighting', version: 'latest' },
  ];
}
