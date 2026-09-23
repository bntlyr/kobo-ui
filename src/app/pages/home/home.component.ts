import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { KBadgeDirective } from '../../components/ui/badge/badge.directive';
import { KCard, KCardHeader, KCardTitle, KCardDescription, KCardContent, KCardFooter } from '../../components/ui/card/card.component';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KLabelDirective } from '../../components/ui/label/label.directive';
import { KCheckbox } from '../../components/ui/checkbox/checkbox.component';
import { KSwitch } from '../../components/ui/switch/switch.component';
import { KChartContainer, KBarChart, KLineChart, KAreaChart, type ChartConfig, type ChartDataPoint } from '../../components/ui/chart/chart.component';
import { NavHeaderComponent } from '../../layout/nav-header.component';
import { KToaster, KToastService } from '../../components/ui/toast/toast.service';
import { KDialogService, KDialog, KDialogHeader, KDialogTitle, KDialogDescription, KDialogContent, KDialogFooter, KDialogClose } from '../../components/ui/dialog';
import { KSheetService, KSheet, KSheetHeader, KSheetTitle, KSheetDescription, KSheetContent, KSheetFooter, K_SHEET_CONFIG } from '../../components/ui/sheet';
import { LucideMail, LucideBriefcase, LucideHeart, LucideLayoutDashboard, LucideCalendarDays, LucideSettings, LucidePlus, LucideSearch, LucideBell, LucideUser, LucideLogOut, LucideChevronLeft, LucideChevronRight, LucideActivity, LucideBarChart3, LucideUsers, LucideShoppingCart, LucidePackage, LucideMegaphone, LucideFileText, LucideChevronDown, LucideArrowUpRight, LucideLifeBuoy, LucideBox, LucideRefreshCw, LucideArrowUp, LucideCheckCircle2, LucideStar, LucideMinus, LucideAtSign, LucidePaperclip, LucideGlobe, LucideMoreHorizontal, LucideArrowRight, LucideBot, LucideInfo } from '@lucide/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KSidebarProvider, KSidebar, KSidebarHeader, KSidebarContent, KSidebarFooter, KSidebarMenu, KSidebarMenuItem, KSidebarMenuButton } from '../../components/ui/sidebar';
import { KCalendar } from '../../components/ui/calendar';
import { KFullCalendar } from '../../components/ui/full-calendar';
import { KAvatar, KAvatarImage, KAvatarFallback } from '../../components/ui/avatar/avatar.component';
import { KScrollArea } from '../../components/ui/scroll-area';
import { KButtonGroup } from '../../components/ui/button-group/button-group.component';
import { KSpinner } from '../../components/ui/spinner/spinner.component';
import { KSlider } from '../../components/ui/slider/slider.component';
import { KRadioGroup, KRadioItem } from '../../components/ui/radio-group/radio-group.component';
import { KSelect, KSelectContent, KSelectItem } from '../../components/ui/select/select.component';
import { KTextareaDirective } from '../../components/ui/textarea/textarea.directive';


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
  selector: 'app-sponsor-dialog',
  imports: [KDialog, KDialogHeader, KDialogTitle, KDialogDescription, KDialogContent, KDialogFooter, KDialogClose, KButtonDirective, LucideMail, LucideBriefcase, LucideHeart],
  template: `
    <k-dialog>
      <k-dialog-header>
        <k-dialog-title>Sponsor Kobo UI</k-dialog-title>
        <k-dialog-description>Feel free to contact me for sponsorship opportunities.</k-dialog-description>
      </k-dialog-header>
      <k-dialog-content>
        <div class="space-y-4">
          <p class="text-sm text-muted-foreground">Thank you for considering sponsoring Kobo UI. This project is free for life, since it is open-source. Your support helps maintain and improve the library!</p>
          <div class="flex flex-col gap-3 mt-4">
            <a href="mailto:rafabently01@gmail.com" class="flex items-center gap-2 text-sm font-medium hover:underline text-primary">
              <svg lucideMail class="w-4 h-4"></svg> Email Me
            </a>
            <a href="https://www.linkedin.com/in/bently-rafa-848a9931b/" target="_blank" class="flex items-center gap-2 text-sm font-medium hover:underline text-primary">
              <svg lucideBriefcase class="w-4 h-4"></svg> LinkedIn Profile
            </a>
            <a href="https://github.com/sponsors/bntlyr" target="_blank" class="flex items-center gap-2 text-sm font-medium hover:underline text-primary">
              <svg lucideHeart class="w-4 h-4"></svg> GitHub Sponsors
            </a>
          </div>
        </div>
      </k-dialog-content>
      <k-dialog-footer>
        <button k-button variant="outline" k-dialog-close>Close</button>
      </k-dialog-footer>
    </k-dialog>
  `
})
export class SponsorDialogComponent {}

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
  imports: [KFullCalendar,
    RouterLink,
    KButtonDirective,
    KCard, KCardHeader, KCardTitle, KCardDescription, KCardContent,
    KInputDirective,
    KLabelDirective,
    KCheckbox,
    KSwitch,
    KChartContainer,
    KBarChart, KLineChart, KAreaChart,
    NavHeaderComponent,
    KToaster,
    ReactiveFormsModule,
    KTabs, KTabList, KTabTrigger, KTabContent,
    KSidebarProvider, KSidebar, KSidebarHeader, KSidebarContent, KSidebarFooter, KSidebarMenu, KSidebarMenuItem, KSidebarMenuButton,
    KBadgeDirective,
    KAvatar, KAvatarImage, KAvatarFallback,
    KScrollArea,
    LucideLayoutDashboard, LucideCalendarDays, LucidePlus, LucideSearch, LucideBell, LucideUser, LucideActivity,
    LucideBarChart3, LucideUsers, LucideShoppingCart, LucidePackage, LucideMegaphone, LucideFileText, LucideSettings, LucideChevronDown, LucideArrowUpRight, LucideLifeBuoy, LucideBox
  , KButtonGroup, KSpinner, KSlider, KRadioGroup, KRadioItem, KSelect, KSelectContent, KSelectItem, KTextareaDirective, LucideRefreshCw, LucideArrowUp, LucideCheckCircle2, LucideStar, LucideMinus, LucideAtSign, LucidePaperclip, LucideGlobe, LucideMoreHorizontal, LucideArrowRight, LucideBot, LucideInfo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-foreground flex flex-col pt-14 overflow-x-hidden">
      <!-- Nav -->
      <div class="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <app-nav-header />
      </div>

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
              Kobo UI v1.0.9 is here
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

        <!-- Component Showcase Tabs -->
        <section class="w-full max-w-[1400px] px-4 md:px-8 py-20 border-t border-border/40 mx-auto">
          <k-tabs [(value)]="activeShowcaseTab">
            <div class="flex flex-col sm:flex-row items-center justify-between mb-8 px-4 gap-4">
              <div class="space-y-1 text-center sm:text-left">
                <h2 class="text-3xl font-bold tracking-tight">Beautifully Crafted</h2>
                <p class="text-muted-foreground">Check out some examples built with Kobo UI.</p>
              </div>
              <k-tab-list class="grid w-full max-w-md grid-cols-3">
                <k-tab-trigger value="examples">Examples</k-tab-trigger>
                <k-tab-trigger value="dashboard">Dashboard</k-tab-trigger>
                <k-tab-trigger value="calendar">Calendar</k-tab-trigger>
              </k-tab-list>
            </div>

            <!-- Examples Tab (Bento Grid) -->
            <!-- Examples Tab (Bento Grid) -->
            <k-tab-content value="examples" class="mt-0">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start text-left">

                <!-- COLUMN 1 -->
                <div class="space-y-6 flex flex-col">
                  <!-- Payment Method -->
                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                    <k-card-header class="pb-3">
                      <k-card-title>Payment Method</k-card-title>
                      <k-card-description>All transactions are secure and encrypted</k-card-description>
                    </k-card-header>
                    <k-card-content class="space-y-4">
                      <div class="space-y-2">
                        <label k-label>Name on card</label>
                        <input k-input placeholder="John Doe" />
                      </div>
                      <div class="grid grid-cols-3 gap-4">
                        <div class="space-y-2 col-span-2">
                          <label k-label>Card number</label>
                          <input k-input placeholder="1234 1234 1234 1234" />
                        </div>
                        <div class="space-y-2 col-span-1">
                          <label k-label>CVV</label>
                          <input k-input placeholder="123" />
                        </div>
                      </div>
                      <p class="text-[13px] text-muted-foreground">Enter your 16-digit card number.</p>

                      <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                          <label k-label>Month</label>
                          <k-select placeholder="MM">
                            <k-select-content>
                              <k-select-item value="01">01 - January</k-select-item>
                            </k-select-content>
                          </k-select>
                        </div>
                        <div class="space-y-2">
                          <label k-label>Year</label>
                          <k-select placeholder="YYYY">
                            <k-select-content>
                              <k-select-item value="2024">2024</k-select-item>
                            </k-select-content>
                          </k-select>
                        </div>
                      </div>
                    </k-card-content>
                  </k-card>

                  <!-- Billing Address -->
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-medium text-sm">Billing Address</h4>
                      <p class="text-[13px] text-muted-foreground">The billing address associated with your payment method</p>
                    </div>
                    <k-checkbox [checked]="true">
                      <span class="font-medium text-sm">Same as shipping address.</span>
                    </k-checkbox>
                  </div>

                  <div class="space-y-2">
                    <label k-label>Comments</label>
                    <textarea k-textarea placeholder="Special instructions..."></textarea>
                  </div>

                  <div class="flex items-center gap-2">
                    <button k-button>Submit</button>
                    <button k-button variant="outline">Cancel</button>
                  </div>
                </div>

                <!-- COLUMN 2 -->
                <div class="space-y-6 flex flex-col">
                  <!-- Team Members -->
                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20 border-dashed border-2 bg-transparent text-center p-8">
                    <div class="flex justify-center -space-x-2 mb-4">
                      <k-avatar class="border-2 border-background"><k-avatar-image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" /></k-avatar>
                      <k-avatar class="border-2 border-background"><k-avatar-image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" /></k-avatar>
                      <k-avatar class="border-2 border-background"><k-avatar-image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" /></k-avatar>
                    </div>
                    <h3 class="font-semibold mb-2">No Team Members</h3>
                    <p class="text-sm text-muted-foreground mb-4">Invite your team to collaborate on this project.</p>
                    <button k-button variant="outline" size="sm" class="mx-auto rounded-full px-4"><svg lucidePlus class="h-4 w-4 mr-2"></svg> Invite Members</button>
                  </k-card>

                  <!-- Syncing Pills -->
                  <div class="flex items-center gap-2">
                    <span k-badge variant="outline" class="rounded-full px-3 py-1"><k-spinner size="sm" class="mr-2 h-3 w-3 inline" /> Loading</span>
                    <span k-badge variant="outline" class="rounded-full px-3 py-1"><svg lucideRefreshCw class="mr-2 h-3 w-3 inline"></svg> Syncing</span>
                    <span k-badge variant="outline" class="rounded-full px-3 py-1"><svg lucideActivity class="mr-2 h-3 w-3 inline"></svg> Updating</span>
                  </div>

                  <!-- Price Range -->
                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                    <k-card-content class="pt-6 space-y-4">
                      <div class="space-y-1">
                        <label k-label>Price Range</label>
                        <p class="text-[13px] text-muted-foreground">Set your budget range ($0 - 500).</p>
                      </div>
                      <k-slider [value]="150" [max]="500" />
                    </k-card-content>
                  </k-card>

                  <!-- Search Inputs -->
                  <div class="relative">
                    <svg lucideSearch class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                    <input k-input class="pl-9 pr-20" placeholder="Search..." />
                    <span class="absolute right-3 top-2.5 text-xs text-muted-foreground">12 results</span>
                  </div>

                  <div class="relative">
                    <span class="absolute left-3 top-2.5 text-sm text-muted-foreground">https://</span>
                    <input k-input class="pl-16 pr-9" placeholder="example.com" />
                    <svg lucideInfo class="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                  </div>

                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                    <k-card-content class="p-4 space-y-4">
                      <textarea k-textarea placeholder="Ask, Search or Chat..." class="border-0 bg-transparent resize-none p-0 focus-visible:ring-0 shadow-none text-base" rows="3"></textarea>
                      <div class="flex items-center justify-between border-t border-border pt-3">
                        <button k-button variant="secondary" size="icon-sm" class="rounded-full h-7 w-7"><svg lucidePlus class="h-3 w-3"></svg></button>
                        <div class="flex items-center gap-2">
                          <span class="text-xs text-muted-foreground">52% used</span>
                          <button k-button size="icon-sm" class="rounded-full h-7 w-7"><svg lucideArrowUp class="h-3 w-3"></svg></button>
                        </div>
                      </div>
                    </k-card-content>
                  </k-card>

                  <div class="relative">
                    <input k-input value="@kobui" class="pr-9 font-medium" readonly />
                    <svg lucideCheckCircle2 class="absolute right-3 top-2.5 h-4 w-4 text-primary"></svg>
                  </div>
                </div>

                <!-- COLUMN 3 -->
                <div class="space-y-6 flex flex-col">
                  <div class="relative">
                    <svg lucideInfo class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                    <input k-input class="pl-9 pr-9" value="https://" readonly />
                    <svg lucideStar class="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                  </div>

                  <!-- Two factor -->
                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                    <k-card-content class="p-4 flex items-center justify-between gap-4">
                      <div class="space-y-1">
                        <h4 class="text-sm font-medium leading-none">Two-factor authentication</h4>
                        <p class="text-[13px] text-muted-foreground">Verify via email or phone number.</p>
                      </div>
                      <button k-button variant="secondary" size="sm">Enable</button>
                    </k-card-content>
                  </k-card>

                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                    <k-card-content class="p-4 flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <svg lucideCheckCircle2 class="h-4 w-4 text-muted-foreground"></svg>
                        <span class="text-sm font-medium">Your profile has been verified.</span>
                      </div>
                      <svg lucideChevronRight class="h-4 w-4 text-muted-foreground"></svg>
                    </k-card-content>
                  </k-card>

                  <div class="relative py-2">
                    <div class="absolute inset-0 flex items-center"><span class="w-full border-t border-border"></span></div>
                    <div class="relative flex justify-center text-xs text-muted-foreground"><span class="bg-background px-2">Appearance Settings</span></div>
                  </div>

                  <div class="space-y-4">
                    <div class="space-y-1">
                      <h4 class="text-sm font-medium">Compute Environment</h4>
                      <p class="text-[13px] text-muted-foreground">Select the compute environment for your cluster.</p>
                    </div>

                    <k-radio-group>
                      <label class="flex items-start justify-between border border-border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors [&:has([data-state=checked])]:border-primary">
                        <div class="space-y-1">
                          <h4 class="text-sm font-medium">Kubernetes</h4>
                          <p class="text-[13px] text-muted-foreground">Run GPU workloads on a K8s configured cluster.</p>
                        </div>
                        <k-radio-item value="kubernetes" class="mt-1" />
                      </label>

                      <label class="flex items-start justify-between border border-border rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors mt-3">
                        <div class="space-y-1">
                          <h4 class="text-sm font-medium">Virtual Machine</h4>
                          <p class="text-[13px] text-muted-foreground">Access a VM configured cluster to run GPU workloads.</p>
                        </div>
                        <k-radio-item value="vm" class="mt-1" />
                      </label>
                    </k-radio-group>
                  </div>

                  <div class="flex items-center justify-between pt-2">
                    <div class="space-y-1">
                      <h4 class="text-sm font-medium">Number of GPUs</h4>
                      <p class="text-[13px] text-muted-foreground">You can add more later.</p>
                    </div>
                    <div class="flex items-center border border-border rounded-md">
                      <span class="px-3 text-sm font-medium border-r border-border">8</span>
                      <button class="h-8 w-8 flex items-center justify-center hover:bg-accent border-r border-border"><svg lucideMinus class="h-3 w-3"></svg></button>
                      <button class="h-8 w-8 flex items-center justify-center hover:bg-accent"><svg lucidePlus class="h-3 w-3"></svg></button>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-2">
                    <div class="space-y-1">
                      <h4 class="text-sm font-medium">Wallpaper Tinting</h4>
                      <p class="text-[13px] text-muted-foreground">Allow the wallpaper to be tinted.</p>
                    </div>
                    <k-switch [checked]="true" />
                  </div>
                </div>

                <!-- COLUMN 4 -->
                <div class="space-y-6 flex flex-col">
                  <!-- Mention Card -->
                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                    <k-card-content class="p-4 space-y-4">
                      <div k-badge variant="secondary" class="rounded-full px-3 py-1 font-normal"><svg lucideAtSign class="h-3 w-3 mr-1 inline"></svg> Add mention</div>
                      <p class="text-sm text-muted-foreground">Ask, Search or make anything...</p>
                      <div class="flex items-center justify-between pt-8">
                        <div class="flex items-center gap-3">
                          <button class="text-xs font-medium text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"><svg lucidePaperclip class="h-3 w-3"></svg> Auto</button>
                          <button class="text-xs font-medium text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"><svg lucideGlobe class="h-3 w-3"></svg> All Sources</button>
                        </div>
                        <button k-button variant="secondary" size="icon-sm" class="rounded-full h-8 w-8"><svg lucideArrowUp class="h-4 w-4 text-foreground"></svg></button>
                      </div>
                    </k-card-content>
                  </k-card>

                  <!-- Small Action Bar -->
                  <div class="flex items-center gap-2">
                    <button k-button variant="outline" size="icon-sm"><svg lucideArrowLeft class="h-4 w-4"></svg></button>
                    <k-button-group>
                      <button k-button variant="outline" size="sm" class="px-3">Archive</button>
                      <button k-button variant="outline" size="sm" class="px-3">Report</button>
                      <button k-button variant="outline" size="sm" class="px-3">Snooze</button>
                      <button k-button variant="outline" size="sm" class="px-2"><svg lucideMoreHorizontal class="h-4 w-4"></svg></button>
                    </k-button-group>
                  </div>

                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20 py-1">
                    <k-card-content class="p-3">
                      <k-checkbox [checked]="true">
                        <span class="font-medium text-sm">I agree to the terms and conditions</span>
                      </k-checkbox>
                    </k-card-content>
                  </k-card>

                  <div class="flex items-center justify-between">
                    <k-button-group>
                      <button k-button variant="outline" size="sm" class="w-8">1</button>
                      <button k-button variant="outline" size="sm" class="w-8">2</button>
                      <button k-button variant="outline" size="sm" class="w-8">3</button>
                    </k-button-group>

                    <k-button-group>
                      <button k-button variant="outline" size="sm" class="px-2"><svg lucideArrowLeft class="h-4 w-4"></svg></button>
                      <button k-button variant="outline" size="sm" class="px-2"><svg lucideArrowRight class="h-4 w-4"></svg></button>
                    </k-button-group>

                    <button k-button variant="outline" size="sm" class="rounded-md">
                      <svg lucideBot class="mr-2 h-4 w-4"></svg> Copilot <svg lucideChevronDown class="ml-2 h-3 w-3"></svg>
                    </button>
                  </div>

                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20">
                    <k-card-header class="pb-3">
                      <k-card-title class="text-base">How did you hear about us?</k-card-title>
                      <k-card-description>Select the option that best describes how...</k-card-description>
                    </k-card-header>
                    <k-card-content>
                      <div class="flex flex-wrap gap-2">
                        <button k-button variant="secondary" size="sm" class="rounded-full h-8"><svg lucideCheckCircle2 class="mr-1.5 h-4 w-4 text-foreground"></svg> Social Media</button>
                        <button k-button variant="outline" size="sm" class="rounded-full h-8 text-muted-foreground border-border/50">Search Engine</button>
                        <button k-button variant="outline" size="sm" class="rounded-full h-8 text-muted-foreground border-border/50">Referral</button>
                        <button k-button variant="outline" size="sm" class="rounded-full h-8 text-muted-foreground border-border/50">Other</button>
                      </div>
                    </k-card-content>
                  </k-card>

                  <k-card class="shadow-lg shadow-black/5 dark:shadow-black/20 border-dashed border-2 bg-transparent text-center p-8">
                    <k-spinner class="mx-auto mb-4 text-muted-foreground" />
                    <h3 class="font-semibold text-sm mb-2">Processing your request</h3>
                    <p class="text-[13px] text-muted-foreground mb-4">Please wait while we process your request. Do not refresh the page.</p>
                    <button k-button variant="outline" size="sm" class="mx-auto rounded-full px-4">Cancel</button>
                  </k-card>

                </div>

              </div>
            </k-tab-content>

            <!-- Dashboard Tab (App Frame Mockup) -->
            <k-tab-content value="dashboard" class="mt-0">
              <div class="rounded-xl border border-border bg-background shadow-lg overflow-hidden relative h-[650px] w-full text-left">
                <div class="absolute top-0 left-0 flex w-[133.33%] h-[133.33%] origin-top-left scale-75">
                <!-- Sidebar -->
                <k-sidebar-provider>
                  <k-sidebar collapsible="icon" class="border-r border-border bg-background">
                    <k-sidebar-header class="h-16 border-b border-border flex flex-row items-center px-2 group-data-[collapsible=icon]:px-0 font-semibold shrink-0">
                      <div class="flex items-center gap-2.5 w-full group-data-[collapsible=icon]:justify-center">
                        <div class="h-7 w-7 bg-primary rounded-md flex items-center justify-center shadow-sm group-data-[collapsible=icon]:mx-auto">
                          <svg lucideLayoutDashboard class="h-4 w-4 text-primary-foreground"></svg>
                        </div>
                        <span class="text-base font-bold tracking-tight leading-none mt-0.5 group-data-[collapsible=icon]:hidden">Beautifully Crafted</span>
                      </div>
                    </k-sidebar-header>
                    <k-sidebar-content class="p-3">
                      <k-sidebar-menu>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton [isActive]="true">
                            <svg lucideLayoutDashboard></svg> <span>Dashboard</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideBarChart3></svg> <span>Analytics</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideUsers></svg> <span>Visitors</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideShoppingCart></svg> <span>Sales</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucidePackage></svg> <span>Products</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideMegaphone></svg> <span>Marketing</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideFileText></svg> <span>Reports</span>
                          </button>
                        </k-sidebar-menu-item>
                        <k-sidebar-menu-item>
                          <button kSidebarMenuButton>
                            <svg lucideSettings></svg> <span>Settings</span>
                          </button>
                        </k-sidebar-menu-item>
                      </k-sidebar-menu>
                    </k-sidebar-content>
                    <k-sidebar-footer class="p-4 pt-0">
                      <k-card class="bg-primary/5 border-primary/10 shadow-none relative overflow-hidden">
                        <div class="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <k-card-content class="p-4">
                          <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                            <svg lucideArrowUpRight class="w-4 h-4 text-primary"></svg>
                          </div>
                          <h4 class="font-semibold text-sm mb-1">Upgrade to Pro</h4>
                          <p class="text-xs text-muted-foreground mb-3">Unlock more features and grow your business.</p>
                          <button k-button class="w-full h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">Upgrade</button>
                        </k-card-content>
                      </k-card>
                    </k-sidebar-footer>
                  </k-sidebar>

                  <!-- Main Content -->
                  <div class="flex-1 flex flex-col bg-muted/10 overflow-hidden">
                    <header class="h-16 border-b border-border flex items-center justify-between px-6 bg-background shrink-0">
                      <div class="flex items-center gap-4">
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="relative w-64 hidden sm:block">
                          <svg lucideSearch class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"></svg>
                          <input k-input class="pl-9 h-9 bg-muted/50 border-transparent focus-visible:border-border" placeholder="Search anything..." />
                          <div class="absolute right-2 top-2 text-[10px] bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground font-mono">⌘ K</div>
                        </div>
                        <button k-button variant="ghost" size="icon" class="rounded-full relative">
                          <svg lucideBell class="h-5 w-5 text-muted-foreground"></svg>
                          <span class="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
                        </button>
                        <div class="flex items-center gap-2 pl-2 border-l border-border/50">
                          <k-avatar class="h-8 w-8">
                            <k-avatar-image src="https://github.com/shadcn.png" alt="Avatar"></k-avatar-image>
                            <k-avatar-fallback>JD</k-avatar-fallback>
                          </k-avatar>
                          <span class="text-sm font-medium hidden md:block leading-none mt-[1px]">John Doe</span>
                          <svg lucideChevronDown class="w-4 h-4 text-muted-foreground hidden md:block"></svg>
                        </div>
                      </div>
                    </header>
                    <k-scroll-area class="flex-1 p-6">

                      <!-- Header Row -->
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div>
                          <p class="text-sm text-muted-foreground">Good morning, John <span class="wave">👋</span></p>
                          <h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
                          <p class="text-sm text-muted-foreground mt-1">Here's what's happening with your store today.</p>
                        </div>
                        <button k-button variant="outline" class="h-9 bg-background">
                          <svg lucideCalendarDays class="mr-2 h-4 w-4 text-muted-foreground"></svg> Sep 16, 2025 <svg lucideChevronDown class="ml-2 h-4 w-4 text-muted-foreground"></svg>
                        </button>
                      </div>

                      <div class="grid grid-cols-12 gap-6">
                        <!-- Main Left Column -->
                        <div class="col-span-12 lg:col-span-9 space-y-6">

                          <!-- Stat Cards -->
                          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            <k-card class="shadow-sm">
                              <k-card-content class="p-5 flex flex-col justify-between h-full space-y-4">
                                <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <span class="text-blue-500 text-sm font-bold">$</span>
                                  </div>
                                  <span class="text-sm font-medium text-muted-foreground">Total Revenue</span>
                                </div>
                                <div>
                                  <div class="text-2xl font-bold">$45,231.89</div>
                                  <div class="flex items-center text-xs mt-1 text-green-500 font-medium">
                                    <svg lucideArrowUpRight class="w-3 h-3 mr-1"></svg> 12.5% <span class="text-muted-foreground ml-1 font-normal">from last month</span>
                                  </div>
                                </div>
                              </k-card-content>
                            </k-card>

                            <k-card class="shadow-sm">
                              <k-card-content class="p-5 flex flex-col justify-between h-full space-y-4">
                                <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                    <svg lucideUsers class="w-4 h-4 text-indigo-500"></svg>
                                  </div>
                                  <span class="text-sm font-medium text-muted-foreground">Subscriptions</span>
                                </div>
                                <div>
                                  <div class="text-2xl font-bold">+2,350</div>
                                  <div class="flex items-center text-xs mt-1 text-green-500 font-medium">
                                    <svg lucideArrowUpRight class="w-3 h-3 mr-1"></svg> 18.3% <span class="text-muted-foreground ml-1 font-normal">from last month</span>
                                  </div>
                                </div>
                              </k-card-content>
                            </k-card>

                            <k-card class="shadow-sm">
                              <k-card-content class="p-5 flex flex-col justify-between h-full space-y-4">
                                <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center">
                                    <svg lucideShoppingCart class="w-4 h-4 text-sky-500"></svg>
                                  </div>
                                  <span class="text-sm font-medium text-muted-foreground">Sales</span>
                                </div>
                                <div>
                                  <div class="text-2xl font-bold">+12,234</div>
                                  <div class="flex items-center text-xs mt-1 text-green-500 font-medium">
                                    <svg lucideArrowUpRight class="w-3 h-3 mr-1"></svg> 9.8% <span class="text-muted-foreground ml-1 font-normal">from last month</span>
                                  </div>
                                </div>
                              </k-card-content>
                            </k-card>

                            <k-card class="shadow-sm">
                              <k-card-content class="p-5 flex flex-col justify-between h-full space-y-4">
                                <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <svg lucideActivity class="w-4 h-4 text-emerald-500"></svg>
                                  </div>
                                  <span class="text-sm font-medium text-muted-foreground">Active Now</span>
                                </div>
                                <div>
                                  <div class="text-2xl font-bold">+573</div>
                                  <div class="flex items-center text-xs mt-1 text-green-500 font-medium">
                                    <svg lucideArrowUpRight class="w-3 h-3 mr-1"></svg> 21.4% <span class="text-muted-foreground ml-1 font-normal">from last hour</span>
                                  </div>
                                </div>
                              </k-card-content>
                            </k-card>
                          </div>

                          <!-- Middle Row: Overview & Recent Sales -->
                          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <k-card class="xl:col-span-2 shadow-sm">
                              <k-card-header class="pb-2">
                                <div class="flex items-center justify-between">
                                  <div>
                                    <k-card-title>Overview</k-card-title>
                                    <k-card-description>Monthly performance comparison</k-card-description>
                                  </div>
                                  <div class="flex items-center gap-4">
                                    <div class="flex items-center gap-3 text-xs text-muted-foreground">
                                      <div class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-primary"></span> This year</div>
                                      <div class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-muted"></span> Last year</div>
                                    </div>
                                    <button k-button variant="outline" size="sm" class="h-8 text-xs">Last 6 months <svg lucideChevronDown class="ml-1 w-3 h-3"></svg></button>
                                  </div>
                                </div>
                              </k-card-header>
                              <k-card-content>
                                <k-chart-container [config]="chartConfig" class="h-[200px] w-full">
                                  <k-bar-chart [data]="chartData" index="month" [categories]="['desktop', 'mobile']" [config]="chartConfig" [height]="200"></k-bar-chart>
                                </k-chart-container>
                              </k-card-content>
                            </k-card>

                            <k-card class="xl:col-span-1 shadow-sm">
                              <k-card-header class="pb-4">
                                <div class="flex items-center justify-between">
                                  <div>
                                    <k-card-title class="text-base">Recent Sales</k-card-title>
                                    <k-card-description class="text-xs">You made 265 sales this month.</k-card-description>
                                  </div>
                                  <a href="#" class="text-xs text-primary font-medium hover:underline">View all</a>
                                </div>
                              </k-card-header>
                              <k-card-content>
                                <div class="space-y-5">
                                  <div class="flex items-center">
                                    <k-avatar class="h-8 w-8">
                                      <k-avatar-image src="/avatars/01.png" alt="Avatar"></k-avatar-image>
                                      <k-avatar-fallback class="bg-blue-100 text-blue-700 text-xs">OM</k-avatar-fallback>
                                    </k-avatar>
                                    <div class="ml-3 space-y-0.5">
                                      <p class="text-sm font-medium leading-none">Olivia Martin</p>
                                      <p class="text-xs text-muted-foreground">olivia.martin@email.com</p>
                                    </div>
                                    <div class="ml-auto font-medium text-sm">+$1,999.00</div>
                                  </div>
                                  <div class="flex items-center">
                                    <k-avatar class="h-8 w-8">
                                      <k-avatar-image src="/avatars/02.png" alt="Avatar"></k-avatar-image>
                                      <k-avatar-fallback class="bg-indigo-100 text-indigo-700 text-xs">JL</k-avatar-fallback>
                                    </k-avatar>
                                    <div class="ml-3 space-y-0.5">
                                      <p class="text-sm font-medium leading-none">Jackson Lee</p>
                                      <p class="text-xs text-muted-foreground">jackson.lee@email.com</p>
                                    </div>
                                    <div class="ml-auto font-medium text-sm">+$39.00</div>
                                  </div>
                                  <div class="flex items-center">
                                    <k-avatar class="h-8 w-8">
                                      <k-avatar-image src="/avatars/03.png" alt="Avatar"></k-avatar-image>
                                      <k-avatar-fallback class="bg-sky-100 text-sky-700 text-xs">SR</k-avatar-fallback>
                                    </k-avatar>
                                    <div class="ml-3 space-y-0.5">
                                      <p class="text-sm font-medium leading-none">Sophia Rodriguez</p>
                                      <p class="text-xs text-muted-foreground">sophia.rodriguez@email.com</p>
                                    </div>
                                    <div class="ml-auto font-medium text-sm">+$129.00</div>
                                  </div>
                                  <div class="flex items-center">
                                    <k-avatar class="h-8 w-8">
                                      <k-avatar-image src="/avatars/04.png" alt="Avatar"></k-avatar-image>
                                      <k-avatar-fallback class="bg-violet-100 text-violet-700 text-xs">TW</k-avatar-fallback>
                                    </k-avatar>
                                    <div class="ml-3 space-y-0.5">
                                      <p class="text-sm font-medium leading-none">Tyler Wilson</p>
                                      <p class="text-xs text-muted-foreground">tyler.wilson@email.com</p>
                                    </div>
                                    <div class="ml-auto font-medium text-sm">+$249.00</div>
                                  </div>
                                </div>
                              </k-card-content>
                            </k-card>
                          </div>

                          <!-- Bottom Row: Interactive Analytics & Active Users -->
                          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <k-card class="xl:col-span-2 shadow-sm">
                              <k-card-header class="pb-4">
                                <div class="flex items-center justify-between">
                                  <div>
                                    <k-card-title>Interactive Analytics</k-card-title>
                                    <k-card-description>Track your key metrics and performance over time.</k-card-description>
                                  </div>
                                  <button k-button variant="outline" size="sm" class="h-8 text-xs">
                                    <svg lucideCalendarDays class="mr-2 h-3 w-3 text-muted-foreground"></svg> Sep 1, 2025 - Sep 30, 2025 <svg lucideChevronDown class="ml-2 h-3 w-3"></svg>
                                  </button>
                                </div>
                                <div class="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                                  <button k-button class="h-7 text-xs px-3 rounded-full bg-primary text-primary-foreground">Revenue</button>
                                  <button k-button variant="outline" class="h-7 text-xs px-3 rounded-full text-muted-foreground">Orders</button>
                                  <button k-button variant="outline" class="h-7 text-xs px-3 rounded-full text-muted-foreground">Customers</button>
                                  <button k-button variant="outline" class="h-7 text-xs px-3 rounded-full text-muted-foreground">Conversion</button>
                                </div>
                              </k-card-header>
                              <k-card-content class="flex items-center justify-center">
                                <div class="h-[180px] w-full flex items-center justify-center bg-muted/5 rounded-md border border-dashed border-border text-muted-foreground text-sm">
                                  <k-chart-container [config]="areaConfig" class="h-full w-full">
                                    <k-area-chart [data]="areaData" index="month" [categories]="['users', 'sessions']" [config]="areaConfig" [height]="180"></k-area-chart>
                                  </k-chart-container>
                                </div>
                              </k-card-content>
                            </k-card>

                            <k-card class="xl:col-span-1 shadow-sm flex flex-col justify-between">
                              <k-card-header>
                                <k-card-title class="text-base">Active Users</k-card-title>
                              </k-card-header>
                              <k-card-content>
                                <div class="flex items-center justify-between mb-4">
                                  <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                      <svg lucideUsers class="w-5 h-5 text-primary"></svg>
                                    </div>
                                    <div>
                                      <div class="text-2xl font-bold">573</div>
                                      <div class="text-xs text-muted-foreground">online now</div>
                                    </div>
                                  </div>
                                  <div class="flex items-center text-xs text-green-500 font-medium">
                                    <svg lucideArrowUpRight class="w-3 h-3 mr-1"></svg> 21.4%
                                  </div>
                                </div>
                                <div class="h-[80px] w-full">
                                  <k-chart-container [config]="lineConfig" class="h-full w-full">
                                    <k-line-chart [data]="lineData" index="month" [categories]="['sales']" [config]="lineConfig" [height]="80"></k-line-chart>
                                  </k-chart-container>
                                </div>
                              </k-card-content>
                            </k-card>
                          </div>

                        </div>

                        <!-- Right Sidebar Column -->
                        <div class="col-span-12 lg:col-span-3 space-y-6">

                          <!-- Grow your business -->
                          <k-card class="bg-primary text-primary-foreground border-none overflow-hidden relative shadow-md">
                            <div class="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mb-16 pointer-events-none"></div>
                            <div class="absolute right-10 top-10 w-16 h-16 bg-blue-400/20 rounded-full blur-xl pointer-events-none"></div>
                            <k-card-header>
                              <k-card-title class="text-lg">Grow your business</k-card-title>
                              <k-card-description class="text-primary-foreground/80 text-sm mt-1">Get 20% off your next plan upgrade. Limited time offer!</k-card-description>
                            </k-card-header>
                            <k-card-content>
                              <button k-button class="bg-background text-foreground hover:bg-background/90 h-9 px-4 text-xs font-medium w-max group">
                                Upgrade now <svg lucideArrowUpRight class="ml-2 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></svg>
                              </button>
                            </k-card-content>
                          </k-card>

                          <!-- Quick Actions -->
                          <k-card class="shadow-sm">
                            <k-card-header class="pb-3">
                              <k-card-title class="text-base">Quick Actions</k-card-title>
                            </k-card-header>
                            <k-card-content>
                              <div class="grid grid-cols-2 gap-3">
                                <button class="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group">
                                  <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:bg-background border border-transparent group-hover:border-border transition-colors">
                                    <svg lucidePlus class="w-4 h-4 text-muted-foreground"></svg>
                                  </div>
                                  <span class="text-xs font-medium text-center">Add Product</span>
                                </button>
                                <button class="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group">
                                  <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:bg-background border border-transparent group-hover:border-border transition-colors">
                                    <svg lucideShoppingCart class="w-4 h-4 text-muted-foreground"></svg>
                                  </div>
                                  <span class="text-xs font-medium text-center">Create Order</span>
                                </button>
                                <button class="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group">
                                  <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:bg-background border border-transparent group-hover:border-border transition-colors">
                                    <svg lucideBarChart3 class="w-4 h-4 text-muted-foreground"></svg>
                                  </div>
                                  <span class="text-xs font-medium text-center">View Reports</span>
                                </button>
                                <button class="flex flex-col items-center justify-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group">
                                  <div class="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:bg-background border border-transparent group-hover:border-border transition-colors">
                                    <svg lucideSettings class="w-4 h-4 text-muted-foreground"></svg>
                                  </div>
                                  <span class="text-xs font-medium text-center">Manage Store</span>
                                </button>
                              </div>
                            </k-card-content>
                          </k-card>

                          <!-- Notifications -->
                          <k-card class="shadow-sm">
                            <k-card-header class="pb-4">
                              <div class="flex items-center justify-between">
                                <k-card-title class="text-base">Notifications</k-card-title>
                                <a href="#" class="text-xs text-primary font-medium hover:underline">View all</a>
                              </div>
                            </k-card-header>
                            <k-card-content>
                              <div class="space-y-4">
                                <div class="flex gap-3">
                                  <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg lucidePackage class="w-3 h-3 text-green-600"></svg>
                                  </div>
                                  <div class="space-y-1 flex-1">
                                    <div class="flex items-start justify-between">
                                      <p class="text-xs font-medium leading-none">New order received</p>
                                      <span class="text-[10px] text-muted-foreground">2h ago</span>
                                    </div>
                                    <p class="text-[11px] text-muted-foreground">Order #5502 from Olivia Martin</p>
                                  </div>
                                </div>
                                <div class="flex gap-3">
                                  <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg lucideMegaphone class="w-3 h-3 text-amber-600"></svg>
                                  </div>
                                  <div class="space-y-1 flex-1">
                                    <div class="flex items-start justify-between">
                                      <p class="text-xs font-medium leading-none">Low stock alert</p>
                                      <span class="text-[10px] text-muted-foreground">4h ago</span>
                                    </div>
                                    <p class="text-[11px] text-muted-foreground">Item: Stainless Ring (S)</p>
                                  </div>
                                </div>
                                <div class="flex gap-3">
                                  <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg lucideUser class="w-3 h-3 text-purple-600"></svg>
                                  </div>
                                  <div class="space-y-1 flex-1">
                                    <div class="flex items-start justify-between">
                                      <p class="text-xs font-medium leading-none">New customer registered</p>
                                      <span class="text-[10px] text-muted-foreground">5h ago</span>
                                    </div>
                                    <p class="text-[11px] text-muted-foreground">Jackson Lee</p>
                                  </div>
                                </div>
                              </div>
                            </k-card-content>
                          </k-card>

                        </div>
                      </div>

                      <!-- Footer Quick Links (Optional space filler at the bottom) -->
                      <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <k-card class="shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                          <k-card-content class="p-4 flex items-center gap-3">
                            <div class="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg lucideBox class="w-4 h-4"></svg>
                            </div>
                            <div>
                              <p class="text-xs font-medium">View Orders</p>
                              <p class="text-[10px] text-muted-foreground">Manage and track your orders</p>
                            </div>
                          </k-card-content>
                        </k-card>
                        <k-card class="shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                          <k-card-content class="p-4 flex items-center gap-3">
                            <div class="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg lucidePackage class="w-4 h-4"></svg>
                            </div>
                            <div>
                              <p class="text-xs font-medium">Product Catalog</p>
                              <p class="text-[10px] text-muted-foreground">Browse your products</p>
                            </div>
                          </k-card-content>
                        </k-card>
                        <k-card class="shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                          <k-card-content class="p-4 flex items-center gap-3">
                            <div class="w-8 h-8 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg lucideLifeBuoy class="w-4 h-4"></svg>
                            </div>
                            <div>
                              <p class="text-xs font-medium">Customer Support</p>
                              <p class="text-[10px] text-muted-foreground">Get help and support</p>
                            </div>
                          </k-card-content>
                        </k-card>
                        <k-card class="shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                          <k-card-content class="p-4 flex items-center gap-3">
                            <div class="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <svg lucideSettings class="w-4 h-4"></svg>
                            </div>
                            <div>
                              <p class="text-xs font-medium">Settings</p>
                              <p class="text-[10px] text-muted-foreground">Manage your account</p>
                            </div>
                          </k-card-content>
                        </k-card>
                      </div>

                    </k-scroll-area>
                  </div>
                </k-sidebar-provider>
                </div>
              </div>
            </k-tab-content>

            <!-- Calendar Tab -->
            <!-- Calendar Tab -->
            <k-tab-content value="calendar" class="mt-0">
              <div class="rounded-xl border border-border bg-background shadow-lg overflow-hidden relative h-[650px] w-full text-left flex">
                <k-full-calendar />
              </div>
            </k-tab-content>

          </k-tabs>
        </section>

        <!-- Contributors -->
        <section class="w-full max-w-5xl py-24 border-t border-border/40 text-center space-y-12">
          <div class="space-y-4">
            <h2 class="text-3xl font-bold tracking-tight">Wholesome Contributors</h2>
            <p class="text-lg text-muted-foreground max-w-xl mx-auto">
              Ready to make a difference? Join our amazing contributors and help shape the future of UI development with Angular.
            </p>
          </div>

          <div class="relative w-full max-w-4xl mx-auto overflow-hidden px-4 pt-1.5">
            <!-- Gradient Masks for Marquee -->
            <div class="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div class="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div class="flex gap-8" [class.w-max]="contributors.length > 4" [class.w-full]="contributors.length <= 4" [class.justify-center]="contributors.length <= 4" [class.animate-marquee]="contributors.length > 4">
              <!-- First Set -->
              <div class="flex gap-8 px-4" [class.w-full]="contributors.length <= 4" [class.justify-center]="contributors.length <= 4">
                @for (c of contributors; track c.name) {
                  <div class="flex flex-col items-center gap-3 group cursor-pointer">
                    <div class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-muted border-2 border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-md">
                      <img [src]="c.avatar" [alt]="c.name" class="w-full h-full object-cover" />
                    </div>
                    <span class="text-base font-medium text-foreground">{{ c.name }}</span>
                  </div>
                }
              </div>
              <!-- Duplicate Set for Infinite Scroll -->
              @if (contributors.length > 4) {
                <div class="flex gap-8 px-4">
                  @for (c of contributors; track c.name + '-dup') {
                    <div class="flex flex-col items-center gap-3 group cursor-pointer">
                      <div class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-muted border-2 border-border group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-md">
                        <img [src]="c.avatar" [alt]="c.name" class="w-full h-full object-cover" />
                      </div>
                      <span class="text-base font-medium text-foreground">{{ c.name }}</span>
                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <div class="pt-8">
            <p class="text-sm text-muted-foreground mb-6">
              This project is MIT-licensed and <span class="font-semibold text-foreground">free for life</span>, since this is open-source.
            </p>
            <div class="flex justify-center gap-4">
              <a href="https://github.com/bntlyr/kobo-ui" target="_blank" k-button variant="outline" class="gap-2 rounded-full px-6">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                Star on GitHub
              </a>
              <button k-button class="gap-2 rounded-full px-6" (click)="openSponsorDialog()">
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

  readonly activeShowcaseTab = signal<string>('examples');

  readonly contributors = [
    { name: 'bntlyr', avatar: 'https://github.com/bntlyr.png' }
  ];

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

  openSponsorDialog(): void {
    this.dialog.open(SponsorDialogComponent);
  }
}
