# QA checklist

Walk this before opening any PR.

## Build health
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds

## Visual parity (compare with the reference side by side)
- [ ] 1440 × 900 desktop
- [ ] 390 × 844 phone
- [ ] Fonts loaded (Fraunces / Figtree / Shantell Sans), no fallback flashes in screenshots
- [ ] Colours match tokens in `context.md`
- [ ] No horizontal scroll at any width from 320px up

## Behaviour
- [ ] Links route correctly; active nav state shows
- [ ] Menu opens/closes, Escape closes, focus returns
- [ ] Animations run, and are disabled under `prefers-reduced-motion`
- [ ] No console errors or failed network requests

## Accessibility
- [ ] Skip link works
- [ ] All images have meaningful `alt` (or empty for decoration)
- [ ] Interactive controls reachable and visibly focused by keyboard
