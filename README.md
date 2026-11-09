# Andromeda Security Landing Page

> A little clarity. A world of control.

Andromeda Security brings traffic routing, security settings, and infrastructure visibility into one focused workspace. This React landing app introduces the platform, explains its core capabilities, and gives visitors a direct path to the application at **https://app.andromedasecurity.eu**.

The landing page is a standalone marketing frontend. It does not configure infrastructure, authenticate users, or display live traffic data itself. Those workflows belong to the main application and its backend.

## Platform features

| Capability | What the application offers |
| --- | --- |
| **Routing** | Manage destination URLs and redirect settings, deciding where incoming traffic goes. |
| **Security** | Configure security checks and IP access policies around the requirements of an application. |
| **Visibility** | Authorized developers can review infrastructure status and audit history. These server-wide features are permission-restricted. |

The landing page's flow diagrams are explanatory illustrations, not live monitoring dashboards.

## Landing page features

### Light, spacious design

- Google Antigravity-inspired visual direction with original Andromeda branding and copy.
- White canvas, oversized centered headings, soft blue, green, and lavender illustrations, and dark rounded action buttons.
- Orbital brand mark and subtle animated particles that connect the design to the Andromeda identity.
- Responsive layouts for desktop, tablet, and mobile screens.

### Interactive platform explorer

Switch between **Routing**, **Security**, and **Visibility** to see a matching flow illustration and explanation.

- Select tabs with a pointer or keyboard.
- Use **Left Arrow** and **Right Arrow** to move between tabs.
- Use **Home** and **End** to jump to the first or last tab.
- The selected tab and its content panel are connected through accessible labels.

### Clear navigation and app access

- Navigation links jump to Platform, Capabilities, and Get started sections.
- Mobile navigation opens using the menu button and closes when a section is selected or Escape is pressed while focus is inside the navigation.
- **Open app**, **Enter Andromeda**, and **Open the app** all link to `https://app.andromedasecurity.eu`.
- A scroll cue leads to the platform section, and a footer link returns to the top.

### Accessibility and metadata

- Semantic headings, navigation, sections, buttons, and links.
- Keyboard-accessible controls and visible focus indicators.
- A skip-to-content link.
- Text alternatives for explanatory flow diagrams, with decorative graphics hidden from assistive technology.
- Reduced-motion support disables decorative animations and smooth scrolling when requested by the visitor's device settings.
- Page title, description, theme color, and an orbital favicon.

## Technology

- **React 18** and React DOM for rendering and interaction.
- **Vite 6** for local development and production builds.
- **CSS and inline SVG** for layout, graphics, and animation.
- **Vitest**, **Testing Library**, and **jsdom** for component and interaction tests.
- **DM Sans**, loaded from Google Fonts, with system sans-serif fallbacks if the font cannot load.

The landing app does not require Clerk configuration or backend credentials.

## Run locally

From the repository root:

```sh
cd "landing page"
npm install
npm run dev
```

Open the local address printed by Vite. The landing page is served at `/` when run independently.

To run the existing console and landing entry together instead, use `npm run dev` from the repository root. In that mode, visit `/landing%20page/` for the landing page.

## Build and preview

From `landing page/`:

```sh
npm run build
npm run preview
```

The standalone production output is written to `landing page/dist/`. Deploy the contents of that directory to a static host to serve the landing app independently.

Running `npm run build` at the repository root instead builds both the console and landing entries into the root `dist/` directory.

## Tests

From `landing page/`:

```sh
npm test
```

The landing tests cover:

- Main headline and the three capability sections.
- Production app destinations for all app action buttons.
- Valid in-page navigation and the skip link.
- Capability switching and accessible tab relationships.
- Arrow-key, Home, and End navigation.
- Mobile menu selection, Escape handling, and focus restoration.

The repository-wide suite is available through `npm test` from the repository root.

## File structure

```text
landing page/
├── index.html          # HTML entry, metadata, and favicon
├── main.jsx            # React root and stylesheet import
├── Landing.jsx         # Page sections, navigation, tabs, and graphics
├── styles.css          # Visual design, responsive layouts, and reduced motion
├── Landing.test.jsx    # Rendering, navigation, and interaction tests
└── package.json        # Dependencies and development scripts
```

## Customization

- **Application destination:** update `APP_URL` in `landing page/Landing.jsx`. The tests intentionally verify the production destination, so update them if that destination changes.
- **Feature descriptions:** edit the `capabilities` array in `Landing.jsx`. It supplies both the explorer and the feature cards.
- **Page copy and sections:** edit the JSX in `Landing.jsx`.
- **Colors, spacing, typography, and motion:** edit `styles.css`.
- **Browser metadata:** edit `index.html`.

Keep marketing claims aligned with implemented application features and retain the authorization qualifier for developer-only infrastructure and audit access. For the main console and backend contracts, see [README.md](README.md) and [API.md](API.md).
