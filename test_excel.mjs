import * as XLSX from "xlsx";
import * as fs from "fs";

const requiredHeaders = ["name", "brand", "category", "description", "price", "merchant", "affiliateUrl", "image", "status"];

const writeXlsx = (filename, data) => {
  let ws;
  if (data.length > 0) {
    ws = XLSX.utils.json_to_sheet(data, { header: Object.keys(data[0] || {}) });
  } else {
    ws = XLSX.utils.aoa_to_sheet([]);
  }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, filename);
};

// 1. Missing required header
writeXlsx("missing_header.xlsx", [{ name: "test", brand: "b" }]); // missing a lot

// 2. Empty worksheet
writeXlsx("empty.xlsx", []);

// 3. Header-only worksheet
const wbHeader = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wbHeader, XLSX.utils.aoa_to_sheet([requiredHeaders]), "Sheet1");
XLSX.writeFile(wbHeader, "header_only.xlsx");

// 4. Extra column
const extraColRow = Object.fromEntries(requiredHeaders.map(h => [h, "test"]));
extraColRow.price = 10;
extraColRow.affiliateUrl = "https://example.com";
extraColRow.image = "https://example.com/img.jpg";
extraColRow.status = "active";
extraColRow.extraCol = "value";
writeXlsx("extra_col.xlsx", [extraColRow]);

// 5. Row-level errors
const errRow = Object.fromEntries(requiredHeaders.map(h => [h, "test"]));
errRow.name = "";
errRow.price = "invalid";
errRow.status = "wrong";
writeXlsx("errors.xlsx", [errRow]);

console.log("Test files generated");
