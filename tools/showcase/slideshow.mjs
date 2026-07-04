// Stills -> 540x960 VP8 webm slideshow (blur-pad fill, crossfades) + webp poster.
// Usage: node slideshow.mjs <slug> <outDir> <img1> <img2> ...
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const [slug, outDir, ...images] = process.argv.slice(2);
if (!slug || !outDir || images.length < 2) {
  console.error("usage: node slideshow.mjs <slug> <outDir> <img1> <img2> ...");
  process.exit(1);
}

const HOLD = 2.6; // seconds each still is fully visible
const FADE = 0.6; // crossfade duration
const OUT = resolve(outDir);

// Each input: loop the still for HOLD+FADE, blur-pad to 540x960.
const args = ["-y"];
for (const img of images) args.push("-loop", "1", "-t", String(HOLD + FADE), "-i", img);

let fc = "";
for (let i = 0; i < images.length; i++) {
  fc +=
    `[${i}:v]split[a${i}][b${i}];` +
    `[a${i}]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,` +
    `gblur=sigma=28,eq=brightness=-0.12[bg${i}];` +
    `[b${i}]scale=540:960:force_original_aspect_ratio=decrease[fg${i}];` +
    `[bg${i}][fg${i}]overlay=(W-w)/2:(H-h)/2,setsar=1,fps=25,format=yuv420p[v${i}];`;
}
// chain crossfades
let prev = "v0";
for (let i = 1; i < images.length; i++) {
  const label = i === images.length - 1 ? "vout" : `x${i}`;
  const offset = (HOLD * i).toFixed(2);
  fc += `[${prev}][v${i}]xfade=transition=fade:duration=${FADE}:offset=${offset}[${label}];`;
  prev = label;
}
fc = fc.slice(0, -1); // drop trailing ;

const webm = join(OUT, `${slug}.webm`);
const webp = join(OUT, `${slug}.webp`);
execFileSync(
  "ffmpeg",
  [...args, "-filter_complex", fc, "-map", "[vout]",
   "-c:v", "libvpx", "-b:v", "0", "-crf", "30", "-r", "25", "-an", webm],
  { stdio: "inherit" }
);
// poster = first still, same blur-pad treatment
execFileSync(
  "ffmpeg",
  ["-y", "-i", images[0], "-filter_complex",
   "[0:v]split[a][b];[a]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,gblur=sigma=28,eq=brightness=-0.12[bg];[b]scale=540:960:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[out]",
   "-map", "[out]", "-frames:v", "1", "-c:v", "libwebp", "-quality", "82", webp],
  { stdio: "inherit" }
);
console.log("done", webm, webp);
