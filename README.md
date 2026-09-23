# Kobo UI

**Kobo UI** is a beautifully crafted Angular 18+ component library. It provides accessible, unstyled primitives powered by `@angular/cdk` combined with **Tailwind CSS v4** styling for a complete, modern UI toolkit.

## Features

- **Angular 18+** & **Standalone Components**
- **Tailwind CSS v4** First-Class Support
- **Accessible** via `@angular/cdk`
- **Signal-Based APIs** (`input()`, `output()`, `model()`)
- **Customizable Theming** using CSS Variables
- **Dark Mode** & Extended Color Palettes Support

## Installation

Kobo UI is distributed as a standard NPM package. To add it and its required peer dependencies to your Angular project, run:

```bash
npm install kobo-ui @angular/cdk @lucide/angular tailwind-merge clsx class-variance-authority
```

## Setup & Theming

Kobo UI relies on Tailwind CSS v4 and its own CSS variables for styling and theming.

1. Ensure your project is set up with Tailwind CSS v4.
2. Import the Kobo UI themes and tokens into your global `styles.css` (or `styles.scss`):

```css
@import "tailwindcss";

/* Import Kobo UI default tokens (Zinc) */
@import "kobo-ui/assets/tokens.css";

/* (Optional) Import Kobo UI extended themes */
@import "kobo-ui/assets/themes.css";

@theme {
  /* Map CSS variables to Tailwind colors */
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
}
```

## Quick Start

Import the components you need directly into your standalone Angular components:

```typescript
import { Component } from '@angular/core';
import { KButtonDirective } from 'kobo-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KButtonDirective],
  template: `
    <button k-button variant="default">Click me</button>
  `
})
export class AppComponent {}
```

## CLI Usage & Adding Components

You can also add individual component source files directly into your project (copy-and-own):

```bash
# Add specific components
npx kobo add button
npx kobo add dialog card toast

# Add all components
npx kobo add --all

# List all 65 available components
npx kobo list
```

## AI Agent Guidelines (`AGENTS.md`)

Equip your AI coding assistants (Antigravity, Cursor, Claude Code, Copilot, Windsurf) with complete knowledge of Kobo UI components, signal APIs, and Tailwind tokens:

```bash
# Generate AGENTS.md in your project root
npx kobo skills

# Or for Cursor .cursorrules
npx kobo skills --cursor

# Or for .agents/AGENTS.md
npx kobo skills --agents
```

## Available Themes

If you imported `themes.css`, you can apply color themes dynamically by adding classes to your `<body>` or `<html>` element. Available themes:

- `.theme-zinc` (Default)
- `.theme-slate`
- `.theme-neutral`
- `.theme-red`
- `.theme-rose`
- `.theme-orange`
- `.theme-yellow`
- `.theme-green`
- `.theme-blue`
- `.theme-violet`

## Documentation

For full API references, examples, and showcase, visit the [Kobo UI Documentation](https://github.com/bntlyr/kobo-ui) repository.

## License

MIT © Kobo UI Team
