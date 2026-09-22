---
name: kobo-ui
description: Comprehensive guide, component catalogue, and rules for building Angular applications using the Kobo UI component library with Tailwind CSS v4 and Angular Signals.
---

# Kobo UI Component Library Skill

This skill provides expert instructions, component references, and styling patterns for developing Angular applications with **Kobo UI** (`kobo-ui`).

## When to use this skill
- Building, modifying, or refactoring Angular UI components using `kobo-ui`.
- Implementing forms, dialogs, dropdowns, tables, drawers, notifications, and navigation with Kobo UI.
- Configuring Tailwind CSS v4 semantic tokens and themes for Kobo UI.

## Key Rules
1. **Import Source**: Always import components directly from `'kobo-ui'`.
2. **Standalone & Signals**: Angular 18+ strict standalone components. Use `input()`, `model()`, `output()`, `computed()`, `inject()`, `ChangeDetectionStrategy.OnPush`.
3. **Control Flow**: Use `@if`, `@for (...; track ...)`, `@switch`.
4. **Semantic Colors**: Use semantic token classes (`bg-primary`, `text-primary-foreground`, `text-muted-foreground`, `border-border`, etc.). Never use hardcoded hex codes.

For the full component catalog and code examples, refer to [AGENTS.md](../../AGENTS.md).
