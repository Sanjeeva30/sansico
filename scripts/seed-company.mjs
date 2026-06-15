import { createClient } from "@sanity/client";

const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error("Set SANITY_TOKEN first"); process.exit(1); }

const client = createClient({
  projectId: "rvghw4zu", dataset: "production",
  apiVersion: "2024-01-01", token: TOKEN, useCdn: false,
});

const content = {
  _id: "companyPage", _type: "companyPage",
  title:   "An Indonesian group built for the world's shelves",
  intro:   "Sansico Group is an Indonesian design and manufacturing group supplying global retail for over four decades — certified at every step, dual-sourced for resilience, and built on the belief that the objects of joy should never cost the planet.",
  mission: "We build trusted partnerships with sustainable solutions that elevate daily life.",
  vision:  "To be the partner that sustainably packages joy for people.",
  culture: "We work hard with honesty and respect for people to make sustainable products, build trusted partnerships and protect our planet.",
  values: [
    { _key: "stewardship",    title: "Stewardship",    body: "Caring for our planet and its future." },
    { _key: "accountability", title: "Accountability", body: "Doing what is right and doing what we say." },
    { _key: "noble",          title: "Noble Execution",body: "Delivering quality, reliability, and consistency." },
    { _key: "safety",         title: "Safety & People",body: "Protecting our team and helping them grow." },
    { _key: "innovation",     title: "Innovation",     body: "Finding better ways for people and the planet." },
  ],
};

client.createOrReplace(content)
  .then(() => console.log("✅  Done — open Studio → Company Page to review and publish."))
  .catch(err => { console.error("❌", err.message); process.exit(1); });
