# feat(home): meet the pups street and two ways home

## What
- **Meet the pups**: every available puppy behind its own arched front door. On wide screens the section pins and scrolling walks you sideways down the street over a wooden floor while Teddy trots on the spot. Each door swings open as it reaches him, and the street ends at a "Meet them all" door. On phones it is a grid of doors that open with scroll-driven CSS.
- **Two ways to meet your puppy**: a wooden signpost splitting into *Puppies in Dubai* (shop window with an awning over a skyline) and *Imported for you* (a plane flying the dotted Korea → Dubai route with a puppy in the porthole). Teddy sits at the foot of the post.

## How
- The pinned range is `trackWidth / 1.25 + 100vh` tall; scroll progress drives `translate3d` on the track and `--floor-x` on the floor, so the floor boards move with the doors
- Door colours cycle through five wood tones; plates read "breed, sex, age, with video", and the breed is dropped when it is also the puppy's name
- Teddy's legs and tail swing (CSS) only while the street is moving
- The plane is placed along the SVG route with `getPointAtLength` and rotated to the path's tangent as the scene scrolls
- Reduced motion: no pinning, doors start open, plane parked mid-route

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] Pin length and door size match the reference at 1440 × 900
- [x] `docs/tasks.md` updated
