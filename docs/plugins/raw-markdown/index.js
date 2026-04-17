/**
 * raw-markdown Docusaurus plugin
 *
 * Walks the docs/ directory and copies every *.md / *.mdx source file to
 * static/llm/<relative-path>.md during the `postBuild` phase, so that the
 * "Copy Markdown" button on every doc page can fetch the raw source at
 * /llm/<slug>.md and write it to the user's clipboard.
 *
 * This is intentionally dumb: it does NOT strip MDX imports/JSX, because the
 * consumer of this button is a human pasting context into an LLM — the LLM
 * tolerates a bit of JSX noise fine, and it's the whole point to keep
 * component-example code intact.
 */

const fs = require('node:fs');
const path = require('node:path');

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDocsToStatic(siteDir) {
  const docsDir = path.join(siteDir, 'docs');
  const targetRoot = path.join(siteDir, 'static', 'llm');
  ensureDir(targetRoot);

  const files = walk(docsDir);
  for (const srcPath of files) {
    const rel = path.relative(docsDir, srcPath);
    const targetPath = path.join(targetRoot, rel.replace(/\.mdx?$/, '.md'));
    ensureDir(path.dirname(targetPath));
    fs.copyFileSync(srcPath, targetPath);
  }
  return files.length;
}

module.exports = function rawMarkdownPlugin(context) {
  const { siteDir } = context;
  return {
    name: 'raw-markdown',
    // Run on every dev-server load so the file is always fresh.
    async loadContent() {
      const count = copyDocsToStatic(siteDir);
      return { count };
    },
    async contentLoaded() {
      // Copy happens in loadContent; nothing to do here.
    },
    configureWebpack() {
      return {};
    },
    async postBuild() {
      copyDocsToStatic(siteDir);
    },
  };
};
