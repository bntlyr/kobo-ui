import { 
  ChangeDetectionStrategy, 
  Component, 
  DestroyRef, 
  effect, 
  inject, 
  signal, 
  PLATFORM_ID,
  AfterViewInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { cn } from '../core/utils/cn';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-toc',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (items().length > 0) {
      <div class="space-y-4">
        <p class="font-semibold text-sm text-foreground">On This Page</p>
        <ul class="m-0 list-none space-y-2 text-sm">
          @for (item of items(); track item.id) {
            <li [class]="getItemClass(item)">
              <a 
                [href]="'#' + item.id" 
                (click)="scrollTo($event, item.id)"
                class="inline-block no-underline transition-colors hover:text-foreground w-full"
                [class.text-foreground]="activeId() === item.id"
                [class.font-medium]="activeId() === item.id"
                [class.text-muted-foreground]="activeId() !== item.id"
              >
                {{ item.text }}
              </a>
            </li>
          }
        </ul>
      </div>
    }
  `,
  host: {
    '[class]': '"block w-full"',
  }
})
export class TocComponent implements AfterViewInit {
  readonly items = signal<TocItem[]>([]);
  readonly activeId = signal<string>('');

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Initial extraction
    setTimeout(() => this.extractHeadings(), 100);

    // Re-extract on navigation
    const sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => this.extractHeadings(), 100);
      });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      this.disconnectObserver();
    });
  }

  private extractHeadings() {
    this.disconnectObserver();

    const headings = Array.from(document.querySelectorAll('main h2, main h3'));
    
    if (headings.length === 0) {
      this.items.set([]);
      return;
    }

    const items: TocItem[] = headings.map((heading) => {
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = heading.textContent
          ?.toLowerCase()
          .replace(/\\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '') || 'section';
      }

      return {
        id: heading.id,
        text: heading.textContent || '',
        level: heading.tagName.toLowerCase() === 'h3' ? 3 : 2,
      };
    });

    this.items.set(items);
    this.setupObserver(headings);
  }

  private setupObserver(elements: Element[]) {
    this.observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting elements
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          // If multiple are visible, pick the first one from the top
          this.activeId.set(intersecting[0].target.id);
        }
      },
      {
        rootMargin: '0px 0px -80% 0px', // Trigger when element is in the top 20% of the viewport
      }
    );

    elements.forEach((el) => this.observer?.observe(el));
  }

  private disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Temporarily update URL hash without scrolling (smooth scroll handles the scroll)
      history.pushState(null, '', '#' + id);
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeId.set(id);
    }
  }

  getItemClass(item: TocItem): string {
    return cn(
      'transition-all duration-200',
      item.level === 3 ? 'pl-4' : 'pl-0'
    );
  }
}
