import * as fs from 'fs';
import * as path from 'path';

const components = [
  'aspect-ratio', 'button-group', 'input-group', 'kbd', 'native-select', 'toggle', 'toggle-group',
  'empty', 'hover-card', 'context-menu', 'menubar', 'navigation-menu', 'drawer', 'sidebar',
  'calendar', 'date-picker', 'combobox', 'command', 'input-otp', 'carousel', 'data-table',
  'resizable', 'messaging', 'utilities', 'questionnaire', 'chart'
];

function toPascalCase(str: string): string {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function toTitleCase(str: string): string {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

for (const name of components) {
  const dirPath = path.join(process.cwd(), `src/app/pages/${name}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const pascalName = toPascalCase(name);
  const titleName = toTitleCase(name);

  const fileContent = `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KTabs, KTabList, KTabTrigger, KTabContent } from '../../components/ui/tabs';

@Component({
  selector: 'app-${name}-showcase',
  standalone: true,
  imports: [KTabs, KTabList, KTabTrigger, KTabContent],
  template: \`
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">${titleName}</h1>
        <p class="text-muted-foreground mt-2">Documentation and examples for ${titleName}.</p>
      </div>

      <k-tabs value="preview">
        <k-tab-list>
          <k-tab-trigger value="preview">Preview</k-tab-trigger>
          <k-tab-trigger value="code">Code</k-tab-trigger>
        </k-tab-list>
        
        <k-tab-content value="preview" class="mt-4">
          <div class="flex min-h-[350px] items-center justify-center rounded-md border p-10">
            <p class="text-muted-foreground">${titleName} component goes here.</p>
          </div>
        </k-tab-content>
        
        <k-tab-content value="code" class="mt-4">
          <div class="rounded-md bg-muted p-4">
            <pre><code class="text-sm">&lt;!-- Code example --&gt;</code></pre>
          </div>
        </k-tab-content>
      </k-tabs>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ${pascalName}ShowcaseComponent {}
`;

  fs.writeFileSync(path.join(dirPath, `${name}-showcase.component.ts`), fileContent);
  console.log(`Created ${name} showcase.`);
}
