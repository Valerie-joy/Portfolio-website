/**
 * Builds web-ready derivatives of the raw portfolio folders that live at the
 * repository root, plus a typed manifest consumed by the portfolio site.
 *
 * Run with: pnpm --filter @workspace/scripts run portfolio
 *
 * Source folders are never modified. Output goes to:
 *   artifacts/portfolio/public/portfolio/<slug>/{thumb,view,doc}/...
 *   artifacts/portfolio/src/data/portfolio-manifest.ts
 */
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE_ROOT = path.join(REPO_ROOT, 'artifacts', 'portfolio');
const OUT_DIR = path.join(SITE_ROOT, 'public', 'portfolio');
const MANIFEST_FILE = path.join(SITE_ROOT, 'src', 'data', 'portfolio-manifest.ts');

const THUMB_WIDTH = 720;
const VIEW_WIDTH = 1600;

type CategoryKind = 'work' | 'process' | 'credentials';

interface CategorySource {
  /** Folder name at the repository root. Left untouched on disk. */
  dir: string;
  slug: string;
  title: string;
  blurb: string;
  kind: CategoryKind;
  /** Source file name used as the card preview; defaults to the first image. */
  cover?: string;
}

// Ordered for commercial impact, strongest work first - not alphabetically.
// This array is the single source of truth for the order shown on the site.
const CATEGORIES: CategorySource[] = [
  {
    dir: 'Skincare Contents',
    slug: 'skincare-content',
    title: 'Skincare Content',
    blurb: 'Skincare product content across two brand sets, CeraVe and I-on.',
    kind: 'work',
  },
  {
    dir: 'Mockup Products',
    slug: 'mockup-products',
    title: 'Mockup Products',
    blurb: 'Apparel and accessory mockups — shirts, outerwear and hard goods placed on realistic surfaces.',
    kind: 'work',
    cover: 'Syborg Jacket Front.png',
  },
  {
    dir: 'Real Estate Contents',
    slug: 'real-estate-content',
    title: 'Real Estate Content',
    blurb: 'Property listing creatives sized for Facebook and Instagram campaigns.',
    kind: 'work',
    cover: 'IG #1.png',
  },
  {
    dir: 'Fashion Ads',
    slug: 'fashion-ads',
    title: 'Fashion Ads',
    blurb: 'Streetwear and sportswear ad creatives built around bold typographic lockups.',
    kind: 'work',
    cover: 'NIKE AIR AD.png',
  },
  {
    dir: 'Performance ADS',
    slug: 'performance-ads',
    title: 'Performance Ads',
    blurb: 'Direct-response ad variants designed to be tested against one another.',
    kind: 'work',
  },
  {
    dir: 'Supplements Amazon',
    slug: 'supplements-amazon',
    title: 'Supplements Amazon',
    blurb: 'Listing and A+ style imagery prepared for supplement products on Amazon.',
    kind: 'work',
  },
  {
    dir: 'Jewelry Content',
    slug: 'jewelry-content',
    title: 'Jewelry Content',
    blurb: 'Close-range jewellery imagery composed for catalogue and social placements.',
    kind: 'work',
  },
  {
    dir: 'Gym Supplement Content',
    slug: 'gym-supplement-content',
    title: 'Gym Supplement Content',
    blurb: 'Product-led creatives for fitness and supplement brands.',
    kind: 'work',
  },
  {
    dir: 'Banners',
    slug: 'banners',
    title: 'Banners',
    blurb: 'Wide-format banner layouts built for web headers and campaign placements.',
    kind: 'work',
  },
  {
    dir: 'Dating Profiles',
    slug: 'dating-profiles',
    title: 'Dating Profiles',
    blurb: 'Portrait retouching and clean-up, shown as sample frames alongside the finished versions.',
    kind: 'work',
    cover: 'final1.jpg',
  },
  {
    dir: 'Signages',
    slug: 'signages',
    title: 'Signages',
    blurb: 'Signage and large-format display concepts, including AI-generated backdrops.',
    kind: 'work',
  },
  {
    dir: 'My sample process flow',
    slug: 'my-sample-process',
    title: 'My Sample Process',
    blurb: 'How a brief moves from reference and direction through to the delivered frame.',
    kind: 'process',
  },
  {
    dir: 'Certifications',
    slug: 'certifications',
    title: 'Certifications',
    blurb: 'Completed programmes and credentials, viewable as the original certificates.',
    kind: 'credentials',
  },
];

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const DOC_EXT = new Set(['.pdf']);

function slugify(value: string): string {
  const base = value
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  // Names such as "#1" reduce to nothing; fall back to a stable hash.
  return base || createHash('sha1').update(value).digest('hex').slice(0, 8);
}

/** Sorts "2.png" before "10.png" and keeps mixed names predictable. */
function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' });
}

interface SourceFile {
  absPath: string;
  /** Sub-folder name inside the category, when the category is grouped. */
  group: string | null;
  fileName: string;
}

async function collect(dir: string, group: string | null = null): Promise<SourceFile[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: SourceFile[] = [];
  const nested: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (entry.isDirectory()) {
      nested.push(entry.name);
    } else {
      files.push({ absPath: path.join(dir, entry.name), group, fileName: entry.name });
    }
  }

  files.sort((a, b) => naturalCompare(a.fileName, b.fileName));
  nested.sort(naturalCompare);

  for (const name of nested) {
    files.push(...(await collect(path.join(dir, name), name)));
  }
  return files;
}

