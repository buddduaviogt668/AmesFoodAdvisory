# Image Audit Notes

## Reviewed assets

| File | Dimensions | Observation |
| --- | --- | --- |
| `assets/logo-dark-bg.png` | 800x400 | Looks clean and proportionate. Branding appears legible on dark background. |
| `assets/og-image-default.png` | 1200x630 | Visually incorrect/cropped. The logo and tagline are oversized and clipped at the right edge. Needs redesign or corrected composition. |
| `assets/social-linkedin-banner.png` | 1584x396 | Looks acceptable, though text is small relative to canvas. Not obviously distorted. |
| `assets/social-twitter-header.png` | 1500x500 | Text includes "Council Compliance", which may be outdated positioning. Composition appears acceptable. |
| `assets/social-instagram-square-post.png` | 1080x1080 | Visually acceptable with centered logo lockup, though subtitle is close to the lower edge. |

## Initial conclusions

The current distortion issue seems to affect at least some social/open-graph assets rather than the core logo files. The most obvious broken asset is `og-image-default.png`, which is clipped and improperly scaled. Additional repo-wide inspection is still needed to identify whether page-level image rendering or CSS sizing is also causing distortion.

## Page audit notes

From `vertical_renderer.py`, 15 vertical pages are defined. A quick filename comparison against the repo shows that many of those pages are missing from the repository and likely need to be created.

Known missing pages identified so far:

- `cafe-food-safety-program-sydney.html`
- `restaurant-food-safety-training-sydney.html`
- `restaurant-haccp-plan-sydney.html`
- `cafe-allergen-management-sydney.html`
- `restaurant-sop-writing-sydney.html`
- `cafe-food-safety-audit-preparation-sydney.html`
- `cafe-food-safety-supervisor-sydney.html`
- `new-cafe-food-safety-registration-sydney.html`
- `cafe-temperature-monitoring-sydney.html`
- `brunch-cafe-food-safety-sydney.html`
- `multi-site-restaurant-food-safety-nsw.html`
- `restaurant-food-safety-review-update-nsw.html`
- `inner-west-cafe-food-safety.html`

Existing from that set:

- `cafe-restaurant-food-safety.html`
- `food-safety-supervisor-requirements-nsw.html`

Further inspection is needed to determine whether all 15 should be generated directly from the uploaded renderer and whether additional internal links or navigation updates are required.

