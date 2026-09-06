# Ohio Native Nursery — Website

Plain static HTML/CSS/JS site for ohionativenursery.com. No build step, no
framework, no WordPress — just files you can preview by opening `index.html`
in a browser, or upload directly to Bluehost.

## Structure

```
index.html          Home
about/index.html    About
plants/index.html   Plant inventory (pulled live from a Google Sheet)
contact/index.html  Contact form
contact.php         Emails form submissions (Bluehost PHP)
css/styles.css       Shared styles
js/inventory.js      Fetches + renders the Google Sheet inventory
images/              Your photos go here
robots.txt, sitemap.xml   SEO basics
```

## What's placeholder right now

Every page has `<!-- TODO -->` comments marking copy that should be replaced
with your real text once you export it from WordPress (Tools → Export → All
content in wp-admin). Send the exported `.xml` (and your image files, or a
zip of `wp-content/uploads`) and the real copy/photos will replace these
placeholders.

## Two things to set up before this fully works

1. **Inventory feed** — see `INVENTORY_SETUP.md`. Takes ~10 minutes, one time.
2. **Going live on Bluehost** — see `DEPLOY.md`, including how to do this
   without hurting your Google search ranking.

## Updating the site after launch

- **Inventory**: just edit the Google Sheet. Changes show up on `/plants/`
  automatically (usually within a few minutes) — no file upload needed.
- **Text/pages**: edit the relevant `.html` file and re-upload it to Bluehost
  (or push to GitHub if you set up auto-deploy — see `DEPLOY.md`).
