import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const claude = JSON.parse(read('.claude-plugin/marketplace.json'));
const codex = JSON.parse(read('.agents/plugins/marketplace.json'));

test('both marketplaces install the three shared plugins from their npm packages', () => {
  for (const catalog of [claude, codex]) {
    assert.equal(catalog.name, 'ac-agentic-coding');
    assert.equal(new Set(catalog.plugins.map(({ name }) => name)).size, catalog.plugins.length);
    for (const [name, pkg] of [['acstack', 'acstack'], ['open-designer', 'open-designer-viewer'], ['agentic-retro', 'agentic-retro']]) {
      assert.deepEqual(catalog.plugins.find((plugin) => plugin.name === name)?.source,
        { source: 'npm', package: pkg, version: 'latest' });
    }
  }
});

test('catalogs preserve plugin identities and the legacy Pi-only Claude entry', () => {
  assert.deepEqual(claude.plugins.map(({ name }) => name), ['acstack', 'open-designer', 'agentic-retro', 'sticky-prompt-line']);
  assert.deepEqual(codex.plugins.map(({ name }) => name), ['acstack', 'open-designer', 'agentic-retro']);
  assert.deepEqual(claude.plugins.find(({ name }) => name === 'sticky-prompt-line').source,
    { source: 'url', url: 'https://github.com/ac8318740/sticky-prompt-line.git', ref: 'main' });
  for (const entry of codex.plugins) {
    assert.deepEqual(entry.policy, { installation: 'AVAILABLE', authentication: 'ON_INSTALL' });
  }
});

test('Pi-only packages stay out of the Codex catalog and ac-teams has a native install route', () => {
  assert.ok(!codex.plugins.some(({ name }) => ['ac-teams', 'sticky-prompt-line'].includes(name)));
  assert.ok(!claude.plugins.some(({ name }) => name === 'ac-teams'));
  const readme = read('README.md');
  assert.ok(readme.includes('https://github.com/ac8318740/ac-teams'));
  assert.ok(readme.includes('pi install npm:ac-teams'));
  for (const name of ['acstack', 'open-designer', 'agentic-retro']) {
    assert.ok(readme.includes(`/plugin install ${name}@ac-agentic-coding`));
    assert.ok(readme.includes(`codex plugin add ${name}@ac-agentic-coding`));
  }
});
