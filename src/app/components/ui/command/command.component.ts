import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  inject,
  InjectionToken,
  input,
  model,
  ViewEncapsulation,
  contentChildren,
  HostListener,
  ElementRef,
  effect,
  signal,
  untracked,
  WritableSignal,
  ModelSignal,
} from '@angular/core';
import { cn } from '../../../core/utils/cn';

export interface KCommandContext {
  value: ModelSignal<string>;
  items: () => readonly KCommandItem[];
  activeIndex: WritableSignal<number>;
}

export const K_COMMAND = new InjectionToken<KCommandContext>('K_COMMAND');

@Component({
  selector: 'k-command',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  providers: [{ provide: K_COMMAND, useExisting: KCommand }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommand implements KCommandContext {
  readonly class = input<string>('');
  readonly value = model<string>('');

  readonly items = contentChildren(KCommandItem, { descendants: true });
  readonly activeIndex = signal<number>(0);

  protected readonly classes = computed(() =>
    cn(
      'flex w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      this.class()
    )
  );

  constructor() {
    // Reset active index when items change (e.g. filtered)
    effect(() => {
      this.items();
      untracked(() => {
        this.activeIndex.set(0);
      });
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const items = this.items();
    if (!items.length) return;

    let idx = this.activeIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.set((idx + 1) % items.length);
      this.scrollToActive();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.set((idx - 1 + items.length) % items.length);
      this.scrollToActive();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const active = items[idx];
      if (active) {
        active.click();
      }
    }
  }

  private scrollToActive() {
    // Small delay to allow Angular to render the active state
    setTimeout(() => {
      const active = this.items()[this.activeIndex()];
      if (active) {
        active.el.nativeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }
}

@Component({
  selector: 'k-command-input',
  template: `
    <div class="flex items-center border-b px-3" [class]="wrapperClass()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="mr-2 h-4 w-4 shrink-0 opacity-50">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
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

  protected readonly classes = computed(() =>
    cn(
      'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
      'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      this.class()
    )
  );

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.command.value.set(val);
  }
}

@Component({
  selector: 'k-command-list',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandList {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('block max-h-[300px] overflow-y-auto overflow-x-hidden', this.class())
  );
}

@Component({
  selector: 'k-command-empty',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandEmpty {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('py-6 text-center text-sm', this.class())
  );
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
  protected readonly classes = computed(() =>
    cn('overflow-hidden p-1 text-foreground', this.class())
  );
}

@Directive({
  selector: 'button[k-command-item], a[k-command-item]',
  host: { 
    '[class]': 'classes()',
    '[attr.aria-selected]': 'isActive() ? "true" : null',
    '(mouseenter)': 'onMouseEnter()',
  },
})
export class KCommandItem {
  private readonly command = inject(K_COMMAND);
  readonly el = inject(ElementRef<HTMLElement>);

  readonly class = input<string>('');
  
  readonly isActive = computed(() => {
    const items = this.command.items();
    return items[this.command.activeIndex()] === this;
  });

  protected readonly classes = computed(() =>
    cn(
      'relative flex w-full cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'hover:bg-accent hover:text-accent-foreground',
      'aria-selected:bg-accent aria-selected:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'cursor-pointer',
      this.class()
    )
  );

  onMouseEnter() {
    const items = this.command.items();
    const idx = items.indexOf(this);
    if (idx !== -1) {
      this.command.activeIndex.set(idx);
    }
  }

  click() {
    this.el.nativeElement.click();
  }
}

@Component({
  selector: 'k-command-separator',
  template: `<div [class]="classes()"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandSeparator {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('-mx-1 h-px bg-border', this.class())
  );
}

@Component({
  selector: 'k-command-shortcut',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandShortcut {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('ml-auto text-xs tracking-widest text-muted-foreground', this.class())
  );
}

@Component({
  selector: 'k-command-footer',
  template: `<ng-content />`,
  host: { '[class]': 'classes()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCommandFooter {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('flex items-center border-t px-4 py-2 text-xs text-muted-foreground mt-auto', this.class())
  );
}
