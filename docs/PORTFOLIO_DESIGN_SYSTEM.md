# Portfolio Design System (Rigid)

Version: 1.0  
Applies to: `src/` UI, demo project previews, and any future additions.

## Purpose

This document defines non-optional visual and interaction rules for the Jeremy portfolio.  
If a change conflicts with this guide, this guide wins unless explicitly revised.

## Brand Principles

- Hard-edged, graphic, high-contrast presentation.
- Flat color blocks over soft gradients/shadows.
- Fast, decisive interactions over playful motion.
- Utility-first layouts with strong structure.
- Showcase execution quality and clarity, not decorative complexity.

## Color Tokens (Canonical)

Use these exact values as system tokens:

- `brand.black`: `#0A0A0A`
- `brand.white`: `#F5F5F5`
- `brand.yellow`: `#FFD600`
- `brand.pink`: `#E91E90`
- `brand.green`: `#00E676`
- `brand.gray.900`: `#1A1A1A`
- `brand.gray.800`: `#2A2A2A`
- `brand.gray.400`: `#999999`

Rules:

- Background defaults to `brand.black`.
- Interactive emphasis defaults to `brand.yellow`.
- Tag chips default to `brand.pink`.
- Measurement/status accents default to `brand.green`.
- Do not introduce ad hoc grays without product-level justification.

## Typography

Primary families:

- Sans: `Inter` (system fallback: `sans-serif`)
- Mono utility labels: `IBM Plex Mono`

Weights:

- Default text weight: `600` (semibold)
- Do not use `800` or `900` in this system unless approved for a specific campaign component.

Tracking and leading:

- Body tracking: `-0.02em`
- Headings tracking: `-0.03em`
- Tight heading tracking option: `-0.04em`
- Heading line-height: `1.1`
- Body line-height: `1.3`

Case style:

- UI is CamelCase/normal case by default.
- Do not apply global uppercase transformations.

## Spacing and Sizing

Global container:

- Max width: `1500px`
- Horizontal padding: `px-4` mobile, `px-6` tablet, `px-8` desktop

Bento grid:

- Columns: `1` mobile, `2` tablet, `4` desktop
- Auto row baseline: `260px` tablet+
- Card min height: `260px`
- Tall/Large desktop row height target: `540px`

Modal:

- Max width: `1440px`
- Max height: `96vh`
- Background scrim: high-opacity black (`~85%`)

Viewport preview:

- Min width clamp: `320px`
- Presets: `1280`, `768`, `375`

## Borders, Radius, Shadows

- Radius: none or visually negligible.
- Primary separation method: 1px borders.
- Border color default: `brand.gray.800`.
- Focus/active border: `brand.yellow`.
- Shadows: avoid; use flat blocks + borders.

## Motion System

Timing:

- Default duration range: `150ms` to `200ms`
- Layout resize/viewport transitions: up to `200ms`
- Easing: `ease-out`

Rules:

- No bouncy/springy feel for standard UI interactions.
- Motion should communicate state change, not decoration.
- Hover effects should feel immediate.

## Component Rules

### Header

- Name is interactive outlined text with per-letter hover activation.
- Default letter state: transparent fill + thin white stroke.
- Active letter state: isolated color fill + glitch effect.
- Subtitle remains concise professional descriptor.

### Category Filters

- Active state: yellow background + black text.
- Inactive state: gray border and gray text.
- Active transition uses shared layout highlight.

### Project Cards

- Flat graphic cards with image background.
- Bottom info strip defaults to black overlay.
- On hover:
  - Card border turns yellow.
  - Info strip turns yellow.
  - Text in strip turns black.
- No hover scale transform.

### Project Modal

- Close via button, Escape, and backdrop click.
- Includes title, subtitle, tags, live content, and context copy.
- Tags are compact pink chips.

### Viewport Resizer

- Show only for responsive-capable iframe/component projects.
- Drag handle hidden on mobile viewport.
- Width badge uses mono styling and green accent.

### Content Types

- `iframe`: standalone demos, isolated styles/scripts.
- `component`: native React showcases (preferred for design-first portfolio pieces).
- `image`: static visual assets presented in a framed preview.
- `external-link`: screenshot + direct open action.

## Accessibility Baseline

Must include:

- Focus-visible styles on interactive controls.
- `aria-label` for non-obvious icon/utility buttons.
- Modal focus trapping.
- Escape close behavior.
- Scroll lock while modal is open.

## Copy and Voice

- Direct, professional, and concise.
- Avoid inflated self-marketing language.
- Prefer concrete role/capability phrasing.

## New Project Integration Standard

Every project entry in `src/data/projects.js` must include:

- `id`, `title`, `subtitle`, `category`, `cardSize`, `thumbnail`
- `content` with valid type config
- `description`, `tags`, `supportsResponsivePreview`

For `component` previews:

- Prefer reusable React component under `src/projects/`
- Keep wrapper and spacing aligned with `ViewportResizer` conventions

For `iframe` previews:

- Place files in `public/projects/<slug>/`
- Ensure subpath-safe references for GitHub Pages compatibility

## Non-Negotiable Do / Do Not

Do:

- Use existing design tokens.
- Keep motion fast and purposeful.
- Preserve hard-edged visual language.
- Validate with `npm run lint` and `npm run build` before push.

Do not:

- Introduce soft/glassy UI patterns.
- Add drop shadows as primary depth treatment.
- Use rounded, friendly pill aesthetics broadly.
- Change core token values without updating this document.

## Governance

Any change to tokens, motion defaults, typography defaults, or core component behaviors requires:

- Updating this document in the same PR/commit.
- A short rationale note in commit message or PR description.
