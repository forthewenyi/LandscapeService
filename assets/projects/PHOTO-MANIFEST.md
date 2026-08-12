# Landscaping project photo library

These filenames describe the visible job, location, and project stage so they
can be used directly in website markup and content management tools.

## Website photo rules

- List every offered service even when there is no photo for it yet.
- Rename new uploads before using them with a descriptive pattern such as
  `location-service-stage.jpg` (`before`, `progress`, or `after`).
- Add each renamed photo to the matching service detail and/or project gallery;
  never leave an uploaded project photo disconnected from the site.
- When both stages exist, keep the before and after photos together. Use the
  draggable comparison when the camera angle matches and a labeled side-by-side
  pair when it does not.
- Write useful alt text and a visible caption describing the work shown.

## Recommended before-and-after comparisons

1. `side-yard-overgrowth-before.jpg` → `side-yard-gravel-path-after.jpg`
   - Same side yard and air-conditioning unit.
   - Strongest direct comparison.
2. `backyard-bare-ground-before.jpg` → `backyard-landscape-finished-after.jpg`
   - Backyard transformed with lawn, gravel paths, stone borders, mulch, and plants.
   - Camera positions differ, so this is a project-story pair rather than a slider pair.
3. `front-garden-overgrown-before.jpg` → `front-garden-fresh-mulch-after.jpg`
   - Front garden cleanup and fresh mulch installation.
   - Camera positions differ.

## Complete photo list

| File | Stage | Website use |
| --- | --- | --- |
| `side-yard-overgrowth-before.jpg` | Before | Direct before/after comparison |
| `backyard-landscape-fabric-progress.jpg` | Progress | Installation process gallery |
| `backyard-landscape-finished-after.jpg` | After | Featured completed project |
| `side-yard-cleared-before-installation.jpg` | Before/progress | Side-path project story |
| `backyard-mulch-and-path-progress.jpg` | Progress | Installation process gallery |
| `front-garden-fresh-mulch-after.jpg` | After | Mulch service gallery |
| `side-yard-river-rock-path-after.jpg` | After | Compacted walkway with river-rock border |
| `backyard-ground-grading-progress.jpg` | Progress | Installation process gallery |
| `backyard-gravel-installation-progress.jpg` | Progress | Installation process gallery |
| `backyard-lawn-and-beds-progress.jpg` | Near after | Project gallery |
| `front-yard-hardscape-and-beds-progress.jpg` | Progress | Paver landing, stepping-stone path, river-rock drainage, and beds |
| `side-yard-gravel-path-after.jpg` | After | Compacted access path with stone edging and mulch |
| `front-garden-bed-cleanup-progress.jpg` | Progress | Crew-at-work gallery |
| `backyard-bare-ground-before.jpg` | Before | Backyard transformation story |
| `front-garden-overgrown-before.jpg` | Before | Garden cleanup story |
| `backyard-gravel-fire-pit-patio-after.jpg` | After | Gravel fire-pit seating area and retaining-wall gallery |
| `backyard-horizontal-wood-fence-enclosure-after.jpg` | After | Utility enclosure and gate gallery |

## Orientation notes

- Browser orientation is baked into every exported file; none relies on EXIF rotation.
- `front-garden-bed-cleanup-progress.jpg` contains a tilted source capture inside an upright canvas; the website applies a corrective crop and counter-rotation with `.photo-straighten-left`.
- Portrait photos remain portrait because their vertical framing best shows the narrow side yards.
- Landscape photos remain landscape for project cards, galleries, and wide feature sections.
- The wood-enclosure photo remains portrait to preserve the full gate and fence height.
- Use CSS `object-fit: cover` when a fixed card aspect ratio is required.
