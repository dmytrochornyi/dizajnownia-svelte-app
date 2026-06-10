#!/usr/bin/env node
/*
  Optimize static images under static/img into AVIF and WebP with Sharp.
  - Creates sibling .avif and .webp next to .jpg/.jpeg/.png originals
  - Skips if the variant is newer than the source
*/
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, 'static', 'img');

const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png']);

/** @param {string} dir */
async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (RASTER_EXT.has(ext)) {
        await convert(full);
      }
    }
  }
}

/** @param {string} srcPath */
async function convert(srcPath) {
  const stat = await fs.promises.stat(srcPath);
  const base = srcPath.replace(/\.(jpe?g|png)$/i, '');
  const avifPath = `${base}.avif`;
  const webpPath = `${base}.webp`;

  // If outputs exist and are newer, skip
  const needsAvif = await needsUpdate(avifPath, stat.mtimeMs);
  const needsWebp = await needsUpdate(webpPath, stat.mtimeMs);
  if (!needsAvif && !needsWebp) return;

  const img = sharp(srcPath);
  const metadata = await img.metadata();

  // Reasonable defaults; keep quality modest for web perf
  if (needsAvif) {
    await img
      .clone()
      .avif({ quality: 45, effort: 4 })
      .toFile(avifPath)
      .catch(() => {});
  }
  if (needsWebp) {
    await img
      .clone()
      .webp({ quality: 60 })
      .toFile(webpPath)
      .catch(() => {});
  }
  console.log('Optimized:', path.relative(ROOT, srcPath), metadata.width + 'x' + metadata.height);
}

async function needsUpdate(outPath, sourceMtimeMs) {
  try {
    const stat = await fs.promises.stat(outPath);
    return stat.mtimeMs < sourceMtimeMs;
  } catch {
    return true;
  }
}

async function main() {
  if (!fs.existsSync(IMG_DIR)) {
    console.error('No static/img directory found');
    process.exit(1);
  }
  await walk(IMG_DIR);
  console.log('Image optimization complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


