// Round 3c (final): converts plain-string values on Company Page, Careers Page,
// Certification, Facility, Person, and News Post documents into the new
// {_type, text} shape. This completes the full styled-text rollout.
// Run with: SANITY_TOKEN=xxx node scripts/migrate-round3c-final.mjs

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
  if (typeof value === "object") return value;
  return { _type: type, text: value };
}

async function migrateSingleton(id, buildPatch) {
  const doc = await client.getDocument(id);
  if (!doc) { console.log(`  (no document with id "${id}", skipping)`); return; }
  const patch = buildPatch(doc);
  if (!patch || Object.keys(patch).length === 0) { console.log(`  (nothing to migrate on ${id})`); return; }
  await client.patch(id).set(patch).commit();
  console.log(`  ✓ migrated ${id}`);
}

async function migrateCollection(type, buildPatch, labelField = "name") {
  const docs = await client.fetch(`*[_type=="${type}"]`);
  if (docs.length === 0) { console.log(`  (none found)`); return; }
  for (const doc of docs) {
    const patch = buildPatch(doc);
    if (!patch || Object.keys(patch).length === 0) continue;
    await client.patch(doc._id).set(patch).commit();
    const label = doc[labelField];
    console.log(`  ✓ migrated ${type} "${typeof label === "string" ? label : label?.text}" (${doc._id})`);
  }
}

function companyPagePatch(doc) {
  const patch = {
    title: wrap(doc.title, "styledString"),
    intro: wrap(doc.intro, "styledText"),
    mission: wrap(doc.mission, "styledString"),
    vision: wrap(doc.vision, "styledText"),
    culture: wrap(doc.culture, "styledText"),
    overviewTitle: wrap(doc.overviewTitle, "styledString"),
  };
  if (Array.isArray(doc.timeline)) {
    patch.timeline = doc.timeline.map((t) => ({
      ...t, year: wrap(t.year, "styledString"), event: wrap(t.event, "styledString"), description: wrap(t.description, "styledText"),
    }));
  }
  if (Array.isArray(doc.values)) {
    patch.values = doc.values.map((v) => ({ ...v, title: wrap(v.title, "styledString"), body: wrap(v.body, "styledText") }));
  }
  return patch;
}

function careersPagePatch(doc) {
  const patch = {
    title: wrap(doc.title, "styledString"),
    intro: wrap(doc.intro, "styledText"),
  };
  if (Array.isArray(doc.values)) {
    patch.values = doc.values.map((v) => ({ ...v, title: wrap(v.title, "styledString"), body: wrap(v.body, "styledText") }));
  }
  if (Array.isArray(doc.openRoles)) {
    patch.openRoles = doc.openRoles.map((r) => ({
      ...r, title: wrap(r.title, "styledString"), location: wrap(r.location, "styledString"), description: wrap(r.description, "styledText"),
    }));
  }
  return patch;
}

async function main() {
  if (!process.env.SANITY_TOKEN) { console.error("Set SANITY_TOKEN env var first."); process.exit(1); }

  console.log("Migrating companyPage singleton...");
  await migrateSingleton("companyPage", companyPagePatch);
  await migrateSingleton("drafts.companyPage", companyPagePatch);

  console.log("Migrating careersPage singleton...");
  await migrateSingleton("careersPage", careersPagePatch);
  await migrateSingleton("drafts.careersPage", careersPagePatch);

  console.log("Migrating certification documents...");
  await migrateCollection("certification", (doc) => ({
    name: wrap(doc.name, "styledString"),
    scope: wrap(doc.scope, "styledText"),
    entity: wrap(doc.entity, "styledString"),
    registration: wrap(doc.registration, "styledString"),
  }), "name");

  console.log("Migrating facility documents...");
  await migrateCollection("facility", (doc) => ({
    name: wrap(doc.name, "styledString"),
    city: wrap(doc.city, "styledString"),
    address: wrap(doc.address, "styledText"),
    focus: wrap(doc.focus, "styledString"),
    capacity: wrap(doc.capacity, "styledText"),
  }), "name");

  console.log("Migrating person documents...");
  await migrateCollection("person", (doc) => ({
    name: wrap(doc.name, "styledString"),
    role: wrap(doc.role, "styledString"),
    bio: wrap(doc.bio, "styledText"),
  }), "name");

  console.log("Migrating newsPost documents...");
  await migrateCollection("newsPost", (doc) => ({
    title: wrap(doc.title, "styledString"),
    excerpt: wrap(doc.excerpt, "styledText"),
    sourceLabel: wrap(doc.sourceLabel, "styledString"),
  }), "title");

  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
