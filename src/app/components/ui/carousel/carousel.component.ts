import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, inject, InjectionToken, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../core/utils/cn';

export const K_CAROUSEL = new InjectionToken<KCarousel>('K_CAROUSEL');

@Component({
  selector: 'k-carousel',
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
  providers: [{ provide: K_CAROUSEL, useExisting: KCarousel }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCarousel {
  readonly class = input<string>('');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly classes = computed(() => cn('relative', this.class()));

  /** Set by KCarouselContent after render */
  readonly _scrollTarget = signal<HTMLElement | null>(null);

  scrollPrev(): void {
    const el = this._scrollTarget();
    if (!el) return;
    if (this.orientation() === 'horizontal') {
      el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ top: -el.offsetHeight, behavior: 'smooth' });
    }
  }

  scrollNext(): void {
    const el = this._scrollTarget();
    if (!el) return;
    if (this.orientation() === 'horizontal') {
      el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ top: el.offsetHeight, behavior: 'smooth' });
    }
  }
}

@Component({
  selector: 'k-carousel-content',
  template: `
    <div class="overflow-hidden">
      <div #content [class]="classes()">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCarouselContent {
  readonly class = input<string>('');
  private readonly carousel = inject(K_CAROUSEL);
  private readonly contentRef = viewChild<ElementRef<HTMLElement>>('content');

  protected readonly classes = computed(() => cn(
    'flex snap-mandatory',
    this.carousel.orientation() === 'horizontal' ? '-ml-4 flex-row snap-x overflow-x-auto scrollbar-hide' : '-mt-4 flex-col snap-y overflow-y-auto scrollbar-hide',
    this.class()
  ));

  constructor() {
    afterNextRender(() => {
      const ref = this.contentRef();
      if (ref) {
        this.carousel._scrollTarget.set(ref.nativeElement);
      }
    });
  }
}

@Component({
  selector: 'k-carousel-item',
  template: `<div [class]="classes()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCarouselItem {
  readonly class = input<string>('');
  private readonly carousel = inject(K_CAROUSEL);

  protected readonly classes = computed(() => cn(
    'min-w-0 shrink-0 grow-0 basis-full snap-center',
    this.carousel.orientation() === 'horizontal' ? 'pl-4' : 'pt-4',
    this.class()
  ));
}

@Component({
  selector: 'button[k-carousel-previous]',
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m15 18-6-6 6-6"/></svg><span class="sr-only">Previous slide</span>`,
  host: {
    '[class]': 'classes()',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCarouselPrevious {
  readonly class = input<string>('');
  private readonly carousel = inject(K_CAROUSEL);

  protected readonly classes = computed(() => cn(
    'absolute h-8 w-8 rounded-full border bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground',
    this.carousel.orientation() === 'horizontal' ? '-left-12 top-1/2 -translate-y-1/2' : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
    this.class()
  ));

  onClick(): void {
    this.carousel.scrollPrev();
  }
}

@Component({
  selector: 'button[k-carousel-next]',
  template: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m9 18 6-6-6-6"/></svg><span class="sr-only">Next slide</span>`,
  host: {
    '[class]': 'classes()',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KCarouselNext {
  readonly class = input<string>('');
  private readonly carousel = inject(K_CAROUSEL);

  protected readonly classes = computed(() => cn(
    'absolute h-8 w-8 rounded-full border bg-background flex items-center justify-center hover:bg-accent hover:text-accent-foreground',
    this.carousel.orientation() === 'horizontal' ? '-right-12 top-1/2 -translate-y-1/2' : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
    this.class()
  ));

  onClick(): void {
    this.carousel.scrollNext();
  }
}
