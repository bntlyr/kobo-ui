import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KMessage, KMessageScroller, KBubble } from '../../components/ui/messaging/messaging.component';
import { KInputDirective } from '../../components/ui/input/input.directive';
import { KButtonDirective } from '../../components/ui/button/button.directive';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { TabsComponent, type Tab } from '../../shared/tabs.component';

@Component({
  selector: 'app-messaging-showcase',
  imports: [KMessage, KMessageScroller, KBubble, KInputDirective, KButtonDirective, CodeBlockComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-1">
          <span>components</span><span>/</span><span class="text-foreground">messaging</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight">Messaging</h1>
        <p class="text-lg text-muted-foreground">
          Components for building chat and messaging interfaces.
        </p>
      </div>

      <app-tabs [tabs]="tabs" [(active)]="activeTab">
        @if (activeTab() === 'preview') {
          <div class="rounded-xl border border-border bg-card p-8 mt-4">
            <div class="flex items-center justify-center">
              
              <div class="flex flex-col w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden h-[500px]">
                <!-- Chat Header -->
                <div class="flex flex-col space-y-1.5 p-4 border-b bg-muted/30">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-primary"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                    </div>
                    <div>
                      <h3 class="font-semibold leading-none tracking-tight">AI Assistant</h3>
                      <p class="text-xs text-muted-foreground mt-1">Always online</p>
                    </div>
                  </div>
                </div>
                
                <!-- Chat Messages -->
                <k-message-scroller class="flex-1 p-4 bg-background">
                  <div class="space-y-4">
                    
                    <!-- Received -->
                    <k-message class="p-0">
                      <div class="flex w-full justify-start">
                        <div class="flex items-start gap-2 max-w-[85%]">
                          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0 mt-0.5">AI</div>
                          <div class="flex flex-col gap-1.5">
                            <k-bubble class="max-w-full m-0 self-start">Hello! How can I help you today?</k-bubble>
                            <span class="text-[10px] text-muted-foreground ml-1">10:00 AM</span>
                          </div>
                        </div>
                      </div>
                    </k-message>
                    
                    <!-- Sent -->
                    <k-message class="p-0">
                      <div class="flex w-full justify-end">
                        <div class="flex items-start gap-2 flex-row-reverse max-w-[85%]">
                          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs shrink-0 mt-0.5">U</div>
                          <div class="flex flex-col items-end gap-1.5">
                            <k-bubble variant="sent" class="max-w-full m-0 self-end">I need help building an Angular app.</k-bubble>
                            <span class="text-[10px] text-muted-foreground mr-1">10:01 AM</span>
                          </div>
                        </div>
                      </div>
                    </k-message>
                    
                    <!-- Received (Long) -->
                    <k-message class="p-0">
                      <div class="flex w-full justify-start">
                        <div class="flex items-start gap-2 max-w-[85%]">
                          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs shrink-0 mt-0.5">AI</div>
                          <div class="flex flex-col gap-1.5">
                            <k-bubble class="max-w-full m-0 self-start">Sure! Angular is a great choice. Are you using standalone components?</k-bubble>
                            <span class="text-[10px] text-muted-foreground ml-1">10:02 AM</span>
                          </div>
                        </div>
                      </div>
                    </k-message>

                  </div>
                </k-message-scroller>

                <!-- Chat Input -->
                <div class="p-4 border-t bg-background">
                  <form class="flex items-center gap-2" (submit)="$event.preventDefault()">
                    <input k-input class="flex-1" placeholder="Type your message..." />
                    <button k-button type="submit" size="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                      <span class="sr-only">Send</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        }

        @if (activeTab() === 'code') {
          <div class="mt-4 space-y-4">
            <div>
              <p class="text-sm font-semibold mb-2">Installation</p>
              <app-code-block code="npx kobo-ui add messaging" language="bash" />
            </div>
            <div>
              <p class="text-sm font-semibold mb-2">Usage</p>
              <app-code-block code="&lt;k-message-scroller class=&quot;h-[400px]&quot;&gt;
  &lt;div class=&quot;space-y-4&quot;&gt;
    
    &lt;!-- Received --&gt;
    &lt;k-message class=&quot;p-0&quot;&gt;
      &lt;div class=&quot;flex w-full justify-start&quot;&gt;
        &lt;div class=&quot;flex items-start gap-2 max-w-[85%]&quot;&gt;
          &lt;div class=&quot;flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0 mt-0.5&quot;&gt;AI&lt;/div&gt;
          &lt;div class=&quot;flex flex-col gap-1.5&quot;&gt;
            &lt;k-bubble class=&quot;max-w-full m-0 self-start&quot;&gt;Hello! How can I help you today?&lt;/k-bubble&gt;
            &lt;span class=&quot;text-[10px] text-muted-foreground ml-1&quot;&gt;10:00 AM&lt;/span&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/k-message&gt;
    
    &lt;!-- Sent --&gt;
    &lt;k-message class=&quot;p-0&quot;&gt;
      &lt;div class=&quot;flex w-full justify-end&quot;&gt;
        &lt;div class=&quot;flex items-start gap-2 flex-row-reverse max-w-[85%]&quot;&gt;
          &lt;div class=&quot;flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0 mt-0.5&quot;&gt;U&lt;/div&gt;
          &lt;div class=&quot;flex flex-col items-end gap-1.5&quot;&gt;
            &lt;k-bubble variant=&quot;sent&quot; class=&quot;max-w-full m-0 self-end&quot;&gt;I need help building an Angular app.&lt;/k-bubble&gt;
            &lt;span class=&quot;text-[10px] text-muted-foreground mr-1&quot;&gt;10:01 AM&lt;/span&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/k-message&gt;

  &lt;/div&gt;
&lt;/k-message-scroller&gt;" language="html" />
            </div>
          </div>
        }
      </app-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KBubble</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-bubble</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">variant</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">'sent' | 'received'</td>
                    <td class="px-4 py-3 font-mono text-xs">'received'</td>
                    <td class="px-4 py-3 text-muted-foreground">The variant style of the chat bubble.</td>
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
            <h3 class="text-lg font-semibold">KMessage</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-message</code></p>
            
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

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KMessageScroller</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-message-scroller</code></p>
            
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

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KAttachment</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-attachment</code></p>
            
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
                    <td class="px-4 py-3 font-mono text-xs">name</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'attachment.txt'</td>
                    <td class="px-4 py-3 text-muted-foreground">Name of the attachment file.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">size</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Size string of the attachment (e.g. '2.4 MB').</td>
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
            <h3 class="text-lg font-semibold">KMarker</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-marker</code></p>
            
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
export default class MessagingShowcaseComponent {
  readonly tabs: Tab[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code',    label: 'Code' },
  ];
  readonly activeTab = signal<string>('preview');
}
