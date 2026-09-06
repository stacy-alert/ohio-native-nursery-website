# Going Live on Bluehost (Dropping WordPress, Keeping Your Domain)

You're keeping Bluehost as the host and ohionativenursery.com as the domain —
just replacing WordPress with these plain static files. That's the
lowest-risk path for SEO since the domain and URLs don't have to change at
all. Follow this order so Google never sees a broken or missing page.

## Before you touch anything live

1. **Back up first.** In Bluehost hosting → your site → Backups, take a full
   backup (or use WordPress's own export/backup plugin). Keep it even after
   go-live, in case you want old content later.
2. **URLs already match.** Built straight from your actual WordPress export,
   so the page URLs here are identical to your live site's: `/`, `/about/`,
   `/services/` (this was your "Shop" page), `/contact/`, `/resources/`.
   Nothing needs to redirect.
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
3. **Move the WordPress files out, but keep `wp-content/uploads`.** This
   site's pages link directly to your real photos at their existing
   addresses (e.g. `/wp-content/uploads/2025/08/photo-....jpg`) — reusing
   the exact same URLs the old site used, so nothing needs re-uploading and
   no image links break. So: move `wp-admin/`, `wp-includes/`, every
   `wp-*.php` file, `wp-content/plugins/`, and `wp-content/themes/` into a
   backup folder (e.g. `public_html_wordpress_backup`) — but leave
   `wp-content/uploads/` exactly where it is in `public_html`.
4. Upload every file/folder from this repository into `public_html`,
   preserving the folder structure (`about/`, `services/`, `contact/`,
   `resources/`, `css/`, `js/`, plus `index.html`, `contact.php`,
   `robots.txt`, `sitemap.xml`). These sit alongside the `wp-content/uploads/`
   folder you kept — nothing here overwrites it.
5. Double-check `contact.php` — the `$to` address is already set to
   Ohionativenursery@outlook.com. Change it if you'd rather messages go
   elsewhere.
6. Visit ohionativenursery.com and click through every page, confirm photos
   load, and submit the contact form to confirm everything works before
   considering it done.

## Protecting your SEO during the switch

- **URLs already match your live site** (`/about/`, `/services/`,
  `/contact/`, `/resources/`) — Google keeps treating them as the same
  pages, nothing to redirect.
- **Image URLs match too**, since photos stay at their existing
  `/wp-content/uploads/...` addresses — any image search traffic or
  hotlinks pointing at those URLs keeps working.
- **If any URL does change** (e.g. an old blog post won't exist in the new
  site), add a 301 redirect for it rather than letting it 404. Bluehost
  supports this via a `.htaccess` file in `public_html`:

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
