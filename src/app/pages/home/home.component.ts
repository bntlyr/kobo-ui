import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';
import { KCard, KCardHeader, KCardTitle, KCardDescription, KCardContent, KCardFooter } from '../../components/ui/card/card.component';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KLabelDirective } from '../../components/ui/label/label.directive';
import { KCheckbox } from '../../components/ui/checkbox/checkbox.component';
import { KSwitch } from '../../components/ui/switch/switch.component';
import { KChartContainer, KBarChart, KLineChart, KAreaChart, KPieChart, type ChartConfig, type ChartDataPoint } from '../../components/ui/chart/chart.component';
import { NavHeaderComponent } from '../../layout/nav-header.component';
import { KToaster, KToastService } from '../../components/ui/toast/toast.service';
import { KDialogService, KDialog, KDialogHeader, KDialogTitle, KDialogDescription, KDialogContent, KDialogFooter, KDialogClose } from '../../components/ui/dialog';
import { KSheetService, KSheet, KSheetHeader, KSheetTitle, KSheetDescription, KSheetContent, KSheetFooter, K_SHEET_CONFIG } from '../../components/ui/sheet';

@Component({
  selector: 'app-home-demo-dialog',
  imports: [KDialog, KDialogHeader, KDialogTitle, KDialogDescription, KDialogFooter, KDialogClose, KButtonDirective],
  template: `
    <k-dialog>
      <k-dialog-header>
        <k-dialog-title>Action Successful</k-dialog-title>
        <k-dialog-description>Your operation was completed successfully.</k-dialog-description>
      </k-dialog-header>
      <k-dialog-footer>
        <button k-button k-dialog-close>Close</button>
      </k-dialog-footer>
    </k-dialog>
  `
})
export class HomeDemoDialogComponent {}

