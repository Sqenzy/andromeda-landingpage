# Technical landing page redesign

The landing page now uses a dark technical aesthetic: subtle grid backgrounds, crisp borders, restrained mint highlights, monospace configuration labels, and an original geometric Andromeda mark.

## Feature visualizations

- **Routing:** animated SVG request paths through Andromeda to destinations, with a separate blocked-IP path.
- **Targets:** destination list with configured and standby examples.
- **IP blocks:** example allow/block policies using documentation-only IP ranges.
- **Security checks:** visual checklist for IP policy, security rules, and destination resolution.
- **Visibility:** separate audit-history preview and an explicit permission-restricted developer-access explanation.

All console previews, configuration labels, activity, and code-like expressions are explanatory illustrations. They are not live telemetry, executable API examples, or infrastructure configuration controls. App actions continue to point to the production Andromeda app.

The four-feature explorer supports pointer selection, Left/Right Arrow, Home, and End. Feature-card links select the associated explorer tab. Mobile navigation closes on selection or Escape. Reduced-motion preferences hide animated request signals and disable smooth scrolling.

## Run and validate

Run these commands from this directory:

```sh
npm ci
npm run dev
npm test
npm run build
```

For actual Chromium layout and interaction checks:

```sh
npx playwright install chromium
npm run test:browser
```

The browser script starts and stops its own Vite server on port 4179. It checks 1440, 1024, 768, 390, and 320 pixel viewports, feature selection, page overflow, mobile navigation, and runtime errors. Full-page screenshots are saved to `JCODE_SCRATCH_DIR` when set, otherwise to the ignored `test-results/` directory.

Dependencies and production output are ignored by Git. The existing untracked README was left untouched.
