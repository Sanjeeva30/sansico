import { createClient } from "@sanity/client";
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error("SANITY_TOKEN not set"); process.exit(1); }
const client = createClient({ projectId: "rvghw4zu", dataset: "production", apiVersion: "2024-01-01", token: TOKEN, useCdn: false });
const CUSTOMERS = ["Target","Walmart","Hallmark","Mattel","Costco","Hasbro","Michaels","American Greetings","Zara Home","Kroger","CVS","Funko","Spin Master","Danone","Glico","Otsuka","Kalbe","TJX"];
async function migrate() {
  const doc = await client.fetch(`*[_id == "homePage"][0]{ customers }`);
  const existing = doc?.customers || [];
  const customers = existing.length > 0 ? existing.map((c, i) => typeof c === "string" ? { _key: `customer${i}`, _type: "object", name: c } : c) : CUSTOMERS.map((name, i) => ({ _key: `customer${i}`, _type: "object", name }));
  await client.patch("homePage").set({ customers }).commit();
  console.log("Done — " + customers.length + " customers migrated");
  customers.forEach(c => console.log("  • " + c.name));
}
migrate().catch(err => { console.error(err.message); process.exit(1); });
