import { access, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

const pages = ['index.html', '404.html', 'work/data-visualizer/index.html', 'work/renderfix/index.html', 'work/snappost-ai/index.html', 'work/breathy/index.html'];
const root = new URL('../out/', import.meta.url);

for (const route of pages) {
  test(`static export ${route}`, async () => {
    const html = await readFile(new URL(route, root),'utf8');
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<meta property="og:title"/);
    assert.match(html, /<link rel="icon"/);
    const refs = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map(match => match[1]);
    await Promise.all(refs.map(async ref => {
      const url = new URL('.'+ref, root);
      if (url.pathname.endsWith('/')) url.pathname += 'index.html';
      await access(url);
    }));
  });
}

test('published assets fit the static media budget', async () => {
  const directory = new URL('media/',root);
  const names = await readdir(directory);
  const bytes = await Promise.all(names.map(name => readFile(join(directory.pathname,name))));
  assert(bytes.reduce((total, image) => total + image.length, 0) < 600_000);
});
