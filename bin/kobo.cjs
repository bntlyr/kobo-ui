#!/usr/bin/env node

/**
 * Kobo UI CLI (工房)
 *
 * Usage:
 *   npx kobo init               Automatically initialize Kobo UI in your project
 *   npx kobo add <component>    Add components directly to your project (copy-and-own)
 *   npx kobo add --all          Add all 65 components to your project
 *   npx kobo skills             Generate AGENTS.md for AI coding assistants
 *   npx kobo skills --agents    Generate .agents/AGENTS.md
 *   npx kobo skills --cursor    Generate .cursorrules
 *   npx kobo skills --skill     Generate .agents/skills/kobo-ui/SKILL.md
 *   npx kobo skills --dest <p>  Generate at custom destination file path
 *   npx kobo skills --print     Print AGENTS.md content to stdout
 *   npx kobo list               List all 65 available components & directives
 *   npx kobo help               Show this help message
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CN_TS_CONTENT = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx for conditional logic,
 * then deduplicates Tailwind classes using tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`;

const TAILWIND_THEME_CONFIG = `
/* --- Kobo UI Tailwind CSS v4 Configuration --- */
@import "tailwindcss";
@import "kobo-ui/assets/tokens.css";
@import "kobo-ui/assets/themes.css";

@theme {
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
}
`;

const KOBO_JSON_TEMPLATE = `{
  "$schema": "https://kobo-ui.dev/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/styles.css",
    "baseColor": "zinc"
  },
  "aliases": {
    "components": "src/app/components/ui",
    "utils": "src/app/core/utils",
    "styles": "src/styles"
  }
}
`;

const args = process.argv.slice(2);
const command = args[0] || 'help';

function findAgentsMdContent() {
  const possiblePaths = [
    path.resolve(__dirname, '../AGENTS.md'),
    path.resolve(__dirname, '../../AGENTS.md'),
    path.resolve(__dirname, '../dist/kobo-ui/AGENTS.md'),
    path.resolve(__dirname, 'AGENTS.md'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf-8');
    }
  }

  return null;
}

function findTokensCssContent() {
  const possiblePaths = [
    path.resolve(__dirname, '../src/styles/tokens.css'),
    path.resolve(__dirname, '../../src/styles/tokens.css'),
    path.resolve(__dirname, '../assets/tokens.css'),
    path.resolve(__dirname, '../tokens.css'),
    path.resolve(__dirname, 'tokens.css'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf-8');
    }
  }

  return null;
}

function findThemesCssContent() {
  const possiblePaths = [
    path.resolve(__dirname, '../src/styles/themes.css'),
    path.resolve(__dirname, '../../src/styles/themes.css'),
    path.resolve(__dirname, '../assets/themes.css'),
    path.resolve(__dirname, '../themes.css'),
    path.resolve(__dirname, 'themes.css'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return fs.readFileSync(p, 'utf-8');
    }
  }

  return null;
}

function findRegistryItem(componentName) {
  const normName = componentName.toLowerCase().trim();
  const possibleRegistryDirs = [
    path.resolve(__dirname, '../registry'),
    path.resolve(__dirname, '../public/registry'),
    path.resolve(__dirname, '../../public/registry'),
    path.resolve(__dirname, 'registry'),
  ];

  for (const dir of possibleRegistryDirs) {
    const jsonPath = path.join(dir, `${normName}.json`);
    if (fs.existsSync(jsonPath)) {
      try {
        return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      } catch {
        // continue
      }
    }
  }

  // Fallback: Check if local source exists in src/app/components/ui/
  const possibleSourceDirs = [
    path.resolve(__dirname, '../src/app/components/ui', normName),
    path.resolve(__dirname, '../../src/app/components/ui', normName),
  ];

  for (const srcDir of possibleSourceDirs) {
    if (fs.existsSync(srcDir) && fs.statSync(srcDir).isDirectory()) {
      const files = [];
      function walk(d) {
        for (const f of fs.readdirSync(d)) {
          const fp = path.join(d, f);
          if (fs.statSync(fp).isDirectory()) {
            walk(fp);
          } else {
            const rel = path.relative(path.resolve(__dirname, '..'), fp).replace(/\\/g, '/');
            files.push({
              path: rel,
              content: fs.readFileSync(fp, 'utf-8'),
            });
          }
        }
      }
      walk(srcDir);
      return {
        name: normName,
        dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge', '@angular/cdk', '@lucide/angular'],
        files,
      };
    }
  }

  return null;
}

function getAllRegistryNames() {
  const names = new Set();
  const possibleRegistryDirs = [
    path.resolve(__dirname, '../registry'),
    path.resolve(__dirname, '../public/registry'),
    path.resolve(__dirname, '../../public/registry'),
  ];

  for (const dir of possibleRegistryDirs) {
    if (fs.existsSync(dir)) {
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith('.json') && f !== 'index.json') {
          names.add(f.replace('.json', ''));
        }
      }
    }
  }

  return Array.from(names).sort();
}

function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb')) || fs.existsSync(path.join(cwd, 'bun.lock'))) return 'bun';
  return 'npm';
}

function findOrCreateStylesFile(cwd) {
  const candidates = [
    'src/styles.css',
    'src/styles.scss',
    'src/app/app.css',
    'src/app/app.scss',
    'src/styles/styles.css',
    'styles.css',
  ];

  for (const c of candidates) {
    const full = path.join(cwd, c);
    if (fs.existsSync(full)) {
      return full;
    }
  }

  // Create default src/styles.css
  const defaultPath = path.join(cwd, 'src/styles.css');
  const dir = path.dirname(defaultPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(defaultPath, '', 'utf-8');
  return defaultPath;
}

function printHelp() {
  console.log(`
