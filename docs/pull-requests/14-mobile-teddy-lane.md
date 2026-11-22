# feat: roaming Teddy on phones, and a live Teddy on every page

On phones and touch screens the roaming Teddy was switched off and the home page showed static mascots only. The reference has a dedicated mobile mode, and this PR adds it.

## What
- **Lane mode** for phones and touch screens (anything without hover, or narrower than 768px):
  - Teddy starts peeking over the hero's quilt, then climbs out and settles at the bottom of the screen, peeking over the WhatsApp / Call bar.
  - At each new scene he stands up and trots to the other side (left, right, left…), legs going, then turns to face into the screen and peeks again.
  - At the end he hops into his basket in the footer.
- **Desktop is unchanged** (the "street" mode from #10). The mode follows the device: rotate a tablet or resize a window, and he switches.
- **Smooth turns**: `Pup` takes a `flip` value (-1…1), so he turns around instead of snapping.
- Reduced motion still gets the static, posed Teddys.

- **Live Teddy on every page** (How it works, FAQ, Visit & contact, plus the basket in the footer and the other pages' mascots). Before, these were still drawings. Now, as on the reference:
  - **Idle**: he breathes, wags his tail, blinks (sometimes twice), tilts his head now and then, and every ~10s asks "hm?" in a speech bubble.
  - **Tap or click him** for a random trick with a bubble, never the same one twice in a row: "treat, please?" (begs), "play with me!" / "I like you!" (play bow, happy eyes), "woof woof!" (barks), "achoo!" (sneezes), "boing!" (jumps), "hm?" (tilts). Teddys whose body is hidden (peeking, in the basket) only do the face tricks.
  - The FAQ's own ?/! bubble steps aside while he talks, using the existing `data-playing` hook.

## How
- `PupJourney` picks a mode from `(min-width: 768px) and (hover: hover)` and runs one of two tickers:
  - `streetTicker`: the existing stop-to-stop walk.
  - `laneTicker`: finds the scene under a probe line at 55% of the viewport. Even scenes park him on the right, odd on the left.
- Position, stand-up height and turn are eased over time (exponential follow), so he trots across rather than jumping. Near a scene boundary he stands up, and while travelling he uses the walk pose with trotting legs.
- Only the stops marked `lane` (hero quilt and footer basket) are used as end points.
- `html[data-pup="lane"]` hides the static hero and basket Teddys while the actor is on screen.
- `LivePup` (client) drives every `PupBuddy` and `PupStop`. A `requestAnimationFrame` loop runs only while that Teddy is on screen (IntersectionObserver) and isn't stood in for by the roaming actor. Reduced motion keeps him still.
- `Pup` gains `blink`, `shut` and `lift`, so blinks, sneezes and jumps are just numbers, like the poses.

## Tested
- 390 × 844, touch: hero peek → bottom-left → trots right at "Two ways" → alternates per scene → basket. Positions match the reference (left −72px, right `vw − 185`, 0.6 scale).
- Desktop 1440: street mode is unchanged.
- How it works, FAQ, Visit & contact at 1440 and 390: every visible Teddy animates, and tapping him plays a trick with a bubble.
- No console errors.

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] `docs/tasks.md` updated
