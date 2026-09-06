# Setting Up the Live Inventory (Google Sheet)

Once this is set up, updating your website's plant inventory is just editing
a spreadsheet — no coding, no file uploads, no logging into anything website
related.

## 1. Create the sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank sheet. Name it something like "Ohio Native Nursery Inventory".
2. In row 1, add these exact column headers (order doesn't matter, spelling
   does — case doesn't matter):

   | Common Name | Scientific Name | Category | Size | Price | Availability |
   |---|---|---|---|---|---|

3. Fill in one row per plant. Example:

   | Common Name | Scientific Name | Category | Size | Price | Availability |
   |---|---|---|---|---|---|
   | Redbud | Cercis canadensis | Tree | 3 gal | $28 | In Stock |
   | Swamp Milkweed | Asclepias incarnata | Wildflower | Plug | $6 | Low Stock |
   | Spicebush | Lindera benzoin | Shrub | 1 gal | $15 | Out of Stock |

   The website recognizes "In Stock" / "Low Stock" (or "Limited") / "Out of
   Stock" and colors them automatically. Any other text in that column still
   displays fine, just without the color badge.

## 2. Publish it to the web as CSV

1. In the sheet, go to **File → Share → Publish to web**.
2. Under "Link", choose the specific sheet/tab (not "Entire document") if you
   have more than one tab.
3. Change the format dropdown from "Web page" to **Comma-separated values
   (.csv)**.
4. Click **Publish**, confirm, and copy the URL it gives you. It looks like:

   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-xxxxxxx/pub?gid=0&single=true&output=csv
   ```

   This link is effectively public (anyone with it can read your inventory
   data) but not editable, and it isn't listed anywhere search engines would
   find it. Don't put anything sensitive in this sheet.

## 3. Wire it into the site

Open `js/inventory.js` and find this line near the top:

```js
var SHEET_CSV_URL = "REPLACE_WITH_YOUR_PUBLISHED_GOOGLE_SHEET_CSV_URL";
```

Replace the placeholder with the URL you copied. Save, and re-upload
`js/inventory.js` to Bluehost (or push to GitHub if auto-deploy is set up —
see `DEPLOY.md`). That's a one-time step.

## 4. Day-to-day updates

From now on, just open the Google Sheet from any computer or phone and edit
cells directly — add a row for a new plant, change a price, flip
Availability to "Out of Stock". The `/plants/` page re-fetches the sheet
every time someone visits it, so changes typically show up within a few
minutes (Google's publish-to-web cache refreshes periodically).

## If you'd rather use Excel instead of Google Sheets

You can keep your master copy in Excel on your home computer and just paste
its contents into the Google Sheet whenever you update it (Google Sheets
opens/pastes `.xlsx` data natively via File → Import, or copy-paste). The
website only ever reads from the published Google Sheet, so Excel itself
never needs to touch the internet.
