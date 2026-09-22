import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KTextareaDirective } from '../../components/ui/textarea/textarea.directive';
import { KLabelDirective } from '../../components/ui/label/label.directive';
import { KFormField, KFormError, KFormHint } from '../../components/ui/form-field/index';
import { KCheckbox } from '../../components/ui/checkbox/checkbox.component';
import { KSwitch } from '../../components/ui/switch/switch.component';
import { KRadioGroup, KRadioItem } from '../../components/ui/radio-group/radio-group.component';
import { KSlider } from '../../components/ui/slider/slider.component';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
import { KPasswordInput } from '../../components/ui/password-input/password-input.component';
import { KMultiSelect } from '../../components/ui/multi-select/multi-select.component';
import { KAutocomplete } from '../../components/ui/autocomplete/autocomplete.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const FORM_SOURCE = `// See individual component source files for implementation details.
// All form components support Angular Reactive Forms (formControlName, ngModel).
import { KInputDirective } from './components/ui/input/input.directive';
import { KPasswordInput } from './components/ui/password-input/password-input.component';
import { KMultiSelect } from './components/ui/multi-select/multi-select.component';
import { KAutocomplete } from './components/ui/autocomplete/autocomplete.component';
import { KCheckbox } from './components/ui/checkbox/checkbox.component';
import { KSwitch } from './components/ui/switch/switch.component';
import { KRadioGroup, KRadioItem } from './components/ui/radio-group/radio-group.component';
import { KSlider } from './components/ui/slider/slider.component';`;

const FORM_USAGE = `<form [formGroup]="form">
  <k-form-field [control]="form.get('email')">
    <label k-label for="email">Email address</label>
    <input k-input id="email" type="email" formControlName="email" />
    <k-form-error />
  </k-form-field>

  <k-password-input formControlName="password" placeholder="Enter password" />

  <k-multi-select [options]="fruits" formControlName="tags" [searchable]="true" />

  <k-autocomplete [options]="countries" formControlName="country" />

  <k-checkbox formControlName="terms">I agree</k-checkbox>
  <k-switch formControlName="notifications">Enable</k-switch>
  <k-slider formControlName="volume" [min]="0" [max]="100" />
