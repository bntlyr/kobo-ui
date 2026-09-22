import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeaderComponent } from './nav-header.component';
import { SidebarComponent } from './sidebar.component';
import { KToaster } from '../components/ui/toast/toast.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavHeaderComponent, SidebarComponent, KToaster],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <!-- Top navigation -->
      <app-nav-header />

      <!-- Content area -->
      <div class="flex max-w-screen-2xl mx-auto">
        <!-- Sidebar -->
        <app-sidebar />

        <!-- Main content -->
        <main class="flex-1 min-w-0 px-6 py-10 md:px-10 lg:px-16 max-w-4xl">
          <router-outlet />
        </main>
      </div>

      <!-- Global toast notifications -->
      <k-toaster />
    </div>
  `,
})
export class ShellComponent {}
