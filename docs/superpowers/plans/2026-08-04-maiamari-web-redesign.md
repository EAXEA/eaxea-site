# Maiamari.web Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** EAXEA portfolyosunu, fotogerçekçi M·01 Product Engine açılışına ve Türkçe dönüşüm akışına sahip Maiamari.web Design & Technology Studio sitesine dönüştürmek.

**Architecture:** İçerik ve temel CTA’lar sunucu tarafından render edilen erişilebilir React bileşenlerinde kalır. Sinematik makine, uygun cihazlarda dinamik yüklenen React Three Fiber katmanı olarak bu temelin üzerine eklenir; mobil, reduced-motion ve WebGL başarısızlığı durumlarında yüksek kaliteli 2D yedek çalışır. GSAP yalnızca üç ekran yüksekliğindeki açılış zaman çizgisini ve kontrollü bölüm geçişlerini yönetir.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript strict, Tailwind CSS 4, React Three Fiber 9, Drei 10, Three.js 0.184, GSAP 3.15, Lenis 1.3, Vitest, Testing Library, Playwright.

## Global Constraints

- Görünen ana marka tam olarak `maiamari.web`; tanım `Design & Technology Studio`.
- Ana dil Türkçe; “Creative Developer” ve “Vibe Coding” müşteri metinlerinden kaldırılır.
- EAXEA yalnızca küçük `Built by EAXEA` üretici damgası olabilir.
- Hero mesajı: `Fikirleri çalışan dijital ürünlere dönüştürüyoruz.`
- Birincil CTA: `Projeleri İncele`; ikincil CTA: `Birlikte Çalışalım`.
- Mavi frontend, sıcak amber backend, yumuşak beyaz AI akışını temsil eder; mor, magenta ve rainbow RGB kullanılmaz.
- Ağır WebGL animasyonu yalnızca ilk üç ekran yüksekliğinde bulunur; görsel şasi ve makine dili header’dan footer’a kesintisiz devam eder.
- WebGL, reduced-motion, coarse-pointer veya düşük bellek durumunda kullanılabilir 2D yedek zorunludur.
- Temel içerik ve CTA’lar 3D paketinden bağımsız render edilmelidir.
- WCAG AA kontrastı, klavye erişimi ve görünür odak korunmalıdır.
- Gerçek olmayan ekip, müşteri, metrik veya sonuç iddiası eklenmez.
- Ses ilk sürüm kapsamı dışındadır.
- Her görev sonunda `npm run lint`, ilgili test ve anlamlı bir commit bulunur.

---

## File Map

### Brand and content
- `src/lib/site.ts`: marka, navigasyon, SEO ve iletişim tek kaynağı.
- `src/data/work.ts`: proje içerikleri ve makine kartuşu alanları.
- `src/data/services.ts`: hizmet/alt sistem eşlemesi.
- `src/data/studio.ts`: manifesto, ilkeler ve çalışma modeli.

### Machine experience
- `src/components/machine/MachineHero.tsx`: semantik hero kabuğu ve CTA’lar.
- `src/components/machine/MachineFallback.tsx`: 2D ürün renderı.
- `src/components/machine/MachineExperience.tsx`: cihaz yeteneği ve WebGL yükleme kararı.
- `src/components/machine/MachineCanvas.tsx`: R3F canvas sınırı.
- `src/components/machine/MachineScene.tsx`: sahne kompozisyonu.
- `src/components/machine/ProjectCartridge.tsx`: fiziksel proje modülü.
- `src/components/machine/SignalTraces.tsx`: mavi/amber/beyaz veri akışı.
- `src/components/machine/useMachineTimeline.ts`: üç ekranlık GSAP zaman çizgisi.
- `src/components/machine/machine.types.ts`: ortak durum ve bileşen arayüzleri.

