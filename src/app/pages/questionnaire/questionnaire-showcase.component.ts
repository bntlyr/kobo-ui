import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KQuestionnaire, KQuestionnaireStep } from '../../components/ui/questionnaire';
import { KButtonDirective } from '../../components/ui/button/button.directive';

@Component({
  selector: 'app-questionnaire-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KQuestionnaire, KQuestionnaireStep, KButtonDirective],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Questionnaire</h1>
        <p class="text-muted-foreground mt-2">A multi-step questionnaire component.</p>
      </div>

      <k-tabs value="preview" variant="line">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10 bg-muted/20">
            <k-questionnaire #q title="Survey" description="Help us improve." class="w-full max-w-md bg-background shadow-sm">
              <k-questionnaire-step [step]="1" title="Question 1" description="Your feedback">
                <div class="min-h-[120px] flex items-center justify-center border-2 border-dashed rounded-md my-6 text-sm text-muted-foreground">
                  Question 1 Form
                </div>
                <div class="flex justify-end">
                  <button k-button (click)="q.next()">Next</button>
                </div>
              </k-questionnaire-step>
              
              <k-questionnaire-step [step]="2" title="Question 2" description="More details">
                <div class="min-h-[120px] flex items-center justify-center border-2 border-dashed rounded-md my-6 text-sm text-muted-foreground">
                  Question 2 Form
                </div>
                <div class="flex justify-between">
                  <button k-button variant="outline" (click)="q.previous()">Previous</button>
                  <button k-button (click)="q.next()">Next</button>
                </div>
              </k-questionnaire-step>

              <k-questionnaire-step [step]="3" title="Done" description="Thank you">
                <div class="min-h-[120px] flex items-center justify-center border-2 border-dashed rounded-md my-6 text-sm text-muted-foreground">
                  Review & Submit
                </div>
                <div class="flex justify-between">
                  <button k-button variant="outline" (click)="q.previous()">Previous</button>
                  <button k-button>Submit</button>
                </div>
              </k-questionnaire-step>
            </k-questionnaire>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-questionnaire #q title="Survey" description="Help us improve." class="w-full max-w-md"&gt;
  &lt;k-questionnaire-step [step]="1" title="Question 1" description="Your feedback"&gt;
    &lt;!-- form content goes here --&gt;
    &lt;button k-button (click)="q.next()"&gt;Next&lt;/button&gt;
  &lt;/k-questionnaire-step&gt;
&lt;/k-questionnaire&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">KQuestionnaire</h3>
            <p class="text-sm text-muted-foreground">Selector: <code class="font-mono bg-muted px-1 py-0.5 rounded text-xs">k-questionnaire</code></p>
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
                    <td class="px-4 py-3 font-mono text-xs">title</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">'Questionnaire'</td>
                    <td class="px-4 py-3 text-muted-foreground">The title of the questionnaire.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">description</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">The description text.</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-3 font-mono text-xs">class</td>
                    <td class="px-4 py-3 font-mono text-xs text-primary">string</td>
                    <td class="px-4 py-3 font-mono text-xs">''</td>
                    <td class="px-4 py-3 text-muted-foreground">Additional CSS classes.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class QuestionnaireShowcaseComponent {
  step = 0;
}
