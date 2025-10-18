# Repository Guidelines

## Project Structure & Module Organization
This Next.js 14 app uses the App Router. Pages, layouts, and global styles live in `src/app/`. Feature-rich UI (dashboards, AI cards, outreach tables) resides under `src/components/`, while primitives sit in `src/components/ui/`. Shared logic, mock data, and Anthropic fixtures live in `src/lib/`; TypeScript contracts are under `src/types/`. Keep configuration files (`next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `tempo.config.json`, `tsconfig.json`) at the project root. Add static assets beside the owning route or place shared assets in `public/`.

## Build, Test, and Development Commands
Run `npm install` (or `npm ci` in CI) to hydrate dependencies, then `npm run dev` for the local dev server. Validate production output with `npm run build` and start it using `npm start`. When you add tooling (linting, tests, seeding scripts), expose it through `package.json` so collaborators have a single `npm run <task>` entry point.

## Coding Style & Naming Conventions
Write TypeScript + React function components with two-space indentation, single quotes, and semicolons. Compose styling with Tailwind utilities, extending design tokens in `tailwind.config.ts`. Use kebab-case for filenames (`ai-copy-summary.tsx`) and colocate feature-specific components within `src/components/dashboard/`. Format before committing with `npx prettier --write "src/**/*.{ts,tsx}"`; avoid bundling formatting-only changes with feature work.

## Testing Guidelines
There is no automated suite yet. Align with the team before introducing Vitest (unit) or Playwright (E2E). Encourage deterministic fixtures—the mock Anthropic descriptions in `src/lib/mock-data.ts` are a good pattern. Once tests exist, document them behind `npm test` and capture required environment variables (e.g., Anthropic keys) in the README.

## Commit & Pull Request Guidelines
Use imperative, scoped commit messages (`feat: surface anthropic coverage card`). Keep PRs focused, describe the problem and solution, and include screenshots or Looms for UI updates (especially dashboards). Note local verification steps (`npm run build`, any test suites) and link issues or tickets.

## Security & Configuration Tips
Never commit secrets. Store Supabase, Stripe, and Anthropic API keys in `.env.local`, mirror production values via environment variables, and document them for reviewers. Guard client-side usage of secrets and prefer server actions or API routes when integrating external services.
