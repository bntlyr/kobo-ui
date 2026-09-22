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

      for (const dep of requiredDeps) {
        if (!installed[dep]) {
          missingDeps.push(dep);
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

        for (const dep of requiredDeps) {
          if (!installed[dep]) {
            missingDeps.push(dep);
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

  fs.writeFileSync(targetPath, content, 'utf-8');

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

switch (command) {
  case 'init':
    handleInit();
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