</form>`;

@Component({
  selector: 'app-forms-showcase',
  imports: [
    ReactiveFormsModule,
    KInputDirective, KTextareaDirective, KLabelDirective,
    KFormField, KFormError, KFormHint,
    KCheckbox, KSwitch,
    KRadioGroup, KRadioItem,
    KSlider, KButtonDirective,
    KSeparatorDirective,
    KPasswordInput, KMultiSelect, KAutocomplete,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>components</span><span>/</span><span class="text-foreground">forms</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Form Components</h1>
        <p class="text-lg text-muted-foreground">
          Input, Password Input, Textarea, Label, Form Field, Checkbox, Switch, Radio Group, Slider,
          Multi Select, and Autocomplete — all Angular Reactive Forms compatible.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4">
            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6 max-w-lg">
              <h3 class="text-lg font-semibold">Account Settings</h3>

              <!-- Email with validation -->
              <k-form-field [control]="form.get('email')">
                <label k-label for="email">Email address</label>
                <input k-input id="email" type="email" formControlName="email"
                       placeholder="you@example.com" />
                <k-form-error />
                <k-form-hint>We'll never share your email with anyone.</k-form-hint>
              </k-form-field>

              <!-- Username -->
              <k-form-field [control]="form.get('username')">
                <label k-label for="username">Username</label>
                <input k-input id="username" type="text" formControlName="username"
                       placeholder="your_handle" />
                <k-form-error />
              </k-form-field>

              <!-- Bio textarea -->
              <k-form-field [control]="form.get('bio')">
                <label k-label for="bio">Bio</label>
                <textarea k-textarea id="bio" formControlName="bio" rows="3"
                          placeholder="Tell us about yourself..."></textarea>
                <k-form-error />
                <k-form-hint>Max 200 characters.</k-form-hint>
              </k-form-field>

              <hr k-separator />

              <!-- Plan selection -->
              <div class="space-y-2">
                <label k-label>Plan</label>
                <k-radio-group formControlName="plan" class="flex flex-col gap-2">
                  <k-radio-item value="starter">Starter — Free</k-radio-item>
                  <k-radio-item value="pro">Pro — $9 / month</k-radio-item>
                  <k-radio-item value="enterprise">Enterprise — Custom pricing</k-radio-item>
                </k-radio-group>
              </div>

              <hr k-separator />

              <!-- Volume slider -->
              <div class="space-y-3">
                <label k-label>Notification volume: {{ form.get('volume')?.value }}%</label>
                <k-slider formControlName="volume" [min]="0" [max]="100" [step]="5" />
              </div>

              <hr k-separator />

              <!-- Toggles -->
              <div class="space-y-3">
                <k-switch formControlName="notifications">Enable push notifications</k-switch>
                <k-checkbox formControlName="newsletter">Subscribe to the newsletter</k-checkbox>
                <k-checkbox formControlName="terms">
                  I agree to the <a href="#" class="text-primary hover:underline">Terms of Service</a>
                </k-checkbox>
              </div>

              <div class="flex gap-3">
                <button k-button type="submit" [disabled]="form.invalid">Save changes</button>
                <button k-button variant="outline" type="reset" (click)="resetForm()">Reset</button>
              </div>

              @if (submitted()) {
                <div class="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-500/30 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                  ✓ Form submitted! Plan: <strong>{{ form.get('plan')?.value }}</strong>
                </div>
              }
            </form>
          </div>
        }
        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <app-code-block [code]="formSource" language="typescript" filename="my-form.component.ts" />
            <app-code-block [code]="formUsage" language="html" filename="my-form.component.html" />
          </div>
        }
      </app-tabs>

      <!-- ============================================ -->
      <!-- VARIANT MATRIX SECTION -->
      <!-- ============================================ -->
      <hr k-separator />
      <h2 class="text-2xl font-bold tracking-tight">Variant Matrix</h2>

      <!-- ---- Input Sizes ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Input — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-3 max-w-md">
          <div class="space-y-1">
            <label k-label class="text-xs text-muted-foreground">size="sm"</label>
            <input k-input size="sm" placeholder="Small input" />
          </div>
          <div class="space-y-1">
            <label k-label class="text-xs text-muted-foreground">size="default"</label>
            <input k-input size="default" placeholder="Default input" />
          </div>
          <div class="space-y-1">
            <label k-label class="text-xs text-muted-foreground">size="lg"</label>
            <input k-input size="lg" placeholder="Large input" />
          </div>
        </div>
      </div>

      <!-- ---- Input Error State ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Input — Error State</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-3 max-w-md">
          <input k-input [error]="true" placeholder="This field has an error" />
          <input k-input [error]="false" placeholder="Normal input" />
        </div>
      </div>

      <!-- ---- Password Input ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Password Input</h3>
        <p class="text-sm text-muted-foreground">Input with a toggle button to show/hide the password.</p>
        <div class="rounded-xl border border-border bg-card p-6 space-y-4 max-w-md">
          <div class="space-y-1">
            <label k-label class="text-xs text-muted-foreground">Default</label>
            <k-password-input placeholder="Enter password" />
          </div>
          <div class="space-y-1">
            <label k-label class="text-xs text-muted-foreground">size="sm"</label>
            <k-password-input size="sm" placeholder="Small password" />
          </div>
          <div class="space-y-1">
            <label k-label class="text-xs text-muted-foreground">size="lg"</label>
            <k-password-input size="lg" placeholder="Large password" />
          </div>
          <div class="space-y-1">
            <label k-label class="text-xs text-muted-foreground">Error state</label>
            <k-password-input [error]="true" placeholder="Password error" />
          </div>
        </div>
      </div>

      <!-- ---- Textarea Sizes & Error ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Textarea — Sizes & Error</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-3 max-w-md">
          <textarea k-textarea size="sm" placeholder="Small textarea (size='sm')"></textarea>
          <textarea k-textarea size="default" placeholder="Default textarea"></textarea>
          <textarea k-textarea size="lg" placeholder="Large textarea (size='lg')"></textarea>
          <textarea k-textarea [error]="true" placeholder="Error textarea"></textarea>
        </div>
      </div>

      <!-- ---- Checkbox Sizes ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Checkbox — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-3">
          <k-checkbox size="sm" [checked]="true">Small checkbox (size="sm")</k-checkbox>
          <k-checkbox size="default" [checked]="true">Default checkbox</k-checkbox>
          <k-checkbox size="lg" [checked]="true">Large checkbox (size="lg")</k-checkbox>
        </div>
      </div>

      <!-- ---- Checkbox Error ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Checkbox — Error State</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-3">
          <k-checkbox [error]="true">Checkbox with error</k-checkbox>
          <k-checkbox [error]="false" [checked]="true">Normal checkbox</k-checkbox>
        </div>
      </div>

      <!-- ---- Radio Group Sizes ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Radio Group — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6">
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="sm"</label>
            <k-radio-group size="sm" class="flex flex-col gap-1.5">
              <k-radio-item value="a">Option A</k-radio-item>
              <k-radio-item value="b">Option B</k-radio-item>
            </k-radio-group>
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="default"</label>
            <k-radio-group size="default" class="flex flex-col gap-2">
              <k-radio-item value="a">Option A</k-radio-item>
              <k-radio-item value="b">Option B</k-radio-item>
            </k-radio-group>
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="lg"</label>
            <k-radio-group size="lg" class="flex flex-col gap-2.5">
              <k-radio-item value="a">Option A</k-radio-item>
              <k-radio-item value="b">Option B</k-radio-item>
            </k-radio-group>
          </div>
        </div>
      </div>

      <!-- ---- Slider Sizes ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Slider — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6 max-w-md">
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="sm" — value: {{ sliderSmVal() }}</label>
            <k-slider size="sm" [min]="0" [max]="100" [(value)]="sliderSmVal" />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="default" — value: {{ sliderDefVal() }}</label>
            <k-slider size="default" [min]="0" [max]="100" [(value)]="sliderDefVal" />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="lg" — value: {{ sliderLgVal() }}</label>
            <k-slider size="lg" [min]="0" [max]="100" [(value)]="sliderLgVal" />
          </div>
        </div>
      </div>

      <!-- ---- Multi Select ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Multi Select</h3>
        <p class="text-sm text-muted-foreground">A multi-value select with chip tags. Supports searchable filtering.</p>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6 max-w-md">
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">Default</label>
            <k-multi-select [options]="fruitOptions" placeholder="Select fruits..." />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">Searchable</label>
            <k-multi-select [options]="fruitOptions" [searchable]="true" placeholder="Search & select..." />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="sm"</label>
            <k-multi-select [options]="fruitOptions" size="sm" placeholder="Small" />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="lg"</label>
            <k-multi-select [options]="fruitOptions" size="lg" placeholder="Large" />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">Error state</label>
            <k-multi-select [options]="fruitOptions" [error]="true" placeholder="With error" />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">Max 2 items</label>
            <k-multi-select [options]="fruitOptions" [maxItems]="2" placeholder="Pick up to 2..." />
          </div>
        </div>
      </div>

      <!-- ---- Autocomplete ---- -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Autocomplete</h3>
        <p class="text-sm text-muted-foreground">A searchable text input with suggestions dropdown. Supports keyboard navigation.</p>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6 max-w-md">
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">Default</label>
            <k-autocomplete [options]="countryOptions" placeholder="Search country..." />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="sm"</label>
            <k-autocomplete [options]="countryOptions" size="sm" placeholder="Small autocomplete" />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">size="lg"</label>
            <k-autocomplete [options]="countryOptions" size="lg" placeholder="Large autocomplete" />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">Free text mode</label>
            <k-autocomplete [options]="countryOptions" [freeText]="true" placeholder="Type anything..." />
          </div>
          <div class="space-y-2">
            <label k-label class="text-xs text-muted-foreground">Error state</label>
            <k-autocomplete [options]="countryOptions" [error]="true" placeholder="With error" />
          </div>
        </div>
      </div>

      <!-- API Table -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Components</h2>
        <div class="rounded-xl border border-border overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-muted/50">
              <tr>
                <th class="text-left px-4 py-3 font-semibold">Component</th>
                <th class="text-left px-4 py-3 font-semibold">Selector</th>
                <th class="text-left px-4 py-3 font-semibold">CVA</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              @for (c of components; track c.name) {
                <tr class="hover:bg-muted/30">
                  <td class="px-4 py-3 font-mono text-primary text-xs">{{ c.name }}</td>
                  <td class="px-4 py-3 font-mono text-xs text-muted-foreground">{{ c.selector }}</td>
                  <td class="px-4 py-3 text-xs">
                    <span [class]="c.cva ? 'text-green-500' : 'text-muted-foreground'">
                      {{ c.cva ? '✓ Yes' : '—' }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class FormsShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly activeTab = signal('preview');
  readonly submitted = signal(false);
  readonly formSource = FORM_SOURCE;
  readonly formUsage  = FORM_USAGE;

  // Slider demo signals
  readonly sliderSmVal  = signal(30);
  readonly sliderDefVal = signal(50);
  readonly sliderLgVal  = signal(70);

  readonly form = new FormGroup({
    email:         new FormControl('', [Validators.required, Validators.email]),
    username:      new FormControl('', [Validators.required, Validators.minLength(3)]),
    bio:           new FormControl('', [Validators.maxLength(200)]),
    plan:          new FormControl('pro'),
    volume:        new FormControl(60),
    notifications: new FormControl(true),
    newsletter:    new FormControl(false),
    terms:         new FormControl(false),
  });

  onSubmit(): void {
    if (this.form.valid) this.submitted.set(true);
    else this.form.markAllAsTouched();
  }

  resetForm(): void {
    this.form.reset({ plan: 'pro', volume: 60, notifications: true });
    this.submitted.set(false);
  }

  readonly fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
  ];

  readonly countryOptions = [
    { value: 'us', label: 'United States', description: 'North America' },
    { value: 'uk', label: 'United Kingdom', description: 'Europe' },
    { value: 'ca', label: 'Canada', description: 'North America' },
    { value: 'au', label: 'Australia', description: 'Oceania' },
    { value: 'de', label: 'Germany', description: 'Europe' },
    { value: 'fr', label: 'France', description: 'Europe' },
    { value: 'jp', label: 'Japan', description: 'Asia' },
    { value: 'kr', label: 'South Korea', description: 'Asia' },
    { value: 'br', label: 'Brazil', description: 'South America' },
    { value: 'in', label: 'India', description: 'Asia' },
    { value: 'ph', label: 'Philippines', description: 'Asia' },
    { value: 'sg', label: 'Singapore', description: 'Asia' },
  ];

  readonly components = [
    { name: 'KInputDirective',   selector: 'input[k-input]',    cva: true  },
    { name: 'KPasswordInput',    selector: 'k-password-input',  cva: true  },
    { name: 'KTextareaDirective',selector: 'textarea[k-textarea]', cva: true },
    { name: 'KLabelDirective',   selector: 'label[k-label]',    cva: false },
    { name: 'KFormField',        selector: 'k-form-field',      cva: false },
    { name: 'KCheckbox',         selector: 'k-checkbox',        cva: true  },
    { name: 'KSwitch',           selector: 'k-switch',          cva: true  },
    { name: 'KRadioGroup',       selector: 'k-radio-group',     cva: true  },
    { name: 'KSlider',           selector: 'k-slider',          cva: true  },
    { name: 'KMultiSelect',      selector: 'k-multi-select',    cva: true  },
    { name: 'KAutocomplete',     selector: 'k-autocomplete',    cva: true  },
  ];
}
