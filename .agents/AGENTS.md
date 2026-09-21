# Kobo UI (工房) — Agent Rules & Architecture Guide

> **Project-scoped rules for AI agents working on this codebase.**
> These rules take precedence over any global defaults when the workspace is
> `/Users/bently_r/Projects/BENTLY/kobo-ui`.

---

## 1. What is Kobo UI?

Kobo UI is a **copy-and-own Angular 18+ component registry** — not an npm package.
Inspired by `shadcn/ui`, developers copy raw source files into their own projects
and own the code outright. There is **no `@kobo-ui/angular` package to install**.

The registry ships:
- **Unstyled, accessible primitives** powered by `@angular/cdk`
- **Tailwind CSS v4 styling** via semantic CSS custom properties
- **Interactive documentation** at `http://localhost:4200` (dev server)

---

## 2. Tech Stack — Non-Negotiable

| Concern | Technology |
|---|---|
| Framework | Angular 21 (strict standalone) |
| Styling | Tailwind CSS **v4** (`@import "tailwindcss"`, `@theme {}` block) |
| Token system | CSS custom properties in `src/styles/tokens.css` |
| Class merging | `cn()` helper → `clsx` + `tailwind-merge` |
| Variant management | `class-variance-authority` (CVA) |
| Accessibility primitives | `@angular/cdk` (overlay, a11y, accordion, dialog) |
| Form integration | Angular Reactive Forms (`ControlValueAccessor`) |
| Animations | `@angular/animations` (`trigger`, `state`, `style`, `transition`, `animate`) |

### Critical import rules

```typescript
// ✅ Animations — from @angular/animations, NEVER @angular/core
import { trigger, state, style, transition, animate } from '@angular/animations';

// ✅ Portal classes — from @angular/cdk/portal, NEVER @angular/cdk/overlay
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';

// ✅ Overlay infrastructure — from @angular/cdk/overlay
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';

// ✅ cn() utility — relative import from core
import { cn } from '../../../core/utils/cn';
```

---

## 3. Angular Component Rules

Every component and directive **must** follow these rules without exception:

```typescript
@Component({
  selector: 'k-my-component',
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush, // REQUIRED
  encapsulation: ViewEncapsulation.None,           // REQUIRED for all UI components
})
export class KMyComponent {
  // Inputs — always use signal-based input()
  readonly variant = input<'default' | 'secondary'>('default');
  readonly class   = input<string>('');

  // Computed classes — always use computed()
  protected readonly classes = computed(() => cn(/* ... */));

  // Dependencies — always use inject()
  private readonly overlay = inject(Overlay);

  // Outputs — use output()
  readonly valueChange = output<string>();

  // Two-way bindings — use model()
  readonly open = model<boolean>(false);
}
```

### Signal APIs — required

| Old API | Required API |
|---|---|
| `@Input()` | `input<T>()` or `input.required<T>()` |
| `@Output() EventEmitter` | `output<T>()` |
| `[(ngModel)]` two-way | `model<T>()` |
| `constructor(private svc: Svc)` | `inject(Svc)` |
| `ngOnInit` + manual subscriptions | `computed()` + `effect()` |

### HTML template rules

- Angular does **not** allow self-closing non-void elements: `<div />` → use `<div></div>`
- Void elements (`<hr>`, `<input>`, `<br>`) can be self-closed or left open
- Use `@if`, `@for`, `@switch` (Angular 17+ control flow syntax) — **not** `*ngIf`, `*ngFor`

---

## 4. Component File Layout

### 4a. Attribute Directives (simple native-element enhancement)

Use for: `button`, `input`, `textarea`, `label`, `a`, `hr`, `div`

```
src/app/components/ui/<name>/
  <name>.directive.ts     ← single directive class
  index.ts                ← barrel: export { KFoo } from './<name>.directive'
```

**Pattern:**
```typescript
// selector: nativeElement[k-name]
@Directive({
  selector: 'input[k-input]',
  host: { '[class]': 'classes()' },
})
export class KInputDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('...base classes...', this.class()));
}
```

### 4b. Compound Components (complex widgets with multiple parts)

Use for: Card, Dialog, Alert Dialog, Sheet, Tabs, Accordion, Collapsible, Select, Breadcrumb, etc.

```
src/app/components/ui/<name>/
  <name>.component.ts     ← all compound parts in one file (declared top to bottom)
  index.ts                ← barrel exporting all parts
```

**Declaration order within the file matters** — declare leaf components (Title, Description)
**before** containers that use them (Panel that imports them via `imports: []`), to avoid
`TS2449: Class used before declaration`.

