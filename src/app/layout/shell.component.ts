import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeaderComponent } from './nav-header.component';
import { SidebarComponent } from './sidebar.component';
import { TocComponent } from './toc.component';
import { KToaster } from '../components/ui/toast/toast.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavHeaderComponent, SidebarComponent, TocComponent, KToaster],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-foreground flex flex-col pt-14">
      <!-- Top navigation -->
      <div class="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <app-nav-header />
      </div>

      <!-- Content area -->
      <div class="flex-1 flex max-w-screen-2xl mx-auto w-full">
        <!-- Sidebar -->
        <app-sidebar />

        <!-- Main content -->
        <main class="flex-1 min-w-0 px-6 py-10 md:px-10 lg:px-16 max-w-4xl">
          <router-outlet />
        </main>

        <!-- Right TOC Sidebar -->
        <aside class="hidden xl:block w-56 shrink-0 py-10 pr-6 pl-2 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto no-scrollbar">
          <app-toc />
        </aside>
      </div>

      <!-- Global toast notifications -->
      <k-toaster />
    </div>
  `,
})
export class ShellComponent {}
