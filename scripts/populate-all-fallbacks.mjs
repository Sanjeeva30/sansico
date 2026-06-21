// Comprehensive, SAFE population pass across every singleton document.
// For every field, only writes a value if that field is currently empty —
// it will NEVER overwrite real content you've already written in Studio.
// Run with: SANITY_TOKEN=xxx node scripts/populate-all-fallbacks.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "rvghw4zu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

function ss(text) { return { _type: "styledString", text }; }
function st(text) { return { _type: "styledText",   text }; }

async function safePatch(id, buildPatch) {
  const doc = await client.fetch(`*[_id=="${id}"][0]`);
  if (!doc) { console.log(`  (no document with id "${id}", skipping)`); return; }
  const patch = buildPatch(doc);
  if (!patch || Object.keys(patch).length === 0) {
    console.log(`  (already populated, left untouched: ${id})`);
    return;
  }
  await client.patch(id).set(patch).commit();
  console.log(`  ✓ filled in on ${id}: ${Object.keys(patch).join(", ")}`);
}

async function main() {
  if (!process.env.SANITY_TOKEN) { console.error("Set SANITY_TOKEN env var first."); process.exit(1); }

  console.log("siteSettings...");
  await safePatch("siteSettings", (d) => {
    const p = {};
    if (!d.tagline)  p.tagline  = ss("Joy, sustainably packaged.");
    if (!d.mission)  p.mission  = st("We build trusted partnerships with sustainable solutions that elevate daily life.");
    if (!d.ctaLabel) p.ctaLabel = ss("Start a conversation");
    if (d.ctaBand && typeof d.ctaBand === "object") {
      const cb = {};
      if (!d.ctaBand.headline)  cb.headline  = ss("Looking for your |China+1| partner in Indonesia?");
      if (!d.ctaBand.subline)   cb.subline   = st("Tell us your category, target market and volumes — our marketing offices in Jakarta and Foshan respond within one business day.");
      if (!d.ctaBand.btn1Label) cb.btn1Label = ss("Request a quotation");
      if (!d.ctaBand.btn2Label) cb.btn2Label = ss("Talk to our team");
      if (Object.keys(cb).length) p.ctaBand = { ...d.ctaBand, ...cb };
    }
    if (d.susSection && typeof d.susSection === "object") {
      const s = {};
      if (!d.susSection.certHeadline)     s.certHeadline     = ss("Certified, dated, |verifiable| — sustainability as a discipline, not an adjective.");
      if (!d.susSection.certBody)         s.certBody         = st("Every certification Sansico holds is published with its scope and holding entity, and backed by a downloadable certificate.");
      if (!d.susSection.donutCenterValue) s.donutCenterValue = ss("95%");
      if (!d.susSection.donutCenterLabel) s.donutCenterLabel = ss("Minimum recycled content, gift-bag programme");
      if (Object.keys(s).length) p.susSection = { ...d.susSection, ...s };
    }
    return p;
  });

  console.log("homePage...");
  await safePatch("homePage", (d) => {
    const p = {};
    if (!d.heroEyebrow) p.heroEyebrow = ss("Indonesia · China · USA");
    if (!d.heroTitle)   p.heroTitle   = ss("Joy, |sustainably| packaged.");
    if (!d.manifestoTitle) p.manifestoTitle = st("We make things that matter, for brands that |care|.");
    return p;
  });

  console.log("companyPage...");
  await safePatch("companyPage", (d) => {
    const p = {};
    if (!d.title)  p.title  = ss("An Indonesian group built for the world's shelves");
    if (!d.mission) p.mission = ss("To be the partner that sustainably packages joy for people.");
    return p;
  });

  console.log("careersPage...");
  await safePatch("careersPage", (d) => {
    const p = {};
    if (!d.title) p.title = ss("Make the things that make moments");
    if (!d.intro) p.intro = st("Register your interest and we'll reach out when a matching role opens.");
    return p;
  });

  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