**Pattern:**
```typescript
// Leaf first
@Component({ selector: 'k-alert-title', ... })
export class KAlertTitle { ... }

// Container after
@Component({
  selector: 'k-alert',
  imports: [KAlertTitle],   // safe — declared above
  ...
})
export class KAlert { ... }
```

### 4c. CVA Components (form controls)

Use for: Checkbox, Switch, Radio Group, Slider, Select

```typescript
@Component({
  selector: 'k-checkbox',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => KCheckbox),
    multi: true,
  }],
  ...
})
export class KCheckbox implements ControlValueAccessor {
  readonly checked  = model<boolean>(false);
  readonly disabled = signal<boolean>(false);

  private _onChange: (v: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(v: boolean): void { this.checked.set(!!v); }
  registerOnChange(fn: (v: boolean) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled.set(d); }
}
```

### 4d. CDK Overlay Components (Dropdown, Popover, Tooltip, Sheet)

Use `Overlay` from `@angular/cdk/overlay`. Portals come from `@angular/cdk/portal`.

```typescript
@Directive({ selector: '[kDropdownTrigger]' })
export class KDropdownTrigger implements OnDestroy {
  private overlayRef: OverlayRef | null = null;

  open(): void {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.el)
      .withPositions([...]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });

    const portal = new TemplatePortal(this.templateRef, this.vcr); // ← from cdk/portal
    this.overlayRef.attach(portal);
  }

  ngOnDestroy(): void { this.overlayRef?.dispose(); } // always dispose
}
```

### 4e. Services (Toast, Alert Dialog, Sheet)

Services use `inject()` inside the class body (not constructor):

```typescript
@Injectable({ providedIn: 'root' })
export class KToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(options: KToastOptions): string { ... }
}
```

---

## 5. Styling Rules

### Tailwind v4 — CSS-first configuration

There is **no `tailwind.config.js`**. Configuration is in `src/styles.css`:

```css
@import "tailwindcss";
@import "./styles/tokens.css";

@theme {
  --color-primary: hsl(var(--primary));
  /* ... all semantic tokens mapped here ... */
}
```

### Design tokens

All semantic colors live in `src/styles/tokens.css` as CSS custom properties:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* etc. */
}
.dark { ... }
```

**Never hardcode colors** — always use semantic tokens:

```typescript
// ✅ Use semantic token classes
cn('bg-primary text-primary-foreground')
cn('bg-destructive/10 text-destructive')

