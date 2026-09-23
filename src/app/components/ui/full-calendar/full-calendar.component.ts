import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, computed } from '@angular/core';
import { KCalendar } from '../calendar/calendar.component';
import { KCheckbox } from '../checkbox/checkbox.component';
import { KButtonDirective } from '../button/button.directive';
import { KButtonGroup } from '../button-group/button-group.component';
import { KInputDirective } from '../input/input.directive';
import { LucideChevronLeft, LucideChevronRight, LucideSearch } from '@lucide/angular';
import { cn } from '../../../core/utils/cn';

@Component({
  selector: 'k-full-calendar',
  imports: [
    KButtonDirective, KButtonGroup, KInputDirective,
    LucideChevronLeft, LucideChevronRight, LucideSearch
  ],
  template: `
                <div class="absolute top-0 left-0 flex w-[133.33%] h-[133.33%] origin-top-left scale-75 bg-background">
                  

                  <!-- Main Calendar Area -->
                  <div class="flex-1 flex flex-col h-full overflow-hidden bg-background">
                    <!-- Top Bar -->
                    <div class="h-14 flex items-center justify-between px-6 border-b border-border shrink-0">
                      <div class="flex items-center gap-4">
                        <h2 class="text-xl font-semibold">September 2025</h2>
                        <div class="flex items-center rounded-md border border-border">
                          <button class="px-2 py-1 hover:bg-muted border-r border-border rounded-l-md"><svg lucideChevronLeft class="h-4 w-4"></svg></button>
                          <button class="px-3 py-1 text-sm font-medium hover:bg-muted border-r border-border">Today</button>
                          <button class="px-2 py-1 hover:bg-muted rounded-r-md"><svg lucideChevronRight class="h-4 w-4"></svg></button>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <k-button-group>
                          <button k-button variant="outline" size="sm" class="px-3">Day</button>
                          <button k-button variant="outline" size="sm" class="px-3">Week</button>
                          <button k-button variant="secondary" size="sm" class="px-3">Month</button>
                          <button k-button variant="outline" size="sm" class="px-3">Year</button>
                        </k-button-group>
                        <div class="relative w-48 ml-4">
                          <svg lucideSearch class="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground"></svg>
                          <input k-input class="pl-8 h-8 text-sm" placeholder="Search" />
                        </div>
                      </div>
                    </div>
                    
                    <!-- Days of Week Header -->
                    <div class="grid grid-cols-7 border-b border-border shrink-0">
                      <div class="py-2 text-center text-xs font-semibold text-muted-foreground border-r border-border">Sun</div>
                      <div class="py-2 text-center text-xs font-semibold text-muted-foreground border-r border-border">Mon</div>
                      <div class="py-2 text-center text-xs font-semibold text-muted-foreground border-r border-border">Tue</div>
                      <div class="py-2 text-center text-xs font-semibold text-muted-foreground border-r border-border">Wed</div>
                      <div class="py-2 text-center text-xs font-semibold text-muted-foreground border-r border-border">Thu</div>
                      <div class="py-2 text-center text-xs font-semibold text-muted-foreground border-r border-border">Fri</div>
                      <div class="py-2 text-center text-xs font-semibold text-muted-foreground">Sat</div>
                    </div>

                    <!-- Calendar Grid -->
                    <div class="flex-1 grid grid-cols-7 grid-rows-5 bg-border gap-px">
                      <!-- Row 1 -->
                      <div class="bg-muted/30 p-1 flex flex-col gap-1 min-h-[100px]"><span class="text-xs text-muted-foreground/50 text-right p-1">31</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">1</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">2</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">3</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">4</span>
                        <div class="px-2 py-0.5 rounded text-xs truncate bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium border-l-2 border-blue-500">10a Design Review</div>
                      </div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">5</span></div>
                      <div class="bg-muted/10 p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1 text-muted-foreground">6</span></div>

                      <!-- Row 2 -->
                      <div class="bg-muted/10 p-1 flex flex-col gap-1 min-h-[100px]"><span class="text-xs font-medium text-right p-1 text-muted-foreground">7</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">8</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1 relative"><span class="text-xs font-medium text-right p-1">9</span>
                         <!-- Multi-day event mock -->
                         <div class="absolute top-8 left-0 right-0 px-2 py-0.5 rounded-sm text-xs truncate bg-purple-500/10 text-purple-700 dark:text-purple-400 font-medium z-10">Conference</div>
                      </div>
                      <div class="bg-background p-1 flex flex-col gap-1 relative"><span class="text-xs font-medium text-right p-1">10</span>
                         <div class="absolute top-8 left-0 right-0 px-2 py-0.5 rounded-sm text-xs truncate bg-purple-500/10 text-transparent z-10">-</div>
                      </div>
                      <div class="bg-background p-1 flex flex-col gap-1 relative"><span class="text-xs font-medium text-right p-1">11</span>
                         <div class="absolute top-8 left-0 right-1 px-2 py-0.5 rounded-r text-xs truncate bg-purple-500/10 text-transparent z-10">-</div>
                      </div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">12</span></div>
                      <div class="bg-muted/10 p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1 text-muted-foreground">13</span></div>

                      <!-- Row 3 -->
                      <div class="bg-muted/10 p-1 flex flex-col gap-1 min-h-[100px]"><span class="text-xs font-medium text-right p-1 text-muted-foreground">14</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">15</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-bold text-right w-6 h-6 rounded-full bg-primary text-primary-foreground ml-auto flex items-center justify-center mt-1 mr-1">16</span>
                        <div class="px-2 py-0.5 rounded text-xs truncate bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium border-l-2 border-blue-500">1:30p Sync</div>
                        <div class="px-2 py-0.5 rounded text-xs truncate bg-green-500/10 text-green-700 dark:text-green-400 font-medium border-l-2 border-green-500">4p Dentist</div>
                      </div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">17</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">18</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">19</span></div>
                      <div class="bg-muted/10 p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1 text-muted-foreground">20</span></div>

                      <!-- Row 4 -->
                      <div class="bg-muted/10 p-1 flex flex-col gap-1 min-h-[100px]"><span class="text-xs font-medium text-right p-1 text-muted-foreground">21</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">22</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">23</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">24</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">25</span>
                        <div class="px-2 py-0.5 rounded text-xs truncate bg-orange-500/10 text-orange-700 dark:text-orange-400 font-medium border-l-2 border-orange-500">Mom's Bday</div>
                      </div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">26</span></div>
                      <div class="bg-muted/10 p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1 text-muted-foreground">27</span></div>

                      <!-- Row 5 -->
                      <div class="bg-muted/10 p-1 flex flex-col gap-1 min-h-[100px]"><span class="text-xs font-medium text-right p-1 text-muted-foreground">28</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">29</span></div>
                      <div class="bg-background p-1 flex flex-col gap-1"><span class="text-xs font-medium text-right p-1">30</span></div>
                      <div class="bg-muted/30 p-1 flex flex-col gap-1"><span class="text-xs text-muted-foreground/50 text-right p-1">1</span></div>
                      <div class="bg-muted/30 p-1 flex flex-col gap-1"><span class="text-xs text-muted-foreground/50 text-right p-1">2</span></div>
                      <div class="bg-muted/30 p-1 flex flex-col gap-1"><span class="text-xs text-muted-foreground/50 text-right p-1">3</span></div>
                      <div class="bg-muted/30 p-1 flex flex-col gap-1"><span class="text-xs text-muted-foreground/50 text-right p-1">4</span></div>
                    </div>
                  </div>

                </div>

  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KFullCalendar {
  readonly class = input<string>('');
  
  protected readonly classes = computed(() => cn('block relative overflow-hidden w-full h-full', this.class()));
}
