import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function extractBlock(html, tag) {
  const start = html.indexOf(`<${tag}>`);
  const endTag = `</${tag}>`;
  const end = html.indexOf(endTag, start);
  assert.notEqual(start, -1, `Missing <${tag}>`);
  assert.notEqual(end, -1, `Missing </${tag}>`);
  return html.slice(start, end + endTag.length);
}

test('index.html preserves original style, main, and script verbatim', () => {
  const original = fs.readFileSync(
    path.join(root, 'public/assets/aistudio/creep_key1_player_38006af6.html'),
    'utf8'
  );
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  assert.equal(extractBlock(indexHtml, 'style'), extractBlock(original, 'style'));
  assert.equal(extractBlock(indexHtml, 'main'), extractBlock(original, 'main'));
  assert.equal(extractBlock(indexHtml, 'script'), extractBlock(original, 'script'));
});

test('GitHub repository files and build config exist and are valid', () => {
  for (const rel of [
    'README.md',
    'LICENSE',
    '.gitignore',
    '.github/workflows/deploy.yml',
    'public/.nojekyll',
    'metadata.json',
  ]) {
    assert.equal(fs.existsSync(path.join(root, rel)), true, `Missing ${rel}`);
  }

  const viteConfig = fs.readFileSync(path.join(root, 'vite.config.ts'), 'utf8');
  assert.match(viteConfig, /base:\s*['"]\.\/['"]/);

  const meta = JSON.parse(fs.readFileSync(path.join(root, 'metadata.json'), 'utf8'));
  assert.equal(meta.name, 'Creep – Key 1 player');
  assert.ok(meta.description.length > 0);
});
