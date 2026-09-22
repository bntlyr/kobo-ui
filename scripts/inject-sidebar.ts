import * as fs from 'fs';
import * as path from 'path';

const allComponents = [
  'Accordion', 'Alert', 'Alert Dialog', 'Aspect Ratio', 'Autocomplete', 'Avatar', 'Badge', 'Breadcrumb', 'Button',
  'Button Group', 'Calendar', 'Card', 'Carousel', 'Chart', 'Checkbox', 'Collapsible', 'Combobox', 'Command',
  'Context Menu', 'Data Table', 'Date Picker', 'Dialog', 'Drawer', 'Dropdown', 'Empty', 'Form Field', 'Hover Card',
  'Input', 'Input Group', 'Input OTP', 'Kbd', 'Label', 'Logo', 'Menubar', 'Messaging', 'Multi Select', 'Native Select',
  'Navigation Menu', 'Pagination', 'Password Input', 'Popover', 'Progress', 'Questionnaire', 'Radio Group', 'Resizable',
  'Scroll Area', 'Select', 'Separator', 'Sheet', 'Sidebar', 'Skeleton', 'Slider', 'Spinner', 'Switch', 'Table', 'Tabs',
  'Textarea', 'Toast', 'Toggle', 'Toggle Group', 'Tooltip', 'Typography', 'Utilities'
].sort();

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/ /g, '-');
}

let itemsStr = '      items: [\n';
for (const title of allComponents) {
  const route = '/' + toKebabCase(title);
  itemsStr += `        { label: '${title}', route: '${route}' },\n`;
}
itemsStr += '      ],\n';

const sidebarPath = path.join(process.cwd(), 'src/app/layout/sidebar.component.ts');
const content = fs.readFileSync(sidebarPath, 'utf8');

const regex = /items:\s*\[[\s\S]*?\]\,/m;
const newContent = content.replace(regex, itemsStr.trimEnd() + ',');
fs.writeFileSync(sidebarPath, newContent);
console.log('Sidebar updated');
