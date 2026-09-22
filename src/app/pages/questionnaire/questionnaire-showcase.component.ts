import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';
import { KQuestionnaire, KQuestionnaireStep } from '../../components/ui/questionnaire';

@Component({
  selector: 'app-questionnaire-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent, KQuestionnaire, KQuestionnaireStep],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Questionnaire</h1>
        <p class="text-muted-foreground mt-2">A multi-step questionnaire component.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10 bg-muted/20">
            <k-questionnaire title="Survey" description="Help us improve." class="w-full max-w-md bg-background shadow-sm">
              <k-questionnaire-step [step]="1" title="Question 1" description="Your feedback">
                <div class="min-h-[120px] flex items-center justify-center border-2 border-dashed rounded-md m-6 text-sm text-muted-foreground">
                  Question 1 Form
                </div>
              </k-questionnaire-step>
            </k-questionnaire>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm text-foreground">
&lt;k-questionnaire title="Survey" description="Help us improve." class="w-full max-w-md"&gt;
  &lt;k-questionnaire-step [step]="1" title="Question 1" description="Your feedback"&gt;
    &lt;!-- form content goes here --&gt;
  &lt;/k-questionnaire-step&gt;
&lt;/k-questionnaire&gt;
            </code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class QuestionnaireShowcaseComponent {
  step = 0;
}
