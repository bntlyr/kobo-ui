import { Directive, computed, input } from '@angular/core';
import { cn } from '../../../core/utils/cn';

// ---- Heading Directives ----

@Directive({ selector: 'h1[k-h1]', host: { '[class]': 'classes()' } })
export class KH1Directive {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', this.class())
  );
}

@Directive({ selector: 'h2[k-h2]', host: { '[class]': 'classes()' } })
export class KH2Directive {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', this.class())
  );
}

@Directive({ selector: 'h3[k-h3]', host: { '[class]': 'classes()' } })
export class KH3Directive {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('scroll-m-20 text-2xl font-semibold tracking-tight', this.class())
  );
}

@Directive({ selector: 'h4[k-h4]', host: { '[class]': 'classes()' } })
export class KH4Directive {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('scroll-m-20 text-xl font-semibold tracking-tight', this.class())
  );
}

// ---- Text Directives ----

@Directive({ selector: 'p[k-p]', host: { '[class]': 'classes()' } })
export class KPDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('leading-7 [&:not(:first-child)]:mt-6', this.class())
  );
}

@Directive({ selector: 'blockquote[k-blockquote]', host: { '[class]': 'classes()' } })
export class KBlockquoteDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('mt-6 border-l-2 border-border pl-6 italic text-muted-foreground', this.class())
  );
}

@Directive({ selector: 'code[k-code]', host: { '[class]': 'classes()' } })
export class KCodeDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem]',
      'font-mono text-sm font-semibold text-foreground',
      this.class()
    )
  );
}

@Directive({ selector: 'ul[k-list]', host: { '[class]': 'classes()' } })
export class KListDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('my-6 ml-6 list-disc [&>li]:mt-2', this.class())
  );
}

// ---- Inline Text Variants ----

@Directive({ selector: '[k-lead]', host: { '[class]': 'classes()' } })
export class KLeadDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-xl text-muted-foreground', this.class())
  );
}

@Directive({ selector: '[k-large]', host: { '[class]': 'classes()' } })
export class KLargeDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-lg font-semibold', this.class())
  );
}

@Directive({ selector: '[k-small]', host: { '[class]': 'classes()' } })
export class KSmallDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-sm font-medium leading-none', this.class())
  );
}

@Directive({ selector: '[k-muted]', host: { '[class]': 'classes()' } })
export class KMutedDirective {
  readonly class = input<string>('');
  protected readonly classes = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}