### Pages and sections
- `src/app/page.tsx`: yeni ana sayfa anlatı sırası.
- `src/components/sections/ProjectModules.tsx`: erişilebilir proje seçimi.
- `src/components/sections/SystemsSection.tsx`: hizmet alt sistemleri.
- `src/components/sections/StudioManifesto.tsx`: üretici plakası/hakkımızda özeti.
- `src/components/sections/ConnectionCTA.tsx`: iletişim geçişi.
- `src/app/work/page.tsx`: tüm proje modülleri.
- `src/app/work/[slug]/page.tsx`: teknik ve yaratıcı proje incelemesi.
- `src/app/studio/page.tsx`: stüdyo, hizmetler ve çalışma modeli.
- `src/app/contact/page.tsx`: yeni proje bağlantısı.
- `src/components/sections/ContactForm.tsx`: form durumu ve mailto teslimi.
- `src/components/layout/Nav.tsx`, `Footer.tsx`, `Logo.tsx`: yeni marka kabuğu.
- `src/app/globals.css`: endüstriyel tokenlar, malzeme ve hareket temeli.

### Tests
- `vitest.config.ts`, `src/test/setup.ts`: birim/bileşen test altyapısı.
- `src/**/*.test.ts(x)`: içerik ve bileşen davranışı.
- `playwright.config.ts`, `tests/e2e/*.spec.ts`: rotalar, CTA, fallback ve erişilebilirlik smoke testleri.

---

### Task 1: Test Harness and Brand Contract

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/lib/site.test.ts`
- Modify: `src/lib/site.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `site.name: "maiamari.web"`, `site.role: "Design & Technology Studio"`, `site.nav` with `/work`, `/studio`, `/contact`.

- [ ] **Step 1: Add the test dependencies and scripts**

Run:
```powershell
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm pkg set scripts.test="vitest run" scripts.test:watch="vitest"
```

- [ ] **Step 2: Create the Vitest configuration**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write the failing brand contract test**

```ts
import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("Maiamari.web brand contract", () => {
  it("uses the approved public identity and routes", () => {
    expect(site.name).toBe("maiamari.web");
    expect(site.role).toBe("Design & Technology Studio");
    expect(site.tagline).toBe("Fikirleri çalışan dijital ürünlere dönüştürüyoruz.");
    expect(site.nav.map((item) => item.href)).toEqual(["/work", "/studio", "/contact"]);
    expect(JSON.stringify(site)).not.toMatch(/Creative Developer|Vibe Coding/);
  });
});
```

- [ ] **Step 4: Run the test and verify the old identity fails**

Run: `npm test -- src/lib/site.test.ts`  
Expected: FAIL because `site.name` is `EAXEA`.

- [ ] **Step 5: Replace public brand copy and metadata**

Update `site.ts` with the exact contract above; set positioning to `Dijital ürün stratejisi · Tasarım · Frontend · Backend · AI`. Update layout metadata titles, description and keywords so no public metadata contains the retired positioning.

- [ ] **Step 6: Verify**

Run:
```powershell
npm test -- src/lib/site.test.ts
npm run lint
npm run build
```
Expected: all commands exit 0.

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json vitest.config.ts src/test src/lib/site.ts src/lib/site.test.ts src/app/layout.tsx
git commit -m "feat(brand): establish Maiamari.web identity"
```

### Task 2: Industrial Design Tokens and Accessible Primitives

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Logo.tsx`
- Create: `src/components/ui/Button.test.tsx`

**Interfaces:**
- Produces: CSS tokens `--color-render`, `--color-process`, `--color-ai`, `--color-copper`; Button variants `primary | hardware | ghost`.

- [ ] **Step 1: Write a failing interaction test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders the hardware variant as an accessible link", () => {
    render(<Button href="/contact" variant="hardware">Birlikte Çalışalım</Button>);
    expect(screen.getByRole("link", { name: "Birlikte Çalışalım" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link")).toHaveAttribute("data-hardware-control");
  });
});
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/ui/Button.test.tsx`  
Expected: FAIL because `hardware` and `data-hardware-control` do not exist.

- [ ] **Step 3: Replace the palette and implement the hardware control**

Remove ember/magenta/violet/cyan spectacle tokens. Add graphite, gunmetal, smoked glass, copper, render blue `#4BA8FF`, process amber `#D58A3C`, AI white `#F4F2EC`. Implement a glass-top button with an aluminum base, visible focus ring, hover lift and active `translateY(2px)`.

