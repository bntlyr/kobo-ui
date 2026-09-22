import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KAvatar, KAvatarImage, KAvatarFallback } from '../../components/ui/avatar/index';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

const AVATAR_USAGE = `<k-avatar>
  <k-avatar-image src="https://github.com/shadcn.png" alt="@shadcn" />
  <k-avatar-fallback>CN</k-avatar-fallback>
</k-avatar>`;

@Component({
  selector: 'app-avatar-showcase',
  imports: [
    KAvatar, KAvatarImage, KAvatarFallback,
    CodeBlockComponent, TabsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-16 max-w-3xl">
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>components</span><span>/</span><span class="text-foreground">avatar</span>
          </div>
          <h1 class="text-4xl font-bold tracking-tight">Avatar</h1>
          <p class="text-lg text-muted-foreground">Image fallback with automatic error handling.</p>
        </div>

        <app-tabs [tabs]="tabs" [(active)]="tab">
          @if (tab() === 'preview') {
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
          @if (tab() === 'code') {
            <div class="mt-4"><app-code-block [code]="usage" language="html" /></div>
          }
        </app-tabs>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Sizes</h3>
        <div class="rounded-xl border border-border bg-card p-6">
          <div class="flex flex-wrap items-end gap-6">
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="xs"><k-avatar-fallback>XS</k-avatar-fallback></k-avatar>
              <span class="text-xs text-muted-foreground">xs</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="sm"><k-avatar-fallback>SM</k-avatar-fallback></k-avatar>
              <span class="text-xs text-muted-foreground">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="default"><k-avatar-fallback>DF</k-avatar-fallback></k-avatar>
              <span class="text-xs text-muted-foreground">default</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="lg"><k-avatar-fallback>LG</k-avatar-fallback></k-avatar>
              <span class="text-xs text-muted-foreground">lg</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <k-avatar size="xl"><k-avatar-fallback>XL</k-avatar-fallback></k-avatar>
              <span class="text-xs text-muted-foreground">xl</span>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h3 class="text-lg font-semibold">Shapes</h3>
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

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAvatar</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-avatar</code></p>
            
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Default</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'xs' | 'sm' | 'default' | 'lg' | 'xl'</td>
                    <td class="px-4 py-3 font-mono text-xs">'default'</td>
                    <td class="px-4 py-3 text-muted-foreground">The size of the avatar.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">shape</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'circle' | 'square'</td>
                    <td class="px-4 py-3 font-mono text-xs">'circle'</td>
                    <td class="px-4 py-3 text-muted-foreground">The shape of the avatar container.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAvatarImage</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-avatar-image</code></p>
            
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Default</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">src <span class="text-destructive">*</span></td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">-</td>
                    <td class="px-4 py-3 text-muted-foreground">The image source URL. Required.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">alt</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">The image alternative text.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAvatarFallback</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-avatar-fallback</code></p>
            
            <div class="rounded-xl border border-border overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th class="px-4 py-3 font-medium">Property</th>
                    <th class="px-4 py-3 font-medium">Type</th>
                    <th class="px-4 py-3 font-medium">Default</th>
                    <th class="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes to apply.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class AvatarShowcaseComponent {
  readonly tabs: Tab[] = [{ id: 'preview', label: 'Preview' }, { id: 'code', label: 'Code' }];
  readonly tab = signal('preview');
  readonly usage = AVATAR_USAGE;
}
