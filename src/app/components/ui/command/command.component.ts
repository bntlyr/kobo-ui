import { ChangeDetectionStrategy, Component, computed, Directive, inject, InjectionToken, input, model, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { KDialogService } from '../dialog/dialog.component';

export const K_COMMAND = new InjectionToken<KCommand>('K_COMMAND');

@Component({
  selector: 'k-command',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  providers: [{ provide: K_COMMAND, useExisting: KCommand }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommand {
  readonly class = input<string>('');
  readonly value = model<string>('');
  
  protected readonly classes = computed(() => cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', this.class()));
}

@Component({
  selector: 'k-command-input',
  template: `
    <div class="flex items-center border-b px-3" [class]="wrapperClass()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        [placeholder]="placeholder()"
        [value]="command.value()"
        (input)="onInput($event)"
        [class]="classes()"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandInput {
  readonly class = input<string>('');
  readonly wrapperClass = input<string>('');
  readonly placeholder = input<string>('Type a command or search...');
  
  readonly command = inject(K_COMMAND);

  protected readonly classes = computed(() => cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', this.class()));

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.command.value.set(val);
  }
}

@Component({
  selector: 'k-command-list',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandList {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('max-h-[300px] overflow-y-auto overflow-x-hidden', this.class()));
}

@Component({
  selector: 'k-command-empty',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandEmpty {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('py-6 text-center text-sm', this.class()));
}

@Component({
  selector: 'k-command-group',
  template: `
    <div [class]="classes()">
      @if (heading()) {
        <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">{{ heading() }}</div>
      }
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandGroup {
  readonly class = input<string>('');
  readonly heading = input<string>('');
  protected readonly classes = computed(() => cn('overflow-hidden p-1 text-foreground [&_[k-command-group-heading]]:px-2 [&_[k-command-group-heading]]:py-1.5 [&_[k-command-group-heading]]:text-xs [&_[k-command-group-heading]]:font-medium [&_[k-command-group-heading]]:text-muted-foreground', this.class()));
}

@Directive({
  selector: 'button[k-command-item], a[k-command-item]',
  host: { '[class]': 'classes()' },
})
export class KCommandItem {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground', this.class()));
}
