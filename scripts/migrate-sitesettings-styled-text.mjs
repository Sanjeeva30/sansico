// Round 2: converts plain-string values in siteSettings into the new
// {_type, text} object shape — preserves every word, just reshapes it.
// Run with: SANITY_TOKEN=xxx node scripts/migrate-sitesettings-styled-text.mjs

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
  if (typeof value === "object") return value; // already migrated
  return { _type: type, text: value };
}

function migrateSiteSettingsDoc(doc) {
  const patch = {};

  if (doc.tagline  !== undefined) patch.tagline  = wrap(doc.tagline,  "styledString");
  if (doc.mission  !== undefined) patch.mission  = wrap(doc.mission,  "styledText");
  if (doc.ctaLabel !== undefined) patch.ctaLabel = wrap(doc.ctaLabel, "styledString");

  if (doc.nav && Array.isArray(doc.nav)) {
    patch.nav = doc.nav.map((n) => ({ ...n, label: wrap(n.label, "styledString") }));
  }

  if (doc.ctaBand && typeof doc.ctaBand === "object") {
    patch.ctaBand = {
      ...doc.ctaBand,
      headline:  wrap(doc.ctaBand.headline,  "styledString"),
      subline:   wrap(doc.ctaBand.subline,   "styledText"),
      btn1Label: wrap(doc.ctaBand.btn1Label, "styledString"),
      btn2Label: wrap(doc.ctaBand.btn2Label, "styledString"),
    };
  }

  if (doc.susSection && typeof doc.susSection === "object") {
    const s = doc.susSection;
    patch.susSection = {
      ...s,
      certHeadline:     wrap(s.certHeadline,     "styledString"),
      certBody:         wrap(s.certBody,         "styledText"),
      certBadges:       Array.isArray(s.certBadges) ? s.certBadges.map((b) => wrap(b, "styledString")) : s.certBadges,
      donutCenterValue: wrap(s.donutCenterValue, "styledString"),
      donutCenterLabel: wrap(s.donutCenterLabel, "styledString"),
      donutSegments:    Array.isArray(s.donutSegments)
        ? s.donutSegments.map((seg) => ({ ...seg, label: wrap(seg.label, "styledString") }))
        : s.donutSegments,
      pageTitle: wrap(s.pageTitle, "styledString"),
      pageIntro: wrap(s.pageIntro, "styledText"),
      heading:   wrap(s.heading,   "styledString"),
      body:      wrap(s.body,      "styledText"),
      // statValue / statLabel intentionally left as plain strings — marked legacy in the schema
    };
  }

  return patch;
}

async function migrateDoc(id) {
  const doc = await client.getDocument(id);
  if (!doc) { console.log(`  (no document with id "${id}", skipping)`); return; }
  const patch = migrateSiteSettingsDoc(doc);
  if (Object.keys(patch).length === 0) { console.log(`  (nothing to migrate on ${id})`); return; }
  await client.patch(id).set(patch).commit();
  console.log(`  ✓ migrated ${id}`);
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error("Set SANITY_TOKEN env var first."); process.exit(1);
  }
  console.log("Migrating published siteSettings...");
  await migrateDoc("siteSettings");
  console.log("Migrating draft siteSettings (if it exists)...");
  await migrateDoc("drafts.siteSettings");
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
