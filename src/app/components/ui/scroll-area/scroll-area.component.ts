import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../../core/utils/cn';

/**
 * <k-scroll-area>
 *
 * Cross-browser custom scrollbar container.
 * Hides native scrollbar via CSS and overlays a styled one.
 *
 * @example
 * <k-scroll-area class="h-72 w-64">
 *   <!-- Long content here -->
 * </k-scroll-area>
 */
@Component({
  selector: 'k-scroll-area',
  template: `
    <div [class]="rootClasses()" [style.--scrollbar-size]="scrollbarSize()">
      <div [class]="viewportClasses()">
        <ng-content />
      </div>
    </div>
  `,
  host: { '[class]': '"contents"' },
  styles: [`
    k-scroll-area .k-scroll-viewport {
      scrollbar-width: thin;
      scrollbar-color: hsl(var(--border)) transparent;
    }
    k-scroll-area .k-scroll-viewport::-webkit-scrollbar {
      width: var(--scrollbar-size, 8px);
      height: var(--scrollbar-size, 8px);
    }
    k-scroll-area .k-scroll-viewport::-webkit-scrollbar-track {
      background: transparent;
    }
    k-scroll-area .k-scroll-viewport::-webkit-scrollbar-thumb {
      background-color: hsl(var(--border));
      border-radius: 20px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    k-scroll-area .k-scroll-viewport::-webkit-scrollbar-thumb:hover {
      background-color: hsl(var(--muted-foreground));
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KScrollArea {
  readonly orientation = input<'vertical' | 'horizontal' | 'both'>('vertical');
  readonly size        = input<'sm' | 'default' | 'lg'>('default');
  readonly class       = input<string>('');

  protected readonly rootClasses = computed(() =>
    cn('relative overflow-hidden', this.class())
  );

  protected readonly scrollbarSize = computed(() => {
    switch (this.size()) {
      case 'sm': return '4px';
      case 'lg': return '12px';
      default:   return '8px';
    }
  });

  protected readonly viewportClasses = computed(() => {
    const o = this.orientation();
    return cn(
      'k-scroll-viewport h-full w-full rounded-[inherit]',
      {
        vertical:   'overflow-y-auto overflow-x-hidden',
        horizontal: 'overflow-x-auto overflow-y-hidden',
        both:       'overflow-auto',
      }[o]
    );
  });
}
