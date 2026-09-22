#!/usr/bin/env node

/**
 * Kobo UI CLI (工房)
 *
 * Usage:
 *   npx kobo skills             Generate AGENTS.md in current directory
 *   npx kobo skills --agents    Generate .agents/AGENTS.md
 *   npx kobo skills --cursor    Generate .cursorrules
 *   npx kobo skills --skill     Generate .agents/skills/kobo-ui/SKILL.md
 *   npx kobo skills --dest <p>  Generate at custom destination file path
 *   npx kobo skills --print     Print AGENTS.md content to stdout
 *   npx kobo list               List all 60+ components & directives
 *   npx kobo init               Show installation and Tailwind setup guide
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0] || 'skills';

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

function printHelp() {
  console.log(`
\x1b[1m\x1b[36mKobo UI CLI (工房)\x1b[0m — Modern Angular 18+ Component Library

\x1b[1mCOMMANDS:\x1b[0m
  \x1b[32mnpx kobo skills\x1b[0m             Generate AGENTS.md for AI coding assistants
  \x1b[32mnpx kobo skills --agents\x1b[0m    Generate .agents/AGENTS.md
  \x1b[32mnpx kobo skills --cursor\x1b[0m    Generate .cursorrules
  \x1b[32mnpx kobo skills --skill\x1b[0m     Generate .agents/skills/kobo-ui/SKILL.md
  \x1b[32mnpx kobo skills --dest <p>\x1b[0m  Generate at custom destination file path
  \x1b[32mnpx kobo skills --print\x1b[0m     Print markdown directly to stdout
  \x1b[32mnpx kobo list\x1b[0m               List all 60+ components & directives
  \x1b[32mnpx kobo init\x1b[0m               Show quick setup guide & Tailwind config
  \x1b[32mnpx kobo help\x1b[0m               Show this help message

\x1b[1mEXAMPLES:\x1b[0m
  $ npx kobo skills
  $ npx kobo skills --cursor
  $ npx kobo list
`);
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
    // Default to AGENTS.md in project root
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
  - Import components from \x1b[33m'kobo-ui'\x1b[0m
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

  console.log('\n\x1b[1m\x1b[36mKobo UI Component Catalog (60+ components & directives):\x1b[0m\n');
  for (const group of components) {
    console.log(`\x1b[1m\x1b[33m${group.category}\x1b[0m`);
    for (const item of group.items) {
      console.log(`  • ${item}`);
    }
    console.log();
  }
}

function handleInit() {
  console.log(`
\x1b[1m\x1b[36mKobo UI Setup Guide\x1b[0m

\x1b[1m1. Install Dependencies:\x1b[0m
  npm install kobo-ui @angular/cdk @lucide/angular tailwind-merge clsx class-variance-authority

\x1b[1m2. Configure Tailwind CSS v4 in src/styles.css:\x1b[0m
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

\x1b[1m3. Add AI Agent Guidelines:\x1b[0m
  npx kobo skills
`);
}

switch (command) {
  case 'skills':
  case 'skill':
  case 'agents':
    handleSkills();
    break;
  case 'list':
  case 'components':
    handleList();
    break;
  case 'init':
    handleInit();
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
