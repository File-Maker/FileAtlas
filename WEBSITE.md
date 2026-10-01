# FileAtlas website

The website stays a plain static site. GitHub Pages publishes `site/` through
`.github/workflows/static.yml` when changes to that directory reach `main`.
No restructuring, package installation, build step, or hosting migration is needed.

## Edit the site

- `site/index.html`: text, links, sections, and image references.
- `site/styles.css`: colors, layout, and responsive rules.
- `site/script.js`: local-time clock, screenshot viewer, latest-release links,
  and the illustrative SceneNet activity grid.
- `site/assets/`: images, logo, and favicon.

## Replace the hero picture

The current hero is `site/assets/storage-map.svg`, an editable vector diagram.
It uses example folder sizes, not a screenshot or a measurement of a real PC.

To use your own picture:

1. Put it in `site/assets/hero.webp` (PNG and SVG work too).
2. In `site/index.html`, find `class="hero-image"` and change its `src` to
   `assets/hero.webp` (or the exact filename you used).
3. Update `alt` to describe the image, and set `width` and `height` to its actual
   dimensions. A landscape image around 1440 × 960 is a good fit.
4. Change the two captions underneath if the image is a real screenshot.

The blue window frame belongs to the page; do not include a second frame inside
the picture. Keep the picture to a few large readable elements.

## Downloads

Both download links work without JavaScript and lead to the latest GitHub release.
When GitHub's public API is available, they resolve directly to the latest
`FileAtlasSetup` EXE or MSI asset. Owner tools, FAAV Lab, LicenseManager, and
benchmark installers are deliberately excluded. A failed or rate-limited API
request leaves the release-page fallback intact. No token or secret is needed.

## Preview and publish

From the repository directory, run `python -m http.server 4173 --directory site`
and open `http://localhost:4173`. Publish by merging the site changes into `main`;
the existing GitHub Pages workflow handles the rest. Keep the existing domain
settings and Google verification file.

## Content

Copyright © 2026 Saba Iakobidze. All rights reserved.

Recovery, FAAV, and SceneNet remain labeled upcoming. The SceneNet grid is an
interactive concept illustration, not a model inference demo or an antivirus
effectiveness claim. Product screenshots remain in the Screens section.
