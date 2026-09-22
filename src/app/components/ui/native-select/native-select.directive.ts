import { ChangeDetectionStrategy, Component, computed, Directive, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

@Directive({
  selector: 'select[k-native-select]',
  host: { '[class]': 'classes()' },
})
export class KNativeSelectDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(
    'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
    this.class()
  ));
}

@Component({
  selector: 'k-native-select-wrapper',
  template: `
    <div [class]="classes()">
      <ng-content select="select" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KNativeSelectWrapper {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative w-full', this.class()));
}
