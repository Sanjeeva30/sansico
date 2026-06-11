import { createClient } from "@sanity/client";
import siteJson from "@/content/site.json";
import homeJson from "@/content/home.json";
import capsJson from "@/content/capabilities.json";
import marketsJson from "@/content/markets.json";
import productsJson from "@/content/products.json";
import workJson from "@/content/work.json";
import susJson from "@/content/sustainability.json";
import companyJson from "@/content/company.json";
import careersJson from "@/content/careers.json";
import locJson from "@/content/locations.json";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const USE_SANITY = !!PROJECT_ID;

const client = USE_SANITY ? createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", useCdn: true }) : null;

async function sanityFetch(query) {
  try { return await client.fetch(query); } catch { return null; }
}

export async function getSite() {
  if (USE_SANITY) { const d = await sanityFetch(`*[_id == "siteSettings"][0]{ tagline, mission, ctaLabel, email, whatsapp, phones, nav, "cta":{"label":ctaLabel,"href":"/contact"}, "contact":{"email":email,"whatsapp":{"enabled":true,"number":whatsapp},"phones":phones,"presence":[{"country":"Indonesia","detail":"9 manufacturing facilities — close to vendor, close to production"},{"country":"China","detail":"1 manufacturing facility — close to technology & development"},{"country":"USA","detail":"Market representation — close to business"}]}, "social":[{"label":"LinkedIn","href":"https://www.linkedin.com/company/sansico"},{"label":"Instagram","href":"https://www.instagram.com/sansicogroup"},{"label":"TikTok","href":"https://www.tiktok.com/@sansicogroup"}], "footerNote":"© 2026 Sansico Group. All rights reserved.", "name":"Sansico Group" }`); if (d) return d; }
  return siteJson;
}
export async function getHome() {
  if (USE_SANITY) { const d = await sanityFetch(`*[_id == "homePage"][0]{ "hero":{"type":heroType,"eyebrow":heroEyebrow,"title":heroTitle,"sub":heroSub,"primary":{"label":"Start a conversation","href":"/contact"},"secondary":{"label":"Explore capabilities","href":"/capabilities"},"videoUrl":heroVideo,"posterUrl":""}, "manifesto":{"title":manifestoTitle,"body":manifestoBody}, stats, customers, "featuredWork":featuredWork->slug.current }`); if (d) return d; }
  return homeJson;
}
export async function getCapabilities() {
  if (USE_SANITY) { const d = await sanityFetch(`{"title":"Three capabilities, one accountable partner","intro":"From the first trend board to the container at port, Sansico operates as a single accountable partner.","groups":*[_type=="capability"]|order(order asc){title,"slug":slug.current,num,summary,body,points},"facilities":*[_type=="facility"]|order(order asc){name,city,"location":city,focus}}`); if (d) return d; }
  return capsJson;
}
export async function getMarkets() {
  if (USE_SANITY) { const d = await sanityFetch(`{"title":"Land where your category lives","intro":"Buyers don't source from companies; they source for categories.","items":*[_type=="market"]|order(order asc){title,"slug":slug.current,color,tag,body,proof}}`); if (d) return d; }
  return marketsJson;
}
export async function getMarket(slug) {
  if (USE_SANITY) { const d = await getMarkets(); if (d) return d.items.find(m => m.slug === slug); }
  return marketsJson.items.find(m => m.slug === slug);
}
export async function getProducts() {
  if (USE_SANITY) { const d = await sanityFetch(`{"title":"Five product families, developed to your specification","intro":"Everything below is made to order inside customers' own programmes.","items":*[_type=="product"]|order(order asc){title,"slug":slug.current,tag,body,specs}}`); if (d) return d; }
  return productsJson;
}
export async function getProduct(slug) {
  if (USE_SANITY) { const d = await getProducts(); if (d) return d.items.find(p => p.slug === slug); }
  return productsJson.items.find(p => p.slug === slug);
}
export async function getWork() {
  if (USE_SANITY) { const d = await sanityFetch(`{"title":"Proof, not promises","intro":"Selected programmes with the numbers that matter.","items":*[_type=="caseStudy"]|order(_createdAt asc){title,"slug":slug.current,kicker,quote,body,stats}}`); if (d) return d; }
  return workJson;
}
export async function getCase(slug) {
  if (USE_SANITY) { const d = await getWork(); if (d) return d.items.find(w => w.slug === slug); }
  return workJson.items.find(w => w.slug === slug);
}
export async function getSustainability() {
  if (USE_SANITY) { const d = await sanityFetch(`{"title":"Certified, dated, verifiable — sustainability as a discipline, not an adjective.","intro":"Every certification Sansico holds is published with its scope and holding entity.","pillars":[],"stat":{"value":"95%","label":"Minimum recycled content, gift-bag programme"},"certifications":*[_type=="certification"]|order(_createdAt asc){name,category,scope,entity,"certificate":""},"note":"Certificate documents are being attached to each entry."}`); if (d) return d; }
  return susJson;
}
export async function getCompany() {
  if (USE_SANITY) { const d = await sanityFetch(`*[_id=="siteSettings"][0]{"title":"An Indonesian group built for the world's shelves","intro":"Sansico Group Indonesia is an internationally recognised design and solutions provider.","vision":mission,"culture":"A culture of long-term relationships: with customers measured in decades, with communities measured in livelihoods.","timeline":[],"innovation":[],"leadership":{"note":"Leadership profiles to be added."}}`); if (d) return d; }
  return companyJson;
}
export async function getCareers() {
  if (USE_SANITY) { const d = await sanityFetch(`*[_id=="careersPage"][0]{title,intro,values,openRoles}`); if (d) return d; }
  return careersJson;
}
export async function getLocations() {
  if (USE_SANITY) { const d = await sanityFetch(`{"title":"Our locations","items":*[_type=="facility"]|order(order asc){name,city,address}}`); if (d) return d; }
  return locJson;
}
export const accentSplit = (s) => s ? s.split("|") : ["","",""];
