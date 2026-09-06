# Going Live on Bluehost (Dropping WordPress, Keeping Your Domain)

You're keeping Bluehost as the host and ohionativenursery.com as the domain —
just replacing WordPress with these plain static files. That's the
lowest-risk path for SEO since the domain and URLs don't have to change at
all. Follow this order so Google never sees a broken or missing page.

## Before you touch anything live

1. **Back up first.** In Bluehost hosting → your site → Backups, take a full
   backup (or use WordPress's own export/backup plugin). Keep it even after
   go-live, in case you want old content later.
2. **Note your current URLs.** This site is already built to match
   WordPress's typical URL pattern (`/about/`, `/contact/`, trailing
   slashes). If your real site uses different page slugs (e.g. `/our-plants/`
   instead of `/plants/`), tell me so I can rename the folders to match
   *exactly* — matching URLs means zero redirects needed and zero SEO risk.
3. **Google Search Console** — if you don't already have
   ohionativenursery.com verified in
   [Google Search Console](https://search.google.com/search-console), set
   that up now, before the switch, so you can monitor how Google reacts
   afterward.

## Uploading the static site

Bluehost shared hosting serves whatever's in your account's `public_html`
folder — it doesn't care whether that's WordPress or plain HTML.

1. Log into Bluehost → **Advanced** → **File Manager** (or use an FTP client
   like FileZilla with your Bluehost FTP credentials).
2. Navigate to `public_html` (this is what ohionativenursery.com actually
   serves).
3. **Rename or move the existing WordPress files** to a backup folder
   (e.g. `public_html_wordpress_backup`) rather than deleting them — keep
   them until you're confident the new site is working.
4. Upload every file/folder from this repository into `public_html`,
   preserving the folder structure (`about/`, `plants/`, `contact/`, `css/`,
   `js/`, `images/`, plus `index.html`, `contact.php`, `robots.txt`,
   `sitemap.xml`).
5. In `contact.php`, double-check the `$to` email address is the one you
   want form submissions sent to.
6. Visit ohionativenursery.com and click through every page and the contact
   form to confirm everything works before considering it done.

## Protecting your SEO during the switch

- **Keep the same URLs.** Since folder names here already match common
  WordPress permalinks (`/about/`, `/plants/`, `/contact/`), if your real
  site's URLs match, nothing needs to redirect — Google keeps treating them
  as the same pages.
- **If any URL does change** (e.g. an old blog post or product page won't
  exist in the new site), add a 301 redirect for it rather than letting it
  404. Bluehost supports this via a `.htaccess` file in `public_html`:

  ```
  Redirect 301 /old-page/ https://ohionativenursery.com/new-page/
  ```

- **Keep page titles and meta descriptions similar** to what you had —
  they're already filled in on each page here (`<title>`, `<meta
  name="description">`). If your old titles ranked well for certain search
  terms, tell me the old ones and I'll match them.
- **Resubmit your sitemap** in Google Search Console
  (`https://ohionativenursery.com/sitemap.xml`) right after going live, so
  Google recrawls promptly rather than waiting for its normal schedule.
- **Do the switch all at once**, not partially — a half-WordPress,
  half-static site (or a site that's briefly down) is worse for SEO than a
  clean cutover.
- **Monitor Search Console's Coverage report** for a couple of weeks after
  launch, watching for new 404s or crawl errors.

## Optional: auto-deploy from GitHub instead of manual uploads

Right now, updating text/pages means editing files and re-uploading to
Bluehost by hand. If you'd rather push a button (or a `git push`) and have
it appear live automatically, that needs either:

- A hosting switch to Netlify/Vercel (connects directly to the GitHub repo,
  free, auto-deploys on every push) — but this usually means pointing your
  domain's DNS away from Bluehost, or
- A small script/GitHub Action that deploys to Bluehost over
  SFTP on every push (Bluehost supports SFTP; this can be added later
  without disrupting anything).

You said you want to stay on Bluehost for now, so this repo is set up for
manual upload. Say the word if you'd like the SFTP auto-deploy added later —
it's a small addition, not a rebuild.
