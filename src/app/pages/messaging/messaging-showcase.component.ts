import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KMessage, KMessageScroller, KBubble } from '../../components/ui/messaging';

@Component({
  selector: 'app-messaging-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KMessage, KMessageScroller, KBubble],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Messaging</h1>
        <p class="text-muted-foreground mt-2">Components for building chat and messaging interfaces.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10 bg-muted/20">
            <k-message-scroller class="h-[300px] w-full max-w-md rounded-md border bg-background p-4 shadow-sm">
              <div class="space-y-4">
                <k-message direction="start">
                  <div class="flex items-end gap-2">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-xs">AI</div>
                    <div class="flex flex-col gap-1">
                      <k-bubble>Hello! How can I help you today?</k-bubble>
                      <span class="text-xs text-muted-foreground ml-1">10:00 AM</span>
                    </div>
                  </div>
                </k-message>
                
                <k-message direction="end">
                  <div class="flex items-end gap-2 flex-row-reverse">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">U</div>
                    <div class="flex flex-col items-end gap-1">
                      <k-bubble variant="sent">I need help building an Angular app.</k-bubble>
                      <span class="text-xs text-muted-foreground mr-1">10:01 AM</span>
                    </div>
                  </div>
                </k-message>
                
                <k-message direction="start">
                  <div class="flex items-end gap-2">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-xs">AI</div>
                    <div class="flex flex-col gap-1">
                      <k-bubble>Sure! Angular is a great choice. Are you using standalone components?</k-bubble>
                      <span class="text-xs text-muted-foreground ml-1">10:02 AM</span>
                    </div>
                  </div>
                </k-message>
              </div>
            </k-message-scroller>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-message-scroller class="h-[300px]"&gt;
  &lt;div class="space-y-4"&gt;
    <k-message direction="start">
      <div class="flex items-end gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">AI</div>
        <div class="flex flex-col gap-1">
          <k-bubble>Hello! How can I help you today?</k-bubble>
          <span class="text-xs text-muted-foreground ml-1">10:00 AM</span>
        </div>
      </div>
    </k-message>
    
    <k-message direction="end">
      <div class="flex items-end gap-2 flex-row-reverse">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">U</div>
        <div class="flex flex-col items-end gap-1">
          <k-bubble variant="sent">I need help building an Angular app.</k-bubble>
          <span class="text-xs text-muted-foreground mr-1">10:01 AM</span>
        </div>
      </div>
    </k-message>
  &lt;/div&gt;
&lt;/k-message-scroller&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MessagingShowcaseComponent {}
