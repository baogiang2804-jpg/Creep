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

function stripSiteNav(mainBlock) {
  return mainBlock.replace(/<nav class="site-nav"[\s\S]*?<\/nav>\n?/, '');
}

const PAGES = [
  {
    page: 'index.html',
    original: 'public/assets/aistudio/creep_key1_player_38006af6.html',
  },
  {
    page: 'tay-trai.html',
    original: 'public/assets/aistudio/creep_key1_tay_trai_bandsafe_e69c0581.html',
  },
  {
    page: 'tay-phai.html',
    original: 'public/assets/aistudio/creep_key1_tay_phai_6bce1a1c.html',
  },
];

for (const { page, original: origPath } of PAGES) {
  test(`${page} preserves original style, main, and script verbatim`, () => {
    const original = fs.readFileSync(path.join(root, origPath), 'utf8');
    const current = fs.readFileSync(path.join(root, page), 'utf8');

    assert.equal(extractBlock(current, 'style'), extractBlock(original, 'style'));
    assert.equal(stripSiteNav(extractBlock(current, 'main')), extractBlock(original, 'main'));
    assert.equal(extractBlock(current, 'script'), extractBlock(original, 'script'));
    assert.match(current, /<nav class="site-nav"/);
  });
}

test('GitHub repository files and multi-page build config exist and are valid', () => {
  for (const rel of [
    'README.md',
    'LICENSE',
    '.gitignore',
    '.github/workflows/deploy.yml',
    'public/.nojekyll',
    'metadata.json',
    'tay-trai.html',
    'tay-phai.html',
  ]) {
    assert.equal(fs.existsSync(path.join(root, rel)), true, `Missing ${rel}`);
  }

  const viteConfig = fs.readFileSync(path.join(root, 'vite.config.ts'), 'utf8');
  assert.match(viteConfig, /base:\s*['"]\.\/['"]/);
  assert.match(viteConfig, /tay-trai\.html/);
  assert.match(viteConfig, /tay-phai\.html/);

  const meta = JSON.parse(fs.readFileSync(path.join(root, 'metadata.json'), 'utf8'));
  assert.equal(meta.name, 'Creep – Key 1 player');
  assert.ok(meta.description.length > 0);

  const workflow = fs.readFileSync(path.join(root, '.github/workflows/deploy.yml'), 'utf8');
  assert.equal(/cache:\s*['"]?npm['"]?/.test(workflow), false, 'Should not require npm lockfile cache');
  assert.match(workflow, /npm install/);
});
