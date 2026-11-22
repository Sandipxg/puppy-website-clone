# feat(home): roaming Teddy on phones (bottom "lane")

On phones and touch screens the roaming Teddy was switched off and the home page showed static mascots only. The reference has a dedicated mobile mode, and this PR adds it.

## What
- **Lane mode** for phones and touch screens (anything without hover, or narrower than 768px):
  - Teddy starts peeking over the hero's quilt, then climbs out and settles at the bottom of the screen, peeking over the WhatsApp / Call bar.
  - At each new scene he stands up and trots to the other side (left, right, left…), legs going, then turns to face into the screen and peeks again.
  - At the end he hops into his basket in the footer.
- **Desktop is unchanged** (the "street" mode from #10). The mode follows the device: rotate a tablet or resize a window, and he switches.
- **Smooth turns**: `Pup` takes a `flip` value (-1…1), so he turns around instead of snapping.
- Reduced motion still gets the static, posed Teddys.

## How
- `PupJourney` picks a mode from `(min-width: 768px) and (hover: hover)` and runs one of two tickers:
  - `streetTicker`: the existing stop-to-stop walk.
  - `laneTicker`: finds the scene under a probe line at 55% of the viewport. Even scenes park him on the right, odd on the left.
- Position, stand-up height and turn are eased over time (exponential follow), so he trots across rather than jumping. Near a scene boundary he stands up, and while travelling he uses the walk pose with trotting legs.
- Only the stops marked `lane` (hero quilt and footer basket) are used as end points.
- `html[data-pup="lane"]` hides the static hero and basket Teddys while the actor is on screen.

## Tested
- 390 × 844, touch: hero peek → bottom-left → trots right at "Two ways" → alternates per scene → basket. Positions match the reference (left −72px, right `vw − 185`, 0.6 scale).
- Desktop 1440: street mode is unchanged.
- No console errors.

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] `docs/tasks.md` updated
