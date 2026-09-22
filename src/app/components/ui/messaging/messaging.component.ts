import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';
import { cva } from 'class-variance-authority';

const bubbleVariants = cva(
  'relative flex w-fit max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-2 text-sm',
  {
    variants: {
      variant: {
        sent: 'bg-primary text-primary-foreground self-end rounded-br-sm',
        received: 'bg-muted text-foreground self-start rounded-bl-sm',
      },
    },
    defaultVariants: {
      variant: 'received',
    },
  }
);

@Component({
  selector: 'k-bubble',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KBubble {
  readonly class = input<string>('');
  readonly variant = input<'sent' | 'received'>('received');
  
  protected readonly classes = computed(() => cn(bubbleVariants({ variant: this.variant() }), this.class()));
}

@Component({
  selector: 'k-message',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KMessage {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex flex-col gap-2 p-4', this.class()));
}

@Component({
  selector: 'k-message-scroller',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KMessageScroller {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('flex h-[400px] flex-col overflow-y-auto overflow-x-hidden p-4 scrollbar-thin', this.class()));
}

@Component({
  selector: 'k-attachment',
  template: `
    <div [class]="classes()">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </div>
      <div class="flex flex-col gap-1 overflow-hidden">
        <span class="truncate text-sm font-medium">{{ name() }}</span>
        @if (size()) {
          <span class="text-xs text-muted-foreground">{{ size() }}</span>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KAttachment {
  readonly class = input<string>('');
  readonly name = input<string>('attachment.txt');
  readonly size = input<string>('');
  
  protected readonly classes = computed(() => cn('flex items-center gap-3 rounded-lg border p-2', this.class()));
}

@Component({
  selector: 'k-marker',
  template: `
    <div [class]="classes()">
      <span class="bg-background px-2 text-xs text-muted-foreground">
        <ng-content />
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KMarker {
  readonly class = input<string>('');
  protected readonly classes = computed(() => cn('relative flex w-full items-center justify-center py-4 before:absolute before:inset-x-0 before:h-px before:bg-border', this.class()));
}
