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

let routeObjects = '';
for (const name of components) {
  const pascalName = toPascalCase(name);
  const titleName = toTitleCase(name);
  
  routeObjects += `      {
        path: '${name}',
        loadComponent: () => import('./pages/${name}/${name}-showcase.component').then(m => m.default),
        title: '${titleName} — Kobo UI',
      },\n`;
}

const routesPath = path.join(process.cwd(), 'src/app/app.routes.ts');
const routesContent = fs.readFileSync(routesPath, 'utf8');

// Find the line with `      { path: '**', redirectTo: '' },` and inject right before it
const parts = routesContent.split('      { path: \'**\', redirectTo: \'\' },');
if (parts.length === 2) {
  const newContent = parts[0] + routeObjects + '      { path: \'**\', redirectTo: \'\' },' + parts[1];
  fs.writeFileSync(routesPath, newContent);
  console.log('Successfully injected routes!');
} else {
  console.log('Could not find injection point');
}
