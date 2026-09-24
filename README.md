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
npm install kobo-ui @angular/cdk @angular/animations @lucide/angular tailwind-merge clsx class-variance-authority
```

## Setup & Theming

Kobo UI relies on Tailwind CSS v4 and its own CSS variables for styling and theming.

After installation, run the initialization command to automatically set up your project's styles and theming:

```bash
npx kobo init
```

This command will configure your global `styles.css` (or `styles.scss`) with the necessary Tailwind imports and CSS variables.

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
# Scaffold application shell layout components
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
npx kobo list
```

## AI Agent Guidelines (`AGENTS.md`)

Equip your AI coding assistants (Antigravity, Cursor, Claude Code, Copilot, Windsurf) with complete knowledge of Kobo UI components, signal APIs, and Tailwind tokens:

```bash
# Install Kobo UI AI agent skills (via skills.sh)
npx skills add bntlyr/kobo-ui
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
