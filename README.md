# Jeremy Portfolio

Interactive single-page portfolio for Jeremy Bennett.

The site is built around a bento-style project grid and a live preview modal with responsive viewport controls (preset breakpoints + drag resize).

## Live Capabilities

- Bento grid with asymmetric card sizing (`standard`, `wide`, `tall`, `large`)
- Animated category filters (`All`, `Web`, `Email`, `Tools`, `Components`)
- Shared-layout card expansion into a modal using Framer Motion
- Three project content types:
  - `iframe` for standalone HTML demos
  - `component` for in-app React previews
  - `external-link` for tools/apps hosted elsewhere
- Responsive preview controls inside modal:
  - Presets: `1280`, `768`, `375`
  - Drag handle resize with clamp behavior
  - Live width badge
- Accessibility features:
  - Escape-to-close modal
  - Backdrop click close
  - Focus trapping in modal
  - Scroll lock while modal is open

## Stack

- React 19 (functional components + hooks)
- Vite
- Tailwind CSS
- Framer Motion

## Design System

- Rigid style guide: `docs/PORTFOLIO_DESIGN_SYSTEM.md`

## Local Setup

```bash
npm install
npm run dev
```

Dev server defaults to Vite standard local URL.

## Quality Checks

```bash
npm run lint
npm run build
```

Both commands must pass before merge/deploy.

## Project Structure

```text
public/
  assets/thumbnails/          # Card thumbnail assets
  projects/                   # Standalone iframe demos
src/
  components/                 # UI architecture pieces
  data/projects.js            # Data-driven portfolio model
  projects/                   # React component-type project demos
  App.jsx
  main.jsx
  index.css
.github/workflows/ci.yml      # GitHub Actions safeguard
```

## Adding a New Project

Add one object to `src/data/projects.js`:

```js
{
  id: 'project-slug',
  title: 'Project Title',
  subtitle: 'Client — Discipline',
  category: 'web', // web | email | tool | component
  cardSize: 'wide', // standard | wide | tall | large
  thumbnail: '/assets/thumbnails/example.svg',
  content: {
    type: 'iframe',
    src: '/projects/example/index.html',
    // or: type: 'component', component: MyPreviewComponent
    // or: type: 'external-link', url: 'https://example.com'
  },
  description: 'What it is and why it matters.',
  tags: ['web', 'react'],
  supportsResponsivePreview: true,
}
```

If using `iframe`, place static files under `public/projects/<slug>/`.
If using `component`, create the React preview in `src/projects/` and import it into `src/data/projects.js`.

## Deployment

This app is static-ready and can deploy to:

- Vercel
- Netlify
- GitHub Pages

GitHub Pages is configured via `.github/workflows/deploy-pages.yml` and deploys on pushes to `main`.
Expected URL: `https://jeremylukebennett.github.io/jeremy-portfolio/`.

## Safeguards

- CI runs `npm ci`, `npm run lint`, and `npm run build` on pushes + pull requests.
- Local checks mirror CI to keep parity between local and remote quality gates.