@Component({
  selector: 'app-home-demo-sheet',
  imports: [KSheet, KSheetHeader, KSheetTitle, KSheetDescription, KSheetContent, KSheetFooter, KButtonDirective],
  template: `
    <k-sheet side="right">
      <k-sheet-header>
        <k-sheet-title>Settings Drawer</k-sheet-title>
        <k-sheet-description>Quick access to your preferences.</k-sheet-description>
      </k-sheet-header>
      <k-sheet-content class="mt-4">
        <p class="text-sm text-muted-foreground">Drawer content goes here...</p>
      </k-sheet-content>
      <k-sheet-footer>
        <button k-button variant="outline">Close</button>
      </k-sheet-footer>
    </k-sheet>
  `
})
export class HomeDemoSheetComponent {}

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    KButtonDirective,
    KCard, KCardHeader, KCardTitle, KCardDescription, KCardContent, KCardFooter,
    KInputDirective,
    KLabelDirective,
    KCheckbox,
    KSwitch,
    KChartContainer,
    KBarChart, KLineChart, KAreaChart, KPieChart,
    NavHeaderComponent,
    KToaster,
    KButtonDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <!-- Nav -->
      <app-nav-header />

      <!-- Main Content -->
      <main class="flex-1 flex flex-col items-center px-6">

        <!-- Hero Section -->
        <section class="w-full max-w-5xl pt-32 pb-24 text-center space-y-8 relative">
          <!-- Glow -->
          <div class="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-80 w-full max-w-3xl
                      bg-primary/20 blur-[100px] rounded-full"></div>

          <div class="relative z-10 flex flex-col items-center space-y-6">
            <a routerLink="/introduction" class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-muted/50 border border-border hover:bg-muted transition-colors no-underline">
              <span class="flex h-2 w-2 rounded-full bg-primary"></span>
              Kobo UI v1.0.5 is here
            </a>

            <h1 class="text-5xl sm:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Own your components. <br /> Design without compromise.
            </h1>

            <p class="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Escape the rigid constraints of traditional Angular libraries. Kobo UI provides unstyled, accessible primitives powered by Signals and modern CSS tokens. Copy the code. Own the behavior. Ship faster.
            </p>

            <div class="flex flex-wrap justify-center gap-4 pt-4">
              <a routerLink="/introduction" k-button size="lg">Get Started</a>
              <a routerLink="/button" k-button variant="outline" size="lg">View Components</a>
            </div>
          </div>
        </section>

        <!-- Component Showcase Grid -->
        <section class="w-full max-w-6xl py-20 border-t border-border/40">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

            <!-- Demo 1: Payment Method (Card) -->
            <k-card class="col-span-1 md:col-span-2 lg:col-span-1 shadow-lg shadow-black/5 dark:shadow-black/20">
              <k-card-header>
                <k-card-title>Payment Method</k-card-title>
                <k-card-description>Add a new payment method to your account.</k-card-description>
              </k-card-header>
              <k-card-content class="space-y-4">
                <div class="space-y-2">
                  <label k-label>Name on card</label>
                  <input k-input placeholder="John Doe" />
                </div>
                <div class="space-y-2">
                  <label k-label>Card number</label>
                  <input k-input placeholder="1234 5678 9012 3456" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label k-label>Expires</label>
                    <input k-input placeholder="MM/YY" />
                  </div>
                  <div class="space-y-2">
                    <label k-label>CVC</label>
                    <input k-input placeholder="123" />
                  </div>
                </div>
              </k-card-content>
              <k-card-footer>
                <button k-button class="w-full">Continue</button>
              </k-card-footer>
            </k-card>

            <!-- Demo 2: Authentication / Settings -->
            <div class="col-span-1 space-y-6 flex flex-col">
              <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                <k-card-header>
                  <k-card-title>Two-factor Authentication</k-card-title>
                  <k-card-description>Add an extra layer of security.</k-card-description>
                </k-card-header>
                <k-card-content class="flex items-center justify-between">
                  <span class="text-sm font-medium">Require 2FA</span>
                  <k-switch [checked]="true" />
                </k-card-content>
              </k-card>

              <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                <k-card-header>
                  <k-card-title>Notifications</k-card-title>
                  <k-card-description>Choose what you want to be notified about.</k-card-description>
                </k-card-header>
                <k-card-content class="space-y-5">
                  <div class="flex items-start gap-3">
                    <k-checkbox class="mt-1" />
                    <div class="flex flex-col gap-1">
                      <label k-label class="leading-none">Comments</label>
                      <span class="text-[13px] text-muted-foreground leading-snug">Receive emails when someone comments on your post.</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <k-checkbox [checked]="true" class="mt-1" />
                    <div class="flex flex-col gap-1">
                      <label k-label class="leading-none">Mentions</label>
                      <span class="text-[13px] text-muted-foreground leading-snug">Receive emails when you are mentioned.</span>
                    </div>
                  </div>
                </k-card-content>
              </k-card>
            </div>

            <!-- Demo 3: Create Account -->
            <k-card class="col-span-1 md:col-span-2 lg:col-span-1 shadow-lg shadow-black/5 dark:shadow-black/20">
              <k-card-header>
                <k-card-title>Create an account</k-card-title>
                <k-card-description>Enter your email below to create your account</k-card-description>
              </k-card-header>
              <k-card-content class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <button k-button variant="outline" class="w-full">
                    <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    Github
                  </button>
                  <button k-button variant="outline" class="w-full">
                    <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                    Google
                  </button>
                </div>
                <div class="relative py-2">
                  <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t border-border"></span>
                  </div>
                  <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <label k-label>Email</label>
                  <input k-input type="email" placeholder="m@example.com" />
                </div>
                <div class="space-y-2">
                  <label k-label>Password</label>
                  <input k-input type="password" />
                </div>
              </k-card-content>
              <k-card-footer>
                <button k-button class="w-full">Create account</button>
              </k-card-footer>
            </k-card>

            <!-- Demo 4: Analytics Dashboard (Compact Grid of Charts) -->
            <k-card class="col-span-1 md:col-span-2 lg:col-span-3 shadow-lg shadow-black/5 dark:shadow-black/20">
              <k-card-header>
                <k-card-title>Analytics Overview</k-card-title>
                <k-card-description>A comprehensive view of your platform's metrics.</k-card-description>
              </k-card-header>
              <k-card-content class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <!-- Chart 1: Bar -->
                <div class="space-y-2 border border-border/50 rounded-xl p-3 bg-accent/10">
                  <h4 class="text-sm font-semibold">Visitors</h4>
                  <k-chart-container [config]="chartConfig" class="h-[140px] w-full">
                    <k-bar-chart
                      [data]="chartData"
                      index="month"
                      [categories]="['desktop', 'mobile']"
                      [config]="chartConfig"
                    ></k-bar-chart>
                  </k-chart-container>
                </div>

                <!-- Chart 2: Line -->
                <div class="space-y-2 border border-border/50 rounded-xl p-3 bg-accent/10">
                  <h4 class="text-sm font-semibold">Revenue</h4>
                  <k-chart-container [config]="lineConfig" class="h-[140px] w-full">
                    <k-line-chart
                      [data]="lineData"
                      index="month"
                      [categories]="['revenue', 'expenses']"
                      [config]="lineConfig"
                    ></k-line-chart>
                  </k-chart-container>
                </div>

                <!-- Chart 3: Area -->
                <div class="space-y-2 border border-border/50 rounded-xl p-3 bg-accent/10">
                  <h4 class="text-sm font-semibold">Active Users</h4>
                  <k-chart-container [config]="areaConfig" class="h-[140px] w-full">
                    <k-area-chart
                      [data]="areaData"
                      index="month"
                      [categories]="['users', 'sessions']"
                      [config]="areaConfig"
                    ></k-area-chart>
                  </k-chart-container>
                </div>

                <!-- Chart 4: Pie/Donut -->
                <div class="space-y-2 border border-border/50 rounded-xl p-3 bg-accent/10">
                  <h4 class="text-sm font-semibold">Browser Share</h4>
                  <k-chart-container [config]="pieConfig" class="h-[140px] w-full">
                    <k-pie-chart
                      [data]="pieData"
                      nameKey="browser"
                      valueKey="visitors"
                      [config]="pieConfig"
                      [donut]="true"
                      [size]="140"
                    ></k-pie-chart>
                  </k-chart-container>
                </div>

              </k-card-content>
            </k-card>

            <!-- Demo 5: Interactive Overlays -->
            <k-card class="col-span-1 md:col-span-2 lg:col-span-3 shadow-lg shadow-black/5 dark:shadow-black/20">
              <k-card-header>
                <k-card-title>Interactive Overlays</k-card-title>
                <k-card-description>Programmatic dialogs, sheets, and toast notifications.</k-card-description>
              </k-card-header>
              <k-card-content>
                <div class="flex flex-wrap gap-4">
                  <button k-button (click)="showToast()">Show Toast</button>
                  <button k-button variant="outline" (click)="openDialog()">Open Dialog</button>
                  <button k-button variant="secondary" (click)="openSheet()">Open Sheet</button>
                </div>
              </k-card-content>
            </k-card>

          </div>
        </section>

        <!-- Contributors -->
        <section class="w-full max-w-5xl py-24 border-t border-border/40 text-center space-y-12">
          <div class="space-y-4">
            <h2 class="text-3xl font-bold tracking-tight">Built By The Community</h2>
            <p class="text-lg text-muted-foreground max-w-xl mx-auto">
              Ready to make a difference? Join our amazing contributors and help shape the future of UI development with Angular.
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto px-4">
            <!-- Placeholder avatars -->
            @for (i of avatars; track i) {
              <div class="flex flex-col items-center gap-2 group cursor-pointer">
                <div class="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-muted border border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  <img [src]="'https://api.dicebear.com/7.x/avataaars/svg?seed=' + i" alt="Contributor" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            }
          </div>

          <div class="pt-8">
            <p class="text-sm text-muted-foreground mb-6">
              This project is MIT-licensed and free forever.
            </p>
            <div class="flex justify-center gap-4">
              <a href="https://github.com/bntlyr/kobo-ui" target="_blank" k-button variant="outline" class="gap-2 rounded-full px-6">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                Star on GitHub
              </a>
              <button k-button class="gap-2 rounded-full px-6">
                Sponsor Kobo UI
              </button>
            </div>
          </div>
        </section>
      </main>

      <k-toaster />
    </div>
  `,
})
export class HomePageComponent {
  private readonly toast = inject(KToastService);
  private readonly dialog = inject(KDialogService);
  private readonly sheet = inject(KSheetService);

  readonly avatars = Array.from({ length: 28 }, (_, i) => 'kobo-' + i);

  readonly chartConfig: ChartConfig = {
    desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
    mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
  };

  readonly chartData: ChartDataPoint[] = [
    { month: 'Jan', desktop: 186, mobile: 80 },
    { month: 'Feb', desktop: 305, mobile: 200 },
    { month: 'Mar', desktop: 237, mobile: 120 },
    { month: 'Apr', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'Jun', desktop: 214, mobile: 140 },
  ];

  // ---- Line Chart Data ----
  readonly lineConfig: ChartConfig = {
    revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' },
    expenses: { label: 'Expenses', color: 'hsl(var(--chart-3))' },
  };
  readonly lineData: ChartDataPoint[] = [
    { month: 'Jan', revenue: 4200, expenses: 3100 },
    { month: 'Feb', revenue: 4800, expenses: 3400 },
    { month: 'Mar', revenue: 5100, expenses: 3200 },
    { month: 'Apr', revenue: 4600, expenses: 3600 },
    { month: 'May', revenue: 5800, expenses: 3500 },
    { month: 'Jun', revenue: 6200, expenses: 3800 },
  ];

  // ---- Area Chart Data ----
  readonly areaConfig: ChartConfig = {
    users: { label: 'Active Users', color: 'hsl(var(--chart-1))' },
    sessions: { label: 'Sessions', color: 'hsl(var(--chart-4))' },
  };
  readonly areaData: ChartDataPoint[] = [
    { month: 'Jan', users: 1200, sessions: 3400 },
    { month: 'Feb', users: 1800, sessions: 4200 },
    { month: 'Mar', users: 2400, sessions: 5100 },
    { month: 'Apr', users: 2100, sessions: 4800 },
    { month: 'May', users: 2800, sessions: 5600 },
    { month: 'Jun', users: 3200, sessions: 6100 },
  ];

  // ---- Pie Chart Data ----
  readonly pieConfig: ChartConfig = {
    chrome: { label: 'Chrome', color: 'hsl(var(--chart-1))' },
    safari: { label: 'Safari', color: 'hsl(var(--chart-2))' },
    firefox: { label: 'Firefox', color: 'hsl(var(--chart-3))' },
    edge: { label: 'Edge', color: 'hsl(var(--chart-4))' },
    other: { label: 'Other', color: 'hsl(var(--chart-5))' },
  };
  readonly pieData: ChartDataPoint[] = [
    { browser: 'chrome', visitors: 275 },
    { browser: 'safari', visitors: 200 },
    { browser: 'firefox', visitors: 187 },
    { browser: 'edge', visitors: 173 },
    { browser: 'other', visitors: 90 },
  ];

  showToast(): void {
    this.toast.show({
      title: 'Action triggered',
      description: 'The operation completed successfully.',
    });
  }

  openDialog(): void {
    this.dialog.open(HomeDemoDialogComponent);
  }

  openSheet(): void {
    this.sheet.open(HomeDemoSheetComponent, { side: 'right' });
  }
}
