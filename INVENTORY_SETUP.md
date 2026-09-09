# Setting Up the Live Inventory (Google Sheet)

Once this is set up, updating your website's plant inventory is just editing
a spreadsheet — no coding, no file uploads, no logging into anything website
related.

## 1. Create the sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank sheet. Name it something like "Ohio Native Nursery Inventory".
2. In row 1, add these exact column headers (order doesn't matter, spelling
   does — case doesn't matter). **Notes** is optional — leave cells in that
   column blank for any plant that doesn't need one:

   | Common Name | Scientific Name | Category | Size | Price | Quantity | Notes |
   |---|---|---|---|---|---|---|

3. Fill in one row per plant. Example:

   | Common Name | Scientific Name | Category | Size | Price | Quantity | Notes |
   |---|---|---|---|---|---|---|
   | Redbud | Cercis canadensis | Tree | 3 gal | $28 | 12 | |
   | Swamp Milkweed | Asclepias incarnata | Wildflower | Plug | $6 | 3 | Blooms July-Sept |
   | Spicebush | Lindera benzoin | Shrub | 1 gal | $15 | 0 | Back in stock spring |

   **Quantity** just needs a plain number — the website turns it into a
   colored badge automatically: `0` → red "Out of Stock", `1`–`4` → amber
   "Low Stock (N)", `5+` → green "In Stock (N)". If you don't have an exact
   count yet, typing text like `Pending` or `Call for Availability` instead
   of a number works too — it'll show as an amber badge with that exact
   text. **Notes** is free text — care tips, bloom time, "back in stock
   soon," anything you want — and shows in its own column.

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

Already done — `js/inventory.js` points at your published sheet:

```js
var SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRN2zhMuRedi9YfZyBQ9ddM-S1VSPmsF8tU9gpAUaw6UCNsiMRVt1GKaWHZQr5I7SO18bXo6W5tmSbr/pub?gid=0&single=true&output=csv";
```

If you ever republish the sheet under a different URL, update this line and
re-upload `js/inventory.js` to Bluehost.

## 4. Seed it with your real current stock

Open `inventory-seed.csv` (in this repo) — it's your actual inventory pulled
from the old site — and paste those rows into your Google Sheet under the
header row. Rows marked "Pending" in Quantity had a status of "PENDING" on
the old site (meaning: not yet confirmed available) — change those to real
numbers once you know them.

## 5. Day-to-day updates

From now on, just open the Google Sheet from any computer or phone and edit
cells directly — add a row for a new plant, change a price, update Quantity
to `0` when something sells out. The `/services/` page re-fetches the sheet
every time someone visits it, so changes typically show up within a few
minutes (Google's publish-to-web cache refreshes periodically).

## If you'd rather use Excel instead of Google Sheets

You can keep your master copy in Excel on your home computer and just paste
its contents into the Google Sheet whenever you update it (Google Sheets
opens/pastes `.xlsx` data natively via File → Import, or copy-paste). The
website only ever reads from the published Google Sheet, so Excel itself
never needs to touch the internet.
