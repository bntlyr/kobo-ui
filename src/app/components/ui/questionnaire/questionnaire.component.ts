import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-questionnaire',
  template: `
    <div [class]="classes()">
      <div class="mb-6 space-y-2">
        <h3 class="text-lg font-medium">{{ title() }}</h3>
        <p class="text-sm text-muted-foreground">{{ description() }}</p>
      </div>
      <div class="space-y-4">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KQuestionnaire {
  readonly class = input<string>('');
  readonly title = input<string>('Questionnaire');
  readonly description = input<string>('');
  
  protected readonly classes = computed(() => cn('mx-auto max-w-2xl rounded-xl border bg-card p-6 text-card-foreground shadow', this.class()));
}

@Component({
  selector: 'k-questionnaire-step',
  template: `
    <div [class]="classes()">
      <div class="flex items-center gap-4">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
          {{ step() }}
        </div>
        <div class="flex-1">
          <h4 class="text-base font-medium">{{ title() }}</h4>
          <p class="text-sm text-muted-foreground">{{ description() }}</p>
        </div>
      </div>
      <div class="mt-4 pl-12">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KQuestionnaireStep {
  readonly class = input<string>('');
  readonly step = input<number>(1);
  readonly title = input<string>('Step');
  readonly description = input<string>('');
  
  protected readonly classes = computed(() => cn('relative py-4', this.class()));
}