- [ ] **Step 4: Verify reduced motion and button behavior**

Run:
```powershell
npm test -- src/components/ui/Button.test.tsx
npm run lint
```
Expected: PASS and no lint errors.

- [ ] **Step 5: Commit**

```powershell
git add src/app/globals.css src/components/ui/Button.tsx src/components/ui/Button.test.tsx src/components/ui/Logo.tsx
git commit -m "feat(ui): add industrial Maiamari design system"
```

### Task 3: Project and Service Data Contracts

**Files:**
- Modify: `src/data/work.ts`
- Create: `src/data/services.ts`
- Create: `src/data/content.test.ts`

**Interfaces:**
- Produces: `MachineProject` fields `moduleIndex`, `signalProfile`, `preview`; `ServiceSystem` fields `id`, `label`, `customerOutcome`, `hardwareRole`.

- [ ] **Step 1: Write failing data integrity tests**

```ts
import { describe, expect, it } from "vitest";
import { machineProjects, work } from "./work";
import { services } from "./services";

describe("portfolio content", () => {
  it("exposes four unique machine modules", () => {
    expect(machineProjects).toHaveLength(4);
    expect(new Set(machineProjects.map((p) => p.moduleIndex)).size).toBe(4);
    machineProjects.forEach((p) => expect(p.preview).toMatch(/^\/showcase\//));
  });
  it("contains no retired customer-facing role copy", () => {
    expect(JSON.stringify({ work, services })).not.toMatch(/Creative Developer|Vibe Coding/);
  });
  it("maps every service to a unique hardware subsystem", () => {
    expect(new Set(services.map((s) => s.hardwareRole)).size).toBe(services.length);
  });
});
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/data/content.test.ts`  
Expected: FAIL because `machineProjects` and `services` do not exist.

- [ ] **Step 3: Implement the typed contracts**

Use exactly four hero modules: Maiamari Studio, Bass Assistant, Ancyra, İklim İçin. Preserve the complete `work` archive for the work page. Map services to Strategy Controller, Interface Renderer, Communication Bus, Secure Processor, Neural Processor and Release Controller.

- [ ] **Step 4: Verify**

Run: `npm test -- src/data/content.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/data/work.ts src/data/services.ts src/data/content.test.ts
git commit -m "feat(content): define product engine data contracts"
```

### Task 4: Capability Policy and 2D Fallback

**Files:**
- Create: `src/lib/experience.ts`
- Create: `src/lib/experience.test.ts`
- Create: `src/components/machine/MachineFallback.tsx`
- Create: `src/components/machine/MachineExperience.tsx`
- Create: `src/components/machine/MachineExperience.test.tsx`

**Interfaces:**
- Produces: `getExperienceMode(input): "webgl" | "static"`.
- Consumes: `machineProjects` from Task 3.

- [ ] **Step 1: Write the failing policy test**

```ts
import { expect, it } from "vitest";
import { getExperienceMode } from "./experience";

it.each([
  [{ reducedMotion: true, coarsePointer: false, deviceMemory: 8, webgl: true }, "static"],
  [{ reducedMotion: false, coarsePointer: true, deviceMemory: 8, webgl: true }, "static"],
  [{ reducedMotion: false, coarsePointer: false, deviceMemory: 4, webgl: true }, "static"],
  [{ reducedMotion: false, coarsePointer: false, deviceMemory: 8, webgl: true }, "webgl"],
])("selects the safe experience", (input, expected) => {
  expect(getExperienceMode(input)).toBe(expected);
});
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/lib/experience.test.ts`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the pure policy and fallback-first component**

