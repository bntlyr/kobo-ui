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

      // ---- Individual Component Routes ----
      {
        path: 'accordion',
        loadComponent: () => import('./pages/accordion/accordion-showcase.component').then(m => m.AccordionShowcaseComponent),
        title: 'Accordion — Kobo UI',
      },
      {
        path: 'alert',
        loadComponent: () => import('./pages/alert/alert-showcase.component').then(m => m.AlertShowcaseComponent),
        title: 'Alert — Kobo UI',
      },
      {
        path: 'alert-dialog',
        loadComponent: () => import('./pages/alert-dialog/alert-dialog-showcase.component').then(m => m.AlertDialogShowcaseComponent),
        title: 'Alert Dialog — Kobo UI',
      },
      {
        path: 'autocomplete',
        loadComponent: () => import('./pages/autocomplete/autocomplete-showcase.component').then(m => m.AutocompleteShowcaseComponent),
        title: 'Autocomplete — Kobo UI',
      },
      {
        path: 'avatar',
        loadComponent: () => import('./pages/avatar/avatar-showcase.component').then(m => m.AvatarShowcaseComponent),
        title: 'Avatar — Kobo UI',
      },
      {
        path: 'badge',
        loadComponent: () => import('./pages/badge/badge-showcase.component').then(m => m.BadgeShowcaseComponent),
        title: 'Badge — Kobo UI',
      },
      {
        path: 'breadcrumb',
        loadComponent: () => import('./pages/breadcrumb/breadcrumb-showcase.component').then(m => m.BreadcrumbShowcaseComponent),
        title: 'Breadcrumb — Kobo UI',
      },
      {
        path: 'button',
        loadComponent: () => import('./pages/button/button-showcase.component').then(m => m.ButtonShowcaseComponent),
        title: 'Button — Kobo UI',
      },
      {
        path: 'card',
        loadComponent: () => import('./pages/card/card-showcase.component').then(m => m.CardShowcaseComponent),
        title: 'Card — Kobo UI',
      },
      {
        path: 'checkbox',
        loadComponent: () => import('./pages/checkbox/checkbox-showcase.component').then(m => m.CheckboxShowcaseComponent),
        title: 'Checkbox — Kobo UI',
      },
      {
        path: 'collapsible',
        loadComponent: () => import('./pages/collapsible/collapsible-showcase.component').then(m => m.CollapsibleShowcaseComponent),
        title: 'Collapsible — Kobo UI',
      },
      {
        path: 'dialog',
        loadComponent: () => import('./pages/dialog/dialog-showcase.component').then(m => m.DialogShowcaseComponent),
        title: 'Dialog — Kobo UI',
      },
      {
        path: 'dropdown',
        loadComponent: () => import('./pages/dropdown/dropdown-showcase.component').then(m => m.DropdownShowcaseComponent),
        title: 'Dropdown Menu — Kobo UI',
      },
      {
        path: 'form-field',
        loadComponent: () => import('./pages/form-field/form-field-showcase.component').then(m => m.FormFieldShowcaseComponent),
        title: 'Form Field — Kobo UI',
      },
      {
        path: 'input',
        loadComponent: () => import('./pages/input/input-showcase.component').then(m => m.InputShowcaseComponent),
        title: 'Input — Kobo UI',
      },
      {
        path: 'label',
        loadComponent: () => import('./pages/label/label-showcase.component').then(m => m.LabelShowcaseComponent),
        title: 'Label — Kobo UI',
      },
      {
        path: 'logo',
        loadComponent: () => import('./pages/logo/logo-showcase.component').then(m => m.LogoShowcaseComponent),
        title: 'Logo — Kobo UI',
      },
      {
        path: 'multi-select',
        loadComponent: () => import('./pages/multi-select/multi-select-showcase.component').then(m => m.MultiSelectShowcaseComponent),
        title: 'Multi Select — Kobo UI',
      },
      {
        path: 'pagination',
        loadComponent: () => import('./pages/pagination/pagination-showcase.component').then(m => m.PaginationShowcaseComponent),
        title: 'Pagination — Kobo UI',
      },
      {
        path: 'password-input',
        loadComponent: () => import('./pages/password-input/password-input-showcase.component').then(m => m.PasswordInputShowcaseComponent),
        title: 'Password Input — Kobo UI',
      },
      {
        path: 'popover',
        loadComponent: () => import('./pages/popover/popover-showcase.component').then(m => m.PopoverShowcaseComponent),
        title: 'Popover — Kobo UI',
      },
      {
        path: 'progress',
        loadComponent: () => import('./pages/progress/progress-showcase.component').then(m => m.ProgressShowcaseComponent),
        title: 'Progress — Kobo UI',
      },
      {
        path: 'radio-group',
        loadComponent: () => import('./pages/radio-group/radio-group-showcase.component').then(m => m.RadioGroupShowcaseComponent),
        title: 'Radio Group — Kobo UI',
      },
      {
        path: 'scroll-area',
        loadComponent: () => import('./pages/scroll-area/scroll-area-showcase.component').then(m => m.ScrollAreaShowcaseComponent),
        title: 'Scroll Area — Kobo UI',
      },
      {
        path: 'select',
        loadComponent: () => import('./pages/select/select-showcase.component').then(m => m.SelectShowcaseComponent),
        title: 'Select — Kobo UI',
      },
      {
        path: 'separator',
        loadComponent: () => import('./pages/separator/separator-showcase.component').then(m => m.SeparatorShowcaseComponent),
        title: 'Separator — Kobo UI',
      },
      {
        path: 'sheet',
        loadComponent: () => import('./pages/sheet/sheet-showcase.component').then(m => m.SheetShowcaseComponent),
        title: 'Sheet — Kobo UI',
      },
      {
        path: 'skeleton',
        loadComponent: () => import('./pages/skeleton/skeleton-showcase.component').then(m => m.SkeletonShowcaseComponent),
        title: 'Skeleton — Kobo UI',
      },
      {
        path: 'slider',
        loadComponent: () => import('./pages/slider/slider-showcase.component').then(m => m.SliderShowcaseComponent),
        title: 'Slider — Kobo UI',
      },
      {
        path: 'spinner',
        loadComponent: () => import('./pages/spinner/spinner-showcase.component').then(m => m.SpinnerShowcaseComponent),
        title: 'Spinner — Kobo UI',
      },
      {
        path: 'switch',
        loadComponent: () => import('./pages/switch/switch-showcase.component').then(m => m.SwitchShowcaseComponent),
        title: 'Switch — Kobo UI',
      },
      {
        path: 'table',
        loadComponent: () => import('./pages/table/table-showcase.component').then(m => m.TableShowcaseComponent),
        title: 'Table — Kobo UI',
      },
      {
        path: 'tabs',
        loadComponent: () => import('./pages/tabs/tabs-showcase.component').then(m => m.TabsShowcaseComponent),
        title: 'Tabs — Kobo UI',
      },
      {
        path: 'textarea',
        loadComponent: () => import('./pages/textarea/textarea-showcase.component').then(m => m.TextareaShowcaseComponent),
        title: 'Textarea — Kobo UI',
      },
      {
        path: 'toast',
        loadComponent: () => import('./pages/toast/toast-showcase.component').then(m => m.ToastShowcaseComponent),
        title: 'Toast — Kobo UI',
      },
      {
        path: 'tooltip',
        loadComponent: () => import('./pages/tooltip/tooltip-showcase.component').then(m => m.TooltipShowcaseComponent),
        title: 'Tooltip — Kobo UI',
      },
      {
        path: 'typography',
        loadComponent: () => import('./pages/typography/typography-showcase.component').then(m => m.TypographyShowcaseComponent),
        title: 'Typography — Kobo UI',
      },

      {
        path: 'aspect-ratio',
        loadComponent: () => import('./pages/aspect-ratio/aspect-ratio-showcase.component').then(m => m.default),
        title: 'Aspect Ratio — Kobo UI',
      },
      {
        path: 'button-group',
        loadComponent: () => import('./pages/button-group/button-group-showcase.component').then(m => m.default),
        title: 'Button Group — Kobo UI',
      },
      {
        path: 'input-group',
        loadComponent: () => import('./pages/input-group/input-group-showcase.component').then(m => m.default),
        title: 'Input Group — Kobo UI',
      },
      {
        path: 'kbd',
        loadComponent: () => import('./pages/kbd/kbd-showcase.component').then(m => m.default),
        title: 'Kbd — Kobo UI',
      },
      {
        path: 'native-select',
        loadComponent: () => import('./pages/native-select/native-select-showcase.component').then(m => m.default),
        title: 'Native Select — Kobo UI',
      },
      {
        path: 'toggle',
        loadComponent: () => import('./pages/toggle/toggle-showcase.component').then(m => m.default),
        title: 'Toggle — Kobo UI',
      },
      {
        path: 'toggle-group',
        loadComponent: () => import('./pages/toggle-group/toggle-group-showcase.component').then(m => m.default),
        title: 'Toggle Group — Kobo UI',
      },
      {
        path: 'empty',
        loadComponent: () => import('./pages/empty/empty-showcase.component').then(m => m.default),
        title: 'Empty — Kobo UI',
      },
      {
        path: 'hover-card',
        loadComponent: () => import('./pages/hover-card/hover-card-showcase.component').then(m => m.default),
        title: 'Hover Card — Kobo UI',
      },
      {
        path: 'context-menu',
        loadComponent: () => import('./pages/context-menu/context-menu-showcase.component').then(m => m.default),
        title: 'Context Menu — Kobo UI',
      },
      {
        path: 'menubar',
        loadComponent: () => import('./pages/menubar/menubar-showcase.component').then(m => m.default),
        title: 'Menubar — Kobo UI',
      },
      {
        path: 'navigation-menu',
        loadComponent: () => import('./pages/navigation-menu/navigation-menu-showcase.component').then(m => m.default),
        title: 'Navigation Menu — Kobo UI',
      },
      {
        path: 'drawer',
        loadComponent: () => import('./pages/drawer/drawer-showcase.component').then(m => m.default),
        title: 'Drawer — Kobo UI',
      },
      {
        path: 'sidebar',
        loadComponent: () => import('./pages/sidebar/sidebar-showcase.component').then(m => m.default),
        title: 'Sidebar — Kobo UI',
      },
      {
        path: 'stepper',
        loadComponent: () => import('./pages/stepper/stepper-showcase.component').then(m => m.default),
        title: 'Stepper — Kobo UI',
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar-showcase.component').then(m => m.default),
        title: 'Calendar — Kobo UI',
      },
      {
        path: 'date-picker',
        loadComponent: () => import('./pages/date-picker/date-picker-showcase.component').then(m => m.default),
        title: 'Date Picker — Kobo UI',
      },
      {
        path: 'combobox',
        loadComponent: () => import('./pages/combobox/combobox-showcase.component').then(m => m.default),
        title: 'Combobox — Kobo UI',
      },
      {
        path: 'command',
        loadComponent: () => import('./pages/command/command-showcase.component').then(m => m.default),
        title: 'Command — Kobo UI',
      },
      {
        path: 'input-otp',
        loadComponent: () => import('./pages/input-otp/input-otp-showcase.component').then(m => m.default),
        title: 'Input Otp — Kobo UI',
      },
      {
        path: 'carousel',
        loadComponent: () => import('./pages/carousel/carousel-showcase.component').then(m => m.default),
        title: 'Carousel — Kobo UI',
      },
      {
        path: 'data-table',
        loadComponent: () => import('./pages/data-table/data-table-showcase.component').then(m => m.default),
        title: 'Data Table — Kobo UI',
      },
      {
        path: 'resizable',
        loadComponent: () => import('./pages/resizable/resizable-showcase.component').then(m => m.default),
        title: 'Resizable — Kobo UI',
      },
      {
        path: 'messaging',
        loadComponent: () => import('./pages/messaging/messaging-showcase.component').then(m => m.default),
        title: 'Messaging — Kobo UI',
      },
      {
        path: 'utilities',
        loadComponent: () => import('./pages/utilities/utilities-showcase.component').then(m => m.default),
        title: 'Utilities — Kobo UI',
      },
      {
        path: 'questionnaire',
        loadComponent: () => import('./pages/questionnaire/questionnaire-showcase.component').then(m => m.default),
        title: 'Questionnaire — Kobo UI',
      },
      {
        path: 'chart',
        loadComponent: () => import('./pages/chart/chart-showcase.component').then(m => m.default),
        title: 'Chart — Kobo UI',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
