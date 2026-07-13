import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = await readFile(resolve(root, 'index.html'), 'utf8');

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
    .replace(/<title>[^<]*<\/title>/, `<title>${dictionary.title}</title>`);

  if (locale === 'be') {
    html = html
      .replace(
        '<link rel="canonical" href="https://zal0op-engineering.website/en/" />',
        '<link rel="canonical" href="https://zal0op-engineering.website/be/" />',
      )
      .replace(/(data-language="en"[^>]*) aria-current="page"/, '$1')
      .replace('data-language="be"', 'data-language="be" aria-current="page"')
      .replaceAll('TODO_CONTENT:', 'TODO_TRANSLATION_BE:');

    for (const [key, translated] of Object.entries(dictionary.translations)) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(
        `(<[^>]+data-i18n="${escapedKey}"[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)`,
        'g',
      );
      html = html.replace(pattern, `$1${translated}$3`);
    }
  }

  const directory = resolve(root, locale);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
