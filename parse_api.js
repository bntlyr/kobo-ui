const fs = require('fs');
const path = require('path');

const components = [
  'aspect-ratio', 'calendar', 'empty', 'questionnaire', 'resizable',
  'sidebar', 'toggle-group', 'toggle', 'utilities'
];

components.forEach(comp => {
  const dirPath = path.join('src/app/components/ui', comp);
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory missing for ${comp}`);
    return;
  }
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts') && !f.endsWith('index.ts'));
  files.forEach(file => {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
    
    // Find @Component or @Directive and its class
    const matches = [...content.matchAll(/@(Component|Directive)\(\{[\s\S]*?selector:\s*['"]([^'"]+)['"][\s\S]*?\}\)[\s\S]*?export class ([A-Za-z0-9_]+)\s*(implements[^{]+)?{([\s\S]*?)(?:@Component|@Directive|@Injectable|export class|$)/g)];
    
    console.log(`\n=== ${comp} (${file}) ===`);
    matches.forEach(match => {
      const type = match[1];
      const selector = match[2];
      const className = match[3];
      const body = match[5];
      
      console.log(`\nclass ${className} (${type}, selector: ${selector})`);
      
      // Extract inputs, models, outputs
      const props = [...body.matchAll(/readonly\s+([a-zA-Z0-9_]+)\s*=\s*(input|model|output)(?:\.required)?(?:<([^>]+)>)?\(([^)]*)\)/g)];
      props.forEach(propMatch => {
        const name = propMatch[1];
        const kind = propMatch[2];
        const typeArg = propMatch[3] || 'unknown';
        const defaultVal = propMatch[4] || (kind === 'output' ? 'EventEmitter' : 'undefined');
        console.log(`  ${name} [${kind}]: ${typeArg} = ${defaultVal}`);
      });
    });
  });
});
