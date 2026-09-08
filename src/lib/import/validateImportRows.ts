import type { ImportRow, ValidatedRow, ValidationIssue } from "./types";

const isValidUrl = (urlStr: string) => {
  try {
    new URL(urlStr);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateImportRow = (row: ImportRow, rowIndex: number): ValidatedRow => {
  const issues: ValidationIssue[] = [];

  const requiredStringFields: (keyof ImportRow)[] = ["name", "brand", "category", "description", "merchant"];

  requiredStringFields.forEach((field) => {
    const val = row[field];
    if (typeof val !== "string" || val.trim() === "") {
      issues.push({ field, message: `Missing required field: ${field}`, severity: "error" });
    }
  });

  const price = Number(row.price);
  if (isNaN(price) || price <= 0) {
    issues.push({ field: "price", message: "Price must be a valid positive number", severity: "error" });
  }

  const urlFields: (keyof ImportRow)[] = ["affiliateUrl", "image"];
  urlFields.forEach((field) => {
    const val = row[field];
    if (typeof val !== "string" || val.trim() === "") {
      issues.push({ field, message: `Missing required field: ${field}`, severity: "error" });
    } else if (!isValidUrl(val)) {
      issues.push({ field, message: `Must be a valid URL: ${field}`, severity: "error" });
    }
  });

  if (row.status !== "active" && row.status !== "inactive") {
    issues.push({ field: "status", message: 'Status must be "active" or "inactive"', severity: "error" });
  }

  return {
    rowNumber: rowIndex + 2, // Excel rows are 1-indexed, and row 1 is header
    data: row,
    issues,
  };
};

export const validateImportRows = (rows: ImportRow[]): ValidatedRow[] => {
  return rows.map((row, index) => validateImportRow(row, index));
};
