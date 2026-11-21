# chore: scaffold Next.js app and planning docs

## What
Bootstraps the project: Next.js 16 (App Router, Turbopack), React 19, strict TypeScript, Tailwind CSS v4, ESLint, zustand and clsx. Adds the planning set under `docs/`.

## Why
Gives every later PR a clean, typed base and a written definition of done (`docs/Aim.md`), so progress can be tracked against it.

## How
- `create-next-app` baseline, trimmed: no starter assets, minimal page
- `src/` split into `app`, `components`, `data`, `lib`, `store`, `styles`, `types`
- Docs: Aim, tasks, design context, architecture, decisions, PR plan, QA checklist
- `npm run typecheck` script added

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] `docs/tasks.md` updated
