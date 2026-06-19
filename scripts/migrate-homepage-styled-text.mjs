// Converts plain-string values left over from before the styledString/styledText
// schema change into the new {_type, text} object shape — WITHOUT losing any content.
// Run with: SANITY_TOKEN=xxx node scripts/migrate-homepage-styled-text.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "rvghw4zu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

function wrap(value, type) {
  if (value == null) return value;
  if (typeof value === "object") return value; // already migrated, leave alone
  return { _type: type, text: value };
}

async function migrateDoc(id) {
  const doc = await client.getDocument(id);
  if (!doc) { console.log(`  (no document with id "${id}", skipping)`); return; }

  const patch = {};

  if (doc.heroEyebrow !== undefined) patch.heroEyebrow = wrap(doc.heroEyebrow, "styledString");
  if (doc.heroTitle   !== undefined) patch.heroTitle   = wrap(doc.heroTitle,   "styledString");
  if (doc.heroSub     !== undefined) patch.heroSub     = wrap(doc.heroSub,     "styledText");
  if (doc.manifestoTitle !== undefined) patch.manifestoTitle = wrap(doc.manifestoTitle, "styledText");
  if (doc.manifestoBody  !== undefined) patch.manifestoBody  = wrap(doc.manifestoBody,  "styledText");

  if (Array.isArray(doc.stats)) {
    patch.stats = doc.stats.map((s) => ({ ...s, label: wrap(s.label, "styledString") }));
  }
  if (Array.isArray(doc.customers)) {
    patch.customers = doc.customers.map((c) => ({ ...c, name: wrap(c.name, "styledString") }));
  }

  if (Object.keys(patch).length === 0) { console.log(`  (nothing to migrate on ${id})`); return; }

  await client.patch(id).set(patch).commit();
  console.log(`  ✓ migrated ${id}`);
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error("Set SANITY_TOKEN env var first."); process.exit(1);
  }
  console.log("Migrating published homePage...");
  await migrateDoc("homePage");
  console.log("Migrating draft homePage (if it exists)...");
  await migrateDoc("drafts.homePage");
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
