import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      // ---- Getting Started ----
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomePageComponent),
        title: 'Kobo UI (工房) — Angular Component Registry',
      },
      {
        path: 'introduction',
        loadComponent: () =>
          import('./pages/introduction/introduction.component').then(m => m.IntroductionPageComponent),
        title: 'Introduction — Kobo UI',
      },
      {
        path: 'installation',
        loadComponent: () =>
          import('./pages/installation/installation.component').then(m => m.InstallationPageComponent),
        title: 'Installation — Kobo UI',
      },

      // ---- Phase 2 original ----
      {
        path: 'button',
        loadComponent: () =>
          import('./pages/button/button-showcase.component').then(m => m.ButtonShowcaseComponent),
        title: 'Button — Kobo UI',
      },
      {
        path: 'badge',
        loadComponent: () =>
          import('./pages/badge/badge-showcase.component').then(m => m.BadgeShowcaseComponent),
        title: 'Badge — Kobo UI',
      },
      {
        path: 'input',
        loadComponent: () =>
          import('./pages/input/input-showcase.component').then(m => m.InputShowcaseComponent),
        title: 'Input — Kobo UI',
      },
      {
        path: 'card',
        loadComponent: () =>
          import('./pages/card/card-showcase.component').then(m => m.CardShowcaseComponent),
        title: 'Card — Kobo UI',
      },
      {
        path: 'dialog',
        loadComponent: () =>
          import('./pages/dialog/dialog-showcase.component').then(m => m.DialogShowcaseComponent),
        title: 'Dialog — Kobo UI',
      },

      // ---- Phase 2 remaining ----
      {
        path: 'primitives',
        loadComponent: () =>
          import('./pages/primitives/primitives-showcase.component').then(m => m.PrimitivesShowcaseComponent),
        title: 'Primitives — Kobo UI',
      },
      {
        path: 'typography',
        loadComponent: () =>
          import('./pages/typography/typography-showcase.component').then(m => m.TypographyShowcaseComponent),
        title: 'Typography — Kobo UI',
      },

      // ---- Phase 3 ----
      {
        path: 'forms',
        loadComponent: () =>
          import('./pages/forms/forms-showcase.component').then(m => m.FormsShowcaseComponent),
        title: 'Forms — Kobo UI',
      },

      // ---- Phase 4 ----
      {
        path: 'overlays',
        loadComponent: () =>
          import('./pages/overlays/overlays-showcase.component').then(m => m.OverlaysShowcaseComponent),
        title: 'Overlays — Kobo UI',
      },

      // ---- Phase 5 ----
      {
        path: 'feedback',
        loadComponent: () =>
          import('./pages/feedback/feedback-showcase.component').then(m => m.FeedbackShowcaseComponent),
        title: 'Feedback — Kobo UI',
      },

      // ---- Phase 6 ----
      {
        path: 'navigation',
        loadComponent: () =>
          import('./pages/navigation/navigation-showcase.component').then(m => m.NavigationShowcaseComponent),
        title: 'Navigation — Kobo UI',
      },

      // ---- Phase 7 ----
      {
        path: 'data',
        loadComponent: () =>
          import('./pages/data/data-showcase.component').then(m => m.DataShowcaseComponent),
        title: 'Data — Kobo UI',
      },

      { path: '**', redirectTo: '' },
    ],
  },
];
