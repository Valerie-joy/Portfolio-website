/**
 * Captures a real screenshot of each live client site and writes web-ready
 * WebP previews for the Selected Client Projects section.
 *
 * Run with: pnpm --filter @workspace/scripts run clients
 *
 * Uses the locally installed Chrome in headless mode, so no browser dependency
 * is added to the repo. Set CHROME_PATH if Chrome lives somewhere unusual.
 * Screenshots are of the real sites as published - nothing is composited or
 * mocked up.
 *
 * Output: artifacts/portfolio/public/clients/<slug>.webp
 */
import { execFile } from 'node:child_process';
import { access, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import sharp from 'sharp';

const run = promisify(execFile);

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT_DIR = path.join(REPO_ROOT, 'artifacts', 'portfolio', 'public', 'clients');
const TMP_DIR = path.join(REPO_ROOT, 'artifacts', 'portfolio', '.client-shots');

/** Viewport to render at, then downscaled to CARD_WIDTH for delivery. */
const VIEWPORT = { width: 1440, height: 900 };
const CARD_WIDTH = 1200;

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

/** Rejects a capture that came back blank, rather than shipping a white card. */
const MIN_STDEV = 12;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean) as string[];

/**
 * `url` is the page to photograph, which is not always the homepage:
 * bomarbuilders.com's homepage returns a blank frame to headless Chrome, while
 * its /portfolio/ page renders fully and shows the work itself.
 */
const SITES: { slug: string; url: string }[] = [
  { slug: 'john-sells-nm', url: 'https://johnsellsnm.com/' },
  { slug: 'chris-az-homes', url: 'https://chrisazhomes.com/' },
  { slug: 'bomar-builders', url: 'https://www.bomarbuilders.com/portfolio/' },
  { slug: 'aubreigh-hutchison', url: 'https://aubreighhutchison.exprealty.com/' },
  { slug: 'astracare', url: 'https://www.astracare.com/' },
  { slug: 'adkins-pro', url: 'https://adkinspro.com/' },
  { slug: 'ann-baker', url: 'https://www.annbaker.com/' },
  { slug: 'ceo-mistakes', url: 'https://www.ceomistakes.com/' },
  { slug: 'oberoi-group', url: 'https://www.oberoigroup.com/' },
];

async function findChrome(): Promise<string> {
  for (const candidate of CHROME_CANDIDATES) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      /* try the next one */
    }
  }
  throw new Error(
    `No Chrome/Edge binary found. Set CHROME_PATH to one.\nTried:\n  ${CHROME_CANDIDATES.join('\n  ')}`,
  );
}

async function main(): Promise<void> {
  const chrome = await findChrome();
  console.log(`Using ${chrome}\n`);

  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(TMP_DIR, { recursive: true });

  const failures: string[] = [];

  for (const site of SITES) {
    const raw = path.join(TMP_DIR, `${site.slug}.png`);
    process.stdout.write(`- ${site.slug.padEnd(20)} `);

    try {
      await run(
        chrome,
        [
          '--headless=new',
          '--disable-gpu',
          '--hide-scrollbars',
          '--no-first-run',
          '--no-default-browser-check',
          `--user-data-dir=${path.join(TMP_DIR, 'profile')}`,
          // A real UA plus a long budget is what gets past the bot checks on
          // the Cloudflare-fronted sites.
          `--user-agent=${USER_AGENT}`,
          '--virtual-time-budget=40000',
          `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
          `--screenshot=${raw}`,
          site.url,
        ],
        { timeout: 120_000 },
      );

      const image = sharp(raw);
      const meta = await image.metadata();
      if (!meta.width) throw new Error('screenshot produced no image data');

      // bomarbuilders.com renders only in a headful browser; headless returns a
      // blank page. Catch that here so a white card never reaches the site.
      const stats = await image.stats();
      if (stats.channels.every((c) => c.stdev < MIN_STDEV)) {
        throw new Error('capture came back blank (site blocks headless rendering)');
      }

      const info = await image
        .resize({ width: CARD_WIDTH, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(OUT_DIR, `${site.slug}.webp`));

      console.log(`${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
    } catch (error) {
      failures.push(site.slug);
      console.log(`FAILED - ${(error as Error).message.split('\n')[0]}`);
    }
  }

  await rm(TMP_DIR, { recursive: true, force: true });

  console.log(`\n${SITES.length - failures.length}/${SITES.length} captured`);
  if (failures.length) {
    console.log(`Failed: ${failures.join(', ')}`);
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
