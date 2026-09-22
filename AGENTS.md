# Kobo UI — AI Agent Instructions & Component Guide

> **Official AI Assistant Guidelines for building Angular applications with [Kobo UI](https://github.com/bntlyr/kobo-ui).**
> When writing, modifying, or refactoring code in a project that uses `kobo-ui`, follow these rules and patterns strictly.

---

## 1. Overview & Tech Stack

`kobo-ui` is a modern, accessible, signal-driven Angular 18+ component library styled with **Tailwind CSS v4** and powered by `@angular/cdk`.

- **Package Import**: Everything is imported from `'kobo-ui'`
- **Framework**: Angular 18+ / 19+ / 21+ (strict standalone components)
- **Styling**: Tailwind CSS v4 (`@theme`, semantic CSS tokens)
- **State & Reactivity**: Angular Signals (`signal()`, `computed()`, `input()`, `output()`, `model()`)
- **Accessibility & Overlays**: `@angular/cdk`
- **Icons**: `@lucide/angular`

---

## 2. Installation & Project Setup

If the consumer project does not already have Kobo UI configured:

### 2.1 Dependencies
```bash
npm install kobo-ui @angular/cdk @lucide/angular tailwind-merge clsx class-variance-authority
```

### 2.2 Global Styles (`src/styles.css`)
Kobo UI uses Tailwind CSS v4 with semantic tokens. Configure `src/styles.css`:

```css
@import "tailwindcss";
@import "kobo-ui/assets/tokens.css";
@import "kobo-ui/assets/themes.css";

@theme {
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

### 2.3 Toast Container Setup
If using toast notifications (`KToastService`), add `<k-toaster />` once in the root app component or shell layout:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KToaster } from 'kobo-ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KToaster],
  template: `
    <router-outlet />
    <k-toaster />
  `,
})
export class AppComponent {}
```

---

## 3. Core Coding Rules for AI Agents

1. **Always Standalone**: All Angular components, directives, and pipes must be standalone (Angular 18+). Import needed Kobo UI components in the component's `imports: [...]` array.
2. **Signal APIs**:
   - Inputs: Use `readonly name = input<string>()` or `input.required<string>()`
   - Two-way bindings: Use `readonly value = model<string>('')`
   - Outputs: Use `readonly submit = output<FormData>()`
   - Derived state: Use `computed(() => ...)`
   - Effects: Use `effect(() => ...)`
3. **Dependency Injection**: Always use `inject(Service)` instead of constructor injection.
4. **Change Detection**: Always specify `changeDetection: ChangeDetectionStrategy.OnPush`.
5. **Control Flow**: Always use `@if`, `@for (item of items; track item.id)`, and `@switch`. Do NOT use `*ngIf` or `*ngFor`.
6. **No Hardcoded Colors**: Always use semantic Tailwind utility classes (`bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`, `bg-destructive`, `text-destructive-foreground`, `text-card-foreground`). Never use arbitrary hardcoded hex colors like `bg-[#123456]`.
7. **Icons**: Use `@lucide/angular` icons rather than emoji or custom SVGs.
8. **Directives vs Components**:
   - Attribute directives are applied directly to native elements (e.g. `<button k-button>`, `<input k-input>`, `<span k-badge>`, `<table k-table>`).
   - Compound components use custom tags (e.g. `<k-card>`, `<k-dialog>`, `<k-tabs>`, `<k-select>`).

---

## 4. Master Component Catalogue & Quick Reference

### 4.1 Buttons & Badges

#### Button (`KButtonDirective`)
```typescript
import { KButtonDirective } from 'kobo-ui';
```
```html
<!-- Variants: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' -->
<!-- Sizes: 'sm' | 'default' | 'lg' | 'icon' | 'icon-sm' -->
<button k-button variant="default">Primary Button</button>
<button k-button variant="outline" size="sm">Small Outline</button>
<button k-button variant="destructive" [loading]="isLoading()">Delete</button>
<a k-button variant="link" href="/help">Help Link</a>
```

#### Button Group (`KButtonGroup`)
```typescript
import { KButtonGroup, KButtonDirective } from 'kobo-ui';
```
```html
<k-button-group>
  <button k-button variant="outline">Left</button>
  <button k-button variant="outline">Middle</button>
  <button k-button variant="outline">Right</button>
</k-button-group>
```

#### Badge (`KBadgeDirective`)
```typescript
import { KBadgeDirective } from 'kobo-ui';
```
```html
<!-- Variants: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' -->
<span k-badge variant="default">New</span>
<span k-badge variant="secondary">In Progress</span>
<span k-badge variant="outline">v1.0.0</span>
<span k-badge variant="destructive">Failed</span>
```

---

### 4.2 Form Controls & Inputs

#### Text Input (`KInputDirective`) & Label (`KLabelDirective`)
```typescript
import { KInputDirective, KLabelDirective } from 'kobo-ui';
```
```html
<label k-label for="email">Email address</label>
<input k-input id="email" type="email" placeholder="name@example.com" />
```

#### Form Field (`KFormField`, `KFormError`, `KFormHint`)
```typescript
import { KFormField, KFormError, KFormHint, KLabelDirective, KInputDirective } from 'kobo-ui';
```
```html
<k-form-field>
  <label k-label for="username">Username</label>
  <input k-input id="username" [(ngModel)]="username" />
  <k-form-hint>This is your public display name.</k-form-hint>
  @if (isUsernameInvalid()) {
    <k-form-error>Username must be at least 3 characters.</k-form-error>
  }
</k-form-field>
```

#### Textarea (`KTextareaDirective`)
```typescript
import { KTextareaDirective, KLabelDirective } from 'kobo-ui';
```
```html
<label k-label for="bio">Bio</label>
<textarea k-textarea id="bio" rows="4" placeholder="Tell us about yourself"></textarea>
```

#### Checkbox (`KCheckbox`)
```typescript
import { KCheckbox } from 'kobo-ui';
```
```html
<k-checkbox [(checked)]="agreeTerms">
  Accept terms and conditions
</k-checkbox>
```

#### Switch (`KSwitch`)
```typescript
import { KSwitch } from 'kobo-ui';
```
```html
<k-switch [(checked)]="notificationsEnabled">
  Enable push notifications
</k-switch>
```

#### Radio Group (`KRadioGroup`, `KRadioItem`)
```typescript
import { KRadioGroup, KRadioItem } from 'kobo-ui';
```
```html
<k-radio-group [(value)]="selectedPlan">
  <k-radio-item value="free">Free ($0/mo)</k-radio-item>
  <k-radio-item value="pro">Pro ($19/mo)</k-radio-item>
  <k-radio-item value="enterprise">Enterprise</k-radio-item>
</k-radio-group>
```

#### Slider (`KSlider`)
```typescript
import { KSlider } from 'kobo-ui';
```
```html
<k-slider [(value)]="volume" [min]="0" [max]="100" [step]="1" />
```

#### Select (`KSelect`, `KSelectContent`, `KSelectItem`, `KSelectLabel`, `KSelectSeparator`)
```typescript
import { KSelect, KSelectContent, KSelectItem, KSelectLabel, KSelectSeparator } from 'kobo-ui';
```
```html
<k-select [(value)]="selectedCountry" placeholder="Select a country...">
  <k-select-content>
    <k-select-label>North America</k-select-label>
    <k-select-item value="us">United States</k-select-item>
    <k-select-item value="ca">Canada</k-select-item>
    <k-select-separator />
    <k-select-label>Europe</k-select-label>
    <k-select-item value="gb">United Kingdom</k-select-item>
    <k-select-item value="de">Germany</k-select-item>
    <k-select-item value="fr">France</k-select-item>
  </k-select-content>
</k-select>
```

#### Native Select (`KNativeSelectDirective`)
```typescript
import { KNativeSelectDirective } from 'kobo-ui';
```
```html
<select k-native-select [(ngModel)]="role">
  <option value="admin">Administrator</option>
  <option value="user">User</option>
</select>
```

#### Multi-Select (`KMultiSelect`)
```typescript
import { KMultiSelect } from 'kobo-ui';
```
```html
<k-multi-select 
  [options]="tagOptions" 
  [(value)]="selectedTags" 
  placeholder="Select tags..." 
/>
```

#### Input OTP (`KInputOtp`)
```typescript
import { KInputOtp } from 'kobo-ui';
```
```html
<k-input-otp [length]="6" [(value)]="otpCode" />
```

#### Password Input (`KPasswordInput`)
```typescript
import { KPasswordInput } from 'kobo-ui';
```
```html
<k-password-input [(value)]="password" placeholder="Enter password" />
```

#### Date Picker (`KDatePicker`) & Time Picker (`KTimePicker`)
```typescript
import { KDatePicker, KTimePicker } from 'kobo-ui';
```
```html
<k-date-picker [(value)]="selectedDate" placeholder="Pick a date" />
<k-time-picker [(value)]="selectedTime" />
```

---

### 4.3 Layout & Containers

#### Card (`KCard`, `KCardHeader`, `KCardTitle`, `KCardDescription`, `KCardContent`, `KCardFooter`)
```typescript
import { 
  KCard, KCardHeader, KCardTitle, KCardDescription, KCardContent, KCardFooter, KButtonDirective 
} from 'kobo-ui';
```
```html
<k-card>
  <k-card-header>
    <k-card-title>Project Overview</k-card-title>
    <k-card-description>Summary of recent activity and metrics.</k-card-description>
  </k-card-header>
  <k-card-content>
    <p class="text-sm text-muted-foreground">Your monthly active users grew by 24% this week.</p>
  </k-card-content>
  <k-card-footer>
    <button k-button variant="outline" size="sm">View Report</button>
  </k-card-footer>
</k-card>
```

#### Separator (`KSeparatorDirective`)
```typescript
import { KSeparatorDirective } from 'kobo-ui';
```
```html
<!-- Horizontal (default) or Vertical -->
<hr k-separator />
<div class="flex h-5 items-center space-x-4">
  <span>Item 1</span>
  <hr k-separator orientation="vertical" />
  <span>Item 2</span>
</div>
```

#### Skeleton (`KSkeletonDirective`)
```typescript
import { KSkeletonDirective } from 'kobo-ui';
```
```html
<div class="flex items-center space-x-4">
  <div k-skeleton class="h-12 w-12 rounded-full"></div>
  <div class="space-y-2">
    <div k-skeleton class="h-4 w-[250px]"></div>
    <div k-skeleton class="h-4 w-[200px]"></div>
  </div>
</div>
```

#### Avatar (`KAvatar`, `KAvatarImage`, `KAvatarFallback`)
```typescript
import { KAvatar, KAvatarImage, KAvatarFallback } from 'kobo-ui';
```
```html
<k-avatar size="md">
  <k-avatar-image src="https://github.com/shadcn.png" alt="@shadcn" />
  <k-avatar-fallback>CN</k-avatar-fallback>
</k-avatar>
```

#### Scroll Area (`KScrollArea`)
```typescript
import { KScrollArea } from 'kobo-ui';
```
```html
<k-scroll-area class="h-72 w-full rounded-md border border-border p-4">
  <div class="space-y-4">
    @for (item of items; track item.id) {
      <div class="text-sm">{{ item.name }}</div>
    }
  </div>
</k-scroll-area>
```

#### Resizable (`KResizablePanelGroup`, `KResizablePanel`, `KResizableHandle`)
```typescript
import { KResizablePanelGroup, KResizablePanel, KResizableHandle } from 'kobo-ui';
```
```html
<k-resizable-panel-group direction="horizontal" class="min-h-[200px] rounded-lg border border-border">
  <k-resizable-panel [defaultSize]="30">
    <div class="p-4">Navigation</div>
  </k-resizable-panel>
  <k-resizable-handle />
  <k-resizable-panel [defaultSize]="70">
    <div class="p-4">Main Content</div>
  </k-resizable-panel>
</k-resizable-panel-group>
```

---

### 4.4 Overlays & Popups

#### Dialog Modal (`KDialogService`, `KDialog`, `KDialogHeader`, `KDialogTitle`, `KDialogDescription`, `KDialogContent`, `KDialogFooter`, `KDialogClose`)

**1. Create the dialog component:**
```typescript
import { Component } from '@angular/core';
import { 
  KDialog, KDialogHeader, KDialogTitle, KDialogDescription, 
  KDialogContent, KDialogFooter, KDialogClose, KButtonDirective 
} from 'kobo-ui';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    KDialog, KDialogHeader, KDialogTitle, KDialogDescription, 
    KDialogContent, KDialogFooter, KDialogClose, KButtonDirective
  ],
  template: `
    <k-dialog size="default">
      <k-dialog-header>
        <k-dialog-title>Delete Project</k-dialog-title>
        <k-dialog-description>
          Are you sure you want to delete this project? This action cannot be undone.
        </k-dialog-description>
      </k-dialog-header>
      <k-dialog-content>
        <p class="text-sm text-muted-foreground">All stored data will be permanently removed.</p>
      </k-dialog-content>
      <k-dialog-footer>
        <button k-button variant="outline" k-dialog-close>Cancel</button>
        <button k-button variant="destructive" (click)="confirm()">Delete</button>
      </k-dialog-footer>
    </k-dialog>
  `,
})
export class ConfirmDialogComponent {
  confirm() {
    // Handle confirmation logic
  }
}
```

**2. Open the dialog via service:**
```typescript
import { Component, inject } from '@angular/core';
import { KDialogService, KButtonDirective } from 'kobo-ui';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [KButtonDirective],
  template: `
    <button k-button variant="destructive" (click)="openDialog()">Delete</button>
  `,
})
export class SettingsComponent {
  private readonly dialog = inject(KDialogService);

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      ariaLabel: 'Delete Project Confirmation',
    });

    dialogRef.closed.subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}
```

#### Alert Dialog (`KAlertDialogService`, `KAlertDialog`, `KAlertDialogHeader`, `KAlertDialogTitle`, `KAlertDialogDescription`, `KAlertDialogFooter`, `KAlertDialogAction`, `KAlertDialogCancel`)
```typescript
import { KAlertDialogService } from 'kobo-ui';

const alertDialog = inject(KAlertDialogService);
alertDialog.confirm({
  title: 'Are you absolutely sure?',
  description: 'This action cannot be undone.',
  confirmText: 'Continue',
  cancelText: 'Cancel',
  onConfirm: () => handleDelete(),
});
```

#### Sheet / Drawer (`KSheetService`, `KSheet`, `KSheetHeader`, `KSheetTitle`, `KSheetDescription`, `KSheetContent`, `KSheetFooter`)
```typescript
import { KSheetService } from 'kobo-ui';
// Open slide-out sheet from side ('right' | 'left' | 'top' | 'bottom')
const sheetService = inject(KSheetService);
sheetService.open(MySheetComponent, { side: 'right', size: 'default' });
```

#### Dropdown Menu (`KDropdownTrigger`, `KDropdownContent`, `KDropdownItem`, `KDropdownSeparator`, `KDropdownLabel`)
```typescript
import { 
  KDropdownTrigger, KDropdownContent, KDropdownItem, 
  KDropdownSeparator, KDropdownLabel, KButtonDirective 
} from 'kobo-ui';
```
```html
<button k-button variant="outline" [kDropdownTrigger]="menu">
  Options
</button>

<ng-template #menu>
  <k-dropdown-content class="w-56">
    <k-dropdown-label>My Account</k-dropdown-label>
    <k-dropdown-separator />
    <k-dropdown-item (click)="onProfile()">Profile</k-dropdown-item>
    <k-dropdown-item (click)="onBilling()">Billing</k-dropdown-item>
    <k-dropdown-item (click)="onSettings()">Settings</k-dropdown-item>
    <k-dropdown-separator />
    <k-dropdown-item (click)="onLogout()" class="text-destructive">
      Log out
    </k-dropdown-item>
  </k-dropdown-content>
</ng-template>
```

#### Popover (`KPopoverTrigger`, `KPopover`)
```typescript
import { KPopoverTrigger, KPopover, KButtonDirective } from 'kobo-ui';
```
```html
<button k-button variant="outline" [kPopoverTrigger]="popoverTemplate">
  Open Popover
</button>

<ng-template #popoverTemplate>
  <k-popover class="w-80 p-4">
    <h4 class="font-medium leading-none">Dimensions</h4>
    <p class="text-sm text-muted-foreground mt-2">Set the dimensions for the layer.</p>
  </k-popover>
</ng-template>
```

#### Tooltip (`KTooltipDirective`)
```typescript
import { KTooltipDirective, KButtonDirective } from 'kobo-ui';
```
```html
<button k-button variant="outline" kTooltip="Save changes to cloud" kTooltipPosition="top">
  Save
</button>
```

---

### 4.5 Feedback & Notifications

#### Toast Notifications (`KToastService`, `<k-toaster />`)
```typescript
import { Component, inject } from '@angular/core';
import { KToastService, KButtonDirective } from 'kobo-ui';

@Component({
  standalone: true,
  imports: [KButtonDirective],
  template: `
    <button k-button (click)="notify()">Show Toast</button>
  `,
})
export class ToastDemoComponent {
  private readonly toast = inject(KToastService);

  notify() {
    this.toast.show({
      title: 'Changes saved',
      description: 'Your profile details were updated successfully.',
      variant: 'default', // 'default' | 'success' | 'destructive' | 'warning'
      duration: 4000,
    });
  }
}
```

#### Alert Banner (`KAlert`, `KAlertTitle`, `KAlertDescription`)
```typescript
import { KAlert, KAlertTitle, KAlertDescription } from 'kobo-ui';
```
```html
<!-- Variants: 'default' | 'destructive' | 'success' | 'warning' -->
<k-alert variant="destructive">
  <k-alert-title>Error</k-alert-title>
  <k-alert-description>Your session has expired. Please log in again.</k-alert-description>
</k-alert>
```

#### Progress Bar (`KProgress`) & Spinner (`KSpinner`)
```typescript
import { KProgress, KSpinner } from 'kobo-ui';
```
```html
<k-progress [value]="progressValue()" />
<k-spinner size="md" />
```

#### Empty State (`KEmpty`, `KEmptyIcon`, `KEmptyTitle`, `KEmptyDescription`, `KEmptyAction`)
```typescript
import { 
  KEmpty, KEmptyIcon, KEmptyTitle, KEmptyDescription, KEmptyAction, KButtonDirective 
} from 'kobo-ui';
```
```html
<k-empty>
  <k-empty-title>No projects found</k-empty-title>
  <k-empty-description>You haven't created any projects yet. Get started by creating your first one.</k-empty-description>
  <k-empty-action>
    <button k-button>Create Project</button>
  </k-empty-action>
</k-empty>
```

---

### 4.6 Navigation & Layout

#### Tabs (`KTabs`, `KTabList`, `KTabTrigger`, `KTabContent`)
```typescript
import { KTabs, KTabList, KTabTrigger, KTabContent } from 'kobo-ui';
```
```html
<k-tabs [(value)]="activeTab">
  <k-tab-list>
    <k-tab-trigger value="account">Account</k-tab-trigger>
    <k-tab-trigger value="password">Password</k-tab-trigger>
    <k-tab-trigger value="notifications">Notifications</k-tab-trigger>
  </k-tab-list>

  <k-tab-content value="account" class="p-4">
    <p>Account settings content.</p>
  </k-tab-content>
  <k-tab-content value="password" class="p-4">
    <p>Password change form.</p>
  </k-tab-content>
  <k-tab-content value="notifications" class="p-4">
    <p>Notification preferences.</p>
  </k-tab-content>
</k-tabs>
```

#### Accordion (`KAccordion`, `KAccordionPanel`)
```typescript
import { KAccordion, KAccordionPanel } from 'kobo-ui';
```
```html
<k-accordion [multiple]="false">
  <k-accordion-panel title="Is it accessible?">
    Yes. It adheres to the WAI-ARIA design pattern and uses @angular/cdk.
  </k-accordion-panel>
  <k-accordion-panel title="Is it styled with Tailwind CSS?">
    Yes. It uses Tailwind CSS v4 CSS custom properties for full theming.
  </k-accordion-panel>
</k-accordion>
```

#### Collapsible (`KCollapsible`, `KCollapsibleTrigger`, `KCollapsibleContent`)
```typescript
import { KCollapsible, KCollapsibleTrigger, KCollapsibleContent, KButtonDirective } from 'kobo-ui';
```
```html
<k-collapsible [(open)]="isOpen">
  <div class="flex items-center justify-between">
    <span class="font-semibold">@peduarte starred 3 repositories</span>
    <button k-button variant="ghost" size="sm" kCollapsibleTrigger>Toggle</button>
  </div>
  <k-collapsible-content class="mt-2 space-y-2">
    <div class="rounded-md border border-border px-4 py-3 text-sm">@angular/core</div>
    <div class="rounded-md border border-border px-4 py-3 text-sm">@angular/cdk</div>
  </k-collapsible-content>
</k-collapsible>
```

#### Breadcrumb (`KBreadcrumb`, `KBreadcrumbList`, `KBreadcrumbItem`, `KBreadcrumbLink`, `KBreadcrumbSeparator`, `KBreadcrumbPage`)
```typescript
import { 
  KBreadcrumb, KBreadcrumbList, KBreadcrumbItem, 
  KBreadcrumbLink, KBreadcrumbSeparator, KBreadcrumbPage 
} from 'kobo-ui';
```
```html
<k-breadcrumb>
  <k-breadcrumb-list>
    <k-breadcrumb-item>
      <a k-breadcrumb-link href="/">Home</a>
    </k-breadcrumb-item>
    <k-breadcrumb-separator />
    <k-breadcrumb-item>
      <a k-breadcrumb-link href="/components">Components</a>
    </k-breadcrumb-item>
    <k-breadcrumb-separator />
    <k-breadcrumb-item>
      <k-breadcrumb-page>Breadcrumb</k-breadcrumb-page>
    </k-breadcrumb-item>
  </k-breadcrumb-list>
</k-breadcrumb>
```

#### Pagination (`KPagination`, `KPaginationContent`, `KPaginationItem`, `KPaginationLink`, `KPaginationNext`, `KPaginationPrevious`)
```typescript
import { 
  KPagination, KPaginationContent, KPaginationItem, 
  KPaginationLink, KPaginationNext, KPaginationPrevious 
} from 'kobo-ui';
```
```html
<k-pagination>
  <k-pagination-content>
    <k-pagination-item>
      <a k-pagination-prev href="#">Previous</a>
    </k-pagination-item>
    <k-pagination-item>
      <a k-pagination-link [isActive]="true" href="#">1</a>
    </k-pagination-item>
    <k-pagination-item>
      <a k-pagination-link href="#">2</a>
    </k-pagination-item>
    <k-pagination-item>
      <a k-pagination-next href="#">Next</a>
    </k-pagination-item>
  </k-pagination-content>
</k-pagination>
```

#### Sidebar Navigation (`KSidebarProvider`, `KSidebar`, `KSidebarHeader`, `KSidebarContent`, `KSidebarFooter`, `KSidebarGroup`, `KSidebarGroupLabel`, `KSidebarMenu`, `KSidebarMenuItem`, `KSidebarMenuButton`)
```typescript
import { 
  KSidebarProvider, KSidebar, KSidebarHeader, KSidebarContent, 
  KSidebarFooter, KSidebarGroup, KSidebarGroupLabel, KSidebarMenu, 
  KSidebarMenuItem, KSidebarMenuButton, KSidebarTrigger 
} from 'kobo-ui';
```
```html
<k-sidebar-provider>
  <div class="flex min-h-screen w-full">
    <k-sidebar>
      <k-sidebar-header class="p-4 font-bold">App Logo</k-sidebar-header>
      <k-sidebar-content>
        <k-sidebar-group>
          <k-sidebar-group-label>Platform</k-sidebar-group-label>
          <k-sidebar-menu>
            <k-sidebar-menu-item>
              <button k-sidebar-menu-button [isActive]="true">Dashboard</button>
            </k-sidebar-menu-item>
            <k-sidebar-menu-item>
              <button k-sidebar-menu-button>Analytics</button>
            </k-sidebar-menu-item>
          </k-sidebar-menu>
        </k-sidebar-group>
      </k-sidebar-content>
      <k-sidebar-footer class="p-4">User Profile</k-sidebar-footer>
    </k-sidebar>
    <main class="flex-1 p-6">
      <k-sidebar-trigger />
      <!-- Main view -->
    </main>
  </div>
</k-sidebar-provider>
```

---

### 4.7 Tables & Data Display

#### Table Directives (`KTableDirective`, `KTableHeadDirective`, `KTableBodyDirective`, `KTableRowDirective`, `KTableCellDirective`, `KTableHeadCellDirective`)
```typescript
import { 
  KTableDirective, KTableHeadDirective, KTableBodyDirective, 
  KTableRowDirective, KTableCellDirective, KTableHeadCellDirective, KBadgeDirective 
} from 'kobo-ui';
```
```html
<div class="rounded-md border border-border">
  <table k-table>
    <thead k-thead>
      <tr k-tr>
        <th k-th>Invoice</th>
        <th k-th>Status</th>
        <th k-th>Method</th>
        <th k-th class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody k-tbody>
      @for (inv of invoices; track inv.id) {
        <tr k-tr>
          <td k-td class="font-medium">{{ inv.id }}</td>
          <td k-td>
            <span k-badge [variant]="inv.status === 'Paid' ? 'success' : 'secondary'">
              {{ inv.status }}
            </span>
          </td>
          <td k-td>{{ inv.method }}</td>
          <td k-td class="text-right font-mono">{{ inv.amount | currency }}</td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

---

### 4.8 Typography & Utilities

#### Typography Directives
```typescript
import { 
  KH1Directive, KH2Directive, KH3Directive, KH4Directive, 
  KPDirective, KLeadDirective, KBlockquoteDirective, KCodeDirective, KMutedDirective 
} from 'kobo-ui';
```
```html
<h1 k-h1>Main Page Heading</h1>
<p k-lead>A leading paragraph with prominent text styling.</p>
<h2 k-h2>Sub Heading</h2>
<p k-p>Regular body copy with balanced line height.</p>
<blockquote k-blockquote>Notable quotation block.</blockquote>
<code k-code>npm install kobo-ui</code>
<span k-muted>Muted supporting caption.</span>
```

#### Theme Service (`KThemeService`)
```typescript
import { Component, inject } from '@angular/core';
import { KThemeService } from 'kobo-ui';

@Component({
  standalone: true,
  template: `
    <button (click)="theme.toggleDarkMode()">
      Toggle Dark Mode (Current: {{ theme.isDarkMode() ? 'Dark' : 'Light' }})
    </button>
  `,
})
export class ThemeToggleComponent {
  readonly theme = inject(KThemeService);
}
```

---

## 5. Summary of Do's & Don'ts for AI Agents

| ❌ Never Do | ✅ Always Do |
|---|---|
| `import { ... } from 'src/app/...'` | `import { ... } from 'kobo-ui'` |
| `@Input() name = 'foo'` | `readonly name = input<string>('foo')` |
| `@Output() clicked = new EventEmitter()` | `readonly clicked = output<void>()` |
| `[(ngModel)]="val"` without `model()` | `readonly val = model<string>('')` in components |
| `*ngIf="isVisible"` | `@if (isVisible()) { ... }` |
| `*ngFor="let item of list"` | `@for (item of list(); track item.id) { ... }` |
| `class="bg-[#0f172a] text-[#ffffff]"` | `class="bg-background text-foreground"` |
| Self-closing custom tags `<k-card />` | Explicit closing tags `<k-card></k-card>` |
| Constructor dependency injection | `private readonly service = inject(ServiceName)` |
| Omitting `changeDetection` | `changeDetection: ChangeDetectionStrategy.OnPush` |
