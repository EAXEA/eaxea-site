// eaxea-site showcase capture — 540x960 VP8 webm + webp poster.
// Usage: node capture.mjs <url> <slug> [outDir]
// Spec (family consistency): viewport 540x960 DSF2, sectioned slow scroll
// (hero hold -> ease-glide ~2.3s per stop -> settle ~0.9s), trim to last CAPDUR s.
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const [url, slug, outDirArg] = process.argv.slice(2);
if (!url || !slug) {
  console.error("usage: node capture.mjs <url> <slug> [outDir]");
  process.exit(1);
}
const OUT = resolve(outDirArg ?? "out");
const TMP = resolve(OUT, `_vid_${slug}`);
mkdirSync(OUT, { recursive: true });
rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const EXE =
  "C:\\Users\\wc_am\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe";

const browser = await chromium.launch({ executablePath: EXE });
const ctx = await browser.newContext({
  viewport: { width: 540, height: 960 },
  deviceScaleFactor: 2,
  recordVideo: { dir: TMP, size: { width: 540, height: 960 } },
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();
const urls = url.split(",");
const posterPng = join(TMP, "poster.png");

const GLIDE_MS = 2300;
const SETTLE_MS = 900;
const HERO_HOLD_MS = 1800;

let t0 = 0;
for (const [i, u] of urls.entries()) {
  await page.goto(u, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // keep programmatic scrolling under our easing control, not CSS smooth
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
  });
  await page.waitForTimeout(1200);

  // poster from the top of the first page
  if (i === 0) {
    await page.screenshot({ path: posterPng });
    t0 = Date.now();
  }

  // section stops: viewport-height steps down the page
  const { scrollH, viewH } = await page.evaluate(() => ({
    scrollH: document.documentElement.scrollHeight,
    viewH: window.innerHeight,
  }));
  const maxY = Math.max(0, scrollH - viewH);
  const stops = [];
  for (let y = viewH * 0.9; y < maxY; y += viewH * 0.9)
    stops.push(Math.round(y));
  if (maxY > 0) stops.push(maxY);
  // optional cap so rough below-the-fold content stays out of frame
  const maxStops = Number(process.env.CAP_MAX_STOPS || 0);
  if (maxStops > 0 && stops.length > maxStops) stops.length = maxStops;

  await page.waitForTimeout(HERO_HOLD_MS); // hero hold
  let from = 0;
  for (const to of stops) {
    await page.evaluate(
      async ({ from, to, dur }) => {
        const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        const start = performance.now();
        await new Promise((done) => {
          const step = (now) => {
            const p = Math.min(1, (now - start) / dur);
            window.scrollTo(0, from + (to - from) * ease(p));
            if (p < 1) requestAnimationFrame(step);
            else done();
          };
          requestAnimationFrame(step);
        });
      },
      { from, to, dur: GLIDE_MS }
    );
    await page.waitForTimeout(SETTLE_MS); // settle hold so reveals finish
    from = to;
  }
  console.log(`page ${i + 1}/${urls.length} done stops=${stops.length}`);
}
const CAPDUR = (Date.now() - t0) / 1000;
console.log(`CAPDUR=${CAPDUR.toFixed(2)}s`);

await ctx.close(); // flushes the video
await browser.close();

const raw = readdirSync(TMP).find((f) => f.endsWith(".webm"));
if (!raw) throw new Error("no recorded video found");
const rawPath = join(TMP, raw);

// total duration of the raw recording
const total = parseFloat(
  execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration",
    "-of", "default=nw=1:nk=1", rawPath,
  ]).toString().trim()
);
const ss = Math.max(0, total - CAPDUR).toFixed(2);
console.log(`total=${total.toFixed(2)}s -> trim from ${ss}s`);

const webmOut = join(OUT, `${slug}.webm`);
const webpOut = join(OUT, `${slug}.webp`);
execFileSync("ffmpeg", [
  "-y", "-i", rawPath, "-ss", ss,
  "-c:v", "libvpx", "-b:v", "0", "-crf", "32", "-r", "25",
  "-vf", "scale=540:960", "-an", webmOut,
], { stdio: "inherit" });
execFileSync("ffmpeg", [
  "-y", "-i", posterPng,
  "-vf", "scale=540:960",
  "-c:v", "libwebp", "-quality", "82", webpOut,
], { stdio: "inherit" });

rmSync(TMP, { recursive: true, force: true });
for (const f of [webmOut, webpOut])
  console.log(`${f}  ${(statSync(f).size / 1024).toFixed(0)}KB`);