\x1b[1m\x1b[36mKobo UI CLI (工房)\x1b[0m — Modern Angular 18+ Component Library

\x1b[1mCOMMANDS:\x1b[0m
  \x1b[32mnpx kobo init\x1b[0m                 Automatically set up Tailwind v4, tokens, cn(), kobo.json, and AI skills
  \x1b[32mnpx kobo set <layout>\x1b[0m         Set up layout components like app-sidebar or app-header
  \x1b[32mnpx kobo set theme <mode>\x1b[0m       Set application theme mode: dark, light, or both
  \x1b[32mnpx kobo set color-theme <c>\x1b[0m    Set base color theme: rose, blue, zinc, etc.
  \x1b[32mnpx kobo add <name...>\x1b[0m        Add component(s) directly to your project (e.g. button, dialog, card)
  \x1b[32mnpx kobo add --all\x1b[0m            Add all 65 components to your project
  \x1b[32mnpx kobo skills\x1b[0m               Generate AGENTS.md for AI coding assistants
  \x1b[32mnpx kobo skills --agents\x1b[0m      Generate .agents/AGENTS.md
  \x1b[32mnpx kobo skills --cursor\x1b[0m      Generate .cursorrules
  \x1b[32mnpx kobo skills --skill\x1b[0m       Generate .agents/skills/kobo-ui/SKILL.md
  \x1b[32mnpx kobo skills --dest <p>\x1b[0m    Generate at custom destination file path
  \x1b[32mnpx kobo skills --print\x1b[0m       Print markdown directly to stdout
  \x1b[32mnpx kobo list\x1b[0m                 List all 65 components & directives
  \x1b[32mnpx kobo help\x1b[0m                 Show this help message

\x1b[1mEXAMPLES:\x1b[0m
  $ npx kobo init
  $ npx kobo add button
  $ npx kobo add dialog card toast
  $ npx kobo skills
`);
}

function handleInit() {
  console.log('\n\x1b[1m\x1b[36m🚀 Initializing Kobo UI in your project...\x1b[0m\n');
  const cwd = process.cwd();
  const skipInstall = args.includes('--skip-install') || args.includes('--no-install');

  // 1. Generate src/styles/tokens.css and src/styles/themes.css
  const stylesDir = path.resolve(cwd, 'src/styles');
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  const tokensContent = findTokensCssContent();
  const tokensPath = path.join(stylesDir, 'tokens.css');
  if (tokensContent && !fs.existsSync(tokensPath)) {
    fs.writeFileSync(tokensPath, tokensContent, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Generated semantic design tokens in \x1b[36msrc/styles/tokens.css\x1b[0m`);
  } else if (fs.existsSync(tokensPath)) {
    console.log(`\x1b[33mℹ\x1b[0m src/styles/tokens.css already exists`);
  }

  const themesContent = findThemesCssContent();
  const themesPath = path.join(stylesDir, 'themes.css');
  if (themesContent && !fs.existsSync(themesPath)) {
    fs.writeFileSync(themesPath, themesContent, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Generated color themes in \x1b[36msrc/styles/themes.css\x1b[0m`);
  } else if (fs.existsSync(themesPath)) {
    console.log(`\x1b[33mℹ\x1b[0m src/styles/themes.css already exists`);
  }

  // 2. Configure Tailwind CSS v4 in src/styles.css
  const stylesFilePath = findOrCreateStylesFile(cwd);
  const existingStyles = fs.readFileSync(stylesFilePath, 'utf-8');

  if (!existingStyles.includes('--color-primary')) {
    let newStyles = existingStyles;
    // Remove duplicate @import "tailwindcss"; if already present
    if (newStyles.includes('@import "tailwindcss"') || newStyles.includes("@import 'tailwindcss'")) {
      newStyles = newStyles.replace(/@import\s+['"]tailwindcss['"];?/g, '');
    }

    const isLocalTokens = fs.existsSync(tokensPath);
    const tokensImport = isLocalTokens ? '@import "./styles/tokens.css";' : '@import "kobo-ui/assets/tokens.css";';
    const themesImport = isLocalTokens ? '@import "./styles/themes.css";' : '@import "kobo-ui/assets/themes.css";';

    const themeBlock = `
/* --- Kobo UI Tailwind CSS v4 Configuration --- */
@import "tailwindcss";
${tokensImport}
${themesImport}

@theme {
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  /* Sidebar */
  --color-sidebar: hsl(var(--sidebar-background));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-primary: hsl(var(--sidebar-primary));
  --color-sidebar-primary-foreground: hsl(var(--sidebar-primary-foreground));
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-ring: hsl(var(--sidebar-ring));
}
`;
    newStyles = `${themeBlock.trim()}\n\n${newStyles.trim()}\n`;
    fs.writeFileSync(stylesFilePath, newStyles, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Configured Tailwind CSS v4 & theme tokens in \x1b[36m${path.relative(cwd, stylesFilePath) || stylesFilePath}\x1b[0m`);
  } else {
    console.log(`\x1b[33mℹ\x1b[0m Tailwind CSS theme tokens already present in \x1b[36m${path.relative(cwd, stylesFilePath) || stylesFilePath}\x1b[0m`);
  }

  // 2. Create src/app/core/utils/cn.ts
  const cnPath = path.resolve(cwd, 'src/app/core/utils/cn.ts');
  if (!fs.existsSync(cnPath)) {
    fs.mkdirSync(path.dirname(cnPath), { recursive: true });
    fs.writeFileSync(cnPath, CN_TS_CONTENT, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Created cn() utility in \x1b[36msrc/app/core/utils/cn.ts\x1b[0m`);
  } else {
    console.log(`\x1b[33mℹ\x1b[0m cn() utility already exists in \x1b[36msrc/app/core/utils/cn.ts\x1b[0m`);
  }

  // 3. Create kobo.json
  const koboJsonPath = path.resolve(cwd, 'kobo.json');
  if (!fs.existsSync(koboJsonPath)) {
    fs.writeFileSync(koboJsonPath, KOBO_JSON_TEMPLATE, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Created configuration file \x1b[36mkobo.json\x1b[0m`);
  } else {
    console.log(`\x1b[33mℹ\x1b[0m \x1b[36mkobo.json\x1b[0m already exists`);
  }

  // 4. Create AGENTS.md
  const agentsContent = findAgentsMdContent();
  if (agentsContent) {
    const agentsPath = path.resolve(cwd, 'AGENTS.md');
    fs.writeFileSync(agentsPath, agentsContent, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Created AI Agent Guidelines in \x1b[36mAGENTS.md\x1b[0m`);
  }

  // 5. Install peer dependencies if missing
  const pkgJsonPath = path.resolve(cwd, 'package.json');
  const requiredDeps = ['@angular/cdk', '@lucide/angular', 'tailwind-merge', 'clsx', 'class-variance-authority'];
  const missingDeps = [];

  if (fs.existsSync(pkgJsonPath)) {
    try {
      const userPkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
      const installed = {
        ...(userPkg.dependencies || {}),
        ...(userPkg.devDependencies || {}),
      };

      const angularCoreVersion = installed['@angular/core'] || '';
      for (const dep of requiredDeps) {
        if (!installed[dep]) {
          if (dep === '@angular/cdk' && angularCoreVersion) {
            missingDeps.push(`${dep}@${angularCoreVersion}`);
          } else {
            missingDeps.push(dep);
          }
        }
      }
    } catch {
      // ignore
    }
  }

  if (missingDeps.length > 0 && !skipInstall) {
    const pm = detectPackageManager(cwd);
    console.log(`\n\x1b[36m📦 Installing required dependencies (${missingDeps.join(', ')})...\x1b[0m\n`);
    try {
      let installCmd = `${pm} install ${missingDeps.join(' ')}`;
      if (pm === 'yarn') installCmd = `yarn add ${missingDeps.join(' ')}`;
      if (pm === 'pnpm') installCmd = `pnpm add ${missingDeps.join(' ')}`;
      if (pm === 'bun') installCmd = `bun add ${missingDeps.join(' ')}`;

      execSync(installCmd, { stdio: 'inherit', cwd });
      console.log(`\x1b[32m✔\x1b[0m Dependencies installed successfully!`);
    } catch (err) {
      console.warn(`\x1b[33m⚠ Note:\x1b[0m Could not auto-install dependencies. Please run manually:`);
      console.log(`  \x1b[32mnpm install ${missingDeps.join(' ')}\x1b[0m\n`);
    }
  } else if (missingDeps.length > 0 && skipInstall) {
    console.log(`\n\x1b[1mPlease install missing dependencies:\x1b[0m`);
    console.log(`  npm install ${missingDeps.join(' ')}\n`);
  }

  console.log(`
\x1b[32m✨ Kobo UI is fully configured and ready to use!\x1b[0m

\x1b[1mWhat you can do next:\x1b[0m
  1. Add UI components to your project:
     \x1b[32mnpx kobo add button\x1b[0m
     \x1b[32mnpx kobo add dialog card toast select\x1b[0m
  2. Or import directly from \x1b[33m'kobo-ui'\x1b[0m if installed as a package!
  3. Your AI agent (Antigravity / Cursor / Claude) is ready with \x1b[36mAGENTS.md\x1b[0m!
`);
}

function handleAdd() {
  const componentArgs = args.slice(1).filter(a => !a.startsWith('-'));
  const isAll = args.includes('--all') || args.includes('-a');
  const isOverwrite = args.includes('--overwrite') || args.includes('-y') || args.includes('--force');

  let componentsToAdd = componentArgs;
  if (isAll) {
    componentsToAdd = getAllRegistryNames();
  } else if (componentsToAdd.includes('template-starter')) {
    componentsToAdd = componentsToAdd.filter(c => c !== 'template-starter');
    if (!componentsToAdd.includes('app-sidebar')) componentsToAdd.push('app-sidebar');
    if (!componentsToAdd.includes('app-header')) componentsToAdd.push('app-header');
  }

  if (componentsToAdd.length === 0) {
    console.error('\x1b[31mError:\x1b[0m Please specify which component(s) to add.');
    console.log('Example: \x1b[32mnpx kobo add button\x1b[0m or \x1b[32mnpx kobo add dialog card\x1b[0m');
    console.log('Run \x1b[33mnpx kobo list\x1b[0m to see all available components.');
    process.exit(1);
  }

  const cwd = process.cwd();

  // Ensure src/app/core/utils/cn.ts exists
  const cnPath = path.resolve(cwd, 'src/app/core/utils/cn.ts');
  if (!fs.existsSync(cnPath)) {
    fs.mkdirSync(path.dirname(cnPath), { recursive: true });
    fs.writeFileSync(cnPath, CN_TS_CONTENT, 'utf-8');
    console.log(`\x1b[32m✔ Created utility:\x1b[0m src/app/core/utils/cn.ts`);
  }

  const addedFiles = [];
  const missingComponents = [];
  const requiredDeps = new Set();

  for (const compName of componentsToAdd) {
    const regItem = findRegistryItem(compName);
    if (!regItem) {
      missingComponents.push(compName);
      continue;
    }

    if (regItem.dependencies) {
      regItem.dependencies.forEach(d => requiredDeps.add(d));
    }

    for (const file of regItem.files) {
      const targetFilePath = path.resolve(cwd, file.path);
      const targetDirPath = path.dirname(targetFilePath);

      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath, { recursive: true });
      }

      if (fs.existsSync(targetFilePath) && !isOverwrite && !isAll) {
        // Skip or overwrite
      }

      fs.writeFileSync(targetFilePath, file.content, 'utf-8');
      addedFiles.push(path.relative(cwd, targetFilePath) || targetFilePath);
    }
  }

  if (missingComponents.length > 0) {
    console.warn(`\x1b[33m⚠ Warning: Could not find component(s):\x1b[0m ${missingComponents.join(', ')}`);
    console.log('Run \x1b[36mnpx kobo list\x1b[0m to see all available component names.');
  }

  if (addedFiles.length > 0) {
    console.log(`\n\x1b[32m✔ Added ${componentsToAdd.length - missingComponents.length} component(s) successfully!\x1b[0m\n`);
    console.log('\x1b[1mFiles written:\x1b[0m');
    addedFiles.forEach(f => console.log(`  + \x1b[36m${f}\x1b[0m`));

    // Check if any required dependencies are missing
    const pkgJsonPath = path.resolve(cwd, 'package.json');
    const missingDeps = [];

    if (fs.existsSync(pkgJsonPath)) {
      try {
        const userPkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
        const installed = {
          ...(userPkg.dependencies || {}),
          ...(userPkg.devDependencies || {}),
        };

        const angularCoreVersion = installed['@angular/core'] || '';
        for (const dep of requiredDeps) {
          if (!installed[dep]) {
            if (dep === '@angular/cdk' && angularCoreVersion) {
              missingDeps.push(`${dep}@${angularCoreVersion}`);
            } else {
              missingDeps.push(dep);
            }
          }
        }
      } catch {
        // ignore
      }
    }

    const skipInstall = args.includes('--skip-install') || args.includes('--no-install');
    if (missingDeps.length > 0 && !skipInstall) {
      const pm = detectPackageManager(cwd);
      console.log(`\n\x1b[36m📦 Installing required dependencies (${missingDeps.join(', ')})...\x1b[0m\n`);
      try {
        let installCmd = `${pm} install ${missingDeps.join(' ')}`;
        if (pm === 'yarn') installCmd = `yarn add ${missingDeps.join(' ')}`;
        if (pm === 'pnpm') installCmd = `pnpm add ${missingDeps.join(' ')}`;
        if (pm === 'bun') installCmd = `bun add ${missingDeps.join(' ')}`;

        execSync(installCmd, { stdio: 'inherit', cwd });
        console.log(`\x1b[32m✔\x1b[0m Dependencies installed successfully!`);
      } catch {
        console.warn(`\x1b[33m⚠ Note:\x1b[0m Could not auto-install dependencies. Please run: \x1b[32m${pm} install ${missingDeps.join(' ')}\x1b[0m`);
      }
    } else if (missingDeps.length > 0 && skipInstall) {
      console.log('\n\x1b[1mPlease install required dependencies:\x1b[0m');
      console.log(`  npm install ${missingDeps.join(' ')}`);
    }

    // Automatic injection logic for layout components
    const hasSidebar = componentsToAdd.includes('app-sidebar');
    const hasHeader = componentsToAdd.includes('app-header');

    if (hasSidebar || hasHeader) {
      // 1. Detect root component
      let appCompPath = null;
      if (fs.existsSync(path.resolve(cwd, 'src/app/app.ts'))) {
        appCompPath = path.resolve(cwd, 'src/app/app.ts');
      } else if (fs.existsSync(path.resolve(cwd, 'src/app/app.component.ts'))) {
        appCompPath = path.resolve(cwd, 'src/app/app.component.ts');
      }

      if (appCompPath) {
        let appCompContent = fs.readFileSync(appCompPath, 'utf-8');

        // 2. Determine shell template based on what's installed
        // We will generate a smart shell component
        let shellImports = ["RouterOutlet"];
        let shellDeclarations = [];
        let shellTemplate = "";

        if (hasSidebar) {
          shellImports.push("AppSidebarComponent", "KSidebarProvider");
          shellDeclarations.push("import { AppSidebarComponent } from '../components/ui/app-sidebar/app-sidebar.component';");
          shellDeclarations.push("import { KSidebarProvider } from '../components/ui/sidebar';");
        }
        if (hasHeader) {
          shellImports.push("AppHeaderComponent");
          shellDeclarations.push("import { AppHeaderComponent } from '../components/ui/app-header/app-header.component';");
        }

        const sidebarOnly = `<k-sidebar-provider class="min-h-screen bg-background text-foreground flex w-full">\n      <app-sidebar />\n      <main class="flex-1 w-full relative p-2">\n        <router-outlet />\n      </main>\n    </k-sidebar-provider>`;
        const headerOnly = `<div class="min-h-screen flex flex-col bg-background text-foreground pt-14">\n      <div class="fixed top-0 left-0 right-0 z-50 border-b border-sidebar-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">\n        <app-header />\n      </div>\n      <main class="flex-1 w-full relative p-2">\n        <router-outlet />\n      </main>\n    </div>`;
        const both = `<div class="min-h-screen flex flex-col bg-background text-foreground pt-14">\n      <div class="fixed top-0 left-0 right-0 z-50 border-b border-sidebar-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">\n        <app-header />\n      </div>\n      <k-sidebar-provider class="flex-1 flex w-full">\n        <app-sidebar class="top-14 h-[calc(100vh-3.5rem)]" />\n        <main class="flex-1 w-full relative p-2">\n          <router-outlet />\n        </main>\n      </k-sidebar-provider>\n    </div>`;

        if (hasSidebar && hasHeader) {
          shellTemplate = both;
        } else if (hasSidebar) {
          shellTemplate = sidebarOnly;
        } else {
          shellTemplate = headerOnly;
        }

        // Check if shell already exists to upgrade it gracefully
        const shellPath = path.resolve(cwd, 'src/app/layout/shell.component.ts');
        let writeShell = true;

        if (fs.existsSync(shellPath)) {
          const existingShell = fs.readFileSync(shellPath, 'utf-8');
          const hasExistingSidebar = existingShell.includes('<app-sidebar');
          const hasExistingHeader = existingShell.includes('<app-header');

          if (hasExistingSidebar && hasHeader && !hasExistingHeader) {
            // upgrading to both
            shellTemplate = both;
            if (!shellImports.includes("AppSidebarComponent")) {
              shellImports.push("AppSidebarComponent", "KSidebarProvider");
              shellDeclarations.push("import { AppSidebarComponent } from '../components/ui/app-sidebar/app-sidebar.component';");
              shellDeclarations.push("import { KSidebarProvider } from '../components/ui/sidebar';");
            }
          } else if (hasExistingHeader && hasSidebar && !hasExistingSidebar) {
            // upgrading to both
            shellTemplate = both;
            if (!shellImports.includes("AppHeaderComponent")) {
              shellImports.push("AppHeaderComponent");
              shellDeclarations.push("import { AppHeaderComponent } from '../components/ui/app-header/app-header.component';");
            }
          } else if ((hasExistingSidebar && hasSidebar) || (hasExistingHeader && hasHeader)) {
            // No upgrade needed
            writeShell = false;
          }
        }

        if (writeShell) {
          const shellDir = path.dirname(shellPath);
          if (!fs.existsSync(shellDir)) fs.mkdirSync(shellDir, { recursive: true });

          const shellComponentCode = `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
${shellDeclarations.join('\n')}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [${shellImports.join(', ')}],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    ${shellTemplate}
  \`
})
export class ShellComponent {}
`;
          fs.writeFileSync(shellPath, shellComponentCode, 'utf-8');
          console.log(`\x1b[32m✔\x1b[0m Generated layout wrapper at \x1b[36msrc/app/layout/shell.component.ts\x1b[0m`);
        }

        // 3. Update Root Component to use ShellComponent
        let modified = false;
        if (!appCompContent.includes('ShellComponent')) {
          const importShell = `import { ShellComponent } from './layout/shell.component';\n`;
          appCompContent = importShell + appCompContent;

          appCompContent = appCompContent.replace(/imports:\s*\[([\s\S]*?)\]/, (match, p1) => {
            const extra = p1.trim() ? p1 + ', ShellComponent' : 'ShellComponent';
            return `imports: [${extra}]`;
          });
          modified = true;
        }

        // 4. Overwrite Root Template
        let hasExternalTemplate = false;
        const possibleHtmlPaths = [
          path.resolve(cwd, 'src/app/app.component.html'),
          path.resolve(cwd, 'src/app/app.html')
        ];

        let targetHtmlPath = null;
        let templateContent = appCompContent;

        const templateUrlMatch = appCompContent.match(/templateUrl:\s*['"](.*?)['"]/);
        if (templateUrlMatch) {
          hasExternalTemplate = true;
          const relativeHtmlPath = templateUrlMatch[1];
          const resolvedPath = path.resolve(path.dirname(appCompPath), relativeHtmlPath);
          if (fs.existsSync(resolvedPath)) {
            targetHtmlPath = resolvedPath;
            templateContent = fs.readFileSync(targetHtmlPath, 'utf-8');
          } else {
            for (const p of possibleHtmlPaths) {
              if (fs.existsSync(p)) {
                targetHtmlPath = p;
                templateContent = fs.readFileSync(p, 'utf-8');
                break;
              }
            }
          }
        }

        if (!templateContent.includes('<app-shell')) {
          if (hasExternalTemplate && targetHtmlPath) {
            fs.writeFileSync(targetHtmlPath, '<app-shell />', 'utf-8');
            console.log(`\x1b[32m✔\x1b[0m Replaced boilerplate with <app-shell /> in \x1b[36m${path.relative(cwd, targetHtmlPath)}\x1b[0m`);
          } else {
            appCompContent = appCompContent.replace(/template:\s*`[\s\S]*?`/g, "template: `<app-shell />`");
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(appCompPath, appCompContent, 'utf-8');
          console.log(`\x1b[32m✔\x1b[0m Injected ShellComponent into \x1b[36m${path.relative(cwd, appCompPath)}\x1b[0m`);
        }
      }
    }

    // Setup generic routes for app-sidebar to read if empty
    if (hasSidebar) {
      const routesPath = path.resolve(cwd, 'src/app/app.routes.ts');
      if (fs.existsSync(routesPath)) {
        let routesContent = fs.readFileSync(routesPath, 'utf-8');
        // if routes is empty: \`export const routes: Routes = [];\`
        if (/export const routes:\s*Routes\s*=\s*\[\s*\];/.test(routesContent)) {
          // 1. Create the dashboard component in src/app/pages/dashboard
          const dashboardDir = path.resolve(cwd, 'src/app/pages/dashboard');
          if (!fs.existsSync(dashboardDir)) {
            fs.mkdirSync(dashboardDir, { recursive: true });
          }
          const dashboardCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: \`
    <div class="p-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
      <p class="text-muted-foreground">Welcome to your new Kobo UI application.</p>
    </div>
  \`
})
export class DashboardComponent {}
`;
          fs.writeFileSync(path.resolve(dashboardDir, 'dashboard.component.ts'), dashboardCode, 'utf-8');

          // 2. Update app.routes.ts cleanly
          const dashboardRouteCode = `import { LucideLayoutDashboard } from '@lucide/angular';\n\nexport const routes: Routes = [\n  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },\n  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent), data: { title: 'Dashboard', icon: LucideLayoutDashboard } }\n];`;
          routesContent = routesContent.replace(/export const routes:\s*Routes\s*=\s*\[\s*\];/, dashboardRouteCode);
          fs.writeFileSync(routesPath, routesContent, 'utf-8');
          console.log(`\x1b[32m✔\x1b[0m Scaffolded a default Dashboard route in \x1b[36msrc/app/app.routes.ts\x1b[0m`);
        }
      }
    }

    console.log(`
\x1b[1mNext Steps:\x1b[0m
  1. Import components into your standalone Angular component.
  2. Run \x1b[32mnpx kobo skills\x1b[0m to give your AI agent guidelines on using them!
`);
  }
}

function handleSkills() {
  const isPrint = args.includes('--print') || args.includes('-p');
  const isAgents = args.includes('--agents');
  const isCursor = args.includes('--cursor');
  const isSkill = args.includes('--skill');

  let customDest = null;
  const destIndex = args.findIndex(a => a === '--dest' || a === '-d' || a === '--output' || a === '-o');
  if (destIndex !== -1 && args[destIndex + 1]) {
    customDest = args[destIndex + 1];
  }

  const content = findAgentsMdContent();
  if (!content) {
    console.error('\x1b[31mError:\x1b[0m Could not locate AGENTS.md template in the package.');
    process.exit(1);
  }

  if (isPrint) {
    process.stdout.write(content);
    return;
  }

  const cwd = process.cwd();
  let targetPath;

  if (customDest) {
    targetPath = path.resolve(cwd, customDest);
  } else if (isCursor) {
    targetPath = path.resolve(cwd, '.cursorrules');
  } else if (isAgents) {
    targetPath = path.resolve(cwd, '.agents/AGENTS.md');
  } else if (isSkill) {
    targetPath = path.resolve(cwd, '.agents/skills/kobo-ui/SKILL.md');
  } else {
    targetPath = path.resolve(cwd, 'AGENTS.md');
  }

  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let finalContent = content;
  if (isSkill) {
    const yamlFrontmatter = `---
name: kobo-ui
description: Guidelines and component catalogue for building Angular 18+ applications with the Kobo UI library, Tailwind CSS v4, and CDK.
---

`;
    finalContent = yamlFrontmatter + content;
  }

  fs.writeFileSync(targetPath, finalContent, 'utf-8');

  console.log(`
\x1b[32m✔ Successfully generated AI Agent Guidelines!\x1b[0m
\x1b[1mFile created:\x1b[0m \x1b[36m${path.relative(cwd, targetPath) || targetPath}\x1b[0m

AI agents (Antigravity, Cursor, Claude Code, Copilot, Windsurf) in your project
will now understand how to use, import, and style Kobo UI components!

\x1b[1mQuick Verification:\x1b[0m
  - Import components from \x1b[33m'kobo-ui'\x1b[0m (or your local component paths)
  - Configure \x1b[33msrc/styles.css\x1b[0m with \x1b[33m@import "kobo-ui/assets/tokens.css";\x1b[0m
`);
}

function handleList() {
  const components = [
    { category: 'Primitives', items: ['Button (KButtonDirective)', 'ButtonGroup (KButtonGroup)', 'Badge (KBadgeDirective)', 'Input (KInputDirective)', 'Textarea (KTextareaDirective)', 'Label (KLabelDirective)', 'Separator (KSeparatorDirective)', 'Skeleton (KSkeletonDirective)', 'Avatar (KAvatar)', 'Card (KCard)', 'Kbd (KKbdDirective)', 'AspectRatio (KAspectRatio)'] },
    { category: 'Form Controls', items: ['FormField (KFormField)', 'Checkbox (KCheckbox)', 'Switch (KSwitch)', 'RadioGroup (KRadioGroup)', 'Slider (KSlider)', 'Select (KSelect)', 'NativeSelect (KNativeSelectDirective)', 'MultiSelect (KMultiSelect)', 'Combobox (KCombobox)', 'Autocomplete (KAutocomplete)', 'InputOtp (KInputOtp)', 'PasswordInput (KPasswordInput)', 'DatePicker (KDatePicker)', 'TimePicker (KTimePicker)'] },
    { category: 'Overlays & Popups', items: ['Dialog (KDialogService, KDialog)', 'AlertDialog (KAlertDialogService)', 'Sheet/Drawer (KSheetService, KSheet)', 'Dropdown (KDropdownTrigger)', 'Popover (KPopoverTrigger)', 'Tooltip (KTooltipDirective)', 'HoverCard (KHoverCardTrigger)', 'ContextMenu (KContextMenuTrigger)', 'Menubar (KMenubar)'] },
    { category: 'Feedback', items: ['Alert (KAlert)', 'Toast (KToastService, KToaster)', 'Progress (KProgress)', 'Spinner (KSpinner)', 'Empty (KEmpty)'] },
    { category: 'Navigation & Layout', items: ['Tabs (KTabs)', 'Accordion (KAccordion)', 'Collapsible (KCollapsible)', 'Breadcrumb (KBreadcrumb)', 'Pagination (KPagination)', 'Sidebar (KSidebarProvider, KSidebar)', 'NavigationMenu (KNavigationMenu)', 'ScrollArea (KScrollArea)', 'Resizable (KResizablePanelGroup)'] },
    { category: 'Data & Display', items: ['Table Directives (KTableDirective)', 'DataTable (KDataTable)', 'Chart (KChart)', 'Carousel (KCarousel)', 'Questionnaire (KQuestionnaire)', 'Messaging (KMessaging)'] },
    { category: 'Typography', items: ['H1-H4 (KH1Directive..)', 'Paragraph (KPDirective)', 'Lead (KLeadDirective)', 'Blockquote (KBlockquoteDirective)', 'Code (KCodeDirective)', 'Muted (KMutedDirective)'] },
  ];

  console.log('\n\x1b[1m\x1b[36mKobo UI Component Catalog (65 components & directives):\x1b[0m\n');
  for (const group of components) {
    console.log(`\x1b[1m\x1b[33m${group.category}\x1b[0m`);
    for (const item of group.items) {
      console.log(`  • ${item}`);
    }
    console.log();
  }
}

function handleTheme() {
  const mode = args[2];
  if (!['dark', 'light', 'both'].includes(mode)) {
    console.error('\x1b[31mError:\x1b[0m Please specify a valid mode: dark, light, or both.');
    process.exit(1);
  }

  const cwd = process.cwd();

  if (mode === 'dark' || mode === 'light') {
    const indexPath = path.resolve(cwd, 'src/index.html');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf-8');
      content = content.replace(/<html([^>]*)>/i, (match, p1) => {
        let classes = '';
        const classMatch = p1.match(/class=["']([^"']*)["']/);
        if (classMatch) {
          classes = classMatch[1];
          classes = classes.replace(/\bdark\b/g, '').trim();
          if (mode === 'dark') classes += ' dark';
          classes = classes.trim();
          if (classes) {
            return `<html${p1.replace(/class=["'][^"']*["']/, `class="${classes}"`)}>`;
          } else {
            return `<html${p1.replace(/\s*class=["'][^"']*["']/, '')}>`;
          }
        } else {
          return mode === 'dark' ? `<html${p1} class="dark">` : `<html${p1}>`;
        }
      });
      fs.writeFileSync(indexPath, content, 'utf-8');
      console.log(`\x1b[32m✔\x1b[0m Application locked to ${mode} mode in src/index.html`);
    } else {
      console.error('\x1b[31mError:\x1b[0m Could not find src/index.html');
    }
  } else if (mode === 'both') {
    const servicePath = path.resolve(cwd, 'src/app/core/services/theme.service.ts');
    fs.mkdirSync(path.dirname(servicePath), { recursive: true });

    const serviceContent = `import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ColorTheme = 'zinc' | 'slate' | 'neutral' | 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly isDark = signal<boolean>(false);
  readonly colorTheme = signal<ColorTheme>('zinc');

  constructor() {
    this.initializeTheme();
  }

  toggleDark(): void {
    this.setDark(!this.isDark());
  }

  setDark(dark: boolean): void {
    this.isDark.set(dark);
    if (dark) {
      this.doc.documentElement.classList.add('dark');
    } else {
      this.doc.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kobo-theme-mode', dark ? 'dark' : 'light');
  }

  setColorTheme(theme: ColorTheme): void {
    const prevTheme = this.colorTheme();
    if (prevTheme !== 'zinc') {
      this.doc.documentElement.classList.remove(\`theme-\${prevTheme}\`);
    }

    this.colorTheme.set(theme);

    if (theme !== 'zinc') {
      this.doc.documentElement.classList.add(\`theme-\${theme}\`);
    }

    localStorage.setItem('kobo-color-theme', theme);
  }

  private initializeTheme(): void {
    const storedMode = localStorage.getItem('kobo-theme-mode');
    if (storedMode) {
      this.setDark(storedMode === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDark(prefersDark);
    }

    const storedColorTheme = localStorage.getItem('kobo-color-theme') as ColorTheme | null;
    if (storedColorTheme) {
      this.setColorTheme(storedColorTheme);
    } else {
      this.setColorTheme('zinc');
    }
  }
}
`;
    fs.writeFileSync(servicePath, serviceContent, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Generated ThemeService at src/app/core/services/theme.service.ts`);
  }
}

function handleColorTheme() {
  const theme = args[2];
  const validThemes = ['zinc', 'slate', 'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow', 'violet'];

  if (!validThemes.includes(theme)) {
    console.error('\x1b[31mError:\x1b[0m Please specify a valid color theme: ' + validThemes.join(', '));
    process.exit(1);
  }

  const cwd = process.cwd();
  const indexPath = path.resolve(cwd, 'src/index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf-8');
    content = content.replace(/<html([^>]*)>/i, (match, p1) => {
      let classes = '';
      const classMatch = p1.match(/class=["']([^"']*)["']/);
      if (classMatch) {
        classes = classMatch[1];
        classes = classes.replace(/\btheme-[a-z]+\b/g, '').trim();
        if (theme !== 'zinc') classes += ` theme-${theme}`;
        classes = classes.trim();
        if (classes) {
          return `<html${p1.replace(/class=["'][^"']*["']/, `class="${classes}"`)}>`;
        } else {
          return `<html${p1.replace(/\s*class=["'][^"']*["']/, '')}>`;
        }
      } else {
        return theme === 'zinc' ? match : `<html${p1} class="theme-${theme}">`;
      }
    });
    fs.writeFileSync(indexPath, content, 'utf-8');
    console.log(`\x1b[32m✔\x1b[0m Application color theme set to ${theme} in src/index.html`);
  } else {
    console.error('\x1b[31mError:\x1b[0m Could not find src/index.html');
  }
}

switch (command) {
  case 'init':
    handleInit();
    break;
  case 'set':
    if (args[1] === 'theme') {
      handleTheme();
    } else if (args[1] === 'color-theme') {
      handleColorTheme();
    } else {
      handleAdd();
    }
    break;
  case 'add':
    handleAdd();
    break;
  case 'skills':
  case 'skill':
  case 'agents':
    handleSkills();
    break;
  case 'list':
  case 'components':
    handleList();
    break;
  case 'help':
  case '--help':
  case '-h':
    printHelp();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
