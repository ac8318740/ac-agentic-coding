import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const claude = JSON.parse(read('.claude-plugin/marketplace.json'));
const codex = JSON.parse(read('.agents/plugins/marketplace.json'));

test('both marketplaces preserve the public name and install ACStack from npm latest', () => {
  for (const catalog of [claude, codex]) {
    assert.equal(catalog.name, 'ac-agentic-coding');
    assert.equal(new Set(catalog.plugins.map(({ name }) => name)).size, catalog.plugins.length);
    assert.deepEqual(catalog.plugins.find(({ name }) => name === 'acstack').source,
      { source: 'npm', package: 'acstack', version: 'latest' });
  }
});

test('existing Claude entries remain and the native Codex catalog exposes ACStack', () => {
  assert.deepEqual(claude.plugins.map(({ name }) => name), ['acstack', 'open-designer', 'agentic-retro', 'sticky-prompt-line']);
  assert.deepEqual(codex.plugins.map(({ name }) => name), ['acstack']);
  for (const name of ['open-designer', 'agentic-retro', 'sticky-prompt-line']) {
    const entry = claude.plugins.find((plugin) => plugin.name === name);
    assert.deepEqual(entry.source, { source: 'url', url: `https://github.com/ac8318740/${name}.git`, ref: 'main' });
  }
});

test('Pi-only packages stay out of the Codex catalog and ac-teams has a native install route', () => {
  assert.ok(!codex.plugins.some(({ name }) => ['ac-teams', 'sticky-prompt-line'].includes(name)));
  assert.ok(!claude.plugins.some(({ name }) => name === 'ac-teams'));
  const readme = read('README.md');
  assert.ok(readme.includes('https://github.com/ac8318740/ac-teams'));
  assert.ok(readme.includes('pi install npm:ac-teams'));
  assert.ok(readme.includes('/plugin install acstack@ac-agentic-coding'));
  assert.ok(readme.includes('codex plugin add acstack@ac-agentic-coding'));
});
