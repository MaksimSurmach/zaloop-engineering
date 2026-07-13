import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages = [
  { path: 'index.html', language: 'en', canonical: '/en/' },
  { path: 'en/index.html', language: 'en', canonical: '/en/' },
  { path: 'be/index.html', language: 'be', canonical: '/be/' },
];

const failures = [];

for (const page of pages) {
  const file = resolve(dist, page.path);
  const html = await readFile(file, 'utf8');

  if (!html.includes(`<html lang="${page.language}"`)) {
    failures.push(`${page.path}: expected lang=${page.language}`);
  }
  if (!html.includes(`rel="canonical" href="https://zaloop.ranus.site${page.canonical}"`)) {
    failures.push(`${page.path}: incorrect canonical URL`);
  }
  for (const locale of ['en', 'be', 'x-default']) {
    if (!html.includes(`hreflang="${locale}"`)) failures.push(`${page.path}: missing ${locale} hreflang`);
  }

  const activeLanguages = [...html.matchAll(/data-language="([^"]+)"[^>]*aria-current="page"/g)];
  if (activeLanguages.length !== 1 || activeLanguages[0]?.[1] !== page.language) {
    failures.push(`${page.path}: expected only ${page.language} to be the active language`);
  }

  const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^"#?]+)["#?]/g)].map(
    (match) => match[1],
  );
  for (const assetPath of assetPaths) {
    try {
      await access(resolve(dist, `.${assetPath}`));
    } catch {
      failures.push(`${page.path}: missing asset ${assetPath}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Static output validated: root, EN, BE, metadata and assets.');
}
