import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(repositoryRoot, 'public');
const dataFiles = ['src/data/projects.ts'];
const assetReference = /['"`]((?:\/projects|\/images)\/[^'"`\s?#)]+)(?:[?#][^'"`]*)?['"`]/g;
const missing = [];
const seen = new Set();

for (const relativeFile of dataFiles) {
  const source = readFileSync(path.join(repositoryRoot, relativeFile), 'utf8');

  for (const match of source.matchAll(assetReference)) {
    const assetPath = match[1];
    const absoluteAssetPath = path.resolve(publicRoot, `.${assetPath}`);
    const relativeAssetPath = path.relative(publicRoot, absoluteAssetPath);
    const key = `${relativeFile}:${assetPath}`;

    if (seen.has(key)) continue;
    seen.add(key);

    if (relativeAssetPath.startsWith('..') || path.isAbsolute(relativeAssetPath) || !existsSync(absoluteAssetPath)) {
      missing.push({ relativeFile, assetPath });
    }
  }
}

if (missing.length > 0) {
  console.error('Project media references missing from public/:');
  for (const reference of missing) console.error(`- ${reference.relativeFile}: ${reference.assetPath}`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${seen.size} local project media references in ${dataFiles.join(' and ')}; all resolve beneath public/.`);
}
