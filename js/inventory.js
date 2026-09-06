// Pulls the plant inventory table straight from a Google Sheet published to
// the web as CSV. Edit the sheet -> this page updates itself. No rebuild,
// no upload, nothing to touch in this file after initial setup.
//
// SETUP (see INVENTORY_SETUP.md for full steps with screenshots-in-words):
//   1. Create a Google Sheet with these column headers in row 1:
//      Common Name | Scientific Name | Category | Size | Price | Availability
//   2. File -> Share -> Publish to web -> select the sheet tab -> CSV -> Publish.
//   3. Paste the resulting URL below as SHEET_CSV_URL.
(function () {
  "use strict";

  var SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRN2zhMuRedi9YfZyBQ9ddM-S1VSPmsF8tU9gpAUaw6UCNsiMRVt1GKaWHZQr5I7SO18bXo6W5tmSbr/pub?gid=0&single=true&output=csv";

  var statusEl = document.getElementById("inventory-status");
  var tableEl = document.getElementById("inventory-table");
  var bodyEl = document.getElementById("inventory-body");
  var searchEl = document.getElementById("inventory-search");
  var categoryEl = document.getElementById("category-filter");

  var allRows = [];

  function parseCSV(text) {
    // Minimal RFC 4180 CSV parser: handles quoted fields, embedded commas,
    // escaped quotes (""), and both \n and \r\n line endings.
    var rows = [];
    var row = [];
    var field = "";
    var inQuotes = false;

    for (var i = 0; i < text.length; i++) {
      var char = text[i];
      var next = text[i + 1];

      if (inQuotes) {
        if (char === '"' && next === '"') {
          field += '"';
          i++;
        } else if (char === '"') {
          inQuotes = false;
        } else {
          field += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ",") {
          row.push(field);
          field = "";
        } else if (char === "\n" || char === "\r") {
          if (char === "\r" && next === "\n") i++;
          row.push(field);
          field = "";
          if (row.length > 1 || row[0] !== "") rows.push(row);
          row = [];
        } else {
          field += char;
        }
      }
    }
    if (field !== "" || row.length) {
      row.push(field);
      rows.push(row);
    }
    return rows;
  }

  function toObjects(rows) {
    if (!rows.length) return [];
    var headers = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    return rows.slice(1)
      .filter(function (r) { return r.some(function (cell) { return cell.trim() !== ""; }); })
      .map(function (r) {
        var obj = {};
        headers.forEach(function (h, i) { obj[h] = (r[i] || "").trim(); });
        return obj;
      });
  }

  function availabilityBadge(value) {
    var v = value.toLowerCase();
    var cls = "in-stock";
    if (v.indexOf("out") !== -1 || v === "0") cls = "out";
    else if (v.indexOf("low") !== -1 || v.indexOf("limited") !== -1) cls = "low-stock";
    return '<span class="badge ' + cls + '">' + escapeHtml(value || "Unknown") + "</span>";
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function populateCategories(items) {
    var categories = Array.from(new Set(items.map(function (i) { return i.category; }).filter(Boolean))).sort();
    categories.forEach(function (c) {
      var opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categoryEl.appendChild(opt);
    });
  }

  function render() {
    var query = searchEl.value.trim().toLowerCase();
    var category = categoryEl.value;

    var filtered = allRows.filter(function (item) {
      var matchesQuery = !query ||
        (item["common name"] || "").toLowerCase().indexOf(query) !== -1 ||
        (item["scientific name"] || "").toLowerCase().indexOf(query) !== -1;
      var matchesCategory = !category || item.category === category;
      return matchesQuery && matchesCategory;
    });

    bodyEl.innerHTML = filtered.map(function (item) {
      return "<tr>" +
        "<td>" + escapeHtml(item["common name"] || "") + "</td>" +
        "<td><em>" + escapeHtml(item["scientific name"] || "") + "</em></td>" +
        "<td>" + escapeHtml(item.category || "") + "</td>" +
        "<td>" + escapeHtml(item.size || "") + "</td>" +
        "<td>" + escapeHtml(item.price || "") + "</td>" +
        "<td>" + availabilityBadge(item.availability || "") + "</td>" +
        "</tr>";
    }).join("");

    statusEl.textContent = filtered.length
      ? filtered.length + " plant" + (filtered.length === 1 ? "" : "s") + " shown"
      : "No plants match your search.";
  }

  // Normalize aliases so slightly different column names in the sheet
  // (e.g. "Qty" instead of "Availability") still map into the same fields.
  function normalizeItem(raw) {
    return {
      "common name": raw["common name"] || raw["name"] || "",
      "scientific name": raw["scientific name"] || raw["botanical name"] || "",
      category: raw.category || raw.type || "",
      size: raw.size || raw["pot size"] || "",
      price: raw.price || "",
      availability: raw.availability || raw.stock || raw.qty || raw.quantity || ""
    };
  }

  function loadInventory() {
    if (!SHEET_CSV_URL || SHEET_CSV_URL.indexOf("REPLACE_WITH") === 0) {
      statusEl.textContent = "Inventory isn't connected yet — see INVENTORY_SETUP.md to link the Google Sheet.";
      return;
    }

    fetch(SHEET_CSV_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (text) {
        var raw = toObjects(parseCSV(text));
        allRows = raw.map(normalizeItem);
        populateCategories(allRows);
        tableEl.hidden = false;
        render();
      })
      .catch(function (err) {
        statusEl.textContent = "Couldn't load current inventory right now. Please check back shortly or contact us directly.";
        console.error("Inventory load failed:", err);
      });
  }

  searchEl.addEventListener("input", render);
  categoryEl.addEventListener("change", render);

  loadInventory();
})();
