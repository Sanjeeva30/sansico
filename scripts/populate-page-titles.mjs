// Populates the new pageTitle/pageIntro fields on pageSettings documents
// with the text that's currently live on each page (was previously hardcoded
// in the app, not connected to Sanity at all). SAFE: only fills a field if
// it's currently empty — never overwrites anything you've already written.
// Run with: SANITY_TOKEN=xxx node scripts/populate-page-titles.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "rvghw4zu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const DEFAULTS = {
  capabilities: {
    title: "Three capabilities, one accountable partner",
    intro: "From the first trend board to the container at port, Sansico operates as a single accountable partner.",
  },
  markets: {
    title: "Land where your category lives",
    intro: "Buyers don't source from companies; they source for categories.",
  },
  work: {
    title: "Proof, not promises",
    intro: "Selected programmes with the numbers that matter.",
  },
  products: {
    title: "Our product portfolio",
    intro: "Every product developed to your specification — FSC-certified materials, global retail standards.",
  },
  contact: {
    title: "Tell us what you're making",
    intro: "Category, target market, estimated volumes and timeline — our marketing offices in Jakarta and Foshan respond within one business day.",
  },
  team: {
    title: "The people behind the operations",
    intro: null,
  },
  news: {
    title: "Updates from Sansico",
    intro: null,
  },
};

function styledString(text) { return { _type: "styledString", text }; }
function styledText(text)   { return { _type: "styledText",   text }; }

async function populatePage(pageId, defaults) {
  const doc = await client.fetch(`*[_type=="pageSettings" && pageId=="${pageId}"][0]`);
  if (!doc) { console.log(`  (no pageSettings document for "${pageId}", skipping)`); return; }

  const patch = {};
  if (!doc.pageTitle && defaults.title) {
    patch.pageTitle = styledString(defaults.title);
  }
  if (!doc.pageIntro && defaults.intro) {
    patch.pageIntro = styledText(defaults.intro);
  }

  if (Object.keys(patch).length === 0) {
    console.log(`  (already populated, left untouched: ${pageId})`);
    return;
  }
  await client.patch(doc._id).set(patch).commit();
  console.log(`  ✓ populated ${pageId}: ${Object.keys(patch).join(", ")}`);
}

async function main() {
  if (!process.env.SANITY_TOKEN) { console.error("Set SANITY_TOKEN env var first."); process.exit(1); }
  console.log("Populating page hero title/intro for pages that never had a Sanity field for it...");
  for (const [pageId, defaults] of Object.entries(DEFAULTS)) {
    await populatePage(pageId, defaults);
  }
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
