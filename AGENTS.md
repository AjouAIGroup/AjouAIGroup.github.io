# AGENTS.md

## Scope

These instructions apply to the entire repository.

## Project overview

AAIG is a Korean-language website for the Ajou University AI Group. It is a
React 18 single-page application built with Vite and prerendered for GitHub
Pages. There is no backend or database; site content comes from repository
files and generated JSON.

## Source of truth

- Treat `package.json` scripts and the current implementation as authoritative
  when older documentation disagrees with them.
- Edit News in `content/news/*.md`.
- Edit Publications in the configured Google Sheet. The tracked
  `content/publications/sheet.snapshot.json` is its read-only deployment
  snapshot and must be refreshed with `npm run publications:pull`.
- Edit conference deadlines in `content/deadlines/venues.json`.
- Edit research data in `src/assets/dataset/research_*.json`.
- Follow `content/photos/_README.md` when changing photos.
- Do not hand-edit `src/generated/*`, `public/uploads/photos/*`, or `dist/*`.
  Update their source files and regenerate them instead.
- Do not edit external-source cache files unless the task explicitly concerns
  the ingestion pipeline.

## Repository map

- `src/components/`: shared layout and feature components
- `src/components/tabs/`: primary page-section implementations and styles
- `src/pages/`: route-level wrappers
- `src/routes/`: client and SSG route definitions
- `src/styles/`: shared tokens, breakpoints, and responsive rules
- `src/data/` and `src/config/`: hand-maintained structured application data
- `scripts/content/`: content parsing, synchronization, and validation
- `src/ssg/` and `scripts/prerender.mjs`: static rendering pipeline
- `docs/`: operator and maintenance documentation

## Working conventions

- Preserve the existing JavaScript/JSX and CSS architecture; do not introduce
  TypeScript or a new styling framework without an explicit request.
- Use ES modules and functional React components.
- Reuse design tokens and shared responsive rules before adding local values.
- Keep route behavior consistent between client and SSG variants when a change
  affects routing, metadata, or page composition.
- Preserve the configured Prettier style: 4-space indentation, double quotes,
  semicolons, trailing commas, and an 80-character print width.
- Keep user-facing Korean copy natural and consistent with surrounding text.
- Preserve accessibility: semantic elements, keyboard interaction, visible
  focus, useful alternative text, and reduced-motion behavior.
- Do not add dependencies when the existing stack can reasonably solve the
  task.
- Do not overwrite unrelated local changes. Inspect `git status` before and
  after edits and keep the patch scoped to the request.

## UI rules

- Follow the UI composition principles documented in `README.md`.
- Use horizontal, keyboard-operable rails for browse-and-compare content and
  open lists with restrained dividers for long-form reading.
- Avoid nested interactive controls and decorative card containers on archive
  or reading-heavy pages.
- Check responsive behavior at 1440px, 1180px, 768px, and 390px. Pay special
  attention to horizontal overflow, overlapping controls, and hero text.

## Content workflow

After changing content sources, run:

```bash
npm run content:sync
npm run validate:content
npm run build
```

Commit regenerated files when the sync command changes tracked outputs. Never
hide a content-source problem by patching generated JSON directly.

## Verification

Run the smallest relevant checks while iterating, then use the following before
hand-off when the change warrants it:

```bash
npm run format:check
npm run lint
npm run validate:content
npm run build
```

Use `npm run build:static` when modifying routing, SSG behavior, document
metadata, canonical URLs, or prerendering. Use `npm run content:check` for
content-pipeline changes that must prove generated outputs are committed.

If a check cannot be run, report exactly which check was skipped and why.