```ts
export type ExperienceInput = {
  reducedMotion: boolean;
  coarsePointer: boolean;
  deviceMemory?: number;
  webgl: boolean;
};

export function getExperienceMode(i: ExperienceInput) {
  return !i.reducedMotion && !i.coarsePointer && (i.deviceMemory ?? 8) > 4 && i.webgl
    ? "webgl"
    : "static";
}
```

`MachineExperience` must render `MachineFallback` immediately and dynamically mount the canvas only when policy returns `webgl`. The fallback includes the headline and both CTA links in the DOM.

- [ ] **Step 4: Verify**

Run:
```powershell
npm test -- src/lib/experience.test.ts src/components/machine/MachineExperience.test.tsx
npm run lint
```
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/lib/experience.ts src/lib/experience.test.ts src/components/machine
git commit -m "feat(hero): add fallback-first experience policy"
```

### Task 5: Semantic Machine Hero and Project Selection

**Files:**
- Create: `src/components/machine/machine.types.ts`
- Create: `src/components/machine/MachineHero.tsx`
- Create: `src/components/machine/MachineHero.test.tsx`
- Create: `src/components/sections/ProjectModules.tsx`
- Create: `src/components/sections/ProjectModules.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `MachineState { activeSlug: string; phase: "sleep" | "boot" | "active" | "disassemble" }`.
- Produces: `onProjectSelect(slug: string): void`.

- [ ] **Step 1: Write failing accessible-selection test**

```tsx
render(<ProjectModules projects={machineProjects} activeSlug="ancyra" onProjectSelect={onSelect} />);
await user.click(screen.getByRole("button", { name: /Bass Assistant projesini seç/i }));
expect(onSelect).toHaveBeenCalledWith("bass-assistant");
expect(screen.getByRole("button", { name: /Ancyra projesini seç/i })).toHaveAttribute("aria-pressed", "true");
```

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/sections/ProjectModules.test.tsx`  
Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the hero state boundary**

Keep `MachineHero` responsible only for active project and machine phase. Pass state to `MachineExperience` and `ProjectModules`; do not let Three.js objects own business state.

- [ ] **Step 4: Replace the old homepage hero**

Render `MachineHero` first and keep the rest of the existing page temporarily below it. Remove `Hero` and `MarqueeStrip` from `page.tsx`; do not delete their files until the new homepage passes visual regression.

- [ ] **Step 5: Verify**

Run:
```powershell
npm test -- src/components/machine/MachineHero.test.tsx src/components/sections/ProjectModules.test.tsx
npm run build
```
Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/components/machine src/components/sections/ProjectModules* src/app/page.tsx
git commit -m "feat(hero): add semantic product engine shell"
```

### Task 6: R3F M·01 Scene

**Files:**
- Create: `src/components/machine/MachineCanvas.tsx`
- Create: `src/components/machine/MachineScene.tsx`
- Create: `src/components/machine/ProjectCartridge.tsx`
- Create: `src/components/machine/SignalTraces.tsx`
- Create: `src/components/machine/BackendController.tsx`
- Create: `src/components/machine/CanvasErrorBoundary.tsx`
- Modify: `src/components/machine/MachineExperience.tsx`

**Interfaces:**
- Consumes: `MachineState`, active `MachineProject`.
- Produces: visual callbacks `onSceneReady(): void`, `onSceneError(): void`.

- [ ] **Step 1: Write the error-boundary behavior test**

