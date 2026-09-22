import { ChangeDetectionStrategy, Component, computed, Directive, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { cva } from 'class-variance-authority';

@Component({
  selector: 'k-navigation-menu',
  template: `
    <nav [class]="classes()">
      <ul class="group flex flex-1 list-none items-center justify-center space-x-1">
        <ng-content />
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KNavigationMenu {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative z-10 flex max-w-max flex-1 items-center justify-center', this.class()));
}

@Component({
  selector: 'k-navigation-menu-item',
  template: `<li [class]="classes()"><ng-content /></li>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KNavigationMenuItem {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative', this.class()));
}

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
);

@Directive({
  selector: '[kNavigationMenuLink]',
  host: {
    '[class]': 'classes()',
  },
})
export class KNavigationMenuLink {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn(navigationMenuTriggerStyle(), this.class()));
}
