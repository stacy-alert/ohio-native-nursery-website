# Ohio Native Nursery — Website

Plain static HTML/CSS/JS site for ohionativenursery.com. No build step, no
framework, no WordPress — just files you can preview by opening `index.html`
in a browser, or upload directly to Bluehost.

Rebuilt from your actual WordPress export (real copy, FAQs, contact info,
and photo references), so URLs and content match your live site.

## Structure

```
index.html            Home
about/index.html      About
services/index.html   Shop / plant inventory (pulled live from a Google Sheet)
contact/index.html    Contact form
resources/index.html  Placeholder — linked from your nav but had no content in the export
contact.php           Emails form submissions (Bluehost PHP)
css/styles.css         Shared styles
js/inventory.js        Fetches + renders the Google Sheet inventory
inventory-seed.csv      Your real current stock — paste into the Google Sheet (see INVENTORY_SETUP.md)
robots.txt, sitemap.xml   SEO basics
```

Photos aren't copied into this repo — pages link straight to your existing
`/wp-content/uploads/2025/08/...` image URLs, so they keep working as long
as you leave that folder in place on Bluehost (see `DEPLOY.md`).

## One thing found in the export worth a decision

Your old site had a third inventory list — "Rare and Unusual" (things like
San Pedro Cactus, Psychotria species, Nicotiana rustica) — sitting in the
export as a saved reusable block, but it wasn't actually linked into any
live page (not Home, not Shop). It's not included in `inventory-seed.csv`.
If you want that category on the Shop page too, just add rows for it to
your Google Sheet with Category "Rare and Unusual" — no code change needed.

## Two things to set up before this fully works

1. **Inventory feed** — the Google Sheet CSV URL is already wired into
   `js/inventory.js`. Paste the rows from `inventory-seed.csv` into your
   sheet (see `INVENTORY_SETUP.md`) so the Shop page shows real stock from
   day one.
2. **Going live on Bluehost** — see `DEPLOY.md`, including how to do this
   without hurting your Google search ranking.

## Updating the site after launch

- **Inventory**: just edit the Google Sheet. Changes show up on `/services/`
  automatically (usually within a few minutes) — no file upload needed.
- **Text/pages**: edit the relevant `.html` file and re-upload it to Bluehost
  (or push to GitHub if you set up auto-deploy — see `DEPLOY.md`).
