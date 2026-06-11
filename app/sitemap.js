import { getMarkets, getProducts, getWork } from "@/lib/content";

export default async function sitemap() {
  const base = "https://www.sansico.com";
  const statics = ["", "/capabilities", "/markets", "/products", "/work", "/sustainability", "/company", "/company/facilities", "/careers", "/contact", "/privacy"];
  const [marketsData, productsData, workData] = await Promise.all([getMarkets(), getProducts(), getWork()]);
  const dyn = [
    ...((marketsData?.items || []).map((m) => `/markets/${m.slug}`)),
    ...((productsData?.items || []).map((p) => `/products/${p.slug}`)),
    ...((workData?.items || []).map((w) => `/work/${w.slug}`))
  ];
  return [...statics, ...dyn].map((p) => ({ url: base + p, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
