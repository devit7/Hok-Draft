/**
 * Script untuk mengubah semua heroBody extension menjadi .jpg
 *
 * Usage:
 *   node update-hero-body-extension.js
 */

const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "hero-list-enriched.ts");

function updateHeroBodyExtension() {
  console.log("🔧 Reading file:", FILE_PATH);

  // Read the file
  let content = fs.readFileSync(FILE_PATH, "utf8");

  // Count replacements
  let count = 0;
  const replacements = [];

  // Replace all heroBody extensions to .jpg
  // Match: heroBody: "filename.{png|PNG|jpeg|JPEG|JPG}"
  const regex = /heroBody:\s*"([^"]+)\.(png|PNG|jpeg|JPEG|JPG)"/g;

  content = content.replace(regex, (match, filename, extension) => {
    count++;
    const oldName = `${filename}.${extension}`;
    const newName = `${filename}.jpg`;
    replacements.push({ old: oldName, new: newName });
    return `heroBody: "${newName}"`;
  });

  if (count === 0) {
    console.log(
      "✅ No changes needed - all heroBody already use .jpg extension",
    );
    return;
  }

  // Create backup
  const backupPath = FILE_PATH + ".backup";
  fs.copyFileSync(FILE_PATH, backupPath);
  console.log("💾 Backup created:", backupPath);

  // Write updated content
  fs.writeFileSync(FILE_PATH, content, "utf8");

  console.log("\n" + "=".repeat(80));
  console.log("📊 Summary:");
  console.log(`   Total replacements: ${count}`);
  console.log("");
  console.log("📝 Changes made:");
  replacements.forEach((r, i) => {
    console.log(`   ${i + 1}. ${r.old} → ${r.new}`);
  });
  console.log("=".repeat(80));
  console.log("\n✅ File updated successfully!");
  console.log(`   File: ${FILE_PATH}`);
  console.log(`   Backup: ${backupPath}`);
}

try {
  updateHeroBodyExtension();
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