interface ManifestImage {
  id: string;
  thumb: string;
  view: string;
  width: number;
  height: number;
  group: string | null;
}

interface ManifestDoc {
  id: string;
  title: string;
  file: string;
}

interface ManifestCategory {
  slug: string;
  title: string;
  blurb: string;
  kind: CategoryKind;
  count: number;
  cover: ManifestImage | null;
  images: ManifestImage[];
  documents: ManifestDoc[];
}

/** Turns "Design Prompts for everyday tasks.pdf" into "Design Prompts For Everyday Tasks". */
function titleFromFileName(fileName: string): string {
  return path
    .basename(fileName, path.extname(fileName))
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{Ll}/gu, (c) => c.toUpperCase());
}

async function processCategory(category: CategorySource): Promise<ManifestCategory> {
  const sourceDir = path.join(REPO_ROOT, category.dir);
  const files = await collect(sourceDir);

  const thumbDir = path.join(OUT_DIR, category.slug, 'thumb');
  const viewDir = path.join(OUT_DIR, category.slug, 'view');
  const docDir = path.join(OUT_DIR, category.slug, 'doc');

  const images: ManifestImage[] = [];
  const documents: ManifestDoc[] = [];
  const usedIds = new Set<string>();
  let coverId: string | null = null;

  for (const file of files) {
    const ext = path.extname(file.fileName).toLowerCase();
    const stem = path.basename(file.fileName, path.extname(file.fileName));
    const baseId = slugify(file.group ? `${file.group}-${stem}` : stem);
    let id = baseId;
    for (let n = 2; usedIds.has(id); n += 1) id = `${baseId}-${n}`;
    usedIds.add(id);

    if (IMAGE_EXT.has(ext)) {
      await mkdir(thumbDir, { recursive: true });
      await mkdir(viewDir, { recursive: true });

      const pipeline = sharp(file.absPath, { failOn: 'none' }).rotate();

      const viewInfo = await pipeline
        .clone()
        .resize({ width: VIEW_WIDTH, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(viewDir, `${id}.webp`));

      await pipeline
        .clone()
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: 74 })
        .toFile(path.join(thumbDir, `${id}.webp`));

      images.push({
        id,
        thumb: `/portfolio/${category.slug}/thumb/${id}.webp`,
        view: `/portfolio/${category.slug}/view/${id}.webp`,
        width: viewInfo.width,
        height: viewInfo.height,
        group: file.group,
      });

      if (category.cover && file.fileName === category.cover) coverId = id;
    } else if (DOC_EXT.has(ext)) {
      await mkdir(docDir, { recursive: true });
      await copyFile(file.absPath, path.join(docDir, `${id}${ext}`));
      documents.push({
        id,
        title: titleFromFileName(file.fileName),
        file: `/portfolio/${category.slug}/doc/${id}${ext}`,
      });
    } else {
      console.warn(`  ! skipped unsupported file ${file.fileName}`);
    }
  }

  if (category.cover && !coverId) {
    console.warn(`  ! cover "${category.cover}" not found in ${category.dir}`);
  }

  const cover = (coverId ? images.find((i) => i.id === coverId) : undefined) ?? images[0] ?? null;

  return {
    slug: category.slug,
    title: category.title,
    blurb: category.blurb,
    kind: category.kind,
    count: images.length + documents.length,
    cover,
    images,
    documents,
  };
}

function renderManifest(categories: ManifestCategory[]): string {
  return `// GENERATED FILE — do not edit by hand.
// Produced by scripts/src/build-portfolio.ts from the portfolio folders at the
// repository root. Regenerate with: pnpm --filter @workspace/scripts run portfolio

export type PortfolioKind = 'work' | 'process' | 'credentials';

export interface PortfolioImage {
  id: string;
  thumb: string;
  view: string;
  width: number;
  height: number;
  group: string | null;
}

export interface PortfolioDocument {
  id: string;
  title: string;
  file: string;
}

export interface PortfolioCategory {
  slug: string;
  title: string;
  blurb: string;
  kind: PortfolioKind;
  count: number;
  cover: PortfolioImage | null;
  images: PortfolioImage[];
  documents: PortfolioDocument[];
}

export const portfolioCategories: PortfolioCategory[] = ${JSON.stringify(categories, null, 2)};

export const workCategories = portfolioCategories.filter((c) => c.kind === 'work');
export const processCategory = portfolioCategories.find((c) => c.kind === 'process') ?? null;
export const credentialsCategory = portfolioCategories.find((c) => c.kind === 'credentials') ?? null;
`;
}

async function main(): Promise<void> {
  const missing: string[] = [];
  for (const category of CATEGORIES) {
    try {
      await stat(path.join(REPO_ROOT, category.dir));
    } catch {
      missing.push(category.dir);
    }
  }
  if (missing.length) {
    throw new Error(`Missing portfolio folder(s) at the repository root: ${missing.join(', ')}`);
  }

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const results: ManifestCategory[] = [];
  for (const category of CATEGORIES) {
    process.stdout.write(`- ${category.title} ... `);
    const result = await processCategory(category);
    results.push(result);
    console.log(`${result.images.length} image(s), ${result.documents.length} document(s)`);
  }

  await mkdir(path.dirname(MANIFEST_FILE), { recursive: true });
  await writeFile(MANIFEST_FILE, renderManifest(results), 'utf8');
  console.log(`\nManifest written to ${path.relative(REPO_ROOT, MANIFEST_FILE)}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
