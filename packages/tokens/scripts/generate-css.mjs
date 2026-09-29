import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await readFile(path.join(packageRoot, 'src/tokens.json'), 'utf8'));
const webFontStacks = {
  sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  serif: 'ui-serif, Georgia, serif',
  rounded: "ui-rounded, 'Arial Rounded MT Bold', sans-serif",
  mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
};

const toKebabCase = (value) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const cssVarsFor = (theme) => {
  const vars = [];
  for (const [name, value] of Object.entries(data.colors[theme])) {
    vars.push(`  --token-color-${toKebabCase(name)}: ${value};`);
  }
  for (const [name, value] of Object.entries(data.spacing)) {
    vars.push(`  --token-space-${toKebabCase(name)}: ${value}px;`);
  }
  for (const [name, value] of Object.entries(data.typography.fontFamily)) {
    vars.push(`  --token-font-family-${toKebabCase(name)}: ${webFontStacks[name] ?? value};`);
  }
  for (const [name, value] of Object.entries(data.typography.size)) {
    vars.push(`  --token-font-size-${toKebabCase(name)}: ${value}px;`);
  }
  for (const [name, value] of Object.entries(data.typography.lineHeight)) {
    vars.push(`  --token-line-height-${toKebabCase(name)}: ${value}px;`);
  }
  for (const [name, value] of Object.entries(data.radii)) {
    vars.push(`  --token-radius-${toKebabCase(name)}: ${value}px;`);
  }
  for (const [name, value] of Object.entries(data.shadows[theme])) {
    vars.push(`  --token-shadow-${toKebabCase(name)}: ${value};`);
  }
  vars.push(`  --token-layout-max-content-width: ${data.layout.maxContentWidth}px;`);
  vars.push(`  color-scheme: ${theme};`);
  return vars.join('\n');
};

const css = `/* Generated from src/tokens.json. Do not edit by hand. */
:root {
${cssVarsFor('light')}
}

:root[data-theme='light'] {
${cssVarsFor('light')}
}

:root[data-theme='dark'],
[data-theme='dark'] {
${cssVarsFor('dark')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${cssVarsFor('dark').split('\n').map((line) => `  ${line}`).join('\n')}
  }
}
`;

const outputPath = path.join(packageRoot, 'generated/tokens.css');
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, css);
process.stdout.write(`Generated ${path.relative(packageRoot, outputPath)}\n`);
