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
  if (!html.includes(`rel="canonical" href="https://zal0op-engineering.website${page.canonical}"`)) {
    failures.push(`${page.path}: incorrect canonical URL`);
  }
  for (const locale of ['en', 'be', 'x-default']) {
    if (!html.includes(`hreflang="${locale}"`)) failures.push(`${page.path}: missing ${locale} hreflang`);
  }

  const activeLanguages = [...html.matchAll(/data-language="([^"]+)"[^>]*aria-current="page"/g)];
  if (activeLanguages.length !== 1 || activeLanguages[0]?.[1] !== page.language) {
    failures.push(`${page.path}: expected only ${page.language} to be the active language`);
  }
  if (!html.includes('rel="icon" href="/favicon.svg" type="image/svg+xml"')) {
    failures.push(`${page.path}: missing SVG favicon declaration`);
  }
  if (!html.includes('name="twitter:card" content="summary_large_image"')) {
    failures.push(`${page.path}: missing Twitter card metadata`);
  }
  if (!html.includes('property="og:image" content="https://zal0op-engineering.website/og-zaloop.png"')) {
    failures.push(`${page.path}: missing Open Graph image`);
  }
  if (/>\s*TODO_(?:CONTENT|TRANSLATION_BE):/.test(html)) {
    failures.push(`${page.path}: visible editorial TODO marker found`);
  }
  if (page.language === 'be' && !html.includes('data-translation-status="partial"')) {
    failures.push(`${page.path}: missing explicit partial-translation status`);
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

try {
  await access(resolve(dist, 'favicon.svg'));
} catch {
  failures.push('missing favicon.svg');
}

try {
  await access(resolve(dist, 'og-zaloop.png'));
} catch {
  failures.push('missing og-zaloop.png');
}

for (const publicFile of ['robots.txt', 'sitemap.xml']) {
  try {
    await access(resolve(dist, publicFile));
  } catch {
    failures.push(`missing ${publicFile}`);
  }
}

const nginx = await readFile(resolve(root, 'nginx.conf'), 'utf8');
if (!nginx.includes('absolute_redirect off;')) {
  failures.push('nginx.conf: redirects must remain relative behind the HTTPS proxy');
}
for (const redirect of ['return 308 /en/;', 'return 308 /be/;']) {
  if (!nginx.includes(redirect)) failures.push(`nginx.conf: missing ${redirect}`);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Static output validated: root, EN, BE, metadata and assets.');
}
