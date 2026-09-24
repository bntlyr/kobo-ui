#!/usr/bin/env tsx
/**
 * Kobo UI — Registry Builder
 *
 * Crawls src/app/components/ui/ and emits JSON registry files to public/registry/.
 *
 * Usage:
 *   npx tsx scripts/build-registry.ts
 *   npm run registry:build
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, relative, extname, basename } from 'path';

// ---- Types ----

interface RegistryFile {
  path: string;
  content: string;
  type: 'component' | 'directive' | 'service' | 'util' | 'style';
}

interface RegistryItem {
  name: string;
  description: string;
  type: 'directive' | 'component' | 'compound';
  selector?: string;
  dependencies: string[];
  devDependencies: string[];
  files: RegistryFile[];
  tags: string[];
}

interface RegistryIndex {
  version: string;
  generated: string;
  components: Array<{
    name: string;
    description: string;
    type: string;
    tags: string[];
  }>;
}

// ---- Config ----

const ROOT = resolve(process.cwd());
const COMPONENTS_DIR = join(ROOT, 'src', 'app', 'components', 'ui');
const OUTPUT_DIR     = join(ROOT, 'public', 'registry');
const PACKAGE_JSON   = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));

// Metadata per component (augmented by the builder)
const COMPONENT_META: Record<string, Partial<RegistryItem>> = {
  button: {
    description: 'An accessible button directive with multiple variants and sizes.',
    type: 'directive',
    selector: 'button[k-button], a[k-button]',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    tags: ['form', 'interactive', 'primitive'],
  },
  badge: {
    description: 'A small status badge directive with semantic color variants.',
    type: 'directive',
    selector: 'span[k-badge]',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge'],
    tags: ['display', 'primitive'],
  },
  input: {
    description: 'A styled input directive fully compatible with Angular Reactive Forms.',
    type: 'directive',
    selector: 'input[k-input]',
    dependencies: ['clsx', 'tailwind-merge'],
    tags: ['form', 'primitive'],
  },
  card: {
    description: 'A composable card compound component with header, content, and footer slots.',
    type: 'compound',
    dependencies: ['clsx', 'tailwind-merge'],
    tags: ['layout', 'container'],
  },
  dialog: {
    description: 'An accessible dialog built on @angular/cdk/dialog with focus trapping and ESC-to-close.',
    type: 'compound',
    dependencies: ['@angular/cdk', 'clsx', 'tailwind-merge'],
    tags: ['overlay', 'accessible', 'interactive'],
  },
  'app-sidebar': {
    description: 'A pre-configured, ready-to-use sidebar component that automatically maps router configurations to navigation items.',
    type: 'component',
    selector: 'app-sidebar',
    dependencies: ['sidebar', '@lucide/angular'],
    tags: ['navigation', 'layout', 'ready-to-use'],
  },
  'app-header': {
    description: 'A pre-configured, ready-to-use header component for application shells.',
    type: 'component',
    selector: 'app-header',
    dependencies: ['@angular/router'],
    tags: ['navigation', 'layout', 'ready-to-use'],
  },
};

// ---- Helpers ----

function getFileType(filename: string): RegistryFile['type'] {
  if (filename.includes('.directive.')) return 'directive';
  if (filename.includes('.service.'))  return 'service';
  if (filename === 'index.ts')          return 'util';
  if (extname(filename) === '.css')     return 'style';
  return 'component';
}

function readComponentFiles(componentDir: string): RegistryFile[] {
  const files: RegistryFile[] = [];

  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (['.ts', '.css', '.html'].includes(extname(entry))) {
        files.push({
          path:    relative(ROOT, fullPath).replace(/\\/g, '/'),
          content: readFileSync(fullPath, 'utf-8'),
          type:    getFileType(entry),
        });
      }
    }
  }

  walk(componentDir);
  return files;
}

// ---- Main ----

function buildRegistry(): void {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created output directory: ${relative(ROOT, OUTPUT_DIR)}`);
  }

  const indexItems: RegistryIndex['components'] = [];

  for (const componentName of readdirSync(COMPONENTS_DIR)) {
    const componentDir = join(COMPONENTS_DIR, componentName);
    if (!statSync(componentDir).isDirectory()) continue;

    console.log(`\n📦 Processing: ${componentName}`);

    const meta = COMPONENT_META[componentName] ?? {};
    const files = readComponentFiles(componentDir);

    const item: RegistryItem = {
      name:            componentName,
      description:     meta.description ?? `${componentName} component`,
      type:            meta.type ?? 'component',
      selector:        meta.selector,
      dependencies:    meta.dependencies ?? [],
      devDependencies: meta.devDependencies ?? [],
      files,
      tags:            meta.tags ?? [],
    };

    // Write per-component JSON
    const outputPath = join(OUTPUT_DIR, `${componentName}.json`);
    writeFileSync(outputPath, JSON.stringify(item, null, 2), 'utf-8');
    console.log(`  ✓ Wrote ${relative(ROOT, outputPath)} (${files.length} file${files.length !== 1 ? 's' : ''})`);

    indexItems.push({
      name:        item.name,
      description: item.description,
      type:        item.type,
      tags:        item.tags,
    });
  }

  // Write index.json
  const index: RegistryIndex = {
    version:    PACKAGE_JSON.version,
    generated:  new Date().toISOString(),
    components: indexItems,
  };

  const indexPath = join(OUTPUT_DIR, 'index.json');
  writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`\n✅ Registry index written to ${relative(ROOT, indexPath)}`);
  console.log(`   ${indexItems.length} component${indexItems.length !== 1 ? 's' : ''} registered.\n`);
}

buildRegistry();
