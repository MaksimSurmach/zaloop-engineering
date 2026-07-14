import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = await readFile(resolve(root, 'index.html'), 'utf8');

function translateTextNodes(html, translations) {
  return html
    .split(/(<[^>]+>)/g)
    .map((chunk) => {
      if (chunk.startsWith('<')) return chunk;

      const normalized = chunk.replace(/\s+/g, ' ').trim();
      const translated = translations[normalized];
      if (!normalized || translated === undefined) return chunk;

      const leadingWhitespace = chunk.match(/^\s*/)?.[0] ?? '';
      const trailingWhitespace = chunk.match(/\s*$/)?.[0] ?? '';
      return `${leadingWhitespace}${translated}${trailingWhitespace}`;
    })
    .join('');
}

function translateAttributes(html, translations) {
  return html.replace(/\b(aria-label|aria-description|alt|title)="([^"]+)"/g, (match, attribute, value) => {
    const translated = translations[value];
    return translated === undefined ? match : `${attribute}="${translated}"`;
  });
}

for (const locale of ['en', 'be']) {
  const dictionary = JSON.parse(
    await readFile(resolve(root, `src/content/${locale}.json`), 'utf8'),
  );
  let html = source
    .replace('<html lang="en"', `<html lang="${dictionary.htmlLang}"`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${dictionary.description}" />`,
    )
    .replace(/<title>[^<]*<\/title>/, `<title>${dictionary.title}</title>`)
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)?/,
      `$1${dictionary.title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)?/,
      `$1${dictionary.socialDescription}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*("\s*\/>)?/,
      `$1${dictionary.title}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*\/>)?/,
      `$1${dictionary.socialDescription}$2`,
    )
    .replace(
      /(<meta\s+property="og:image:alt"\s+content=")[^"]*("\s*\/>)?/,
      `$1${dictionary.socialImageAlt}$2`,
    );

  if (locale === 'be') {
    html = html
      .replace(
        '<link rel="canonical" href="https://zal0op-engineering.website/en/" />',
        '<link rel="canonical" href="https://zal0op-engineering.website/be/" />',
      )
      .replace(
        '<meta property="og:url" content="https://zal0op-engineering.website/en/" />',
        '<meta property="og:url" content="https://zal0op-engineering.website/be/" />',
      )
      .replace('<html lang="be"', '<html lang="be" data-translation-status="complete"')
      .replace(/(data-language="en"[^>]*) aria-current="page"/, '$1')
      .replace('data-language="be"', 'data-language="be" aria-current="page"');

    for (const [key, translated] of Object.entries(dictionary.translations)) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(
        `(<[^>]+data-i18n="${escapedKey}"[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`,
        'g',
      );
      html = html.replace(pattern, `$1${translated}$3`);
    }

    html = translateTextNodes(html, dictionary.textTranslations);
    html = translateAttributes(html, dictionary.attributeTranslations);
  }

  const directory = resolve(root, locale);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