// ❌ Never hardcode
cn('bg-[#1a1a2e] text-white')
```

### Class merging with `cn()`

Always use `cn()` for computed classes. Import path is always:

```typescript
import { cn } from '../../../core/utils/cn'; // adjust depth for your file location
```

Depth reference:
- `components/ui/<name>/` → `'../../../core/utils/cn'`
- `pages/<name>/` → `'../../core/utils/cn'`
- `shared/` → `'../../core/utils/cn'` (probably — check actual depth)

### CVA for multi-variant components

```typescript
const variants = cva('base classes', {
  variants: {
    variant: { default: '...', destructive: '...', outline: '...' },
    size:    { sm: '...', default: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
// Export the inferred type
export type MyVariant = NonNullable<VariantProps<typeof variants>['variant']>;
```

---

## 6. File Naming Conventions

| What | Convention | Example |
|---|---|---|
| Component | `<name>.component.ts` | `checkbox.component.ts` |
| Directive | `<name>.directive.ts` | `button.directive.ts` |
| Service | `<name>.service.ts` or inline in `<name>.service.ts` | `toast.service.ts` |
| Multiple directives | `<name>.directives.ts` (plural) | `typography.directives.ts`, `table.directives.ts` |
| Barrel | `index.ts` | Always present in every UI folder |
| Showcase page | `<name>-showcase.component.ts` | `forms-showcase.component.ts` |

---

## 7. The `class` Input Pattern

**Every** component and directive must accept a `class` input for user overrides:

```typescript
readonly class = input<string>('');

protected readonly classes = computed(() =>
  cn('...invariant base classes...', this.class())
);
```

Apply via `host`:
```typescript
host: { '[class]': 'classes()' }
```

For compound wrapper components that should not add a wrapper DOM node:
```typescript
host: { '[class]': '"contents"' }
```

---

## 8. Component Catalogue (33 components)

### Primitives
| Component | File | Type | Selector |
|---|---|---|---|
| Button | `button/button.directive.ts` | Directive | `button[k-button], a[k-button]` |
| Badge | `badge/badge.directive.ts` | Directive | `span[k-badge], [k-badge]` |
| Input | `input/input.directive.ts` | Directive | `input[k-input]` |
| Separator | `separator/separator.directive.ts` | Directive | `hr[k-separator], [k-separator]` |
| Skeleton | `skeleton/skeleton.directive.ts` | Directive | `div[k-skeleton], span[k-skeleton]` |
| Avatar | `avatar/avatar.component.ts` | Compound | `k-avatar`, `k-avatar-image`, `k-avatar-fallback` |
| Card | `card/card.component.ts` | Compound | `k-card`, `k-card-header`, `k-card-title`, `k-card-description`, `k-card-content`, `k-card-footer` |
| Typography | `typography/typography.directives.ts` | Directives | `h1[k-h1]`, `h2[k-h2]`, `h3[k-h3]`, `h4[k-h4]`, `p[k-p]`, `blockquote[k-blockquote]`, `code[k-code]`, `ul[k-list]`, `[k-lead]`, `[k-large]`, `[k-small]`, `[k-muted]` |

### Forms
| Component | File | Type | CVA |
|---|---|---|---|
| Textarea | `textarea/textarea.directive.ts` | Directive | No |
| Label | `label/label.directive.ts` | Directive | No |
| Form Field | `form-field/form-field.component.ts` | Compound | No |
| Checkbox | `checkbox/checkbox.component.ts` | Component | ✓ |
| Switch | `switch/switch.component.ts` | Component | ✓ |
| Radio Group | `radio-group/radio-group.component.ts` | Compound | ✓ (on group) |
| Slider | `slider/slider.component.ts` | Component | ✓ |
| Select | `select/select.component.ts` | Compound | ✓ |

### Overlays
| Component | File | Type | Backend |
|---|---|---|---|
| Dialog | `dialog/dialog.component.ts` | Service + Panel | CDK Dialog |
| Alert Dialog | `alert-dialog/alert-dialog.component.ts` | Service + Compound | CDK Dialog |
| Sheet | `sheet/sheet.component.ts` | Service + Compound | CDK Overlay |
| Dropdown | `dropdown/dropdown.component.ts` | Trigger Directive + Compound | CDK Overlay |
| Popover | `popover/popover.component.ts` | Trigger Directive + Panel | CDK Overlay |
| Tooltip | `tooltip/tooltip.directive.ts` | Directive + Panel | CDK Overlay |

### Feedback
| Component | File | Type |
|---|---|---|
| Alert | `alert/alert.component.ts` | Compound |
| Toast | `toast/toast.service.ts` | Service + `k-toaster` |
| Progress | `progress/progress.component.ts` | Component |
| Spinner | `spinner/spinner.component.ts` | Component |

### Navigation & Layout
| Component | File | Type |
|---|---|---|
| Tabs | `tabs/tabs.component.ts` | Compound (signal DI) |
| Accordion | `accordion/accordion.component.ts` | `k-accordion-panel` (animated) |
| Collapsible | `collapsible/collapsible.component.ts` | Compound (DI token) |
| Breadcrumb | `breadcrumb/breadcrumb.component.ts` | Compound |
| Pagination | `pagination/pagination.component.ts` | Smart Component |
| Scroll Area | `scroll-area/scroll-area.component.ts` | Component (CSS scrollbar) |

### Data
| Component | File | Type |
|---|---|---|
| Table | `table/table.directives.ts` | Directives (`k-table`, `k-thead`, `k-tbody`, `k-tfoot`, `k-tr`, `k-th`, `k-td`) |

---

## 9. Showcase Pages & Routes

Showcase pages live in `src/app/pages/<name>/`. Each is a **lazy-loaded** standalone
component registered in `src/app/app.routes.ts`.

**Grouped showcase pages** (multiple components on one page):

| Route | Page | Components |
|---|---|---|
| `/primitives` | `primitives-showcase` | Separator, Skeleton, Avatar |
| `/typography` | `typography-showcase` | All typography directives |
| `/forms` | `forms-showcase` | Textarea, Label, FormField, Checkbox, Switch, RadioGroup, Slider |
| `/overlays` | `overlays-showcase` | Alert Dialog, Sheet, Dropdown, Popover, Tooltip |
| `/feedback` | `feedback-showcase` | Alert, Toast, Progress, Spinner |
| `/navigation` | `navigation-showcase` | Tabs, Accordion, Collapsible, Breadcrumb, Pagination, ScrollArea |
| `/data` | `data-showcase` | Table, Select |

**Individual showcase pages:**
`/button`, `/badge`, `/input`, `/card`, `/dialog`

### Adding a new showcase page

1. Create `src/app/pages/<name>/<name>-showcase.component.ts`
2. Add lazy-loaded route to `src/app/app.routes.ts`
3. Add sidebar nav item to `src/app/layout/sidebar.component.ts` under the correct group

---

## 10. Shell & Layout

```
app-shell
├── app-nav-header         ← top bar with logo + theme toggle
├── app-sidebar            ← sticky left nav (7 groups, 33+ items)
├── <router-outlet>        ← main content area (max-w-4xl)
└── k-toaster             ← MUST be in shell; renders toast notifications
```

**`k-toaster` must always be present** in `shell.component.ts`. Removing it will
break all toast notifications globally.

---

## 11. DI Token Pattern (for parent→child communication)

Used by: Tabs, Collapsible, Radio Group, Accordion, Dropdown, Select

```typescript
// 1. Define token
export const K_TABS = new InjectionToken<TabsContext>('K_TABS');

// 2. Provide from parent using factory
@Component({
  providers: [{
    provide: K_TABS,
    useFactory: () => {
      const t = inject(KTabs, { self: true });
      return { value: t.value };
    },
  }],
})
export class KTabs { readonly value = model<string>(''); }

// 3. Consume in child
@Component({ selector: 'k-tab-trigger' })
export class KTabTrigger {
  private readonly ctx = inject(K_TABS, { optional: true });
  protected readonly isActive = computed(() => this.ctx?.value() === this.value());
}
```

---

## 12. What NOT to Do

| ❌ Don't | ✅ Do instead |
|---|---|
| `@Input() variant = 'default'` | `readonly variant = input<ButtonVariant>('default')` |
| `@Output() clicked = new EventEmitter()` | `readonly clicked = output<void>()` |
| `constructor(private overlay: Overlay)` | `private readonly overlay = inject(Overlay)` |
| `*ngIf="condition"` | `@if (condition) { ... }` |
| `*ngFor="let i of items"` | `@for (i of items; track i.id) { ... }` |
| `<div />` (self-closing non-void) | `<div></div>` |
| `import { animate } from '@angular/core'` | `import { animate } from '@angular/animations'` |
| `import { TemplatePortal } from '@angular/cdk/overlay'` | `import { TemplatePortal } from '@angular/cdk/portal'` |
| Hardcoded hex colors | Semantic token classes (`bg-primary`, `text-destructive`) |
| `tailwind.config.js` | `@theme {}` block in `src/styles.css` |
| `NgModule` | Standalone components (`standalone: true` — actually no `standalone` property needed in Angular 21) |
| Missing `ChangeDetectionStrategy.OnPush` | Always set `changeDetection: ChangeDetectionStrategy.OnPush` |
| Missing `encapsulation: ViewEncapsulation.None` | Always set for all UI components |

---

## 13. Adding a New Component — Step-by-Step

1. **Decide the type**: directive, compound, CVA, or CDK overlay
2. **Create the file**: `src/app/components/ui/<name>/<name>.component.ts` (or `.directive.ts`)
3. **Declare order**: in compound files, declare leaves before containers
4. **Add `class` input** and `protected readonly classes = computed(...)` pattern
5. **Create `index.ts`** barrel exporting all public symbols
6. **Create the showcase page**: `src/app/pages/<name>/<name>-showcase.component.ts`
   - OR add to an existing grouped showcase if it belongs to a phase group
7. **Register the lazy route** in `src/app/app.routes.ts`
8. **Add sidebar item** in `src/app/layout/sidebar.component.ts`
9. **Run the build**: `npm run build -- --configuration development`
10. **Verify zero errors** (warnings about unused imports are acceptable but should be cleaned up)

---

## 14. Registry Build

The registry is built with:

```bash
npx ts-node --esm scripts/build-registry.ts
```

Output: `public/registry/` — JSON files with component source for copy-and-paste integration.

After adding a new component, run the registry build so the component is available in the registry output.

---

## 15. Dev Commands

```bash
npm start              # Dev server at http://localhost:4200
npm run build          # Production build
npm run build -- --configuration development  # Fast dev build for error checking
```

---

## 16. Key Files Quick Reference

| File | Purpose |
|---|---|
| `src/styles.css` | Tailwind v4 entry + `@theme` token mapping |
| `src/styles/tokens.css` | CSS custom properties (semantic color tokens) |
| `src/app/core/utils/cn.ts` | Class merging utility (`clsx` + `tailwind-merge`) |
| `src/app/app.routes.ts` | Lazy-loaded route definitions |
| `src/app/app.config.ts` | App-level providers (`provideAnimationsAsync`, `provideHttpClient`) |
| `src/app/layout/shell.component.ts` | Root shell — must include `k-toaster` |
| `src/app/layout/sidebar.component.ts` | Navigation sidebar with 7 component groups |
| `src/app/layout/nav-header.component.ts` | Top navigation bar |
| `src/app/shared/tabs.component.ts` | Shared Preview/Code tab switcher for showcase pages |
| `src/app/shared/code-block.component.ts` | Syntax-highlighted code block for showcase pages |
| `scripts/build-registry.ts` | Builds the component registry JSON files |