Render a child that throws and assert `onSceneError` fires while the static fallback remains visible.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/machine/MachineExperience.test.tsx`  
Expected: FAIL for the new error path.

- [ ] **Step 3: Build the scene from procedural primitives first**

Use beveled boxes, planes, cylinders and instancing for the chassis, glass, cartridges, controllers and PCB details. Do not introduce downloaded models in this task. Use a shared `THREE.MeshStandardMaterial` library and keep draw calls below 180 on the reference desktop scene.

- [ ] **Step 4: Add functional signal traces**

`SignalTraces` accepts `activeSlug` and `phase`; animate shader/texture offsets only while `phase === "active"`. Blue travels cartridge → display, amber display → M·01 → controllers, white pulses only around the neural processor.

- [ ] **Step 5: Add the mounted project display**

Render the selected project preview as a texture on the physical display. Use optimized local `/showcase/*-wide.webp` assets and crossfade over 400 ms after the previous module powers down.

- [ ] **Step 6: Verify**

Run:
```powershell
npm test -- src/components/machine/MachineExperience.test.tsx
npm run lint
npm run build
```
Expected: PASS; no server-render error.

- [ ] **Step 7: Commit**

```powershell
git add src/components/machine
git commit -m "feat(three): build M01 product engine scene"
```

### Task 7: Three-Viewport Scroll Narrative

**Files:**
- Create: `src/components/machine/useMachineTimeline.ts`
- Create: `src/components/machine/useMachineTimeline.test.ts`
- Modify: `src/components/machine/MachineHero.tsx`
- Modify: `src/lib/gsap.ts`

**Interfaces:**
- Produces: `createMachineTimeline({ root, onPhaseChange }): gsap.core.Timeline`.
- Phase thresholds: sleep `0–0.08`, boot `0.08–0.25`, active `0.25–0.72`, disassemble `0.72–1`.

- [ ] **Step 1: Write a failing threshold test**

Test a pure `phaseForProgress(progress)` helper at `0`, `0.1`, `0.5`, and `0.9`.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/machine/useMachineTimeline.test.ts`.

- [ ] **Step 3: Implement the pure phase mapper and GSAP timeline**

Pin only on capable desktop mode, set the hero narrative height to `300svh`, and update React phase only when thresholds change. Reduced-motion mode skips pinning and renders phase `active`.

- [ ] **Step 4: Verify cleanup**

Add a test that calls the hook cleanup and asserts the created timeline and ScrollTrigger are killed.

- [ ] **Step 5: Run verification**

Run:
```powershell
npm test -- src/components/machine/useMachineTimeline.test.ts
npm run lint
```

- [ ] **Step 6: Commit**

```powershell
git add src/components/machine/useMachineTimeline* src/components/machine/MachineHero.tsx src/lib/gsap.ts
git commit -m "feat(motion): orchestrate three-screen machine narrative"
```

### Task 8: Homepage Continuation Sections

**Files:**
- Create: `src/components/sections/SystemsSection.tsx`
- Create: `src/components/sections/StudioManifesto.tsx`
- Create: `src/components/sections/ConnectionCTA.tsx`
- Create: `src/components/sections/HomeSections.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `services`, `featuredWork`, `site`.
- Produces: server-rendered links to `/work`, `/studio`, `/contact`.

- [ ] **Step 1: Write a failing homepage content test**

Assert the rendered homepage contains “Projeler”, “Hizmetler”, “Hakkımızda”, and a “Birlikte Çalışalım” link to `/contact`.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/sections/HomeSections.test.tsx`.

- [ ] **Step 3: Implement the sections**

Use one continuous M·01 chassis: display → featured work, controllers → services, service hatch → manifesto, communication terminal → CTA, bottom service rail → footer. Keep these sections DOM-first with subtle GSAP reveals and CSS/HTML hardware surfaces; no additional Canvas. Every section heading must use the shared \`MachineDisplay\` component matching the contact terminal’s monochrome calculator/VFD screen.

- [ ] **Step 4: Remove superseded homepage components**

Remove old homepage imports only after the new test and build pass. Delete unused section files only in a dedicated cleanup commit and only when repository search proves no remaining imports.

- [ ] **Step 5: Verify**

Run:
```powershell
npm test -- src/components/sections/HomeSections.test.tsx
npm run build
```

- [ ] **Step 6: Commit**

```powershell
git add src/app/page.tsx src/components/sections
git commit -m "feat(home): complete Maiamari product narrative"
```

### Task 9: Project Index and Case Study System

**Files:**
- Modify: `src/app/work/page.tsx`
- Modify: `src/app/work/[slug]/page.tsx`
- Modify: `src/components/work/WorkCard.tsx`
- Modify: `src/components/work/CaseCover.tsx`
- Create: `src/components/work/ProjectModuleCard.tsx`
- Create: `src/app/work/work-pages.test.tsx`

**Interfaces:**
- Consumes: complete `work` collection; `MachineProject` enhancements when present.
- Produces: all static project routes and adjacent-project navigation.

- [ ] **Step 1: Write failing route/content tests**

Assert `generateStaticParams()` returns every `work.slug`; a study without metrics renders no metric strip; all studies render Problem, Yaklaşım, Sonuç and next-project link.

- [ ] **Step 2: Verify failure for the new module presentation**

Run: `npm test -- src/app/work/work-pages.test.tsx`.

- [ ] **Step 3: Implement the industrial project index**

Use removable-module visual language without forcing WebGL. Preserve proof-first ordering and existing truthful content. Replace retired role text in project data with `AI destekli geliştirme` or the specific verifiable role.

- [ ] **Step 4: Restructure case studies**

Order each page as summary, problem, approach, technology/system, process, media, verified outcomes, next project, contact CTA. Add sections only when source data exists; do not invent content.

- [ ] **Step 5: Verify**

Run:
```powershell
npm test -- src/app/work/work-pages.test.tsx
npm run build
```

- [ ] **Step 6: Commit**

```powershell
git add src/app/work src/components/work src/data/work.ts
git commit -m "feat(work): redesign portfolio as product modules"
```

### Task 10: Studio and Services Page

**Files:**
- Modify: `src/app/studio/page.tsx`
- Modify: `src/data/studio.ts`
- Modify: `src/components/sections/ServicesSection.tsx`
- Modify: `src/components/sections/ProcessSection.tsx`
- Create: `src/app/studio/studio-page.test.tsx`

**Interfaces:**
- Consumes: `services`, `site`.
- Produces: truthful “biz” voice, manufacturer-plate manifesto, service outcomes and work model.

- [ ] **Step 1: Write the failing copy test**

Assert the page includes `Design & Technology Studio`, service customer outcomes and `Built by EAXEA`; assert it does not contain `Creative development`, `creative developer` or unsupported team-size claims.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/app/studio/studio-page.test.tsx`.

- [ ] **Step 3: Implement the studio narrative**

Lead with ownership, clarity, technical depth and selected collaborations. Keep verifiable production history as supporting evidence but do not let video production redefine the main positioning.

- [ ] **Step 4: Verify**

Run:
```powershell
npm test -- src/app/studio/studio-page.test.tsx
npm run lint
```

- [ ] **Step 5: Commit**

```powershell
git add src/app/studio src/data/studio.ts src/components/sections/ServicesSection.tsx src/components/sections/ProcessSection.tsx
git commit -m "feat(studio): reposition Maiamari as design technology studio"
```

### Task 11: Contact Connection Flow

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/sections/ContactForm.tsx`
- Modify: `src/data/contact.ts`
- Create: `src/components/sections/ContactForm.test.tsx`

**Interfaces:**
- Produces: validated form fields `name`, `email`, `message`, optional `budget`, optional `timeline`.
- Delivery remains mailto for this release; no server API or secret is introduced.

- [ ] **Step 1: Write failing form tests**

Use Testing Library to submit empty fields and assert browser validation; fill required fields plus budget/timeline, submit, and assert the generated mailto includes encoded values. Assert the success status uses `role="status"`.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/sections/ContactForm.test.tsx`.

- [ ] **Step 3: Implement the connection-port presentation**

Keep native labels, required attributes and email type. Add optional select controls for budget and timing. Move mailto composition to an exported pure `buildProjectMailto(data)` function and show “Bağlantı hazır — mail uygulaması açıldı” in an aria-live status.

- [ ] **Step 4: Verify**

Run:
```powershell
npm test -- src/components/sections/ContactForm.test.tsx
npm run lint
```

- [ ] **Step 5: Commit**

```powershell
git add src/app/contact src/components/sections/ContactForm.tsx src/components/sections/ContactForm.test.tsx src/data/contact.ts
git commit -m "feat(contact): add accessible project connection flow"
```

### Task 12: Navigation, E2E, Accessibility and Performance Gate

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/ui/Logo.tsx`
- Create: `playwright.config.ts`
- Create: `tests/e2e/navigation.spec.ts`
- Create: `tests/e2e/fallback.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`
- Modify: `package.json`
- Modify: `.gitignore`
- Modify: `README.md`

**Interfaces:**
- Produces: `npm run test:e2e`; verified routes `/`, `/work`, `/studio`, `/contact`.

- [ ] **Step 1: Install and configure Playwright**

Run:
```powershell
npm install -D @playwright/test
npx playwright install chromium
npm pkg set scripts.test:e2e="playwright test"
```

Configure Chromium desktop and a mobile viewport. Start the production server through Playwright `webServer` with `npm run build && npm run start`.

- [ ] **Step 2: Write failing navigation and fallback tests**

```ts
test("primary journeys work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Fikirleri çalışan dijital ürünlere dönüştürüyoruz." })).toBeVisible();
  await page.getByRole("link", { name: "Projeleri İncele" }).click();
  await expect(page).toHaveURL(/\/work$/);
});

test("reduced motion keeps the hero usable", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Birlikte Çalışalım" })).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
```

- [ ] **Step 3: Run and verify failure**

Run: `npm run test:e2e`  
Expected: FAIL until the brand shell and fallback behavior are complete.

- [ ] **Step 4: Finish navigation and route-transition polish**

Use a short smoked-glass fade between routes; do not mount another 3D camera. Ensure menu close restores focus, active route has `aria-current="page"`, and all footer links use the Maiamari identity.

- [ ] **Step 5: Run the full gate**

Run:
```powershell
npm test
npm run lint
npm run build
npm run test:e2e
```
Expected: all commands exit 0.

- [ ] **Step 6: Run manual performance checks**

Against the production build, record desktop and mobile Lighthouse results. Acceptance targets:
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95
- Mobile Performance ≥ 80
- Desktop Performance ≥ 90
- No horizontal overflow at 360 px
- No unhandled console errors
- Hero CTA usable before WebGL completes

If a target fails, fix the measured cause before release; do not hide the audit or lower the target.

- [ ] **Step 7: Document the architecture**

Update README with brand, local commands, experience-mode policy, project preview asset naming, test commands and the fact that no secrets are required for the mailto form.

- [ ] **Step 8: Commit**

```powershell
git add src/components/layout src/components/ui/Logo.tsx playwright.config.ts tests package.json package-lock.json .gitignore README.md
git commit -m "test: gate Maiamari redesign for release"
```

## Final Release Review

- [ ] Confirm the rendered site contains no public `EAXEA` branding except the approved small manufacturer mark.
- [ ] Confirm no `Creative Developer`, `Creative development` or customer-facing `Vibe Coding` remains.
- [ ] Confirm all four machine modules show the correct real preview.
- [ ] Confirm keyboard-only navigation reaches both hero CTAs, project modules, navigation and form.
- [ ] Confirm reduced-motion and WebGL-disabled modes provide the complete journey.
- [ ] Confirm project claims and metrics match source data.
- [ ] Confirm `git status --short` is clean after the final commit.


## Approved Visual Amendment

The implementation must treat the page as one continuous manufactured device. Do not transition into conventional editorial page sections below the hero. Header, section headings, project modules, services, studio hatch, contact terminal and footer must share the same chassis rails, PCB substrate and smoked-glass construction.

All section and subsection headings use one reusable monochrome calculator/VFD display language matching the contact form screen. Implement this with `MachineDisplay`; do not mix OLED, segmented display and engraved-heading styles arbitrarily. Density is reduced through empty hardware bays and spacing inside the chassis, not by leaving the machine metaphor.
