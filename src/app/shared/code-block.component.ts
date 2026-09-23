import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';

// Register languages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);

@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="relative group rounded-lg overflow-hidden border border-border bg-[hsl(220_13%_9%)]">
      <!-- Language badge -->
      @if (language()) {
        <div class="absolute top-3 right-12 z-10 text-xs font-mono text-muted-foreground/60 select-none">
          {{ language() }}
        </div>
      }

      <!-- Copy button -->
      <button
        (click)="copy()"
        [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
        class="absolute top-2 right-2 z-10 inline-flex items-center justify-center
               w-8 h-8 rounded-md
               text-muted-foreground hover:text-foreground
               bg-transparent hover:bg-white/10
               opacity-0 group-hover:opacity-100
               transition-all duration-150 cursor-pointer border-0"
      >
        @if (copied()) {
          <!-- Check icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        } @else {
          <!-- Copy icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        }
      </button>

      <!-- Code -->
      @if (filename()) {
        <div class="absolute top-0 left-0 right-0 px-4 py-2 text-xs font-mono text-muted-foreground/70 border-b border-border/50 bg-white/5">
          {{ filename() }}
        </div>
      }
      <pre
        #preEl
        class="overflow-x-auto p-4 text-sm font-mono leading-relaxed no-scrollbar"
        [class.pt-8]="showFilename()"
      ><code #codeEl class="hljs" [class]="'language-' + language()"></code></pre>
    </div>
  `,
  styles: [`
    :host { display: block; }

    /* Kobo dark theme for highlight.js */
    .hljs { color: #abb2bf; background: transparent; }
    .hljs-keyword, .hljs-operator { color: #c678dd; }
    .hljs-built_in, .hljs-type { color: #e5c07b; }
    .hljs-string, .hljs-attr { color: #98c379; }
    .hljs-number, .hljs-literal { color: #d19a66; }
    .hljs-comment { color: #5c6370; font-style: italic; }
    .hljs-class, .hljs-function, .hljs-title { color: #61afef; }
    .hljs-tag { color: #e06c75; }
    .hljs-name { color: #e06c75; }
    .hljs-attribute { color: #d19a66; }
    .hljs-variable, .hljs-template-variable { color: #e5c07b; }
    .hljs-selector-class { color: #d19a66; }
    .hljs-meta { color: #61afef; }
    .hljs-punctuation { color: #abb2bf; }
  `],
})
export class CodeBlockComponent implements AfterViewInit, OnChanges {
  @ViewChild('codeEl') codeEl!: ElementRef<HTMLElement>;
  @ViewChild('preEl')  preEl!:  ElementRef<HTMLElement>;

  readonly code     = input.required<string>();
  readonly language = input<string>('typescript');
  readonly filename = input<string>('');

  readonly copied  = signal(false);
  readonly showFilename = computed(() => !!this.filename());

  ngAfterViewInit(): void {
    this.highlight();
  }

  ngOnChanges(): void {
    if (this.codeEl) this.highlight();
  }

  private highlight(): void {
    if (!this.codeEl) return;
    const el = this.codeEl.nativeElement;
    el.textContent = this.code();
    hljs.highlightElement(el);
  }

  copy(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
