import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KSeparatorDirective } from '../../components/ui/separator/separator.directive';
import { KSkeletonDirective } from '../../components/ui/skeleton/skeleton.directive';
import { KAvatar, KAvatarImage, KAvatarFallback } from '../../components/ui/avatar/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const SEP_USAGE = `<hr k-separator class="my-4" />

<!-- Vertical -->
<div class="flex items-center gap-4 h-8">
  <span>Blog</span>
  <div k-separator orientation="vertical" class="h-full"></div>
  <span>Docs</span>
</div>`;

const SKEL_USAGE = `<!-- Card skeleton -->
<div class="space-y-3">
  <div k-skeleton class="h-4 w-3/4"></div>
  <div k-skeleton class="h-4 w-full"></div>
  <div k-skeleton class="h-4 w-1/2"></div>
</div>`;

const AVATAR_USAGE = `<k-avatar>
  <k-avatar-image src="https://github.com/shadcn.png" alt="@shadcn" />
  <k-avatar-fallback>CN</k-avatar-fallback>
</k-avatar>`;

@Component({
  selector: 'app-primitives-showcase',
  imports: [
    KSeparatorDirective, KSkeletonDirective,
    KAvatar, KAvatarImage, KAvatarFallback,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">

      <!-- ---- Separator ---- -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">separator</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Separator</h1>
          <p class="text-lg text-muted-foreground">A visual divider between content sections.</p>
        </div>

        <app-tabs [tabs]="tabs2" [(active)]="sepTab">
          @if (sepTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4 space-y-4">
              <div class="space-y-1">
                <h4 class="text-sm font-medium leading-none">Kobo UI</h4>
                <p class="text-sm text-muted-foreground">An open-source UI component registry.</p>
              </div>
              <hr k-separator>
              <div class="flex h-5 items-center gap-4 text-sm">
                <span>Blog</span>
                <div k-separator orientation="vertical" class="h-full"></div>
                <span>Docs</span>
                <div k-separator orientation="vertical" class="h-full"></div>
                <span>Source</span>
              </div>
            </div>
          }
          @if (sepTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="sepUsage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator>

      <!-- ---- Skeleton ---- -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">skeleton</span>
          </div>
          <h2 class="text-4xl font-bold tracking-tight">Skeleton</h2>
          <p class="text-lg text-muted-foreground">Placeholder loading animation for deferred content.</p>
        </div>

        <app-tabs [tabs]="tabs2" [(active)]="skelTab">
          @if (skelTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="flex items-center gap-4">
                <div k-skeleton class="h-12 w-12 rounded-full"></div>
                <div class="space-y-2 flex-1">
                  <div k-skeleton class="h-4 w-48"></div>
                  <div k-skeleton class="h-4 w-32"></div>
                </div>
              </div>
              <div class="mt-4 space-y-2">
                <div k-skeleton class="h-4 w-full"></div>
                <div k-skeleton class="h-4 w-full"></div>
                <div k-skeleton class="h-4 w-3/4"></div>
              </div>
              <div k-skeleton class="mt-4 h-32 w-full rounded-lg"></div>
            </div>
          }
          @if (skelTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="skelUsage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <hr k-separator>

      <!-- ---- Avatar ---- -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">avatar</span>
          </div>
          <h2 class="text-4xl font-bold tracking-tight">Avatar</h2>
          <p class="text-lg text-muted-foreground">Image fallback with automatic error handling.</p>
        </div>

        <app-tabs [tabs]="tabs2" [(active)]="avatarTab">
          @if (avatarTab() === 'preview') {
            <div class="rounded-xl border border-border bg-card p-8 mt-4">
              <div class="flex flex-wrap items-end gap-6">
                <!-- With image -->
                <k-avatar size="xl">
                  <k-avatar-image src="https://github.com/angular.png" alt="Angular" />
                  <k-avatar-fallback>AN</k-avatar-fallback>
                </k-avatar>

                <!-- With fallback (broken src) -->
                <k-avatar size="lg">
                  <k-avatar-image src="https://broken-url.example.com/pic.jpg" alt="User" />
                  <k-avatar-fallback>JD</k-avatar-fallback>
                </k-avatar>

                <!-- Default size -->
                <k-avatar>
                  <k-avatar-image src="https://broken-url.example.com/pic.jpg" alt="User" />
                  <k-avatar-fallback class="bg-primary/20 text-primary">AB</k-avatar-fallback>
                </k-avatar>

                <!-- Small -->
                <k-avatar size="sm">
                  <k-avatar-image src="https://broken-url.example.com/pic.jpg" alt="User" />
                  <k-avatar-fallback>XY</k-avatar-fallback>
                </k-avatar>
              </div>
            </div>
          }
          @if (avatarTab() === 'code') {
            <div class="mt-4"><app-code-block [code]="avatarUsage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <!-- ============================================ -->
      <!-- VARIANT MATRIX -->
      <!-- ============================================ -->
      <hr k-separator>

      <h2 class="text-2xl font-bold tracking-tight">Variant Matrix</h2>

      <!-- Avatar Sizes -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Avatar — Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="flex flex-wrap items-end gap-6">
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="xs">
                <k-avatar-fallback>XS</k-avatar-fallback>
              </k-avatar>
              <span class="text-xs text-muted-foreground">xs</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="sm">
                <k-avatar-fallback>SM</k-avatar-fallback>
              </k-avatar>
              <span class="text-xs text-muted-foreground">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="default">
                <k-avatar-fallback>DF</k-avatar-fallback>
              </k-avatar>
              <span class="text-xs text-muted-foreground">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="lg">
                <k-avatar-fallback>LG</k-avatar-fallback>
              </k-avatar>
              <span class="text-xs text-muted-foreground">lg</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="xl">
                <k-avatar-fallback>XL</k-avatar-fallback>
              </k-avatar>
              <span class="text-xs text-muted-foreground">xl</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Avatar Shapes -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Avatar — Shapes</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="flex flex-wrap items-end gap-6">
            <div class="flex flex-col items-center gap-2">
              <k-avatar shape="circle" size="lg">
                <k-avatar-fallback class="bg-primary/20 text-primary">CI</k-avatar-fallback>
              </k-avatar>
              <span class="text-xs text-muted-foreground">circle</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar shape="square" size="lg">
                <k-avatar-fallback class="bg-primary/20 text-primary">SQ</k-avatar-fallback>
              </k-avatar>
              <span class="text-xs text-muted-foreground">square</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Skeleton Animations -->
      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Skeleton — Animations</h3>
        <div class="rounded-xl border border-border bg-card p-6 space-y-6">
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">animation="pulse" (default)</span>
            <div class="flex items-center gap-4">
              <div k-skeleton animation="pulse" class="h-10 w-10 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div k-skeleton animation="pulse" class="h-4 w-48"></div>
                <div k-skeleton animation="pulse" class="h-4 w-32"></div>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">animation="shimmer"</span>
            <div class="flex items-center gap-4">
              <div k-skeleton animation="shimmer" class="h-10 w-10 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div k-skeleton animation="shimmer" class="h-4 w-48"></div>
                <div k-skeleton animation="shimmer" class="h-4 w-32"></div>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <span class="text-xs text-muted-foreground">animation="none"</span>
            <div class="flex items-center gap-4">
              <div k-skeleton animation="none" class="h-10 w-10 rounded-full"></div>
              <div class="space-y-2 flex-1">
                <div k-skeleton animation="none" class="h-4 w-48"></div>
                <div k-skeleton animation="none" class="h-4 w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class PrimitivesShowcaseComponent {
  readonly tabs2: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly sepTab    = signal('preview');
  readonly skelTab   = signal('preview');
  readonly avatarTab = signal('preview');

  readonly sepUsage    = SEP_USAGE;
  readonly skelUsage   = SKEL_USAGE;
  readonly avatarUsage = AVATAR_USAGE;
}
