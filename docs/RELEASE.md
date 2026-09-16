# MAIA'S WORKS release checklist

## Product contract

- MAIA'S WORKS portfolio: home, about/services, nine case studies and contact. EAXEA remains the founder's GitHub username; repository and deployment addresses are unchanged.
- Preserve the cinematic identity, real project media, Turkish copy and reduced-motion support.
- Contact prepares or copies a mail draft. It does not send or store messages on a backend.
- Medical catalog is an anonymous archived discovery; Bass Assistant development is paused.
- Never fabricate testimonials, prices, conversion metrics, client approvals or a showreel.

## Verification

Use Node 24 LTS. Run `npm ci`, `npm run lint`, `npm test`, `npm run build`, `npm run typecheck` and `npm audit --omit=dev`.
Start production: `npm run start -- --hostname 127.0.0.1 --port 3210`.
In a second PowerShell terminal run `$env:TEST_BASE_URL='http://127.0.0.1:3210'; npm test`.

Check mobile menu opening, Escape, focus return, keyboard wrapping, desktop resizing while open, contact validation, radio keyboard controls, copy success/fallback, all case links, offscreen video pause and reduced-motion preferences.
The automated route suite checks 13 content routes, canonical and OG URLs, security headers, unknown-route 404s, sitemap and the social image.

## Release approval

Existing project rules require explicit user approval for code commits, push, tags and production deployment. Review the final diff and verification results first. Preserve unpublished commit 8e8de0e.
After approval: commit reviewed changes, tag the agreed version, push master and the tag, deploy the existing Vercel project and rerun route tests against production.

## User decisions and real assets

- Custom domain: user chooses/purchases it; update site.ts, Vercel/DNS and canonical tests together. Current URL: https://eaxea-site.vercel.app.
- Backend contact delivery: requires sender/provider configuration and privacy requirements. Never reuse another client project's credentials.
- Testimonial: actual customer text and approval.
- Showreel: real footage and an approved edit; existing film credits are linked on Studio.
- Pricing: actual starting price, if the user wants to publish one.

These additions do not justify invented content or silently changing the agreed email workflow.
