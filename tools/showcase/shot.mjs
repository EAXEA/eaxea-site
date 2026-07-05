// Single DSF2 screenshot of a URL -> PNG.
// Usage: node shot.mjs <url> <outPng> [waitMs] [width] [height]
// Defaults to the 540x960 portrait showcase viewport; pass e.g. 1440 900 for
// the desktop "-wide" cover captures.
import { chromium } from "playwright-core";

const [url, outPng, waitMs, w, h] = process.argv.slice(2);
const EXE =
  "C:\\Users\\wc_am\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe";

const browser = await chromium.launch({ executablePath: EXE });
const page = await browser.newPage({
  viewport: { width: Number(w ?? 540), height: Number(h ?? 960) },
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(Number(waitMs ?? 1200));
await page.screenshot({ path: outPng });
await browser.close();
console.log("saved", outPng);
